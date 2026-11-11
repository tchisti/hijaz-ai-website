import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowUpRight, Check } from "lucide-react"
import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/seo/JsonLd"
import { PageHero, PrimaryButton, SecondaryButton } from "@/components/layout/Sheet"
import { Reveal, Stamp } from "@/components/motion/Redline"
import ProjectCard from "@/components/work/ProjectCard"
import CTABanner from "@/components/sections/CTABanner"
import { CATEGORY_LABELS, PROJECTS, getProject } from "@/lib/projects"

export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return buildMetadata({
    title: `${project.name}: ${project.descriptor}`,
    description: project.summary,
    canonical: `/work/${project.slug}`,
    ogImage: project.image,
  })
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const related = [
    ...PROJECTS.filter((p) => p.slug !== project.slug && p.category === project.category),
    ...PROJECTS.filter((p) => p.slug !== project.slug && p.category !== project.category),
  ].slice(0, 3)

  const facts = [
    { label: "Type", value: CATEGORY_LABELS[project.category] },
    { label: "Sector", value: project.sector },
    { label: "Location", value: project.location },
    { label: "Status", value: "Live in production" },
  ]

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.name, path: `/work/${project.slug}` },
        ]}
      />
      <ProjectJsonLd project={project} />

      <PageHero
        label={`${project.sector} · ${project.location}`}
        title={project.name}
        intro={project.summary}
        breadcrumb={[{ name: "Work", href: "/work" }, { name: project.name }]}
      >
        <div className="flex flex-wrap gap-3">
          <PrimaryButton href={project.url} external>
            Open the live build
          </PrimaryButton>
          <SecondaryButton href="/contact">Build something like this</SecondaryButton>
        </div>
      </PageHero>

      <section className="border-b border-ink/15">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          {/* The sheet */}
          <Reveal>
            <figure className="relative">
              <div className="relative aspect-[16/10] overflow-hidden border border-ink bg-paper-deep shadow-[10px_10px_0_0_#11151B]">
                <Image
                  src={project.image}
                  alt={`Screenshot of the live ${project.name} build: ${project.descriptor.toLowerCase()}`}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1216px, 94vw"
                  className="object-cover object-top"
                />
              </div>
              <Stamp className="absolute -top-4 right-4 bg-paper" rotate={8} delay={0.5}>
                In
                <br />
                production
              </Stamp>
              <figcaption className="label mt-6 flex flex-wrap justify-between gap-2 text-ink-soft">
                <span>
                  <span className="text-redline-deep">→</span> {project.note}
                </span>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-redline-deep">
                  {project.domain} ↗
                </a>
              </figcaption>
            </figure>
          </Reveal>

          {/* Title block */}
          <dl className="mt-14 grid grid-cols-2 border border-ink lg:grid-cols-4">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`p-4 ${i % 2 === 1 ? "" : "border-r border-ink/25"} ${i < 2 ? "border-b border-ink/25 lg:border-b-0" : ""} ${i < 3 ? "lg:border-r lg:border-ink/25" : ""}`}
              >
                <dt className="label text-ink-faint">{f.label}</dt>
                <dd className="mt-1 font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="label text-redline-deep">The brief</h2>
              <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{project.brief}</p>
            </div>
            <div>
              <h2 className="label text-redline-deep">What we built</h2>
              <ul className="mt-4 border-t border-ink">
                {project.built.map((item) => (
                  <li key={item} className="flex gap-4 border-b border-ink/25 py-4 text-lg leading-snug">
                    <Check aria-hidden="true" size={20} className="mt-1 shrink-0 text-redline" />
                    {item}
                  </li>
                ))}
              </ul>
              <h2 className="label mt-10 text-redline-deep">Capabilities used</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.capabilities.map((c) => (
                  <li key={c} className="label border border-ink/40 px-3 py-2 text-ink">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-ink/15 bg-paper-deep">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="headline text-[clamp(1.9rem,4vw,3rem)]">More work</h2>
            <Link href="/work" className="label flex items-center gap-1.5 text-redline-deep hover:text-ink">
              All projects <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
