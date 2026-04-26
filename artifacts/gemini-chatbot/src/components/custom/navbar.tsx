import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { SlashIcon } from "./icons";
import { History } from "./history";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar({ chatId }: { chatId?: string }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-background absolute top-0 left-0 w-dvw py-2 px-3 justify-between flex flex-row items-center z-30">
      <div className="flex flex-row gap-3 items-center">
        <History user={user} />
        <div className="flex flex-row gap-2 items-center">
          <img
            src="/images/gemini-logo.png"
            height={20}
            width={20}
            alt="gemini logo"
            className="h-5 w-5 object-contain"
          />
          <div className="text-zinc-500">
            <SlashIcon size={16} />
          </div>
          <div className="text-sm dark:text-zinc-300 truncate w-28 md:w-fit">
            Gemini Chatbot
          </div>
        </div>
      </div>

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="py-1.5 px-2 h-fit font-normal"
              variant="secondary"
            >
              {user.email}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <ThemeToggle />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="p-1 z-50 cursor-pointer"
              onClick={handleSignOut}
            >
              <span className="w-full text-left px-1 py-0.5 text-red-500">
                Sign out
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button className="py-1.5 px-2 h-fit font-normal" asChild>
          <Link to="/login">Login</Link>
        </Button>
      )}
    </div>
  );
}
