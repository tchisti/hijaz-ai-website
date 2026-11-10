import Image from "next/image"
import Link from "next/link"
import { Circled, Reveal } from "@/components/motion/Redline"
import { SheetHeader } from "@/components/layout/Sheet"
import { PROJECTS } from "@/lib/projects"

const VENTURES = PROJECTS.filter((p) => p.operatedByUs && p.category === "store")

const LESSONS = [
  {
    title: "Checkout and payments",
    body: "We reconcile our own payouts. We know which checkout steps lose the sale.",
  },
  {
    title: "Shipping across Canada",
    body: "Our stores ship to every province and into the United States, with the rate rules that implies.",
  },
  {
    title: "Being found",
    body: "Our own product pages have to rank and be cited by AI assistants, or we do not sell.",
  },
  {
    title: "Trust on a first visit",
    body: "We sell products that are often counterfeited, so proof is built into the page, not added later.",
  },
]

export default function Operators() {
  return (
    <section className="border-b border-ink/15 bg-paper-deep">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SheetHeader number="04" title="Why us" />

        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <Reveal>
              <h2 className="headline text-[clamp(2.2rem,5.6vw,4.4rem)]">
                We are our own <Circled>first client.</Circled>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink-soft">
                Most agencies have never had to make payroll from the website they built. We operate our own online
                businesses, so every recommendation we make to you has already been tested where a mistake costs us
                money.
              </p>
            </Reveal>

            <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {LESSONS.map((l, i) => (
                <Reveal key={l.title} delay={0.06 * i}>
                  <dt className="flex items-baseline gap-3 text-lg font-bold">
                    <span className="label text-redline-deep">0{i + 1}</span>
                    {l.title}
                  </dt>
                  <dd className="mt-1.5 pl-8 leading-snug text-ink-soft">{l.body}</dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <div>
            <p className="label mb-4 text-ink-soft">Businesses we run on our own builds</p>
            <ul className="border-t border-ink">
              {VENTURES.map((v, i) => (
                <li key={v.slug} className="border-b border-ink/25">
                  <Reveal
                    delay={0.08 * i}
                    className="group relative grid grid-cols-[7.5rem_1fr] items-center gap-5 py-5 sm:grid-cols-[11rem_1fr]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden border border-ink/30 bg-paper">
                      <Image
                        src={v.image}
                        alt={`${v.name} storefront`}
                        fill
                        sizes="176px"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold leading-tight sm:text-2xl">
                        <Link href={`/work/${v.slug}`} className="after:absolute after:inset-0 hover:text-redline-deep">
                          {v.name}
                        </Link>
                      </h3>
                      <p className="mt-1 leading-snug text-ink-soft">{v.descriptor}</p>
                      <p className="label mt-2 text-redline-deep">{v.domain}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
