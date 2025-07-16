"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ADD_TO_CART } from "@/constants/shared";
import useClickOutside from "@/hooks/useClickOutSide";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { useRef, useState } from "react";

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function SizeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <div className="absolute bottom-8 w-full" ref={ref}>
      <Card
        className={cn(
          "w-full",
          isOpen ? "gap-0 border-none py-0" : "m-0 gap-0 border-none p-0 py-0"
        )}
      >
        <div className="overflow-hidden transition-all duration-300">
          {isOpen && (
            <CardContent className="animate-in fade-in rounded-md rounded-b-none border border-none border-zinc-950/10 bg-white p-2 pb-6 shadow-xl transition-all">
              <div className="px-2 pt-4 text-sm">
                <div className="flex flex-col space-y-4">
                  <p className="text-sm tracking-wide">SIZE</p>
                  <ul className="grid grid-cols-4 gap-4 pr-2 md:grid-cols-5 md:pr-4">
                    {sizes.map((s) => (
                      <li
                        key={s}
                        className="cursor-pointer border py-2 text-center transition-all ease-in-out hover:border-black"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex items-start gap-1.5 pb-1 text-sm md:pb-2">
                    <InfoIcon className="mt-[2px] h-4 w-4 shrink-0 stroke-1" />
                    <p className="">
                      Note that you can choose a size that is out of stock and get notified when it
                      gets back in stock.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </div>
        <Button
          size="lg"
          className={cn(
            "mt-0 w-full cursor-pointer font-normal tracking-wider uppercase",
            isOpen ? "rounded-t-none" : ""
          )}
          onClick={() => setIsOpen(true)}
        >
          {ADD_TO_CART}
        </Button>
      </Card>
    </div>
  );
}
