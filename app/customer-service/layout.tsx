"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const navItems = [
  { label: "FAQ", href: "/customer-service/faq" },
  { label: "Help", href: "/customer-service/help" },
  { label: "Returns", href: "/customer-service/returns" },
  { label: "Contact", href: "/customer-service/contact" },
  { label: "Terms & Conditions", href: "/customer-service/terms-and-conditions" },
  { label: "Privacy Policy", href: "/customer-service/privacy-policy" },
  { label: "Accessibility", href: "/customer-service/accessibility" },
];

export default function CustomerServiceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768 && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [pathname]);

  return (
    <div className="mt-16 px-6 py-10">
      <div className="mb-8 block md:hidden">
        <ScrollArea className="invisible-scrollbar w-full overflow-x-auto whitespace-nowrap">
          <div className="flex gap-6">
            <Link href={"/customer-service"}>
              <h2
                className={cn(
                  "shrink-0 pb-1 text-sm font-semibold transition-colors",
                  pathname === "/customer-service" ? "text-black" : "text-gray-500 hover:text-black"
                )}
              >
                Customer Service
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
                    "shrink-0 pb-1 text-sm font-semibold transition-colors",
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

      {/* Desktop Sidebar Layout */}
      <div className="flex gap-12">
        <aside className="sticky top-24 hidden w-60 self-start md:block">
          <Link href={"/customer-service"}>
            <h2
              className={cn(
                "mb-4 text-lg font-medium",
                pathname === "/customer-service" ? "text-black" : "text-gray-500"
              )}
            >
              Customer Service
            </h2>
          </Link>
          <ul className="space-y-3">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "text-sm font-semibold",
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
        <section className="ml-4 max-w-2xl flex-1 md:ml-6">{children}</section>
      </div>
    </div>
  );
}
