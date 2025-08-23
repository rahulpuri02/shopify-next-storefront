"use client";

import { cn } from "@/lib/utils";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Customer } from "@/types/shared";
import { createCustomerAddress, updateCustomerAddress } from "@/app/actions/customer";
import { MY_INFORMATION_FORM } from "@/constants/shared";

type ComponentProps = {
  customer: Customer;
};

function MyInformationForm({ customer }: ComponentProps) {
  const [informationUpdateMessage, setInformationUpdateMessage] = useState<string | null>(null);
  const { defaultAddress } = customer;

  const [state, formAction, isPending] = useActionState(
    defaultAddress ? updateCustomerAddress : createCustomerAddress,
    {
      success: false,
      error: null,
    }
  );

  useEffect(() => {
    const { success, error } = state;
    if (success || error) {
      if (success) {
        setInformationUpdateMessage(MY_INFORMATION_FORM.messages.updated);
        setTimeout(() => {
          setInformationUpdateMessage(null);
        }, 1800);
      }
      if (error) toast.error(error);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input className="hidden" name="id" defaultValue={defaultAddress.id as string} />

        {Object.entries(MY_INFORMATION_FORM.labels).map(([field, label]) => (
          <div key={field} className="flex flex-col space-y-2">
            <Label htmlFor={field} className="text-xs uppercase">
              {label}
            </Label>
            <Input
              name={field}
              type="text"
              placeholder={
                MY_INFORMATION_FORM.placeholders[
                  field as keyof typeof MY_INFORMATION_FORM.placeholders
                ]
              }
              defaultValue={defaultAddress[field as keyof typeof defaultAddress] ?? ""}
            />
          </div>
        ))}
      </div>

      <Button
        type="submit"
        disabled={Boolean(informationUpdateMessage)}
        size="lg"
        className={cn("mt-6 text-xs font-normal uppercase", isPending && "pointer-events-none")}
      >
        {informationUpdateMessage
          ? informationUpdateMessage
          : isPending
            ? MY_INFORMATION_FORM.messages.updating
            : MY_INFORMATION_FORM.messages.update}
      </Button>
    </form>
  );
}

export default MyInformationForm;
