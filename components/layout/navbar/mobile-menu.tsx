"use client";

import React from "react";
import NavToggle from "@/components/layout/navbar/nav-toggle";
import CompanyLogo from "@/components/icons/company-logo";
import type { Menu } from "@/types/shared";
import { Search } from "lucide-react";
import FavoriteIcon from "@/components/icons/favorite-icon";
import BagIcon from "@/components/icons/bag-icon";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "@/components/shared/cart/shopping-cart";

type ComponentProps = { mainMenu: Menu[] };

function MobileMenu({}: ComponentProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <>
      <div className="md:hidden">
        <div className="flex items-center gap-6">
          <NavToggle />
          <Search className="h-auto w-5 cursor-pointer" />
        </div>
      </div>
      <CompanyLogo className="md:hidden" />
      <div className="md:hidden">
        <div className="flex items-center gap-6">
          <FavoriteIcon className={`${isHomePage ? "stroke-white" : "stroke-black"}`} />
          <ShoppingCart>
            <div>
              <BagIcon className={`${isHomePage ? "fill-white" : "fill-black"} cursor-pointer`} />
            </div>
          </ShoppingCart>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
