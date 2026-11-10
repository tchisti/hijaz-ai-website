import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import IndustryIcon from "@/components/industries/IndustryIcon"
import type { Industry } from "@/lib/industries"

/** One industry as a cell in a ruled grid; inverts to ink on hover */
export default function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group flex h-full flex-col p-5 transition-colors duration-200 hover:bg-ink hover:text-paper sm:p-6"
    >
      <span className="flex items-start justify-between">
        <IndustryIcon name={industry.icon} size={26} className="text-redline group-hover:text-highlight" />
        <span className="label text-ink-faint group-hover:text-paper/60">{String(index + 1).padStart(2, "0")}</span>
      </span>
      <span className="mt-6 font-display text-xl font-extrabold leading-tight tracking-tight [font-stretch:112%] sm:text-[1.35rem]">
        {industry.name}
      </span>
      <span className="mt-2 text-[0.95rem] leading-snug text-ink-soft group-hover:text-paper/75">{industry.tagline}</span>
      <span className="label mt-auto flex items-center gap-1.5 pt-6 text-redline-deep group-hover:text-highlight">
        See how
        <ArrowUpRight
          aria-hidden="true"
          size={14}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  )
}
