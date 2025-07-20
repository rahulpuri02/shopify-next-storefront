"use client";

import BagIcon from "@/components/icons/bag-icon";
import CompanyLogo from "@/components/icons/company-logo";
import FavoriteIcon from "@/components/icons/favorite-icon";
import NavToggle from "@/components/layout/navbar/nav-toggle";
import SearchPanel from "@/components/shared/search/search-panel";
import { useCart } from "@/contexts/cart-context";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import type { Menu } from "@/types/shared";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

type ComponentProps = { mainMenu: Menu[] };

function MobileMenu({ mainMenu }: ComponentProps) {
  const pathname = usePathname();
  const { showCart } = useCart();
  const { isScrollingStart } = useScroll(200);
  const isHomePage = pathname === "/";
  const isProductPage = pathname.startsWith("/products/");
  const [showSearchPanel, setShowSearchPanel] = useState(false);

  return (
    <>
      <div className="md:hidden">
        <div className="flex items-center gap-6">
          <NavToggle mainMenu={mainMenu} />
          <Search
            onClick={() => setShowSearchPanel(true)}
            className={cn(
              "h-auto w-5 cursor-pointer",
              isProductPage && !isScrollingStart ? "text-white" : ""
            )}
          />
        </div>
      </div>
      <CompanyLogo
        className={cn(
          "md:hidden",
          isHomePage || (!isScrollingStart && isProductPage) ? "fill-white" : ""
        )}
      />
      <div className="md:hidden">
        <div className="flex items-center gap-6">
          <FavoriteIcon
            className={`${isHomePage || (isProductPage && !isScrollingStart) ? "stroke-white" : "stroke-black"}`}
          />
          <div onClick={() => showCart(true)}>
            <BagIcon
              className={`${isHomePage || (isProductPage && !isScrollingStart) ? "fill-white" : "fill-black"} cursor-pointer`}
            />
          </div>
        </div>
      </div>
      {showSearchPanel && <SearchPanel open={showSearchPanel} onOpenChange={setShowSearchPanel} />}
    </>
  );
}

export default MobileMenu;
