import { getCustomer } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import React from "react";

async function MyAccountOverviewPage() {
  const customer = await getCustomer();
  if (!customer) return redirect("/my-account");
  const { defaultAddress: address } = customer;
  return (
    <div>
      <h1 className="mb-10 text-2xl">Overview</h1>
      <div className="flex flex-col space-y-10 pb-10">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        <p className="text-sm">You have no recent orders</p>
      </div>
      <div className="pb-4">
        <h3 className="mb-6 text-lg font-semibold">Billing address</h3>
        <div className="mb-6 border-b" />
        {address ? (
          <div className="mb-6 text-xs">
            <div>
              {address.firstName} {address.lastName}
            </div>
            <div>
              {address.address1} {address.address2}
            </div>
            <div>
              {address.zip} {address.city}
            </div>
            <div>{address.country}</div>
            {address.phone && <div>{address.phone}</div>}
          </div>
        ) : (
          <p className="text-sm">You have no billing address</p>
        )}
        <div className="mb-6 border-b" />
      </div>
      <Button className="text-xs font-normal uppercase">SIGN OUT</Button>
    </div>
  );
}

export default MyAccountOverviewPage;
