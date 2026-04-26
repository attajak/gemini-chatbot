import { Router } from "express";
import { convertToCoreMessages, streamText, generateId } from "ai";
import { z } from "zod";
import { geminiProModel } from "../lib/ai";
import {
  generateReservationPrice,
  generateSampleFlightSearchResults,
  generateSampleFlightStatus,
  generateSampleSeatSelection,
} from "../lib/ai-actions";
import {
  createReservation,
  getChatById,
  getReservationById,
  saveChat,
} from "../lib/db-queries";
import { requireAuth } from "../lib/auth";
import type { SessionUser } from "../lib/auth";

const router = Router();

type AuthRequest = Parameters<typeof requireAuth>[0] & { user?: SessionUser };

router.post("/chat", requireAuth, async (req: AuthRequest, res) => {
  try {
    const { id, messages } = req.body;
    const session = req.user!;

    const coreMessages = convertToCoreMessages(messages).filter(
      (m: any) => m.content && (typeof m.content === "string" ? m.content.length > 0 : m.content.length > 0)
    );

    const result = await streamText({
      model: geminiProModel,
      system: `
        - you help users book flights!
        - keep your responses limited to a sentence.
        - DO NOT output lists.
        - after every tool call, pretend you're showing the result to the user and keep your response limited to a phrase.
        - today's date is ${new Date().toLocaleDateString()}.
        - ask follow up questions to nudge user into the optimal flow
        - ask for any details you don't know, like name of passenger, etc.
        - C and D are aisle seats, A and F are window seats, B and E are middle seats
        - assume the most popular airports for the origin and destination
        - here's the optimal flow
          - search for flights
          - choose flight
          - select seats
          - create reservation (ask user whether to proceed with payment or change reservation)
          - authorize payment (requires user consent, wait for user to finish payment and let you know when done)
          - display boarding pass (DO NOT display boarding pass without verifying payment)
      `,
      messages: coreMessages,
      tools: {
        getWeather: {
          description: "Get the current weather at a location",
          parameters: z.object({
            latitude: z.number(),
            longitude: z.number(),
          }),
          execute: async ({ latitude, longitude }) => {
            const response = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
            );
            return response.json();
          },
        },
        displayFlightStatus: {
          description: "Display the status of a flight",
          parameters: z.object({
            flightNumber: z.string(),
            date: z.string(),
          }),
          execute: async ({ flightNumber, date }) => {
            return generateSampleFlightStatus({ flightNumber, date });
          },
        },
        searchFlights: {
          description: "Search for flights based on the given parameters",
          parameters: z.object({
            origin: z.string(),
            destination: z.string(),
          }),
          execute: async ({ origin, destination }) => {
            return generateSampleFlightSearchResults({ origin, destination });
          },
        },
        selectSeats: {
          description: "Select seats for a flight",
          parameters: z.object({
            flightNumber: z.string(),
          }),
          execute: async ({ flightNumber }) => {
            return generateSampleSeatSelection({ flightNumber });
          },
        },
        createReservation: {
          description: "Display pending reservation details",
          parameters: z.object({
            seats: z.string().array(),
            flightNumber: z.string(),
            departure: z.object({
              cityName: z.string(),
              airportCode: z.string(),
              timestamp: z.string(),
              gate: z.string(),
              terminal: z.string(),
            }),
            arrival: z.object({
              cityName: z.string(),
              airportCode: z.string(),
              timestamp: z.string(),
              gate: z.string(),
              terminal: z.string(),
            }),
            passengerName: z.string(),
          }),
          execute: async (props) => {
            const { totalPriceInUSD } = await generateReservationPrice(props);
            const reservId = generateId();
            await createReservation({
              id: reservId,
              userId: session.id,
              details: { ...props, totalPriceInUSD },
            });
            return { id: reservId, ...props, totalPriceInUSD };
          },
        },
        authorizePayment: {
          description: "User will enter credentials to authorize payment",
          parameters: z.object({
            reservationId: z.string(),
          }),
          execute: async ({ reservationId }) => {
            return { reservationId };
          },
        },
        verifyPayment: {
          description: "Verify payment status",
          parameters: z.object({
            reservationId: z.string(),
          }),
          execute: async ({ reservationId }) => {
            const reserv = await getReservationById({ id: reservationId });
            return { hasCompletedPayment: reserv?.hasCompletedPayment ?? false };
          },
        },
        displayBoardingPass: {
          description: "Display a boarding pass",
          parameters: z.object({
            reservationId: z.string(),
            passengerName: z.string(),
            flightNumber: z.string(),
            seat: z.string(),
            departure: z.object({
              cityName: z.string(),
              airportCode: z.string(),
              airportName: z.string(),
              timestamp: z.string(),
              terminal: z.string(),
              gate: z.string(),
            }),
            arrival: z.object({
              cityName: z.string(),
              airportCode: z.string(),
              airportName: z.string(),
              timestamp: z.string(),
              terminal: z.string(),
              gate: z.string(),
            }),
          }),
          execute: async (boardingPass) => {
            return boardingPass;
          },
        },
      },
      maxSteps: 10,
      onFinish: async ({ response }) => {
        try {
          await saveChat({
            id,
            messages: [...coreMessages, ...response.messages],
            userId: session.id,
          });
        } catch (err) {
          req.log?.error({ err }, "Failed to save chat");
        }
      },
    });

    result.pipeDataStreamToResponse(res);
  } catch (err) {
    req.log?.error({ err }, "Chat error");
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

router.get("/chat/:id", requireAuth, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const chatRecord = await getChatById({ id });
  if (!chatRecord) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  if (chatRecord.userId !== req.user!.id) {
    res.status(403).json({ error: "Unauthorized" });
    return;
  }
  res.json(chatRecord);
});

export default router;
