import { differenceInMinutes } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { CheckCircle, InfoIcon } from "@/components/custom/icons";
import { Input } from "@/components/ui/input";

export function AuthorizePayment({
  intent = { reservationId: "sample-uuid" },
}: {
  intent?: { reservationId: string };
}) {
  const { data: reservation, mutate } = useSWR(
    `/api/reservation?id=${intent.reservationId}`,
    fetcher
  );
  const [input, setInput] = useState("");

  const handleAuthorize = async (magicWord: string) => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(`/api/reservation?id=${intent.reservationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ magicWord }),
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || response.statusText);
      }
      const updated = await response.json();
      mutate(updated);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  return reservation?.hasCompletedPayment ? (
    <div className="bg-emerald-500 p-4 rounded-lg gap-4 flex flex-row justify-between items-center">
      <div className="dark:text-emerald-950 text-emerald-50 font-medium">Payment Verified</div>
      <div className="dark:text-emerald-950 text-emerald-50"><CheckCircle size={20} /></div>
    </div>
  ) : reservation && differenceInMinutes(new Date(), new Date(reservation?.createdAt)) > 150 ? (
    <div className="bg-red-500 p-4 rounded-lg gap-4 flex flex-row justify-between items-center">
      <div className="text-background">Payment Gateway Timed Out</div>
      <div className="text-background"><InfoIcon size={20} /></div>
    </div>
  ) : (
    <div className="bg-muted p-4 rounded-lg flex flex-col gap-2">
      <div className="text font-medium">Use your saved information for this transaction</div>
      <div className="text-muted-foreground text-sm sm:text-base">
        Enter the magic word to authorize payment. Hint: It rhymes with bercel.
      </div>
      <Input
        type="text"
        placeholder="Enter magic word..."
        className="dark:bg-zinc-700 text-base border-none mt-2"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            await handleAuthorize(input);
            setInput("");
          }
        }}
      />
    </div>
  );
}
