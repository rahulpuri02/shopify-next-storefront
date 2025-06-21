import { cn } from "@/lib/utils";
import React from "react";

type ComponentProps = {
  className?: string;
};

function MenuIcon({ className }: ComponentProps) {
  return (
    <div className="relative flex cursor-pointer items-center justify-center">
      <div className="relative size-4">
        <span
          className={cn(
            "absolute top-1 left-0 block h-0.5 w-5 bg-inherit transition-all duration-100",
            className
          )}
        ></span>
        <span
          className={cn(
            "absolute top-3 left-0 block h-0.5 w-5 bg-inherit transition-all duration-100",
            className
          )}
        ></span>
      </div>
      <span className="sr-only" />
    </div>
  );
}

export default MenuIcon;
