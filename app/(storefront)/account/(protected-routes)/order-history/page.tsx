import { getCustomer } from "@/app/actions/auth";
import { ROUTES } from "@/constants/routes";
import { MY_ACCOUNT } from "@/constants/shared";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Order History | CN 74®",
};

async function OrderHistoryPage() {
  const customer = await getCustomer();
  if (!customer) redirect(ROUTES.account);
  return (
    <div className="flex flex-col space-y-10">
      <h1 className="mb-10 text-2xl">{MY_ACCOUNT.orderHistory}</h1>
      <p className="text-sm">{MY_ACCOUNT.noOrdersText}</p>
    </div>
  );
}

export default OrderHistoryPage;
