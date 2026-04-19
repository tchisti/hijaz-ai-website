import { buildMetadata } from "@/lib/seo"
import PortfolioGrid from "@/components/sections/PortfolioGrid"
import CTABanner from "@/components/sections/CTABanner"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export const metadata = buildMetadata({
  title: "Portfolio — AI, Web & Design Projects",
  description:
    "Browse Hijaz.ai's portfolio of AI automation, web development, Shopify e-commerce, and branding projects for Toronto and GTA businesses.",
  canonical: "/portfolio",
})

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-midnight py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-1.5 text-sm text-white/40 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white/70">Portfolio</span>
          </nav>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Work That <span className="text-gold">Delivers Results</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Real projects. Real outcomes. Explore how we&apos;ve helped Toronto and GTA businesses automate, grow, and stand out.
          </p>
        </div>
      </section>

      <PortfolioGrid />
      <CTABanner />
    </>
  )
}
