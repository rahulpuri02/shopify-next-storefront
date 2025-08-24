"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CUSTOMER_SERVICE } from "@/constants/shared";
import { ROUTES } from "@/constants/routes";

type ComponentProps = {
  children: React.ReactNode;
  navItems: { label: string; href: string }[];
};

export default function CustomerServiceLayoutClient({ children, navItems }: ComponentProps) {
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
            <Link href={ROUTES.customerService}>
              <h2
                className={cn(
                  "shrink-0 pb-1 text-lg font-semibold transition-colors",
                  pathname === "/customer-service" ? "text-black" : "text-gray-500 hover:text-black"
                )}
              >
                {CUSTOMER_SERVICE.title}
              </h2>
            </Link>
            {navItems.map(({ label, href }) => {
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
          <Link href={ROUTES.customerService}>
            <h2
              className={cn(
                "mb-4 text-lg font-medium",
                pathname === ROUTES.customerService ? "text-black" : "text-gray-500"
              )}
            >
              {CUSTOMER_SERVICE.title}
            </h2>
          </Link>
          <ul className="space-y-3">
            {navItems.map(({ label, href }) => (
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
