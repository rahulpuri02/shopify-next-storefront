import { MENUS } from "@/constants/shopify";
import { navigationService } from "@/services/navigation.service";
import React from "react";

async function Navbar() {
  const mainMenu = await navigationService.getMenu(MENUS.mainMenu);
  if (!mainMenu?.length) return;
  return <nav>Navbar</nav>;
}

export default Navbar;
