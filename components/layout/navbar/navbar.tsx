import CompanyLogo from "@/components/icons/company-logo";
import { ROUTES } from "@/constants/routes";
import { FILTER_OPERATIONS } from "@/constants/shared";
import { LEFT_SIDE_MENU, MENUS } from "@/constants/shopify";
import { filterMenuItems } from "@/lib/utils";
import { navigationService } from "@/services/navigation.service";
import { Menu } from "@/types/shared";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

async function Navbar() {
  const mainMenu = await navigationService.getMenu(MENUS.mainMenu);
  if (!mainMenu?.length) return null;

  const LEFT_MENU_TITLES = [LEFT_SIDE_MENU.shop, LEFT_SIDE_MENU.search];
  const leftSideMenu = mainMenu.filter((m) => LEFT_MENU_TITLES.includes(m.title.trim()));
  const rightSideMenu = mainMenu.filter((m) => !LEFT_MENU_TITLES.includes(m.title.trim()));

  const renderMenuItem = (item: Menu) => {
    const highlightsMenu = filterMenuItems(
      item?.items || [],
      [ROUTES.essentials, ROUTES.newArrivals],
      FILTER_OPERATIONS.include
    );
    const nonHighlighstMenu = filterMenuItems(
      item?.items || [],
      [ROUTES.essentials, ROUTES.newArrivals],
      FILTER_OPERATIONS.exclude
    );
    return (
      <div className="group relative" key={item.title}>
        <Link
          href={item.path || "#"}
          className="flex items-center gap-1 transition hover:opacity-60"
        >
          {item.path === ROUTES.search && <SearchIcon className="h-auto w-4" />}
          {item.title}
        </Link>

        {item.items!.length > 0 && (
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
              {nonHighlighstMenu!.map((subItem: Menu) => (
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

  return (
    <nav className="flex items-center justify-between px-6 py-5 text-xs font-medium tracking-widest uppercase md:py-4">
      <div className="hidden gap-4 md:flex">{leftSideMenu.map(renderMenuItem)}</div>
      <CompanyLogo className="mt-2 hidden md:block" />
      <div className="hidden gap-4 md:flex">{rightSideMenu.map(renderMenuItem)}</div>
      <MobileMenu mainMenu={mainMenu} />
    </nav>
  );
}

export default Navbar;
