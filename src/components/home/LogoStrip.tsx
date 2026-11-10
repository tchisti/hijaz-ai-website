import Image from "next/image"
import { LOGO_STRIP_PROJECTS, type Project } from "@/lib/projects"

/** First letters of the first two words, used when a brand has no mark on file */
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

function Logo({ project }: { project: Project }) {
  return (
    <span className="flex shrink-0 items-center gap-2.5 px-7">
      {project.logo ? (
        <Image src={project.logo} alt="" width={26} height={26} className="h-[26px] w-[26px] rounded-[5px] object-contain" />
      ) : (
        <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[5px] bg-ink font-mono text-[0.6rem] font-semibold tracking-wide text-paper">
          {initials(project.name)}
        </span>
      )}
      <span className="whitespace-nowrap text-[0.95rem] font-semibold tracking-tight text-ink">{project.name}</span>
    </span>
  )
}

/**
 * A quiet strip of the businesses running on our work: small marks, muted,
 * drifting slowly. Colour returns when the pointer is on the strip.
 */
export default function LogoStrip() {
  const projects = LOGO_STRIP_PROJECTS
  return (
    <section aria-label="Businesses running on our work" className="border-b border-ink/15 bg-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 sm:px-8 md:flex-row md:items-center md:gap-8">
        <p className="label shrink-0 text-ink-soft md:w-44">Businesses running on our work</p>
        <p className="sr-only">{projects.map((p) => p.name).join(", ")}.</p>
        <div
          aria-hidden="true"
          className="marquee relative min-w-0 flex-1 overflow-hidden opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="marquee-track flex w-max animate-marquee items-center">
            {[...projects, ...projects].map((p, i) => (
              <Logo key={i} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
