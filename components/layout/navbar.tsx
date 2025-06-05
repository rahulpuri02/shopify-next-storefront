import { LEFT_SIDE_MENU, MENUS, STORE_NAME } from "@/constants/shopify";
import { navigationService } from "@/services/navigation.service";
import Link from "next/link";

async function Navbar() {
  const mainMenu = await navigationService.getMenu(MENUS.mainMenu);
  if (!mainMenu?.length) return null;

  const LEFT_MENU_TITLES = [LEFT_SIDE_MENU.shop, LEFT_SIDE_MENU.search];

  const leftSideMenu = mainMenu.filter((m) => LEFT_MENU_TITLES.includes(m.title.trim()));

  const rightSideMenu = mainMenu.filter((m) => !LEFT_MENU_TITLES.includes(m.title.trim()));

  return (
    <nav className="flex items-center justify-between border-b px-6 py-4 text-xs font-medium uppercase">
      <div className="flex gap-4">
        {leftSideMenu.map((item) => (
          <Link key={item.title} href={item.path}>
            {item.title}
          </Link>
        ))}
      </div>

      <svg
        className="h-7 w-56"
        viewBox="0 0 120 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={STORE_NAME.shortName}
      >
        <text
          x="0"
          y="18"
          fontFamily="Helvetica, Arial, sans-serif"
          fontSize="18"
          fontWeight="bold"
          fill="currentColor"
        >
          {STORE_NAME.shortName}
        </text>
      </svg>

      <div className="flex gap-4">
        {rightSideMenu.map((item) => (
          <Link key={item.title} href={item.path}>
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
