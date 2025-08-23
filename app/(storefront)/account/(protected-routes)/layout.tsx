"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MY_ACCOUNT_NAV_ITEMS } from "@/constants/shared";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type ComponentProps = {
  children: React.ReactNode;
};

export default function MyAccountLayout({ children }: ComponentProps) {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768 && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [pathname]);

  return (
    <div className="mt-16 px-6 py-10 md:px-10 2xl:px-20">
      <div className="mb-8 block md:hidden">
        <ScrollArea className="invisible-scrollbar w-full overflow-x-auto whitespace-nowrap">
          <div className="flex gap-6">
            {MY_ACCOUNT_NAV_ITEMS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  ref={isActive ? activeRef : null}
                  className={cn(
                    "shrink-0 pb-1 text-lg font-semibold transition-colors",
                    isActive ? "text-black" : "text-gray-500 hover:text-black"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      <div className="flex gap-12">
        {/* Desktop Sidebar Layout */}
        <aside className="sticky top-24 hidden w-60 self-start md:block">
          <ul className="space-y-3">
            {MY_ACCOUNT_NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "text-base font-semibold",
                    pathname === href ? "text-black" : "text-gray-500"
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <section className="max-w-2xl flex-1 md:ml-6">{children}</section>
      </div>
    </div>
  );
}
