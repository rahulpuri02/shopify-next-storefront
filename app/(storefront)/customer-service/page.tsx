import { CUSTOMER_SERVICE } from "@/constants/shared";
import React from "react";

export const metadata = {
  title: "Customer Service | CN 74®",
};

function CustomerServicePage() {
  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl">{CUSTOMER_SERVICE.title}</h1>
      <p className="mb-6 text-sm text-gray-600">{CUSTOMER_SERVICE.description}</p>
    </div>
  );
}

export default CustomerServicePage;
