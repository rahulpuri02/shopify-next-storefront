import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="max-w-2xl pb-10 md:ml-6 md:px-4">
      <h1 className="mb-6 font-serif text-2xl">FAQ</h1>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem className="border-0" value="ordering">
          <AccordionTrigger className="border-b-0 py-4 text-left font-semibold">
            ORDERING
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-sm text-gray-600">
            <p className="mb-2 font-medium">CAN I CHANGE AN ORDER I HAVE ALREADY PLACED?</p>
            <p>
              No, already placed orders cannot be changed. Please place a new order containing the
              right items and contact customer service to cancel the faulty order.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem className="border-0" value="taxes">
          <AccordionTrigger className="border-b-0 py-4 text-left font-semibold">
            TAXES AND DUTIES
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-sm text-gray-600">
            Duties and taxes may apply depending on your country. You’ll see any applicable charges
            at checkout.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="order-status">
          <AccordionTrigger className="py-4 text-left font-semibold">ORDER STATUS</AccordionTrigger>
          <AccordionContent className="pb-4 text-sm text-gray-600">
            You can check your order status by logging into your account or using the tracking link
            in your confirmation email.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
