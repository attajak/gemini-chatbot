import { useChat } from "ai/react";
import cx from "classnames";
import { getToken } from "@/lib/utils";

interface Seat { seatNumber: string; priceInUSD: number; isAvailable: boolean; }

const SAMPLE: { seats: Seat[][] } = {
  seats: Array.from({ length: 5 }, (_, row) =>
    ["A", "B", "C", "D", "E", "F"].map((col) => ({
      seatNumber: `${row + 1}${col}`,
      priceInUSD: 150,
      isAvailable: col === "C" && row === 2,
    }))
  ),
};

export function SelectSeats({ chatId, availability = SAMPLE }: { chatId: string; availability?: typeof SAMPLE }) {
  const token = getToken();
  const { append } = useChat({
    id: chatId,
    body: { id: chatId },
    maxSteps: 5,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return (
    <div className="flex flex-col gap-2 bg-muted rounded-lg">
      <div className="flex flex-col gap-4 scale-75">
        <div className="flex flex-row w-full justify-between text-muted-foreground">
          <div className="flex flex-row">
            {["A", "B", "C"].map((c) => <div key={c} className="w-[45px] sm:w-[54px] text-center">{c}</div>)}
          </div>
          <div className="flex flex-row">
            {["D", "E", "F"].map((c) => <div key={c} className="w-[45px] sm:w-[54px] text-center">{c}</div>)}
          </div>
        </div>
        {availability.seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row gap-4">
            {row.map((seat, seatIndex) => (
              <>
                {seatIndex === 3 && (
                  <div key="num" className="flex flex-row items-center justify-center w-full text-muted-foreground">
                    {rowIndex + 1}
                  </div>
                )}
                <div
                  key={seat.seatNumber}
                  onClick={() => seat.isAvailable && append({ role: "user", content: `I'd like to go with seat ${seat.seatNumber}` })}
                  className={cx(
                    "group relative size-8 sm:size-10 flex-shrink-0 flex rounded-sm flex-row items-center justify-center",
                    seat.isAvailable ? "bg-blue-500 hover:bg-pink-500 cursor-pointer" : "bg-gray-500 cursor-not-allowed"
                  )}
                >
                  <div className="text-xs text-white">${seat.priceInUSD}</div>
                  <div className={cx("absolute -top-1 h-2 w-full scale-125 rounded-sm", seat.isAvailable ? "bg-blue-600 group-hover:bg-pink-600" : "bg-zinc-600")} />
                </div>
              </>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-4 justify-center pb-6">
        <div className="flex flex-row items-center gap-2">
          <div className="size-4 bg-blue-500 rounded-sm" /><div className="text text-muted-foreground font-medium text-sm">Available</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="size-4 bg-gray-500 rounded-sm" /><div className="text text-muted-foreground font-medium text-sm">Unavailable</div>
        </div>
      </div>
    </div>
  );
}
