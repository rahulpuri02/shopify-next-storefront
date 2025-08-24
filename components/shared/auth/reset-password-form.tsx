"use client";

import { resetPassword } from "@/app/actions/auth";
import { cn, setupCustomerId } from "@/lib/utils";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { RESET_PASSWORD_FORM } from "@/constants/shared";

type ComponentProps = {
  slug: string[] | undefined;
};

function ResetPasswordForm({ slug }: ComponentProps) {
  const [customerId, resetToken] = slug || [];
  const [state, formAction, isPending] = useActionState(resetPassword, {
    success: false,
    error: null,
  });

  useEffect(() => {
    if (state.success) toast.success("Password is reset successfully");
    if (state.error) toast.error(state.error);
  }, [state]);

  return (
    <div className="w-full sm:w-[400px]">
      <form action={formAction}>
        <p className="py-5 text-sm">{RESET_PASSWORD_FORM.description}</p>

        <div className="mb-6 flex flex-col space-y-2">
          <input name="token" className="hidden" defaultValue={resetToken} />
          <input name="customerId" className="hidden" defaultValue={setupCustomerId(customerId)} />

          <Label htmlFor="newPassword" className="text-xs uppercase">
            {RESET_PASSWORD_FORM.labels.newPassword}
          </Label>
          <Input
            name="newPassword"
            type="password"
            required
            placeholder={RESET_PASSWORD_FORM.placeholders.newPassword}
          />
        </div>

        <div className="mb-6 flex flex-col space-y-2">
          <Label htmlFor="repeatPassword" className="text-xs uppercase">
            {RESET_PASSWORD_FORM.labels.repeatPassword}
          </Label>
          <Input
            name="repeatPassword"
            type="password"
            required
            placeholder={RESET_PASSWORD_FORM.placeholders.repeatPassword}
          />
        </div>

        <Button
          type="submit"
          className={cn("w-full font-normal", isPending && "pointer-events-none")}
        >
          {isPending ? RESET_PASSWORD_FORM.messages.updating : RESET_PASSWORD_FORM.messages.update}
        </Button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
