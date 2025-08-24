"use client";

import { signInAccount } from "@/app/actions/auth";
import ForgotPasswordForm from "@/components/shared/auth/forgot-password-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SIGN_IN_FORM } from "@/constants/shared";
import { cn } from "@/lib/utils";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInAccount, {
    success: false,
    error: "",
  });
  const [showForgetPasswordForm, setShowForgetPasswordForm] = useState(false);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  if (showForgetPasswordForm)
    return <ForgotPasswordForm setShowForgetPasswordForm={setShowForgetPasswordForm} />;

  return (
    <form action={formAction} className="flex w-full flex-col space-y-8 sm:w-[400px]">
      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs uppercase">
            {SIGN_IN_FORM.labels.email}
          </Label>
          <Input name="email" type="email" placeholder={SIGN_IN_FORM.placeholders.email} required />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="password" className="text-xs uppercase">
            {SIGN_IN_FORM.labels.password}
          </Label>
          <Input
            name="password"
            type="password"
            placeholder={SIGN_IN_FORM.placeholders.password}
            required
          />
        </div>

        <p
          onClick={() => setShowForgetPasswordForm(true)}
          className="cursor-pointer text-xs underline"
        >
          {SIGN_IN_FORM.links.forgotPassword}
        </p>
      </div>

      <Button
        type="submit"
        className={cn("w-full font-normal", isPending && "pointer-events-none")}
      >
        {isPending ? SIGN_IN_FORM.messages.logging : SIGN_IN_FORM.messages.login}
      </Button>
    </form>
  );
}
