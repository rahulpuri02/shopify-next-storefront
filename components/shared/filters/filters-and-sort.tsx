"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useState } from "react";

function FiltersAndSort() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Sheet open={showModal} onOpenChange={setShowModal}>
      <SheetTrigger asChild>
        <div className="flex gap-1.5">
          FILTER & SORT <Plus className="h-auto w-3" />
        </div>
      </SheetTrigger>
      <SheetContent className="pt-6">
        <SheetTitle className="flex justify-between border-b px-4 pb-6 text-xs font-normal uppercase">
          <div>FILTER & SORT</div>
          <button onClick={() => setShowModal(false)} className="uppercase underline">
            close
          </button>
        </SheetTitle>
        <div className="border-b px-4 pt-1 pb-7 text-xs font-normal">
          <RadioGroup defaultValue="RELEVANCE">
            {["RELEVANCE", "PRICE (LOW - HIGH)", "PRICE (HIGH - LOW)"].map((g) => (
              <div key={g} className="flex items-center space-x-2">
                <RadioGroupItem
                  className="h-[10px] w-auto border border-black data-[state=checked]:border-black data-[state=checked]:bg-black"
                  value={g}
                  id={g}
                />
                <Label className="text-xs font-normal uppercase" htmlFor={g}>
                  {g}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="sticky right-0 bottom-0 left-0 mt-auto border-t bg-white p-2 shadow-sm">
          <Button className="w-full px-4 text-xs font-normal">APPLY FILTERS</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default FiltersAndSort;
