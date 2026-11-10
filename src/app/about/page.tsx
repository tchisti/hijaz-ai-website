import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd"
import { BookCallButton, PageHero, SecondaryButton } from "@/components/layout/Sheet"
import { Circled, Reveal } from "@/components/motion/Redline"
import EnquirySection from "@/components/sections/EnquirySection"
import { LOCATIONS, LOCATION_GROUPS } from "@/lib/locations"
import { INDUSTRIES } from "@/lib/industries"
import { PROJECTS } from "@/lib/projects"

export const metadata = buildMetadata({
  title: "About Hijaz.ai: Business Technology Partner",
  description:
    "Hijaz.ai builds websites, online stores, AI and custom software for businesses in Toronto, Durham Region and across Canada, at a fixed price.",
  canonical: "/about",
})

const PRINCIPLES = [
  {
    title: "It has to earn its keep",
    body: "A website, an automation or an AI assistant is a cost until it brings in an order, a booking or an hour of someone's day. We scope every build around the thing it is meant to produce.",
  },
  {
    title: "A fixed price, in writing",
    body: "You approve a number before work starts and that is the number you pay. Hourly billing rewards slow work, so we do not use it.",
  },
  {
    title: "Proof you can open",
    body: "Everything in our portfolio is live and linked. We would rather you click through a working store than read a paragraph about one.",
  },
  {
    title: "We stay after launch",
    body: "Launch is the start of the useful part. Every build includes 30 days of support, and care plans keep it monitored, updated and improving.",
  },
]

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />

      <PageHero
        label="About · Toronto & Durham Region, Ontario"
        title="One team for the technology your business runs on."
        intro="Hijaz.ai is a business technology partner. We design and build websites, online stores, AI assistants and custom software for small and mid-sized companies, and we stay on to run and improve them."
        breadcrumb={[{ name: "About" }]}
      >
        <div className="flex flex-wrap gap-3">
          <BookCallButton />
          <SecondaryButton href="/work">See the work</SecondaryButton>
        </div>
      </PageHero>

      {/* Story */}
      <section className="border-b border-ink/15">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:py-24">
          <Reveal>
            <h2 className="headline text-[clamp(2.1rem,5vw,4rem)]">
              A partner, <Circled>not a vendor.</Circled>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                Most businesses end up with one supplier for the website, another for the store, a freelancer for
                automation and nobody responsible for whether any of it works together. We take responsibility for the
                whole system.
              </p>
              <p>
                We build for retailers, local service companies, manufacturers and exporters, and technical firms in
                the energy sector. The work ranges from a five-page website to AI tools that answer questions from
                regulatory documents.
              </p>
              <p>
                <strong className="font-semibold text-ink">
                  The measure is the same every time: does it bring something in.
                </strong>{" "}
                An enquiry, a booking, an order or an hour of someone&apos;s day. If a piece of technology cannot be
                tied to one of those, we will tell you not to buy it.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-3 border-y border-ink/25">
              {[
                { value: PROJECTS.length, label: "builds in production" },
                { value: INDUSTRIES.length, label: "industries covered" },
                { value: LOCATIONS.length, label: "cities served" },
              ].map((item, i) => (
                <div key={item.label} className={`py-4 ${i > 0 ? "border-l border-ink/25 pl-4" : ""}`}>
                  <dd className="font-display text-4xl font-extrabold tabular-nums tracking-tight [font-stretch:118%] sm:text-5xl">
                    {item.value}
                  </dd>
                  <dt className="label mt-1 text-ink-soft">{item.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="surface-blueprint">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="label text-highlight">Who we build for</p>
          <h2 className="headline mt-3 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] text-white">
            {INDUSTRIES.length} industries, one way of working.
          </h2>
          <ul className="mt-10 grid grid-cols-2 border-l border-t border-chalk/30 md:grid-cols-3 lg:grid-cols-4">
            {INDUSTRIES.map((i) => (
              <li key={i.slug} className="border-b border-r border-chalk/30">
                <Link
                  href={`/industries/${i.slug}`}
                  className="group block h-full p-5 transition-colors hover:bg-chalk hover:text-blueprint-deep"
                >
                  <h3 className="text-lg font-extrabold leading-tight text-white group-hover:text-blueprint-deep">
                    {i.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-snug text-chalk/70 group-hover:text-blueprint-deep/80">
                    {i.tagline}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b border-ink/15">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="label text-redline-deep">How we work</p>
          <h2 className="headline mt-3 text-[clamp(2rem,4.6vw,3.6rem)]">Four rules we hold ourselves to.</h2>
          <ol className="mt-10 grid border-l border-t border-ink/25 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} className="border-b border-r border-ink/25 p-7">
                <Reveal delay={0.05 * i}>
                  <p className="label text-redline-deep">0{i + 1}</p>
                  <h3 className="mt-2 text-2xl font-extrabold">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Where */}
      <section className="border-b border-ink/15 bg-paper-deep">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="headline max-w-3xl text-[clamp(1.9rem,4.2vw,3.2rem)]">
            Based in the Toronto area. Working across Canada.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            We meet in person across Toronto and Durham Region, including Ajax, Pickering, Whitby, Oshawa and
            Clarington, and deliver remotely to the rest of Ontario and Canada.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {LOCATION_GROUPS.map((group) => (
              <div key={group.label}>
                <h3 className="text-lg font-extrabold">{group.label}</h3>
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-ink-soft">
                  {group.slugs.map((slug) => {
                    const loc = LOCATIONS.find((l) => l.slug === slug)
                    return loc ? (
                      <li key={slug}>
                        <Link
                          href={`/locations/${slug}`}
                          className="underline decoration-ink/25 underline-offset-4 hover:text-redline-deep hover:decoration-redline"
                        >
                          {loc.name}
                        </Link>
                      </li>
                    ) : null
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnquirySection context="About page enquiry" />
    </>
  )
}
