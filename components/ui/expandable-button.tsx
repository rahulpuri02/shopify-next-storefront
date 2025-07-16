"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ADD_TO_CART } from "@/constants/shared";
import useClickOutside from "@/hooks/useClickOutSide";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export default function ToolbarExpandable() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <div className="absolute bottom-8 w-full" ref={ref}>
      <Card
        className={
          (cn("w-full"), isOpen ? "gap-0 border-none py-0" : "m-0 gap-0 border-none p-0 py-0")
        }
      >
        <div className="overflow-hidden transition-all duration-300">
          {isOpen ? (
            <CardContent className="animate-in fade-in rounded-md rounded-b-none border border-b-0 border-zinc-950/10 bg-white p-2 pb-6">
              <div className="px-2 pt-2 text-sm">
                {" "}
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col text-zinc-700">
                    <div className="space-y-1">
                      <div>Project_Proposal.pdf</div>
                      <div>Meeting_Notes.docx</div>
                      <div>Financial_Report.xls</div>
                    </div>
                  </div>
                  <Button variant="outline">Manage documents</Button>
                </div>
              </div>
            </CardContent>
          ) : null}
        </div>
        <Button
          size={"lg"}
          className={"mt-0 w-full cursor-pointer font-normal tracking-wider uppercase"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {ADD_TO_CART}
        </Button>
      </Card>
    </div>
  );
}
