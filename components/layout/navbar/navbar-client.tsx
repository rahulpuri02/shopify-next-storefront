"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import MenuItem from "./menu-item";
import MobileMenu from "./mobile-menu";
import CompanyLogo from "@/components/icons/company-logo";
import type { Menu } from "@/types/shared";

type ComponentProps = {
  mainMenu: Menu[];
  leftSideMenu: Menu[];
  rightSideMenu: Menu[];
};

function NavbarClient({ leftSideMenu, rightSideMenu, mainMenu }: ComponentProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isVisible, setIsVisible] = useState(true);
  const [isScrollingStart, setIsScrollingStart] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const isScrollingDown = currentY > lastScrollY;

          setIsScrollingStart(currentY > 0);
          setIsVisible(!(isScrollingDown && currentY > 200));
          lastScrollY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      suppressHydrationWarning
      className={clsx(
        "fixed z-10 flex w-full items-center justify-between px-6 py-5 text-xs font-medium tracking-widest uppercase transition-all duration-500 ease-in-out",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        !isHomePage || isScrollingStart ? "bg-white text-black" : "bg-transparent text-white",
        isHomePage && isScrollingStart && "bg-custom-blue text-white"
      )}
    >
      <div className="hidden gap-4 md:flex">
        {leftSideMenu.map((item) => (
          <MenuItem key={item.path} item={item} isScrollingStart={isScrollingStart} />
        ))}
      </div>
      <CompanyLogo className="mt-2 hidden md:block" />
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
