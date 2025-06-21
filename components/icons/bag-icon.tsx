import { cn } from "@/lib/utils";
import React from "react";

type ComponentProps = {
  className?: string;
};

function BagIcon({ className }: ComponentProps) {
  return (
    <svg
      className={cn("h-5 w-4 cursor-pointer fill-inherit", className)}
      viewBox="0 0 15 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <path
        fillRule="evenodd"
        d="M4.5 1.5h6V5h-6V1.5zM3 5V0h9v5h3v15H0V5h3zm9 1.5H1.5v12h12v-12H12z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default BagIcon;
