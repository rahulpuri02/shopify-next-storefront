import { GENERICS } from "@/constants/shared";
import type { Menu } from "@/types/shared";
import MobileMenuItem from "./mobile-menu-item";

type ComponentProps = {
  items: {
    title: string;
    hasChilds: boolean;
    items?: Menu[];
    path?: string;
  }[];
  parent: string;
  onNavigate: (title: string, closeSheet?: boolean) => void;
};

const MobileMenuList = ({ items, parent, onNavigate }: ComponentProps) => {
  const filterItems = (includes: boolean) => {
    const filterTitles = [GENERICS.essentials, GENERICS.newArrivals].map((s) => s.toLowerCase());
    return items.filter((i) =>
      includes
        ? filterTitles.includes(i.title.toLowerCase())
        : !filterTitles.includes(i.title.toLowerCase())
    );
  };

  const menuToRender =
    parent === GENERICS.shop ? [...filterItems(true), ...filterItems(false)] : items;

  return (
    <ul className="invisible-scrollbar flex flex-col space-y-2 pb-4 pl-6">
      {menuToRender.map((item) => (
        <MobileMenuItem key={item.title} item={item} onNavigate={onNavigate} />
      ))}
    </ul>
  );
};

export default MobileMenuList;
