import ProjectCard from "@/components/work/ProjectCard"
import { Reveal } from "@/components/motion/Redline"
import { SecondaryButton, SheetHeader } from "@/components/layout/Sheet"
import { FEATURED_PROJECTS, PROJECTS } from "@/lib/projects"

export default function SelectedWork() {
  const [lead, ...rest] = FEATURED_PROJECTS
  return (
    <section id="work" className="surface-blueprint scroll-mt-16">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SheetHeader number="02" title="Selected work" tone="blueprint" />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <h2 className="headline text-[clamp(2.2rem,5.6vw,4.4rem)] text-white">
              Don&apos;t take our word for it. Open the tab.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-chalk/75 lg:justify-self-end">
              Every project here is live and public. Stores taking orders, sites generating enquiries, software people
              use at work. Click through and judge the build, not the pitch.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <ProjectCard project={lead} tone="blueprint" large />
          </Reveal>
          {rest.map((project, i) => {
            // The last sheet closes the grid at double width when it would otherwise sit alone
            const wide = i === rest.length - 1 && rest.length % 3 === 0
            return (
              <Reveal key={project.slug} delay={0.06 * ((i % 3) + 1)} className={wide ? "lg:col-span-2" : undefined}>
                <ProjectCard project={project} tone="blueprint" large={wide} />
              </Reveal>
            )
          })}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-chalk/25 pt-8">
          <p className="label text-chalk/60">
            Showing {FEATURED_PROJECTS.length} of {PROJECTS.length} builds
          </p>
          <SecondaryButton href="/work" tone="blueprint">
            See all {PROJECTS.length} projects
          </SecondaryButton>
        </div>
      </div>
    </section>
  )
}
