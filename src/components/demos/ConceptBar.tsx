import Link from "next/link"

/**
 * The bar at the top of every concept build. It states plainly that the site
 * is a demonstration with an invented business, and links back to the matching
 * industry page on Hijaz.ai. Its height is fixed at 34px so a demo's own sticky
 * header can sit directly beneath it.
 */
export default function ConceptBar({ industrySlug, industryName }: { industrySlug: string; industryName: string }) {
  return (
    <div className="sticky top-0 z-[70] bg-[#11151B] font-mono text-[10px] uppercase tracking-[0.06em] text-[#F3EFE6] sm:text-[11px] sm:tracking-[0.12em]">
      <div className="mx-auto flex h-[34px] max-w-[1400px] items-center justify-between gap-3 px-3 sm:px-6">
        <p className="min-w-0 truncate">
          <span className="mr-2 inline-block bg-[#CC3A1D] px-1.5 py-0.5 text-white">Concept build</span>
          <span className="sm:hidden">Invented business</span>
          <span className="hidden sm:inline">
            A demonstration site with an invented business, designed and built by{" "}
            <Link href="/" className="underline underline-offset-2 hover:text-white">
              Hijaz.ai
            </Link>
          </span>
        </p>
        <Link
          href={`/industries/${industrySlug}#enquire`}
          className="shrink-0 whitespace-nowrap text-[#F2C94C] underline underline-offset-2 hover:text-white"
        >
          <span className="hidden lg:inline">Get one like this for your {industryName.toLowerCase()} business →</span>
          <span className="lg:hidden">Get one like this →</span>
        </Link>
      </div>
    </div>
  )
}
