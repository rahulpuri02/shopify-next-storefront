import { LEFT_SIDE_MENU, MENUS } from "@/constants/shopify";
import { navigationService } from "@/services/navigation.service";
import NavbarClient from "./navbar-client";

async function Navbar() {
  const mainMenu = await navigationService.getMenu(MENUS.mainMenu);
  if (!mainMenu?.length) return null;

  const LEFT_MENU_TITLES = [LEFT_SIDE_MENU.shop, LEFT_SIDE_MENU.search];
  const leftSideMenu = mainMenu.filter((m) => LEFT_MENU_TITLES.includes(m.title.trim()));
  const rightSideMenu = mainMenu.filter((m) => !LEFT_MENU_TITLES.includes(m.title.trim()));

  return (
    <NavbarClient mainMenu={mainMenu} leftSideMenu={leftSideMenu} rightSideMenu={rightSideMenu} />
  );
}

export default Navbar;
