import { CalendarClock, Mail, MessageCircle, Phone } from "lucide-react"
import LeadForm from "@/components/sections/LeadForm"
import { Reveal, Underline } from "@/components/motion/Redline"
import { SITE_CONFIG } from "@/lib/constants"

const STEPS = [
  { title: "You send a few lines", body: "Tell us what is costing you time or customers." },
  { title: "We reply within 2 business hours", body: "With questions, or a time for a 15-minute call." },
  { title: "You get a fixed price", body: "A written plan and a number, before any work starts." },
]

/**
 * The enquiry block: what happens next on the left, the short form on the right,
 * and every other way to reach us underneath. Used on the homepage and industry pages.
 */
export default function EnquirySection({
  context,
  needs,
  title,
  body = "No sales deck and no obligation. You will get a plain answer on what we would build first and what it would cost.",
}: {
  context: string
  needs?: string[]
  title?: React.ReactNode
  body?: string
}) {
  const tel = SITE_CONFIG.phone.replace(/[^+\d]/g, "")
  const contacts = [
    { icon: CalendarClock, label: "Book a 15-minute call", href: SITE_CONFIG.bookingUrl, external: true },
    { icon: Phone, label: SITE_CONFIG.phone, href: `tel:${tel}` },
    { icon: MessageCircle, label: "WhatsApp", href: SITE_CONFIG.social.whatsapp, external: true },
    { icon: Mail, label: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  ]

  return (
    <section id="enquire" className="grid-paper scroll-mt-16">
      {/* On a phone the form follows the headline directly; the steps come after it */}
      <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:py-28">
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <p className="label mb-5 text-redline-deep">Start here</p>
          <h2 className="headline text-[clamp(2.3rem,5.6vw,4.4rem)]">
            {title ?? (
              <>
                Send us the problem. We&apos;ll send back <Underline>a plan.</Underline>
              </>
            )}
          </h2>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">{body}</p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <LeadForm context={context} needs={needs} className="shadow-[10px_10px_0_0_#11151B]" />
        </Reveal>

        <div className="lg:col-start-1 lg:row-start-2">
          <ol className="max-w-lg border-t border-ink/25">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5 border-b border-ink/25 py-4">
                <span className="label pt-1 text-redline-deep">0{i + 1}</span>
                <div>
                  <p className="font-bold">{step.title}</p>
                  <p className="text-ink-soft">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <ul className="mt-8 grid max-w-lg gap-x-6 gap-y-3 sm:grid-cols-2">
            {contacts.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-2.5 font-semibold text-ink hover:text-redline-deep"
                >
                  <c.icon aria-hidden="true" size={18} className="text-redline" />
                  <span className="underline decoration-ink/20 underline-offset-4 group-hover:decoration-redline">
                    {c.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
