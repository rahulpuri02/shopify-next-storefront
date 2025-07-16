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
import { cn } from "@/lib/utils";

type ComponentProps = { mainMenu: Menu[] };

function MobileMenu({ mainMenu }: ComponentProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isProductPage = pathname.startsWith("/products/");
  return (
    <>
      <div className="md:hidden">
        <div className="flex items-center gap-6">
          <NavToggle mainMenu={mainMenu} />
          <Search className={cn("h-auto w-5 cursor-pointer", isProductPage ? "text-white" : "")} />
        </div>
      </div>
      <CompanyLogo className="fill-white md:hidden" />
      <div className="md:hidden">
        <div className="flex items-center gap-6">
          <FavoriteIcon
            className={`${isHomePage || isProductPage ? "stroke-white" : "stroke-black"}`}
          />
          <ShoppingCart>
            <div>
              <BagIcon
                className={`${isHomePage || isProductPage ? "fill-white" : "fill-black"} cursor-pointer`}
              />
            </div>
          </ShoppingCart>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
