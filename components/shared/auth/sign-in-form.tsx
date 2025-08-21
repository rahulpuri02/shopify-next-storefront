"use client";

import { forgotPassword, signInAccount } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { SetStateAction, useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function SignInForm() {
  const [error, formAction, isPending] = useActionState(signInAccount, null);
  const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false);

  useEffect(() => {
    if (typeof error === "string") {
      toast.error(error);
    }
  }, [error]);

  if (showForgetPasswordForm)
    return <ForgetPasswordForm setShowForgetPasswordForm={setShowForgetPasswordForm} />;

  return (
    <form action={formAction} className="flex w-full flex-col space-y-8 sm:w-[400px]">
      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs uppercase">
            Email Address *
          </Label>
          <Input name="email" type="email" placeholder="Email" required />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="password" className="text-xs uppercase">
            Password *
          </Label>
          <Input name="password" type="password" placeholder="Password" required />
        </div>
        <p
          onClick={() => setShowForgetPasswordForm(true)}
          className="cursor-pointer text-xs underline"
        >
          Forgotton your password?
        </p>
      </div>
      <Button
        type="submit"
        className={cn("w-full font-normal", isPending && "pointer-events-none")}
      >
        {isPending ? "Logging..." : "Log in"}
      </Button>
    </form>
  );
}

type ComponentProps = {
  setShowForgetPasswordForm: React.Dispatch<SetStateAction<boolean>>;
};

function ForgetPasswordForm({ setShowForgetPasswordForm }: ComponentProps) {
  const [state, formAction, isPending] = useActionState(forgotPassword, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state.success || state.error) {
      if (state.success) {
        toast.success("Password reset email sent, check your inbox.");
      }
      if (state.error) {
        toast.error(state.error);
      }
    }
  }, [state]);

  return (
    <div className="w-full sm:w-[400px]">
      <form action={formAction}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Forgotton your password?</h3>
          <XIcon
            onClick={() => setShowForgetPasswordForm(false)}
            className="h-5 w-auto cursor-pointer stroke-1"
          />
        </div>
        <p className="py-5 text-xs">To reset your password, please enter your account email.</p>
        <div className="mb-6 flex flex-col space-y-2">
          <Label htmlFor="forgetPasswordEmail" className="text-xs uppercase">
            Email address *
          </Label>
          <Input name="forgetPasswordEmail" type="email" />
        </div>
        <Button
          type="submit"
          className={cn("w-full font-normal", isPending && "pointer-events-none")}
        >
          {isPending ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
