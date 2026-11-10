import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd"
import { BookCallButton, PageHero, SecondaryButton } from "@/components/layout/Sheet"
import { Circled, Reveal } from "@/components/motion/Redline"
import CTABanner from "@/components/sections/CTABanner"
import { LOCATIONS, LOCATION_GROUPS } from "@/lib/locations"
import { PROJECTS, SECTORS } from "@/lib/projects"

export const metadata = buildMetadata({
  title: "About: A Technology Partner Run by Operators",
  description:
    "Hijaz.ai builds websites, online stores, AI and custom software in Toronto and Durham Region, and operates its own online businesses on the same stack.",
  canonical: "/about",
})

const VENTURES = PROJECTS.filter((p) => p.operatedByUs && p.category === "store")

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
        title="We build technology for businesses, and we run businesses on it."
        intro="Hijaz.ai is a business technology partner. We design and build websites, online stores, AI assistants and custom software for small and mid-sized companies, and we operate our own online businesses on the same stack."
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
              Operators <Circled>first.</Circled> Builders because of it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                We run online stores for specialty food and leather goods. They need storefronts, checkout, shipping
                rules, search visibility and customer support that work together, and we build all of it ourselves.
              </p>
              <p>
                The same team builds for other businesses: local services in Durham Region, community organizations in
                Toronto, manufacturers and exporters, and specialist software for the energy sector.
              </p>
              <p>
                <strong className="font-semibold text-ink">
                  The difference is that we carry the same risk you do.
                </strong>{" "}
                When a checkout step loses a sale or a page drops out of search, it costs us money in our own
                businesses first. What we recommend to you is what survived that.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-3 border-y border-ink/25">
              {[
                { value: PROJECTS.length, label: "builds in production" },
                { value: SECTORS.length, label: "industries shipped" },
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

      {/* Ventures */}
      <section className="surface-blueprint">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="label text-highlight">Businesses we operate</p>
          <h2 className="headline mt-3 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] text-white">
            Our own money is on the same stack.
          </h2>
          <ul className="mt-10 grid border-l border-t border-chalk/30 md:grid-cols-3">
            {VENTURES.map((v) => (
              <li key={v.slug} className="border-b border-r border-chalk/30">
                <Link href={`/work/${v.slug}`} className="group block h-full p-6 transition-colors hover:bg-chalk hover:text-blueprint-deep">
                  <p className="label text-chalk/60 group-hover:text-blueprint">{v.domain}</p>
                  <h3 className="mt-2 text-2xl font-extrabold text-white group-hover:text-blueprint-deep">{v.name}</h3>
                  <p className="mt-2 leading-snug text-chalk/75 group-hover:text-blueprint-deep/80">{v.descriptor}</p>
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

      <CTABanner />
    </>
  )
}
