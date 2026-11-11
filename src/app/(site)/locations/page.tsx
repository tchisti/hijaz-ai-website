import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd"
import { PageHero } from "@/components/layout/Sheet"
import { Reveal } from "@/components/motion/Redline"
import CTABanner from "@/components/sections/CTABanner"
import { LOCATIONS, LOCATION_GROUPS, TIER_LABELS } from "@/lib/locations"

export const metadata = buildMetadata({
  title: "Service Areas: Toronto, Durham Region, Ontario and Canada",
  description:
    "On-site in Toronto, Ajax, Pickering, Whitby, Oshawa and Clarington. Remote across Ontario and Canada. Web design, online stores, AI automation and software.",
  canonical: "/locations",
})

export default function LocationsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }]} />

      <PageHero
        label={`Service areas · ${LOCATIONS.length} cities`}
        title="On-site in Toronto and Durham Region. Online across Canada."
        intro="We meet in person across Toronto and Durham Region and deliver remotely everywhere else in Canada, at the same fixed prices. Pick your city to see how we work there and which builds are most relevant to your market."
        breadcrumb={[{ name: "Locations" }]}
      />

      {LOCATION_GROUPS.map((group, gi) => (
        <section key={group.label} className={`border-b border-ink/15 ${gi % 2 === 1 ? "bg-paper-deep" : ""}`}>
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="headline text-[clamp(1.9rem,4.4vw,3.4rem)]">{group.label}</h2>
              <p className="label text-redline-deep">{group.note}</p>
            </div>
            <ul className="mt-8 grid border-l border-t border-ink/25 sm:grid-cols-2 lg:grid-cols-3">
              {group.slugs.map((slug, i) => {
                const loc = LOCATIONS.find((l) => l.slug === slug)
                if (!loc) return null
                return (
                  <li key={slug} className="border-b border-r border-ink/25">
                    <Reveal delay={0.04 * i} className="h-full">
                      <Link
                        href={`/locations/${slug}`}
                        className="group flex h-full flex-col p-6 transition-colors hover:bg-ink hover:text-paper"
                      >
                        <span className="label text-ink-soft group-hover:text-highlight">
                          {loc.region} · {TIER_LABELS[loc.tier]}
                        </span>
                        <span className="mt-2 flex items-start justify-between gap-3 font-display text-3xl font-extrabold tracking-tight [font-stretch:115%]">
                          {loc.name}
                          <ArrowUpRight
                            aria-hidden="true"
                            size={22}
                            className="mt-1.5 shrink-0 text-redline transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-highlight"
                          />
                        </span>
                        <span className="mt-3 text-[0.95rem] leading-snug text-ink-soft group-hover:text-paper/75">
                          {loc.sectors.slice(0, 3).join(" · ")}
                        </span>
                      </Link>
                    </Reveal>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      ))}

      <CTABanner
        title="Not on the list? We still work with you."
        body="Everything we build is delivered and supported online, so we work with businesses anywhere in Canada. Book a call and we will tell you plainly whether we are the right fit."
      />
    </>
  )
}
