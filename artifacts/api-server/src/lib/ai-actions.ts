import { generateObject } from "ai";
import { z } from "zod";
import { geminiFlashModel } from "./ai";

export async function generateSampleFlightStatus({
  flightNumber,
  date,
}: {
  flightNumber: string;
  date: string;
}) {
  const { object: flightStatus } = await generateObject({
    model: geminiFlashModel,
    prompt: `Flight status for flight number ${flightNumber} on ${date}`,
    schema: z.object({
      flightNumber: z.string(),
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
      totalDistanceInMiles: z.number(),
    }),
  });
  return flightStatus;
}

export async function generateSampleFlightSearchResults({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}) {
  const { object: flightSearchResults } = await generateObject({
    model: geminiFlashModel,
    prompt: `Generate search results for flights from ${origin} to ${destination}, limit to 4 results`,
    output: "array",
    schema: z.object({
      id: z.string(),
      departure: z.object({
        cityName: z.string(),
        airportCode: z.string(),
        timestamp: z.string(),
      }),
      arrival: z.object({
        cityName: z.string(),
        airportCode: z.string(),
        timestamp: z.string(),
      }),
      airlines: z.array(z.string()),
      priceInUSD: z.number(),
      numberOfStops: z.number(),
    }),
  });
  return { flights: flightSearchResults };
}

export async function generateSampleSeatSelection({
  flightNumber,
}: {
  flightNumber: string;
}) {
  const { object: seatSelection } = await generateObject({
    model: geminiFlashModel,
    prompt: `Generate available seats for flight ${flightNumber}. Make most seats unavailable, with a few available ones.`,
    schema: z.object({
      seats: z.array(
        z.array(
          z.object({
            seatNumber: z.string(),
            priceInUSD: z.number(),
            isAvailable: z.boolean(),
          })
        )
      ),
    }),
  });
  return seatSelection;
}

export async function generateReservationPrice(props: {
  seats: string[];
  flightNumber: string;
  departure: any;
  arrival: any;
  passengerName: string;
}) {
  const { object } = await generateObject({
    model: geminiFlashModel,
    prompt: `Generate a realistic price for a flight reservation from ${props.departure.cityName} to ${props.arrival.cityName} for ${props.seats.length} passenger(s) on flight ${props.flightNumber}.`,
    schema: z.object({
      totalPriceInUSD: z.number().describe("Total price in USD"),
    }),
  });
  return object;
}
