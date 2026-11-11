import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowUpRight, Check } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd, FAQJsonLd, IndustryJsonLd } from "@/components/seo/JsonLd"
import { BookCallButton, PageHero, PrimaryButton, SecondaryButton } from "@/components/layout/Sheet"
import { Reveal } from "@/components/motion/Redline"
import IndustryIcon from "@/components/industries/IndustryIcon"
import ConceptCard from "@/components/work/ConceptCard"
import ProjectCard from "@/components/work/ProjectCard"
import EnquirySection from "@/components/sections/EnquirySection"
import { getConceptBuild } from "@/lib/concepts"
import { SERVICES } from "@/lib/constants"
import { INDUSTRIES, getIndustry } from "@/lib/industries"
import { PROJECTS } from "@/lib/projects"

export const dynamicParams = false

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) return {}
  return buildMetadata({
    title: `${industry.name}: Websites, AI & Automation`,
    description: `${industry.headline}. ${industry.intro}`.slice(0, 158),
    canonical: `/industries/${industry.slug}`,
    keywords: industry.keywords,
  })
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = getIndustry(slug)
  if (!industry) notFound()

  const builds = industry.builds.map((b) => ({ ...b, service: SERVICES.find((s) => s.id === b.serviceId) }))
  const projects = industry.projectSlugs
    .map((s) => PROJECTS.find((p) => p.slug === s))
    .filter((p): p is (typeof PROJECTS)[number] => Boolean(p))
  const others = INDUSTRIES.filter((i) => i.slug !== industry.slug)
  const concept = getConceptBuild(industry.slug)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ]}
      />
      <IndustryJsonLd industry={industry} />
      <FAQJsonLd items={industry.faqs} />

      <PageHero
        label={`Industries · ${industry.name}`}
        title={industry.headline}
        intro={industry.intro}
        breadcrumb={[{ name: "Industries", href: "/industries" }, { name: industry.name }]}
      >
        <div className="flex flex-wrap gap-3">
          <PrimaryButton href="#enquire">Get a plan for my business</PrimaryButton>
          <BookCallButton className="!bg-ink hover:!bg-redline" label="Book a 15-minute call" />
        </div>
        <p className="label mt-5 flex items-start gap-2 text-ink-soft">
          <IndustryIcon name={industry.icon} size={16} className="mt-px shrink-0 text-redline" />
          <span>For: {industry.audience}</span>
        </p>
      </PageHero>

      {/* Problems */}
      <section className="border-b border-ink/15">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="label text-redline-deep">Where the money goes</p>
          <h2 className="headline mt-3 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)]">
            What we hear from {industry.name.toLowerCase()} owners
          </h2>
          <ol className="mt-10 grid border-l border-t border-ink/25 sm:grid-cols-2 lg:grid-cols-4">
            {industry.pains.map((pain, i) => (
              <li key={pain.title} className="border-b border-r border-ink/25 p-6">
                <Reveal delay={0.05 * i}>
                  <p className="label text-redline-deep">0{i + 1}</p>
                  <h3 className="mt-2 text-xl font-extrabold leading-tight">{pain.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{pain.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we build */}
      <section className="border-b border-ink/15 bg-paper-deep">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="label text-redline-deep">What we build</p>
          <h2 className="headline mt-3 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)]">The fix for each one</h2>
          <ol className="mt-10 border-t border-ink">
            {builds.map((b, i) => (
              <li key={b.title} className="border-b border-ink/25">
                <Link
                  href={b.service?.href ?? "/services"}
                  className="group grid items-baseline gap-x-6 gap-y-2 px-1 py-6 transition-colors hover:bg-ink hover:text-paper sm:px-4 md:grid-cols-[3.5rem_1.1fr_1.6fr_9.5rem]"
                >
                  <span className="label text-redline-deep group-hover:text-highlight">0{i + 1}</span>
                  <h3 className="text-2xl font-extrabold leading-tight">{b.title}</h3>
                  <p className="leading-snug text-ink-soft group-hover:text-paper/80">{b.outcome}</p>
                  <span className="flex items-center gap-2 font-mono text-sm tabular-nums md:justify-end">
                    {b.service ? `from $${b.service.startingPrice.toLocaleString("en-CA")}` : "quoted"}
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-ink-soft">
            Prices are starting points in Canadian dollars. You get a fixed quote before any work starts.
          </p>
        </div>
      </section>

      {/* First project */}
      <section className="surface-blueprint">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-24">
          <div>
            <p className="label text-highlight">Where most {industry.name.toLowerCase()} clients start</p>
            <h2 className="headline mt-3 text-[clamp(2.1rem,5vw,4rem)] text-white">{industry.starter.name}</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-chalk/75">{industry.starter.summary}</p>
          </div>
          <div className="border border-chalk/40 bg-blueprint-deep">
            <ul>
              {industry.starter.includes.map((item) => (
                <li key={item} className="flex gap-4 border-b border-chalk/20 px-6 py-4 text-lg leading-snug text-chalk">
                  <Check aria-hidden="true" size={20} className="mt-1 shrink-0 text-highlight" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
              <p>
                <span className="label block text-chalk/55">Price</span>
                <span className="text-2xl font-extrabold text-white">{industry.starter.priceLabel}</span>
              </p>
              <a
                href="#enquire"
                className="group inline-flex items-center gap-2 bg-highlight px-5 py-3.5 font-semibold text-blueprint-deep transition-colors hover:bg-white"
              >
                Get this quoted
                <ArrowUpRight
                  aria-hidden="true"
                  size={17}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Proof, only where we have live builds in this sector */}
      {projects.length > 0 && (
        <section className="border-b border-ink/15">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
            <p className="label text-redline-deep">Live builds</p>
            <h2 className="headline mt-3 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)]">Work you can open right now</h2>
            <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* A concept build for this sector: an invented business, labelled as such */}
      {concept && (
        <section className="border-b border-ink/15 bg-paper-deep">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.25fr] lg:items-center lg:py-24">
            <div>
              <p className="label text-redline-deep">See it built</p>
              <h2 className="headline mt-3 text-[clamp(2rem,4.6vw,3.6rem)]">
                A working example for {industry.name.toLowerCase()}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{concept.summary}</p>
              <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
                {concept.name} is an invented business. We designed and built the site to show what a first project in
                this sector looks like, so you can click through it before you talk to us.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <PrimaryButton href={`/demos/${concept.slug}`}>Open the concept site</PrimaryButton>
                <SecondaryButton href="#enquire">Get one like this</SecondaryButton>
              </div>
            </div>
            <ConceptCard concept={concept} large />
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-b border-ink/15">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.5fr] lg:py-24">
          <h2 className="headline text-[clamp(2rem,4.6vw,3.6rem)]">Questions we get asked.</h2>
          <dl className="border-t border-ink">
            {industry.faqs.map((faq) => (
              <div key={faq.question} className="border-b border-ink/25 py-6">
                <dt className="text-xl font-bold leading-snug">{faq.question}</dt>
                <dd className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <EnquirySection
        context={`Industry: ${industry.name}`}
        needs={industry.builds.map((b) => b.title)}
        title={<>Tell us about your {industry.name.toLowerCase()} business.</>}
        body="Send a few lines on what is costing you time or customers. You will get a plain answer on what we would build first and a fixed price for it."
      />

      {/* Other industries */}
      <section className="border-t border-ink/15 bg-paper-deep">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-8 sm:px-8">
          <h2 className="label text-ink-soft">Other industries</h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/industries/${o.slug}`}
                  className="label block border border-ink/40 px-3 py-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
