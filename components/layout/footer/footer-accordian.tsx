"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generatePaths } from "@/lib/utils";
import { Menu } from "@/types/shared";
import Link from "next/link";

type ComponentProps = {
  footerMenu: Menu[];
};

function FooterAccordian({ footerMenu }: ComponentProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-1">
      {footerMenu.map((col) => (
        <AccordionItem className="w-full border-none" key={col.title} value={col.title}>
          <AccordionTrigger
            iconClassName="w-5 h-auto"
            className="flex w-full justify-start gap-2 border-none py-3 text-sm font-semibold text-white uppercase hover:no-underline"
          >
            <p>{col.title}</p>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="mt-2 space-y-1 text-sm">
              {col.items?.map((subItem) => (
                <li key={subItem.title} className="cursor-pointer">
                  <Link href={generatePaths(subItem.path, subItem.title)}>{subItem.title}</Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default FooterAccordian;
