"use client";

import { ArrowLeft, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import CompanyLogo from "@/components/icons/company-logo";
import MenuIcon from "@/components/icons/menu-icon";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GENERICS, STATIC_MOBILE_MENU_ITEMS } from "@/constants/shared";
import { useScroll } from "@/hooks/use-scroll";

import { getCurrentItems } from "@/lib/utils";
import type { Menu } from "@/types/shared";
import MobileMenuList from "./mobile-menu-list";

type ComponentProps = {
  side?: "right" | "left";
  mainMenu: Menu[];
};

function NavToggle({ side = "left", mainMenu }: ComponentProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isProductPage = pathname.startsWith("/products/");
  const { isScrollingStart } = useScroll(200);
  const [showModal, setShowModal] = useState(true);

  const shopItems =
    mainMenu
      .find((m) => m.title.toLowerCase() === GENERICS.shop.toLowerCase())
      ?.items?.filter((i) => i.title.toLowerCase() !== GENERICS.seeAll.toLowerCase()) || [];

  const rootItems = [
    { title: GENERICS.shop, hasChilds: true, items: shopItems },
    ...STATIC_MOBILE_MENU_ITEMS,
  ];

  const [currentMenuItems, setCurrentMenuItems] = useState(rootItems);
  const [currentParent, setCurrentParent] = useState("");

  const handleNavigateTo = (parentTitle = "", closeSheet = false) => {
    if (closeSheet) {
      setShowModal(false);
      setCurrentParent("");
      setCurrentMenuItems(rootItems);
      return;
    }
    const updatedItems = getCurrentItems(rootItems, parentTitle);
    setCurrentParent(parentTitle);
    // @ts-expect-error - TypeScript may not recognize the structure of updatedItemss
    setCurrentMenuItems(updatedItems);
  };

  if (!showModal) return null;

  return (
    <Sheet>
      <SheetTrigger onClick={() => setShowModal(true)} className="md:hidden">
        <MenuIcon
          className={`${
            isHomePage || (isProductPage && !isScrollingStart)
              ? "fill-white stroke-white"
              : "stroke-black"
          }`}
        />
      </SheetTrigger>
      <SheetContent className="" side={side}>
        <SheetHeader
          className={`relative mt-1 flex items-center justify-center ${currentParent ? "pb-3" : "pb-7"}`}
        >
          <SheetTitle>
            <CompanyLogo className="fill-black" isAbsolute={false} />
          </SheetTitle>
          <SheetClose className="absolute right-5 cursor-pointer">
            <XIcon
              className="h-auto w-6 cursor-pointer stroke-1"
              onClick={() => {
                setCurrentParent("");
                setCurrentMenuItems(rootItems);
              }}
            />
          </SheetClose>
        </SheetHeader>

        <div className="invisible-scrollbar overflow-y-scroll">
          {currentParent && (
            <div className="mb-4 ml-1 flex items-center gap-2 px-3 text-sm font-medium text-[#999999] uppercase">
              <ArrowLeft onClick={() => handleNavigateTo()} className="h-auto w-5 cursor-pointer" />
              <p>Back</p>
            </div>
          )}
          <div className="flex flex-col space-y-2">
            <MobileMenuList
              items={currentMenuItems}
              parent={currentParent}
              onNavigate={handleNavigateTo}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default NavToggle;
