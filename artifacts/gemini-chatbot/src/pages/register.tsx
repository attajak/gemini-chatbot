import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthForm } from "@/components/custom/auth-form";
import { SubmitButton } from "@/components/custom/submit-button";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const handleAction = async (formData: FormData) => {
    setPending(true);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Registration failed");
      } else {
        login(data.token, data.user);
        navigate("/");
      }
    } catch {
      toast.error("Failed to register, please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex h-dvh w-screen items-start md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Sign Up</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Create an account with your email and password
          </p>
        </div>
        <AuthForm action={handleAction}>
          <SubmitButton pending={pending}>Sign up</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Already have an account? "}
            <Link to="/login" className="font-semibold text-gray-800 hover:underline dark:text-zinc-200">
              Sign in
            </Link>
            {" instead."}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
