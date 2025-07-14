"use client";

import CompanyLogo from "@/components/icons/company-logo";
import MenuIcon from "@/components/icons/menu-icon";
import { GENERICS, STATIC_MOBILE_MENU_ITEMS } from "@/constants/shared";
import { SHOPIFY_URL_PREFIXS } from "@/constants/shopify";
import { Menu } from "@/types/shared";
import { ArrowLeft, ArrowRight, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

type ComponentProps = {
  side?: "right" | "left";
  mainMenu: Menu[];
};

function NavToggle({ side = "left", mainMenu }: ComponentProps) {
  const shopItems =
    mainMenu
      .find((m) => m.title.toLowerCase() === GENERICS.shop.toLowerCase())
      ?.items?.filter((i) => i.title.toLowerCase() !== GENERICS.seeAll.toLowerCase()) || [];

  const rootItems = [
    { title: GENERICS.shop, hasChilds: true, items: shopItems },
    ...STATIC_MOBILE_MENU_ITEMS,
  ];
  const [currentMenuItems, setCurrentMenuItems] = useState(rootItems);
  const [currentParent, setSelectedParent] = useState("");

  function getCurrentItems(parentId = "") {
    if (!parentId) {
      setCurrentMenuItems(rootItems);
      setSelectedParent(parentId);
      return;
    }
    const parent = rootItems.find((i) => i.title === parentId);
    if (parent) {
      if (parent.hasChilds && parent.items?.length) {
        const items =
          parent.items?.map((m) => ({
            title: m.title,
            hasChilds: Boolean(m.items?.length),
            items: m.items,
            path: m.path,
          })) || [];
        setCurrentMenuItems(items);
        setSelectedParent(parentId);
      }
    }
  }

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  function renderMenuItems({
    items = [],
    filtered,
    includes,
  }: {
    items: { title: string; hasChilds: boolean; items?: Menu[]; path?: string }[];
    includes: boolean;
    filtered: string[];
  }) {
    const filteredItems =
      currentParent === GENERICS.shop
        ? items.filter((i) =>
            includes
              ? filtered.includes(i.title.toLowerCase())
              : !filtered.includes(i.title.toLowerCase())
          )
        : items;
    return (
      <ul className="invisible-scrollbar flex flex-col space-y-2 pb-4 pl-6">
        {filteredItems.map((m) => (
          <li key={m.title} className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium">
            {!m.items?.length && m.path ? (
              <Link href={`${SHOPIFY_URL_PREFIXS.collections}${m.path}`}>
                <p>{m.title.toUpperCase()}</p>
                {m.hasChilds && (
                  <ArrowRight
                    className="h-auto w-5 cursor-pointer"
                    onClick={() => getCurrentItems(m.title)}
                  />
                )}
              </Link>
            ) : (
              <>
                <p>{m.title.toUpperCase()}</p>
                {m.hasChilds && (
                  <ArrowRight
                    className="h-auto w-5 cursor-pointer"
                    onClick={() => getCurrentItems(m.title)}
                  />
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className={`${isHomePage ? "bg-white" : "bg-black"}`} />
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
              onClick={() => {
                setSelectedParent("");
                setCurrentMenuItems(rootItems);
              }}
            />
          </SheetClose>
        </SheetHeader>
        <div className="invisible-scrollbar overflow-y-scroll">
          {currentParent && (
            <div className="mb-4 ml-1 flex items-center gap-2 px-3 text-sm font-medium text-[#999999] uppercase">
              <ArrowLeft onClick={() => getCurrentItems()} className="h-auto w-5 cursor-pointer" />
              <p>Back</p>
            </div>
          )}
          <div className="flex flex-col space-y-2">
            {currentParent === GENERICS.shop ? (
              <>
                {renderMenuItems({
                  items: currentMenuItems,
                  filtered: [GENERICS.essentials, GENERICS.newArrivals],
                  includes: true,
                })}
                {renderMenuItems({
                  items: currentMenuItems,
                  filtered: [GENERICS.essentials, GENERICS.newArrivals],
                  includes: false,
                })}
              </>
            ) : (
              renderMenuItems({
                items: currentMenuItems,
                filtered: [],
                includes: true,
              })
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default NavToggle;
