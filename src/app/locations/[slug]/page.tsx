import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { buildMetadata, absoluteUrl } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd"
import { BookCallButton, PageHero, SecondaryButton } from "@/components/layout/Sheet"
import { Reveal } from "@/components/motion/Redline"
import ProjectCard from "@/components/work/ProjectCard"
import FAQAccordion from "@/components/sections/FAQAccordion"
import CTABanner from "@/components/sections/CTABanner"
import { SERVICES } from "@/lib/constants"
import { LOCATIONS, TIER_LABELS, getLocation, type Location } from "@/lib/locations"
import { PROJECTS } from "@/lib/projects"

export const dynamicParams = false

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }))
}

function placeName(loc: Location) {
  return `${loc.name}, ${loc.province}`
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const loc = getLocation(slug)
  if (!loc) return {}
  return buildMetadata({
    title: `Web Design, Online Stores & AI Automation in ${loc.name}, ${loc.provinceCode}`,
    description: `Websites, online stores and AI automation for ${loc.name} businesses. ${TIER_LABELS[loc.tier]}, fixed prices: websites from $1,200 CAD, AI audit $499 CAD.`,
    canonical: `/locations/${loc.slug}`,
    keywords: [
      `web design ${loc.name}`,
      `website design ${loc.name}`,
      `web developer ${loc.name}`,
      `AI automation ${loc.name}`,
      `Shopify developer ${loc.name}`,
      `SEO ${loc.name}`,
    ],
  })
}

const HOW_WE_WORK: Record<Location["tier"], string> = {
  onsite:
    "This is our home service area. We meet at your premises to scope the work, build and support remotely between visits, and come back in person for training and handover.",
  hybrid:
    "We scope, build and support remotely by video call, and meet in person when the project calls for it. Pricing is the same as in our on-site area.",
  remote:
    "We scope, build, train and support entirely online, by video call and shared live previews. Pricing is the same as in our on-site area, and you deal with the people doing the work.",
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const loc = getLocation(slug)
  if (!loc) notFound()

  const services = loc.serviceIds
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s))
  const projects = loc.projectSlugs
    .map((s) => PROJECTS.find((p) => p.slug === s))
    .filter((p): p is (typeof PROJECTS)[number] => Boolean(p))
    .slice(0, 3)
  const nearby = loc.nearby
    .map((s) => LOCATIONS.find((l) => l.slug === s))
    .filter((l): l is Location => Boolean(l))

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: loc.name, path: `/locations/${loc.slug}` },
        ]}
      />
      {services.map((s) => (
        <ServiceJsonLd
          key={s.id}
          name={`${s.title} in ${placeName(loc)}`}
          description={s.shortDesc}
          url={absoluteUrl(`/locations/${loc.slug}`)}
          startingPrice={s.startingPrice}
          areaServed={[placeName(loc)]}
        />
      ))}

      <PageHero
        label={`${loc.region} · ${loc.province} · ${TIER_LABELS[loc.tier]}`}
        title={loc.headline}
        intro={loc.intro}
        breadcrumb={[{ name: "Locations", href: "/locations" }, { name: loc.name }]}
      >
        <div className="flex flex-wrap gap-3">
          <BookCallButton />
          <SecondaryButton href="/work">See the work</SecondaryButton>
        </div>
      </PageHero>

      {/* Market + how we work */}
      <section className="border-b border-ink/15">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:py-24">
          <Reveal>
            <h2 className="label text-redline-deep">The {loc.name} market</h2>
            <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight sm:text-[1.7rem]">{loc.market}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-ink bg-paper-bright">
              <div className="border-b border-ink/25 p-5">
                <h2 className="label text-ink-faint">How we work in {loc.name}</h2>
                <p className="mt-2 leading-relaxed text-ink-soft">{HOW_WE_WORK[loc.tier]}</p>
              </div>
              <div className="p-5">
                <h2 className="label text-ink-faint">Who we build for here</h2>
                <ul className="mt-3 space-y-2">
                  {loc.sectors.map((s) => (
                    <li key={s} className="flex gap-3 font-medium">
                      <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-redline" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services for this market */}
      <section className="border-b border-ink/15 bg-paper-deep">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <h2 className="headline max-w-3xl text-[clamp(1.9rem,4.4vw,3.4rem)]">
            What {loc.name} businesses ask us for first
          </h2>
          <ol className="mt-10 border-t border-ink">
            {services.map((s, i) => (
              <li key={s.id} className="border-b border-ink/25">
                <Link
                  href={s.href}
                  className="group grid items-baseline gap-x-6 gap-y-2 px-1 py-6 transition-colors hover:bg-ink hover:text-paper sm:px-4 md:grid-cols-[3.5rem_1.1fr_1.6fr_9.5rem]"
                >
                  <span className="label text-redline-deep group-hover:text-highlight">0{i + 1}</span>
                  <h3 className="text-2xl font-extrabold leading-tight">{s.title}</h3>
                  <p className="leading-snug text-ink-soft group-hover:text-paper/80">{s.shortDesc}</p>
                  <span className="flex items-center gap-2 font-mono text-sm tabular-nums md:justify-end">
                    from ${s.startingPrice.toLocaleString("en-CA")}
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-ink-soft">
            Prices are in Canadian dollars.{" "}
            <Link href="/services" className="font-semibold text-ink underline decoration-redline underline-offset-4">
              See every service and package
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Relevant proof */}
      {projects.length > 0 && (
        <section className="border-b border-ink/15">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
            <h2 className="headline max-w-3xl text-[clamp(1.9rem,4.4vw,3.4rem)]">Builds relevant to {loc.name}</h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-soft">
              Live projects in the sectors that matter in this market. Each one links to the working product.
            </p>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQAccordion items={loc.faqs} number="04" title={`${loc.name} questions.`} />

      {/* Nearby */}
      {nearby.length > 0 && (
        <section className="border-b border-ink/15 bg-paper-deep">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-8 sm:px-8">
            <h2 className="label text-ink-soft">Also serving</h2>
            <ul className="flex flex-wrap gap-2">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link
                    href={`/locations/${n.slug}`}
                    className="label block border border-ink/40 px-3 py-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    {n.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/locations" className="label block px-3 py-2 text-redline-deep hover:text-ink">
                  All locations →
                </Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      <CTABanner
        title={`Talk to us about your ${loc.name} business.`}
        body="Book a free 15-minute call. Tell us what is costing you time or customers, and we will tell you plainly what we would build first and what it would cost."
      />
    </>
  )
}
