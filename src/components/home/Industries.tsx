import IndustryCard from "@/components/industries/IndustryCard"
import { Reveal } from "@/components/motion/Redline"
import { SecondaryButton, SheetHeader } from "@/components/layout/Sheet"
import { INDUSTRIES } from "@/lib/industries"

export default function Industries() {
  return (
    <section id="industries" className="scroll-mt-16 border-b border-ink/15 bg-paper-deep">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SheetHeader number="04" title="Industries we help" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <h2 className="headline text-[clamp(2.2rem,5.6vw,4.4rem)]">Built for the way your industry works.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft lg:justify-self-end">
              A clinic loses money to no-shows, a contractor to missed calls, a manufacturer to untracked quotes. Pick
              your industry to see what we would build first and what it costs.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 border-l border-t border-ink/25 bg-paper lg:grid-cols-4">
          {INDUSTRIES.map((industry, i) => (
            <li key={industry.slug} className="border-b border-r border-ink/25">
              <IndustryCard industry={industry} index={i} />
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-xl text-ink-soft">
            Not listed? Most of what we build applies to any business that takes enquiries, bookings or orders.
          </p>
          <SecondaryButton href="#enquire">Tell us about your business</SecondaryButton>
        </div>
      </div>
    </section>
  )
}
