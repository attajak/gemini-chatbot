import { useChat } from "ai/react";
import { differenceInHours, format } from "date-fns";
import { getToken } from "@/lib/utils";

const SAMPLE = {
  flights: [
    { id: "r1", departure: { cityName: "San Francisco", airportCode: "SFO", timestamp: "2024-05-19T18:00:00Z" }, arrival: { cityName: "Rome", airportCode: "FCO", timestamp: "2024-05-20T14:30:00Z" }, airlines: ["United Airlines", "Lufthansa"], priceInUSD: 1200.5, numberOfStops: 1 },
    { id: "r2", departure: { cityName: "San Francisco", airportCode: "SFO", timestamp: "2024-05-19T17:30:00Z" }, arrival: { cityName: "Rome", airportCode: "FCO", timestamp: "2024-05-20T15:00:00Z" }, airlines: ["British Airways"], priceInUSD: 1350, numberOfStops: 0 },
  ],
};

export function ListFlights({ chatId, results = SAMPLE }: { chatId: string; results?: typeof SAMPLE }) {
  const token = getToken();
  const { append } = useChat({
    id: chatId,
    body: { id: chatId },
    maxSteps: 5,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return (
    <div className="rounded-lg bg-muted px-4 py-1.5 flex flex-col">
      {results.flights.map((flight) => (
        <div
          key={flight.id}
          className="cursor-pointer flex flex-row border-b dark:border-zinc-700 py-2 last-of-type:border-none group"
          onClick={() => append({ role: "user", content: `I would like to book the ${flight.airlines} one!` })}
        >
          <div className="flex flex-col w-full gap-0.5 justify-between">
            <div className="flex flex-row gap-0.5 text-base sm:text-base font-medium group-hover:underline">
              <div>{format(new Date(flight.departure.timestamp), "h:mm a")}</div>
              <div>–</div>
              <div>{format(new Date(flight.arrival.timestamp), "h:mm a")}</div>
            </div>
            <div className="hidden sm:flex text-sm text-muted-foreground">{flight.airlines.join(", ")}</div>
            <div className="sm:hidden text-xs text-muted-foreground">{flight.numberOfStops} stops</div>
          </div>
          <div className="flex flex-col gap-0.5 justify-between">
            <div className="text-base">
              {differenceInHours(new Date(flight.arrival.timestamp), new Date(flight.departure.timestamp))} hr
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground flex flex-row">
              <div>{flight.departure.airportCode}</div><div>–</div><div>{flight.arrival.airportCode}</div>
            </div>
          </div>
          <div className="flex flex-col w-32 items-end gap-0.5">
            <div className="text-base text-emerald-600 dark:text-emerald-500">${flight.priceInUSD}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Round Trip</div>
          </div>
        </div>
      ))}
    </div>
  );
}
