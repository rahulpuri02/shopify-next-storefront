"use client";

import React, { useActionState, useEffect } from "react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { forgotPassword } from "@/app/actions/auth";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { GENERICS, MY_ACCOUNT } from "@/constants/shared";

function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPassword, {
    error: null,
    success: false,
  });

  useEffect(() => {
    if (state.success || state.error) {
      if (state.success) {
        toast.success("Password change email sent, check your inbox.");
      }
      if (state.error) {
        toast.error(state.error);
      }
    }
  }, [state]);

  return (
    <div className="mt-12">
      <h1 className="text-2xl">{MY_ACCOUNT.changePassword}</h1>
      <p className="py-5 text-sm">{MY_ACCOUNT.changePasswordText}</p>
      <form className="w-full md:w-[50%]" action={formAction}>
        <div className="mb-6 flex flex-col space-y-2">
          <Label htmlFor="forgetPasswordEmail" className="text-xs uppercase">
            {GENERICS.emailAddress} *
          </Label>
          <Input name="forgetPasswordEmail" type="email" />
        </div>
        <Button
          size={"lg"}
          type="submit"
          className={cn("font-normal", isPending && "pointer-events-none")}
        >
          {isPending ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
