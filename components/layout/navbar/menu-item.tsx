"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { filterMenuItems } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { FILTER_OPERATIONS } from "@/constants/shared";
import { Menu } from "@/types/shared";
import { ShoppingCart } from "@/components/shared/cart/shopping-cart";

type ComponentProps = {
  item: Menu;
  isScrollingStart: boolean;
};

const MenuItem = ({ item, isScrollingStart }: ComponentProps) => {
  const pathname = usePathname();
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
        <ShoppingCart>
          <p className="cursor-pointer">{item.title}</p>
        </ShoppingCart>
      ) : (
        <Link
          href={item.path || "#"}
          className="flex items-center gap-1 transition hover:opacity-60"
        >
          {item.path === ROUTES.search && <SearchIcon className="h-auto w-4" />}
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
    </div>
  );
};

export default MenuItem;
