import { STORE_NAME } from "@/constants/shopify";
import React from "react";

function CompanyLogo() {
  return (
    <svg
      className="absolute left-1/2 h-7 w-56 -translate-x-1/2 transform"
      viewBox="0 0 120 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={STORE_NAME.shortName}
    >
      <text
        x="0"
        y="18"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="18"
        fontWeight="bold"
        fill="currentColor"
      >
        {STORE_NAME.shortName}
      </text>
    </svg>
  );
}

export default CompanyLogo;
