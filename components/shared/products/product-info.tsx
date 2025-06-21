import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PRODUCT_INFO } from "@/constants/shared";

export default function ProductInfo() {
  return (
    <section className="w-auto">
      <Accordion type="single" collapsible className="flex flex-col gap-1">
        {PRODUCT_INFO.sections.map((sectionKey, i) => {
          const title = PRODUCT_INFO.titles[sectionKey];
          const content = PRODUCT_INFO.content[sectionKey];

          return (
            <AccordionItem key={sectionKey} value={sectionKey} className="border-none">
              <AccordionTrigger className="flex items-center justify-between text-sm uppercase hover:no-underline">
                {title}
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2 text-sm">
                {"description" in content && <p>{content.description}</p>}

                {"list" in content && (
                  <ul className="list-inside list-disc space-y-1">
                    {content.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {"extra" in content && <p>{content.extra}</p>}
                <div className="py-2" />
                {i < PRODUCT_INFO.sections.length - 1 && <hr />}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
