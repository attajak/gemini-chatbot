import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Chat } from "@/components/custom/chat";
import { Navbar } from "@/components/custom/navbar";
import { convertToUIMessages, fetcher, getToken } from "@/lib/utils";

export default function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useSWR(
    id ? `/api/chat/${id}` : null,
    (url: string) => {
      const token = getToken();
      return fetcher(url, token ? { Authorization: `Bearer ${token}` } : undefined);
    }
  );

  if (isLoading) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Navbar chatId={id} />
      <Chat id={id!} initialMessages={data ? convertToUIMessages(data.messages ?? []) : []} />
    </>
  );
}
