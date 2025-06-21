import CompanyLogo from "@/components/icons/company-logo";
import { LEFT_SIDE_MENU, MENUS } from "@/constants/shopify";
import { navigationService } from "@/services/navigation.service";
import MobileMenu from "./mobile-menu";
import MenuItem from "./menu-item";

async function Navbar() {
  const mainMenu = await navigationService.getMenu(MENUS.mainMenu);
  if (!mainMenu?.length) return null;

  const LEFT_MENU_TITLES = [LEFT_SIDE_MENU.shop, LEFT_SIDE_MENU.search];
  const leftSideMenu = mainMenu.filter((m) => LEFT_MENU_TITLES.includes(m.title.trim()));
  const rightSideMenu = mainMenu.filter((m) => !LEFT_MENU_TITLES.includes(m.title.trim()));

  return (
    <nav className="absolute top-0 z-10 flex w-full items-center justify-between px-6 py-5 text-xs font-medium tracking-widest text-white uppercase md:py-[16.5px]">
      <div className="hidden gap-4 md:flex">
        {leftSideMenu.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </div>
      <CompanyLogo className="mt-2 hidden md:block" />
      <div className="hidden gap-4 md:flex">
        {rightSideMenu.map((item) => (
          <MenuItem key={item.title} item={item} />
        ))}
      </div>
      <MobileMenu mainMenu={mainMenu} />
    </nav>
  );
}

export default Navbar;
