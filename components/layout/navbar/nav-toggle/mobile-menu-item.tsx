import { ROUTES } from "@/constants/routes";
import type { Menu } from "@/types/shared";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type ComponentProps = {
  item: {
    title: string;
    hasChilds: boolean;
    items?: Menu[];
    path?: string;
  };
  onNavigate: (title: string, closeSheet?: boolean) => void;
};

const MobileMenuItem = ({ item, onNavigate }: ComponentProps) => {
  const { title, hasChilds, path, items } = item;

  const handleClick = () => {
    if (hasChilds && items?.length) {
      onNavigate(title);
    }
  };

  return (
    <li className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium">
      {!items?.length && path ? (
        <Link
          onClick={() => onNavigate("", true)}
          href={
            path === ROUTES.about || path === ROUTES.account
              ? path
              : `${ROUTES.collection(item.path as string)}`
          }
        >
          <p>{title.toUpperCase()}</p>
        </Link>
      ) : (
        <p>{title.toUpperCase()}</p>
      )}
      {hasChilds && items && items?.length > 0 && (
        <ArrowRight className="h-auto w-5 cursor-pointer" onClick={handleClick} />
      )}
    </li>
  );
};

export default MobileMenuItem;
