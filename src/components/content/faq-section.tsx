import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/schema";

/** FAQ accordion with FAQPage schema. Set withSchema={false} if the page emits it elsewhere. */
export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  withSchema = true,
  id = "faqs",
}: {
  faqs: { q: string; a: string }[];
  title?: string;
  withSchema?: boolean;
  id?: string;
}) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby={`${id}-heading`} className="my-12">
      {withSchema && <JsonLd data={faqSchema(faqs)} />}
      <h2 id={`${id}-heading`} className="scroll-mt-24 font-serif text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <Accordion type="multiple" className="mt-4 rounded-xl border bg-card px-5">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
