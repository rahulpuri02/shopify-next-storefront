"use client";

import { ROUTES } from "@/constants/routes";
import { STORE_NAME } from "@/constants/shopify";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ComponentProps = {
  className?: string;
  isAbsolute?: boolean;
};
function CompanyLogo({ className, isAbsolute = true }: ComponentProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const fillColor = isHomePage ? "fill-white" : "fill-black";

  return (
    <Link
      href={ROUTES.root}
      className={cn(isAbsolute ? "absolute left-1/2 -translate-x-1/2 transform" : "")}
    >
      <svg
        className={cn("h-7 w-auto")}
        viewBox="0 0 120 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={STORE_NAME.shortName}
      >
        <text
          x="20"
          y="20"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="20"
          fontWeight="bold"
          className={cn("text-center", fillColor, className)}
        >
          {STORE_NAME.shortName}
        </text>
      </svg>
    </Link>
  );
}

export default CompanyLogo;
