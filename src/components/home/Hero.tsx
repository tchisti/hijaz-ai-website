import HeroSheet from "@/components/home/HeroSheet"
import { Reveal, Underline } from "@/components/motion/Redline"
import { BookCallButton, SecondaryButton } from "@/components/layout/Sheet"
import { FEATURED_PROJECTS, PROJECTS, SECTORS } from "@/lib/projects"

const OPERATED = PROJECTS.filter((p) => p.operatedByUs && p.category === "store").length

const PROOF = [
  { value: String(PROJECTS.length), label: "builds in production" },
  { value: String(SECTORS.length), label: "industries shipped" },
  { value: String(OPERATED), label: "stores we run ourselves" },
]

export default function Hero() {
  return (
    <section className="grid-paper relative overflow-hidden border-b border-ink/15">
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:pb-24 lg:pt-14">
        <Reveal>
          <p className="label mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink-soft">
            <span className="bg-ink px-2 py-1 text-paper">Business technology partner</span>
            <span>Toronto · Durham Region · Canada</span>
          </p>
        </Reveal>

        {/* Poster headline, full width */}
        <Reveal delay={0.08}>
          <h1 className="headline text-[clamp(2.1rem,9.6vw,7.4rem)] text-ink">
            Technology that <br className="hidden sm:block" />
            <Underline delay={0.9}>earns its keep.</Underline>
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-14 lg:mt-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <Reveal delay={0.18}>
              <p className="max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                We build the websites, online stores, AI assistants and software that businesses run on. Then we prove
                it the hard way:{" "}
                <strong className="font-semibold text-ink">we run our own companies on the same stack.</strong>
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-9 flex flex-wrap gap-3">
                <BookCallButton />
                <SecondaryButton href="#work">See the work</SecondaryButton>
              </div>
              <p className="label mt-4 text-ink-faint">Free · 15 minutes · A fixed price before any work starts</p>
            </Reveal>

            <Reveal delay={0.38}>
              <dl className="mt-12 grid max-w-xl grid-cols-3 border-y border-ink/25">
                {PROOF.map((item, i) => (
                  <div key={item.label} className={`py-4 ${i > 0 ? "border-l border-ink/25 pl-4" : ""}`}>
                    <dd className="font-display text-4xl font-extrabold tabular-nums tracking-tight text-ink [font-stretch:118%] sm:text-5xl">
                      {item.value}
                    </dd>
                    <dt className="label mt-1 text-ink-soft">{item.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.3} y={28}>
            <HeroSheet projects={FEATURED_PROJECTS} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
