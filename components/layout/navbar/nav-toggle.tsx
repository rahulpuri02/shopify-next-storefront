"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import MenuIcon from "@/components/icons/menu-icon";
import { usePathname } from "next/navigation";

type ComponentProps = {
  side?: "right" | "left";
};
function NavToggle({ side = "left" }: ComponentProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className={`${isHomePage ? "bg-white" : "bg-black"}`} />
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default NavToggle;
