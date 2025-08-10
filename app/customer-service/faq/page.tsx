import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_PAGE } from "@/constants/shared";

export default function FAQPage() {
  return (
    <div className="max-w-2xl pb-10 md:ml-6 md:px-4">
      <h1 className="mb-6 font-serif text-2xl">{FAQ_PAGE.title}</h1>

      <Accordion type="single" collapsible className="w-full">
        {FAQ_PAGE.items.map((faq) => (
          <AccordionItem
            key={faq.value}
            className={faq.value === "order-status" ? "" : "border-0"}
            value={faq.value}
          >
            <AccordionTrigger
              className={`py-4 text-left font-semibold ${
                faq.value === "ordering" || faq.value === "taxes" ? "border-b-0" : ""
              }`}
            >
              {faq.trigger}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm text-gray-600">
              {Array.isArray(faq.content) ? (
                faq.content.map((item, i) => (
                  <div key={i}>
                    {item.question && <p className="mb-2 font-medium">{item.question}</p>}
                    <p>{item.answer}</p>
                  </div>
                ))
              ) : (
                <p>{faq.content as React.ReactNode}</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
