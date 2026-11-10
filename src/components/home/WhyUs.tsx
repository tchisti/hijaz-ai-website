import { Circled, Reveal } from "@/components/motion/Redline"
import { SheetHeader } from "@/components/layout/Sheet"

const COMMITMENTS = [
  {
    title: "A fixed price, in writing",
    body: "You approve a number before work starts and that is the number you pay. No hourly billing and no surprise invoices.",
  },
  {
    title: "Scoped to a result",
    body: "Every build is defined by what it should produce: an enquiry, a booking, an order or an hour saved. If it cannot be measured, we say so before you pay for it.",
  },
  {
    title: "One accountable team",
    body: "The website, the store, the AI and the automation come from the same people, so nothing falls between suppliers.",
  },
  {
    title: "We stay after launch",
    body: "Thirty days of support are included with every build. After that, a care plan keeps it monitored, updated and improving.",
  },
]

export default function WhyUs() {
  return (
    <section className="border-b border-ink/15">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SheetHeader number="05" title="Why businesses choose us" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="headline text-[clamp(2.2rem,5.6vw,4.4rem)]">
                Built around <Circled>your numbers,</Circled> not our hours.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft">
                Technology is a cost until it brings something in. These are the four things we commit to on every
                project, so you know what you are buying before you buy it.
              </p>
            </Reveal>
          </div>

          <ol className="grid border-l border-t border-ink/25 sm:grid-cols-2">
            {COMMITMENTS.map((c, i) => (
              <li key={c.title} className="border-b border-r border-ink/25 bg-paper-bright p-6 sm:p-7">
                <Reveal delay={0.06 * i}>
                  <p className="label text-redline-deep">0{i + 1}</p>
                  <h3 className="mt-2 text-2xl font-extrabold leading-tight">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{c.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
