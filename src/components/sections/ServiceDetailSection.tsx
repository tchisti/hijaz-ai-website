import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import type { Service } from "@/lib/constants"
import { Reveal } from "@/components/motion/Redline"

interface Props {
  service: Service
  index: number
}

/** One service, laid out as a specification: description and scope left, a price block right */
export default function ServiceDetailSection({ service, index }: Props) {
  return (
    <section id={service.slug} className="relative scroll-mt-20 border-b border-ink/25 py-14">
      {/* Legacy anchors (e.g. #digital-marketing) keep resolving here */}
      {service.aliasAnchors?.map((anchor) => (
        <span key={anchor} id={anchor} className="absolute top-0" aria-hidden />
      ))}
      <Reveal className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="label flex items-center gap-3 text-redline-deep">
            {String(index + 1).padStart(2, "0")}
            {service.badge && <span className="bg-redline px-2 py-0.5 text-white">{service.badge}</span>}
          </p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">{service.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{service.fullDesc}</p>

          <ul className="mt-7 border-t border-ink/25">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex gap-3 border-b border-ink/15 py-3">
                <Check aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-redline" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="self-start border border-ink bg-paper-bright">
          <div className="border-b border-ink/25 p-5">
            <p className="label text-ink-faint">Price</p>
            <p className="mt-1.5 text-xl font-bold leading-snug">{service.pricingTeaser}</p>
            <p className="mt-1 text-sm text-ink-soft">Fixed quote before work starts. Free 15-minute call included.</p>
          </div>
          <div className="border-b border-ink/25 p-5">
            <p className="label text-ink-faint">Best for</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {service.useCases.map((useCase) => (
                <li key={useCase} className="label border border-ink/30 px-2 py-1 text-ink">
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
          <Link
            href={`/contact?intent=call&service=${service.id}`}
            className="group flex items-center justify-between bg-ink px-5 py-4 font-semibold text-paper transition-colors hover:bg-redline"
          >
            Get a fixed quote
            <ArrowUpRight
              aria-hidden="true"
              size={18}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </aside>
      </Reveal>
    </section>
  )
}
