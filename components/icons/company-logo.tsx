"use client";

import { STORE_NAME } from "@/constants/shopify";
import { cn } from "@/lib/utils";
import { tree } from "next/dist/build/templates/app-page";
import { usePathname } from "next/navigation";
import React from "react";

type ComponentProps = {
  className?: string;
  isAbsolute?: boolean;
};
function CompanyLogo({ className, isAbsolute = true }: ComponentProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const fillColor = isHomePage ? "fill-white" : "fill-black";

  return (
    <svg
      className={cn("h-7 w-auto", isAbsolute ? "absolute left-1/2 -translate-x-1/2 transform" : "")}
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
        className={cn(fillColor, className)}
      >
        {STORE_NAME.shortName}
      </text>
    </svg>
  );
}

export default CompanyLogo;
