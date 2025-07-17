import { cn } from "@/lib/utils";
import React from "react";

type ComponentProps = {
  className?: string;
};

function MenuIcon({ className }: ComponentProps) {
  return (
    <svg className={cn("h-auto w-6")} viewBox="0 0 24 14" xmlns="http://www.w3.org/2000/svg">
      <path
        className={cn("stroke-1 transition-all ease-in-out", className)}
        d="M0 0h24v1.5H0zM0 10.5h24V12H0z"
      ></path>
    </svg>
  );
}

export default MenuIcon;
