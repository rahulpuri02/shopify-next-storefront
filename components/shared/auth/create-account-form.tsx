"use client";

import { createAccount } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function CreateAccountForm() {
  const [error, formAction, isPending] = useActionState(createAccount, null);

  useEffect(() => {
    if (typeof error === "string") {
      toast.error(error);
    }
  }, [error]);

  return (
    <form action={formAction} className="flex w-full flex-col space-y-8 sm:w-[400px]">
      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-xs uppercase">
            First Name
          </Label>
          <Input name="firstName" type="text" placeholder="First Name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-xs uppercase">
            Last Name
          </Label>
          <Input name="lastName" type="text" placeholder="Last Name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs uppercase">
            Email Address *
          </Label>
          <Input name="email" type="email" placeholder="Email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs uppercase">
            Password *
          </Label>
          <Input name="password" type="password" placeholder="Password" required />
        </div>
      </div>

      <Button className={cn("w-full font-normal", isPending && "pointer-events-none")}>
        {isPending ? "Creating..." : "Create Account"}
      </Button>
    </form>
  );
}
