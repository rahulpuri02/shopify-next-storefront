"use client";

import { createAccount } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CREATE_ACCOUNT_FORM } from "@/constants/shared";
import { cn } from "@/lib/utils";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function CreateAccountForm() {
  const [state, formAction, isPending] = useActionState(createAccount, {
    success: false,
    error: null,
  });

  useEffect(() => {
    const { success, error } = state;
    if (success) toast.success(CREATE_ACCOUNT_FORM.messages.accountCreated);
    if (error) toast.error(error as string);
  }, [state]);

  return (
    <form action={formAction} className="flex w-full flex-col space-y-8 sm:w-[400px]">
      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-xs uppercase">
            {CREATE_ACCOUNT_FORM.labels.firstName}
          </Label>
          <Input
            name="firstName"
            type="text"
            placeholder={CREATE_ACCOUNT_FORM.placeholders.firstName}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-xs uppercase">
            {CREATE_ACCOUNT_FORM.labels.lastName}
          </Label>
          <Input
            name="lastName"
            type="text"
            placeholder={CREATE_ACCOUNT_FORM.placeholders.lastName}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs uppercase">
            {CREATE_ACCOUNT_FORM.labels.email}
          </Label>
          <Input
            name="email"
            type="email"
            placeholder={CREATE_ACCOUNT_FORM.placeholders.email}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs uppercase">
            {CREATE_ACCOUNT_FORM.labels.password}
          </Label>
          <Input
            name="password"
            type="password"
            placeholder={CREATE_ACCOUNT_FORM.placeholders.password}
            required
          />
        </div>

        <div className="flex flex-col space-y-1.5 text-xs">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="acceptsMarketing" className="mt-[2px]" />
            {CREATE_ACCOUNT_FORM.labels.newsletter}
          </label>
          <p className="text-muted-foreground pl-5">{CREATE_ACCOUNT_FORM.messages.newsletter}</p>
        </div>
      </div>

      <Button className={cn("w-full font-normal", isPending && "pointer-events-none")}>
        {isPending
          ? CREATE_ACCOUNT_FORM.messages.creating
          : CREATE_ACCOUNT_FORM.messages.createAccount}
      </Button>
    </form>
  );
}
