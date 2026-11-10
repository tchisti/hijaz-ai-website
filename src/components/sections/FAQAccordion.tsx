import { Plus } from "lucide-react"
import { FAQ_ITEMS, type FaqItem } from "@/lib/constants"
import { FAQJsonLd } from "@/components/seo/JsonLd"
import { Reveal } from "@/components/motion/Redline"
import { SheetHeader } from "@/components/layout/Sheet"

/**
 * FAQ built on native <details>, so every answer is in the HTML that search
 * engines and AI crawlers read, and the section works without JavaScript.
 */
export default function FAQAccordion({
  items = FAQ_ITEMS,
  number = "07",
  title = "Straight answers.",
}: {
  items?: FaqItem[]
  number?: string
  title?: string
}) {
  return (
    <section className="border-b border-ink/15">
      <FAQJsonLd items={items} />
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SheetHeader number={number} title="Questions" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <h2 className="headline text-[clamp(2.2rem,5.6vw,4.4rem)]">{title}</h2>
          </Reveal>
          <div className="border-t border-ink">
            {items.map((faq) => (
              <details key={faq.question} className="group border-b border-ink/25">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-bold leading-snug transition-colors hover:text-redline-deep sm:text-xl [&::-webkit-details-marker]:hidden">
                  <h3 className="text-inherit [font-stretch:105%]">{faq.question}</h3>
                  <Plus
                    aria-hidden="true"
                    size={22}
                    className="mt-0.5 shrink-0 text-redline transition-transform duration-300 group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-2xl pb-6 text-[1.05rem] leading-relaxed text-ink-soft">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
