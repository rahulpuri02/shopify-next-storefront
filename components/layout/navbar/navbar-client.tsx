"use client";

import CompanyLogo from "@/components/icons/company-logo";
import { useScroll } from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import type { Menu } from "@/types/shared";
import { usePathname } from "next/navigation";
import MenuItem from "./menu-item";
import MobileMenu from "./mobile-menu";

type ComponentProps = {
  mainMenu: Menu[];
  leftSideMenu: Menu[];
  rightSideMenu: Menu[];
};

function NavbarClient({ leftSideMenu, rightSideMenu, mainMenu }: ComponentProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isProductPage = pathname.startsWith("/products/");
  const { isVisible, isScrollingStart } = useScroll();

  return (
    <nav
      suppressHydrationWarning
      className={cn(
        "fixed z-10 flex w-full items-center justify-between px-6 py-5 text-xs font-medium tracking-widest uppercase transition-all duration-500 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        !isHomePage || isScrollingStart ? "bg-white text-black" : "bg-transparent text-white",
        isHomePage && isScrollingStart && "bg-custom-blue text-white",
        isProductPage && !isScrollingStart ? "bg-transparent sm:bg-inherit" : ""
      )}
    >
      <div className="hidden gap-4 md:flex">
        {leftSideMenu.map((item) => (
          <MenuItem key={item.path} item={item} isScrollingStart={isScrollingStart} />
        ))}
      </div>
      <CompanyLogo className={cn("mt-2 hidden md:block")} />
      <div className="hidden gap-4 md:flex">
        {rightSideMenu.map((item) => (
          <MenuItem key={item.title} item={item} isScrollingStart={isScrollingStart} />
        ))}
      </div>
      <MobileMenu mainMenu={mainMenu} />
    </nav>
  );
}

export default NavbarClient;
