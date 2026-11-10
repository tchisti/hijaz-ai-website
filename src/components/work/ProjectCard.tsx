import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/projects"
import { cn } from "@/lib/utils"

/**
 * A build, shown as a framed sheet with a real screenshot.
 * `tone` follows the surface it sits on.
 */
export default function ProjectCard({
  project,
  tone = "paper",
  large = false,
  priority = false,
}: {
  project: Project
  tone?: "paper" | "blueprint"
  large?: boolean
  priority?: boolean
}) {
  const dark = tone === "blueprint"
  return (
    <article className={cn("group relative flex flex-col", dark ? "text-chalk" : "text-ink")}>
      <div className={cn("crop", dark ? "text-highlight" : "text-redline")}>
        <div
          className={cn(
            "relative overflow-hidden border",
            large ? "aspect-[16/9]" : "aspect-[16/10]",
            dark ? "border-chalk/35 bg-blueprint-deep" : "border-ink/30 bg-paper-deep"
          )}
        >
          <Image
            src={project.image}
            alt={`Screenshot of ${project.name}, ${project.descriptor.toLowerCase()}`}
            fill
            sizes={large ? "(min-width: 1024px) 800px, 94vw" : "(min-width: 1024px) 400px, (min-width: 640px) 46vw, 94vw"}
            priority={priority}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
          <p
            className={cn(
              "label absolute bottom-0 left-0 max-w-[88%] translate-y-full px-2.5 py-1.5 font-medium transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0",
              dark ? "bg-highlight text-blueprint-deep" : "bg-redline text-white"
            )}
          >
            → {project.note}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className={cn("label", dark ? "text-chalk/60" : "text-ink-soft")}>
            {project.sector} <span className="opacity-50">·</span> {project.location}
          </p>
          <h3 className={cn("mt-1.5 font-bold leading-tight", large ? "text-2xl sm:text-3xl" : "text-xl")}>
            <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0">
              {project.name}
            </Link>
          </h3>
          <p className={cn("mt-1.5 text-[0.95rem] leading-snug", dark ? "text-chalk/75" : "text-ink-soft")}>
            {project.descriptor}
          </p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          size={22}
          className={cn(
            "mt-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1",
            dark ? "text-highlight" : "text-redline"
          )}
        />
      </div>
    </article>
  )
}
