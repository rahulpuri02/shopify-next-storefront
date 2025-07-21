"use client";

import CompanyLogo from "@/components/icons/company-logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { X } from "lucide-react";
import { useState } from "react";
import { VanishSearch } from "./vanish-search";

const suggestions = ["Theo chinos", "Adam tee", "Jeans", "Linen shirts", "Chinos"];

type ComponentProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SearchPanel({ open, onOpenChange }: ComponentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger className="text-sm font-medium">Search</SheetTrigger>
      <SheetContent side="top" className="h-[100vh] px-6 pt-6 md:h-[220px]">
        <SheetTitle>
          <div className="flex items-center justify-between">
            <X
              className="h-auto w-6 cursor-pointer stroke-[1.5px]"
              onClick={() => onOpenChange(false)}
            />
            <CompanyLogo className="fill-black" />
            <div className="h-5 w-5" />
          </div>
        </SheetTitle>

        <div className="mt-6 flex items-center justify-between">
          <VanishSearch
            value={searchQuery}
            setValue={setSearchQuery}
            onSubmit={handleSearch}
            haveBorder={false}
          />
        </div>

        <hr className="hidden md:block" />

        <div className="items mt-3 hidden items-center justify-center gap-4 md:flex">
          <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
            Suggestions:
          </div>
          <ul className="flex items-center gap-4">
            {suggestions.map((item, i) => (
              <li key={i} className="cursor-pointer hover:underline">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-[10px] font-semibold tracking-wide text-gray-500 uppercase md:hidden md:text-sm">
          Suggestions:
        </div>

        <ul className="mt-2 space-y-2 text-[17px] font-light md:hidden">
          {suggestions.map((item, i) => (
            <li key={i} className="cursor-pointer hover:underline">
              {item}
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
