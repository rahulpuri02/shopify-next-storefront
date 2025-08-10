"use client";

import BagIcon from "@/components/icons/bag-icon";
import CompanyLogo from "@/components/icons/company-logo";
import FavoriteIcon from "@/components/icons/favorite-icon";
import SearchPanel from "@/components/shared/search/search-panel";
import { useCart } from "@/contexts/cart-context";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import type { Menu } from "@/types/shared";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import NavToggle from "./nav-toggle/nav-toggle";
import { useFavorite } from "@/contexts/favorite-context";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

type ComponentProps = { mainMenu: Menu[] };

function MobileMenu({ mainMenu }: ComponentProps) {
  const pathname = usePathname();
  const { showCart, cartItems } = useCart();
  const { favItems } = useFavorite();

  const { isScrollingStart } = useScroll(200);
  const isHomePage = pathname === "/";
  const isProductPage = pathname.startsWith("/products/");
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [favItemsCount, setFavItemsCount] = useState(0);

  useEffect(() => {
    setFavItemsCount(favItems.length);
  }, [favItems]);

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
          <Link href={ROUTES.favorites} className="flex items-center gap-1">
            <FavoriteIcon
              className={`${isHomePage || (isProductPage && !isScrollingStart) ? "stroke-white" : "stroke-black"}`}
            />
            {favItemsCount > 0 && <span>{favItemsCount}</span>}
          </Link>
          <div className="flex items-center gap-1" onClick={() => showCart(true)}>
            <BagIcon
              className={`${isHomePage || (isProductPage && !isScrollingStart) ? "fill-white" : "fill-black"} cursor-pointer`}
            />
            {cartItems?.length > 0 && <span>{cartItems.length}</span>}
          </div>
        </div>
      </div>
      {showSearchPanel && <SearchPanel open={showSearchPanel} onOpenChange={setShowSearchPanel} />}
    </>
  );
}

export default MobileMenu;
