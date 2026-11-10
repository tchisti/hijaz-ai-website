import { Dimension, Reveal } from "@/components/motion/Redline"
import { SheetHeader } from "@/components/layout/Sheet"

const STEPS = [
  {
    name: "Audit",
    measure: "60–90 min",
    body: "We sit down with you and map how work and money move through the business today. No slides, no sales deck.",
  },
  {
    name: "Plan",
    measure: "Within 48 hours",
    body: "You get a written plan with the opportunities ranked by payback, and a fixed price for the first one.",
  },
  {
    name: "Build",
    measure: "3–7 days for a site",
    body: "We build it, connect it to the tools you already use and test it with real orders, bookings or enquiries.",
  },
  {
    name: "Operate",
    measure: "30 days included",
    body: "We launch, stay on for the first month, then keep it monitored, updated and improving on a care plan.",
  },
]

export default function Process() {
  return (
    <section className="grid-paper border-b border-ink/15">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SheetHeader number="05" title="How it works" />

        <Reveal>
          <h2 className="headline mt-10 max-w-4xl text-[clamp(2.2rem,5.6vw,4.4rem)]">
            A fixed price before we start. A working system when we finish.
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.name}>
              <Dimension label={step.measure} delay={0.15 * i} />
              <Reveal delay={0.15 * i + 0.2}>
                <div className="mt-6 border border-ink/25 bg-paper-bright p-6">
                  <p className="label text-redline-deep">Step 0{i + 1}</p>
                  <h3 className="mt-2 text-3xl font-extrabold">{step.name}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
