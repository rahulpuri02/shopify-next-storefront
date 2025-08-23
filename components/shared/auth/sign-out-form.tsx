"use client";

import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { GENERICS } from "@/constants/shared";
import { cn } from "@/lib/utils";
import React, { useActionState, useEffect } from "react";
import { toast } from "sonner";

function SignOutForm() {
  const [state, formAction, isPending] = useActionState(signOut, { success: false, error: null });

  useEffect(() => {
    if (state.error) toast.error(state.error);
  }, [state.error]);

  return (
    <form action={formAction}>
      <Button
        type="submit"
        className={cn("text-xs font-normal uppercase", isPending && "pointer-events-none")}
      >
        {isPending ? GENERICS.signingOut : GENERICS.signOut}
      </Button>
    </form>
  );
}

export default SignOutForm;
