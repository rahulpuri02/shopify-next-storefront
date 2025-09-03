"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FILTERS, SORTING } from "@/constants/shared";
import { Plus } from "lucide-react";
import { useState } from "react";

function FiltersAndSort() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Sheet open={showModal} onOpenChange={setShowModal}>
      <SheetTrigger asChild>
        <div className="flex cursor-pointer gap-1.5">
          FILTER & SORT <Plus className="h-auto w-3" />
        </div>
      </SheetTrigger>
      <SheetContent className="flex h-screen w-[85%] max-w-md flex-col gap-0 rounded-none p-0 pt-6">
        <SheetTitle className="flex justify-between px-4 pb-6 text-xs font-normal uppercase">
          <div>FILTER & SORT</div>
          <button
            onClick={() => setShowModal(false)}
            className="border-none uppercase underline outline-none focus:border-none focus:outline-0"
          >
            close
          </button>
        </SheetTitle>

        {/* Sorting */}
        <div className="mt-4 px-4 pt-1 pb-7 text-xs font-normal">
          <RadioGroup>
            {SORTING.map((s) => (
              <div key={s.slug} className="flex items-center space-x-2">
                <RadioGroupItem
                  className="h-[10px] w-auto border border-black data-[state=checked]:border-black data-[state=checked]:bg-black"
                  value={s.slug}
                  id={s.slug}
                />
                <Label className="text-xs font-normal uppercase" htmlFor={s.slug}>
                  {s.title}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Category Filters */}
        <section className="mt-2 px-4 pt-2 text-sm">
          <div className="mb-4 flex items-center justify-between text-xs font-normal uppercase">
            CATEGORY
          </div>
          <ScrollArea className="invisible-scrollbar h-[calc(100vh-300px)] overflow-y-auto pr-2">
            <ul className="grid grid-cols-1 gap-4 pt-3 pb-4">
              {FILTERS[0].content.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Checkbox name={item} />
                  <Label htmlFor={item} className="text-xs font-normal uppercase">
                    {item}
                  </Label>
                </div>
              ))}
            </ul>
          </ScrollArea>
        </section>

        {/* Footer */}
        <div className="sticky right-0 bottom-0 left-0 mt-auto border-t bg-white px-3 py-2 shadow-sm md:px-2">
          <Button disabled className="w-full px-4 text-xs font-normal">
            COMING SOON
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default FiltersAndSort;
