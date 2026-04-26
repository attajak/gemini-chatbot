import { useState } from "react";
import { LoaderIcon } from "@/components/custom/icons";
import { Button } from "@/components/ui/button";

export function SubmitButton({
  children,
  onClick,
  pending: externalPending,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  pending?: boolean;
}) {
  const [internalPending, setInternalPending] = useState(false);
  const pending = externalPending ?? internalPending;

  return (
    <Button
      type="submit"
      disabled={pending}
      className="relative text-white"
      onClick={onClick}
    >
      {children}
      {pending && (
        <span className="animate-spin absolute right-4">
          <LoaderIcon />
        </span>
      )}
    </Button>
  );
}
