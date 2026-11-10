import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd, ProjectListJsonLd } from "@/components/seo/JsonLd"
import { PageHero } from "@/components/layout/Sheet"
import { Reveal } from "@/components/motion/Redline"
import ProjectCard from "@/components/work/ProjectCard"
import CTABanner from "@/components/sections/CTABanner"
import { CATEGORY_LABELS, PROJECTS, type ProjectCategory } from "@/lib/projects"

export const metadata = buildMetadata({
  title: "Selected Work: Live Websites, Stores & AI Software",
  description:
    "Real builds by Hijaz.ai that are live today: online stores shipping across Canada, business websites and AI software. Every project links to the working product.",
  canonical: "/work",
})

const ORDER: ProjectCategory[] = ["store", "site", "software"]

const INTROS: Record<ProjectCategory, string> = {
  store:
    "Stores that take real orders. Three of these are businesses we operate ourselves, so the checkout, shipping and search work has been paid for with our own money.",
  site: "Websites built to produce an enquiry, a booking or a quote request, for local services, community organizations and manufacturers.",
  software:
    "AI advisors, guided workflows, simulators and dashboards. Specialist knowledge that used to live in PDFs and spreadsheets, delivered as tools that open in a browser.",
}

export default function WorkPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]} />
      <ProjectListJsonLd projects={PROJECTS} path="/work" />

      <PageHero
        label={`Selected work · ${PROJECTS.length} builds in production`}
        title="Everything here is live. Go and use it."
        intro="No mock-ups and no concept pieces. Each project links to the working product so you can judge the build for yourself."
        breadcrumb={[{ name: "Work" }]}
      >
        <nav aria-label="Jump to a category" className="flex flex-wrap gap-2">
          {ORDER.map((cat) => (
            <a
              key={cat}
              href={`#${cat}`}
              className="label border border-ink/40 px-3 py-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              {CATEGORY_LABELS[cat]} · {PROJECTS.filter((p) => p.category === cat).length}
            </a>
          ))}
        </nav>
      </PageHero>

      {ORDER.map((cat, ci) => {
        const projects = PROJECTS.filter((p) => p.category === cat)
        return (
          <section key={cat} id={cat} className="scroll-mt-16 border-b border-ink/15">
            <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
              <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr] lg:items-end">
                <h2 className="headline text-[clamp(2rem,4.6vw,3.6rem)]">
                  <span className="label mb-3 block text-redline-deep">0{ci + 1}</span>
                  {CATEGORY_LABELS[cat]}
                </h2>
                <p className="max-w-xl text-lg leading-relaxed text-ink-soft lg:justify-self-end">{INTROS[cat]}</p>
              </div>
              <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                  <Reveal key={project.slug} delay={0.05 * (i % 3)}>
                    <ProjectCard project={project} priority={ci === 0 && i < 3} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <CTABanner />
    </>
  )
}
