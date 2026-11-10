import { Reveal, Stamp, Underline } from "@/components/motion/Redline"
import { BookCallButton, SecondaryButton } from "@/components/layout/Sheet"

/** Closing call to action, used at the foot of every page */
export default function CTABanner({
  title,
  body = "Start with the AI Opportunity Audit: we map your operations, rank what to fix by payback and hand you a written plan within 48 hours. It costs $499 and the full fee is credited toward any project.",
}: {
  title?: React.ReactNode
  body?: string
}) {
  return (
    <section className="grid-paper relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="relative max-w-4xl">
          <Reveal>
            <p className="label mb-6 text-redline-deep">Next step</p>
            <h2 className="headline text-[clamp(2.6rem,7vw,5.6rem)]">
              {title ?? (
                <>
                  Send us the problem. We&apos;ll send back <Underline>a plan.</Underline>
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-9 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">{body}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <BookCallButton />
              <SecondaryButton href="/contact?intent=call&service=ai-audit">Start with the $499 audit</SecondaryButton>
            </div>
            <p className="label mt-4 text-ink-faint">No obligation · The plan is yours to keep</p>
          </Reveal>
          <Stamp className="absolute -top-6 right-0 hidden md:inline-block" rotate={7} delay={0.6}>
            Fixed price
            <br />
            in writing
          </Stamp>
        </div>
      </div>
    </section>
  )
}
