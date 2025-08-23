"use client";

import { Label } from "@radix-ui/react-label";
import { XIcon } from "lucide-react";
import { SetStateAction, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { forgotPassword } from "@/app/actions/auth";
import { cn } from "@/lib/utils";
import { FORGOT_PASSWORD_FORM } from "@/constants/shared";

type ComponentProps = {
  setShowForgetPasswordForm: React.Dispatch<SetStateAction<boolean>>;
};

export default function ForgotPasswordForm({ setShowForgetPasswordForm }: ComponentProps) {
  const [state, formAction, isPending] = useActionState(forgotPassword, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state.success || state.error) {
      if (state.success) {
        toast.success(FORGOT_PASSWORD_FORM.messages.success);
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
          <h3 className="text-lg font-semibold">{FORGOT_PASSWORD_FORM.title}</h3>
          <XIcon
            onClick={() => setShowForgetPasswordForm(false)}
            className="h-5 w-auto cursor-pointer stroke-1"
          />
        </div>
        <p className="py-5 text-sm">{FORGOT_PASSWORD_FORM.description}</p>
        <div className="mb-6 flex flex-col space-y-2">
          <Label htmlFor="forgetPasswordEmail" className="text-xs uppercase">
            {FORGOT_PASSWORD_FORM.labels.email}
          </Label>
          <Input
            name="forgetPasswordEmail"
            type="email"
            placeholder={FORGOT_PASSWORD_FORM.placeholders.email}
          />
        </div>
        <Button
          type="submit"
          className={cn("w-full font-normal", isPending && "pointer-events-none")}
        >
          {isPending ? FORGOT_PASSWORD_FORM.messages.sending : FORGOT_PASSWORD_FORM.messages.send}
        </Button>
      </form>
    </div>
  );
}
