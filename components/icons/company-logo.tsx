"use client";

import { STORE_NAME } from "@/constants/shopify";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

type ComponentProps = {
  className?: string;
};
function CompanyLogo({ className }: ComponentProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <svg
      className={clsx("absolute left-1/2 h-7 w-56 -translate-x-1/2 transform", className)}
      viewBox="0 0 120 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={STORE_NAME.shortName}
    >
      <text
        x="0"
        y="20"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="20"
        fontWeight="bold"
        className={`${isHomePage ? "fill-white" : "fill-black"}`}
      >
        {STORE_NAME.shortName}
      </text>
    </svg>
  );
}

export default CompanyLogo;
