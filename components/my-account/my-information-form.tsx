"use client";

import { createCustomerAddress, updateCustomerAddress } from "@/app/actions/auth";
import { cn } from "@/lib/utils";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Customer } from "@/types/shared";

type ComponentProps = {
  customer: Customer;
};

function MyInformationForm({ customer }: ComponentProps) {
  const [informationUpdateMessage, setInformationUpdateMessage] = useState<string | null>(null);
  const { defaultAddress } = customer;

  const [state, customerFormAction, isPending] = useActionState(
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
        setInformationUpdateMessage("Information Updated");
        setTimeout(() => {
          setInformationUpdateMessage(null);
        }, 1800);
      }
      if (error) toast.error(error);
    }
  }, [state]);

  return (
    <form action={customerFormAction}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input className="hidden" name="id" defaultValue={defaultAddress.id as string} />
        <div className="flex flex-col space-y-2">
          <Label htmlFor="firstName" className="text-xs uppercase">
            First name
          </Label>
          <Input name="firstName" type="text" defaultValue={defaultAddress.firstName} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="lastName" className="text-xs uppercase">
            Last Name
          </Label>
          <Input name="lastName" type="text" defaultValue={defaultAddress.lastName} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="address1" className="text-xs uppercase">
            Address
          </Label>
          <Input name="address1" type="text" defaultValue={defaultAddress.address1} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="address2" className="text-xs uppercase">
            Landmark
          </Label>
          <Input name="address2" type="text" defaultValue={defaultAddress.address2} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="city" className="text-xs uppercase">
            City
          </Label>
          <Input name="city" type="text" defaultValue={defaultAddress.city} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="zip" className="text-xs uppercase">
            PIN CODE
          </Label>
          <Input name="zip" type="text" defaultValue={defaultAddress.zip} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="country" className="text-xs uppercase">
            Country
          </Label>
          <Input name="country" type="text" defaultValue={defaultAddress.country} />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="phone" className="text-xs uppercase">
            Phone Number
          </Label>
          <Input name="phone" type="text" defaultValue={defaultAddress.phone} />
        </div>
      </div>
      <Button
        type="submit"
        disabled={Boolean(informationUpdateMessage)}
        size={"lg"}
        className={cn("mt-6 text-xs font-normal uppercase", isPending && "pointer-events-none")}
      >
        {informationUpdateMessage ? informationUpdateMessage : isPending ? "Updating..." : "Update"}
      </Button>
    </form>
  );
}

export default MyInformationForm;
