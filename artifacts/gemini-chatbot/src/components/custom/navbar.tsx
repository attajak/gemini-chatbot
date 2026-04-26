import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { PlusIcon } from "./icons";
import { History } from "./history";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Navbar({ chatId }: { chatId?: string }) {
  const { user } = useAuth();

  return (
    <div className="bg-background absolute top-0 left-0 w-dvw py-4 flex flex-row gap-2 items-center z-30">
      <div className="flex flex-row gap-2 items-center">
        <History user={user} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="p-1.5 h-fit"
                asChild
              >
                <Link to="/">
                  <PlusIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
