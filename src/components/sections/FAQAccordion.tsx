import { FAQ_ITEMS } from "@/lib/constants"
import { FAQJsonLd } from "@/components/seo/JsonLd"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQAccordion() {
  return (
    <section className="py-24 bg-white">
      <FAQJsonLd items={FAQ_ITEMS} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold font-medium text-sm uppercase tracking-widest">FAQ</span>
          <h2 className="font-display text-4xl font-bold text-midnight mt-2">Common Questions</h2>
          <p className="mt-4 text-muted-foreground">Everything you need to know before getting started.</p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {FAQ_ITEMS.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-5">
              <AccordionTrigger className="font-medium text-midnight hover:text-gold hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
