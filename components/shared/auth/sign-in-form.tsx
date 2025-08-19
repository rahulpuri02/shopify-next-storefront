"use client";

import { signInAccount } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useActionState } from "react";

export default function SignInForm() {
  const [error, formAction, isPending] = useActionState(signInAccount, null);
  return (
    <form action={formAction} className="flex w-full flex-col space-y-4 sm:w-[400px]">
      <div className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs uppercase">
            Email Address *
          </Label>
          <Input name="email" type="email" placeholder="Email" />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="password" className="text-xs uppercase">
            Password *
          </Label>
          <Input name="password" type="password" placeholder="Password" />
        </div>
      </div>
      <Button
        type="submit"
        disabled={isPending}
        className={cn(
          "w-full",
          isPending
            ? "bg-gray-200 text-gray-500 hover:bg-gray-200"
            : "bg-black text-white hover:bg-black"
        )}
      >
        {isPending ? "Logging..." : "Log in"}
      </Button>
      {(error as string) && <p className="mt-2 text-center text-red-500">{error as string}</p>}
    </form>
  );
}
