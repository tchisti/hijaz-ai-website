import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ConceptBuild } from "@/lib/concepts"
import { cn } from "@/lib/utils"

/**
 * A concept build, framed like a project card but always tagged "Concept build"
 * so it cannot be mistaken for client work. Links straight to the demo.
 */
export default function ConceptCard({ concept, large = false }: { concept: ConceptBuild; large?: boolean }) {
  return (
    <article className="group relative flex flex-col text-ink">
      <div className="crop text-redline">
        <div className={cn("relative overflow-hidden border border-ink/30 bg-paper-deep", large ? "aspect-[16/9]" : "aspect-[16/10]")}>
          <Image
            src={concept.image}
            alt={`Screenshot of the ${concept.name} concept build: ${concept.descriptor.toLowerCase()}`}
            fill
            sizes={large ? "(min-width: 1024px) 720px, 94vw" : "(min-width: 1024px) 400px, (min-width: 640px) 46vw, 94vw"}
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
          <p className="label absolute left-0 top-0 bg-ink px-2.5 py-1.5 font-medium text-paper">Concept build</p>
          <p className="label absolute bottom-0 left-0 max-w-[88%] translate-y-full bg-redline px-2.5 py-1.5 font-medium text-white transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0">
            → {concept.note}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="label text-ink-soft">
            Invented business <span className="opacity-50">·</span> {concept.town}
          </p>
          <h3 className={cn("mt-1.5 font-bold leading-tight", large ? "text-2xl sm:text-3xl" : "text-xl")}>
            <Link href={`/demos/${concept.slug}`} className="after:absolute after:inset-0">
              {concept.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-[0.95rem] leading-snug text-ink-soft">{concept.descriptor}</p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          size={22}
          className="mt-5 shrink-0 text-redline transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
    </article>
  )
}
