"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { filterMenuItems } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { FILTER_OPERATIONS, GENERICS } from "@/constants/shared";
import { Menu } from "@/types/shared";
import { useCart } from "@/contexts/cart-context";
import { useEffect, useState } from "react";
import SearchPanel from "@/components/shared/search/search-panel";
import { useFavorite } from "@/contexts/favorite-context";

type ComponentProps = {
  item: Menu;
  isScrollingStart: boolean;
};

const MenuItem = ({ item, isScrollingStart }: ComponentProps) => {
  const pathname = usePathname();
  const { showCart, cartItems } = useCart();
  const { favItems } = useFavorite();
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [favItemsCount, setFavItemsCount] = useState(0);

  useEffect(() => {
    setFavItemsCount(favItems.length);
  }, [favItems]);

  const isHomePage = pathname === "/";

  const highlightsMenu = filterMenuItems(
    item?.items || [],
    [ROUTES.essentials, ROUTES.newArrivals],
    FILTER_OPERATIONS.include
  );
  const nonHighlightsMenu = filterMenuItems(
    item?.items || [],
    [ROUTES.essentials, ROUTES.newArrivals],
    FILTER_OPERATIONS.exclude
  );

  return (
    <div className={`group relative ${isHomePage ? "text-white" : "text-black"}`}>
      {item.title.toLowerCase() === "bag" ? (
        <p onClick={() => showCart(true)} className="flex cursor-pointer gap-1">
          {item.title}
          {cartItems.length > 0 && <span>{cartItems.length}</span>}
        </p>
      ) : item.title.toLowerCase() === "favorites" ? (
        <Link href={item.path || "#"} className="flex cursor-pointer gap-1">
          {item.title}
          {favItemsCount > 0 && <span>{favItemsCount}</span>}
        </Link>
      ) : item.path === GENERICS.searchPath ? (
        <div
          onClick={() => setShowSearchPanel(true)}
          className="flex cursor-pointer items-center gap-1 transition hover:opacity-60"
        >
          <SearchIcon className="h-auto w-4" />
          <p>{item.title}</p>
        </div>
      ) : (
        <Link
          href={item.path || "#"}
          className="flex items-center gap-1 transition hover:opacity-60"
        >
          {item.path === GENERICS.searchPath && <SearchIcon className="h-auto w-4" />}
          <p>{item.title}</p>
        </Link>
      )}

      {/** Sub Menu Items **/}
      {!isScrollingStart && item.items && item.items?.length > 0 && isHomePage && (
        <div className="absolute top-full left-0 z-10 mt-2 flex w-48 flex-col gap-4">
          <ul className="mt-5 flex flex-col gap-2 text-xs font-normal">
            {highlightsMenu!.map((subItem: Menu) => (
              <li key={subItem.title}>
                <Link className="transition hover:opacity-60" href={subItem.path || "#"}>
                  {subItem.title}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-3 flex flex-col gap-2 text-xs font-normal">
            {nonHighlightsMenu!.map((subItem: Menu) => (
              <li key={subItem.title}>
                <Link className="transition hover:opacity-60" href={subItem.path || "#"}>
                  {subItem.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showSearchPanel && <SearchPanel onOpenChange={setShowSearchPanel} open={showSearchPanel} />}
    </div>
  );
};

export default MenuItem;
