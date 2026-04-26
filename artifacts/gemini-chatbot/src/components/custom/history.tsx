import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useSWR from "swr";
import { useAuth } from "@/lib/auth-context";
import { fetcher, getToken } from "@/lib/utils";
import { ClockIcon, TrashIcon } from "./icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function formatDate(date: Date): string {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  return formatDistanceToNow(date, { addSuffix: true });
}

export function History({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: chats, isLoading, mutate } = useSWR(
    user ? "/api/history" : null,
    (url: string) => {
      const token = getToken();
      return fetcher(url, token ? { Authorization: `Bearer ${token}` } : undefined);
    }
  );

  const deleteChat = async (id: string) => {
    const token = getToken();
    const res = await fetch(`/api/history?id=${id}`, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (res.ok) {
      mutate();
      toast.success("Chat deleted");
    } else {
      toast.error("Failed to delete chat");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-1.5 h-fit">
                <ClockIcon />
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>History</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Chat History</SheetTitle>
          <SheetDescription>Your previous conversations</SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          {!user ? (
            <div className="p-4 text-sm text-muted-foreground">Login to view your chat history.</div>
          ) : isLoading ? (
            <div className="p-4 text-sm text-muted-foreground">Loading...</div>
          ) : chats?.length === 0 ? (
            <div className="p-4 text-sm text-muted-foreground">No chat history yet.</div>
          ) : (
            <div className="flex flex-col p-2 gap-1">
              {chats?.map((chat: any) => (
                <div key={chat.id} className="flex flex-row items-center justify-between rounded-lg hover:bg-muted group">
                  <Link
                    to={`/chat/${chat.id}`}
                    onClick={() => setOpen(false)}
                    className="flex-1 p-2 truncate text-sm"
                  >
                    <div className="font-medium truncate">{chat.title || "New Chat"}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(new Date(chat.createdAt))}</div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 h-8 w-8 mr-1 shrink-0"
                    onClick={() => deleteChat(chat.id)}
                  >
                    <TrashIcon size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
