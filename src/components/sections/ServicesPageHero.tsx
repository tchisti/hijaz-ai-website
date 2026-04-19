import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"

export default function ServicesPageHero() {
  return (
    <section className="bg-midnight py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-1.5 text-sm text-white/40 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-white/70">Services</span>
        </nav>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          What We Do —{" "}
          <span className="text-gold">AI, Web, Print &amp; More</span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
          Everything your Toronto business needs to automate operations, establish a powerful digital presence, and convert more customers.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild className="bg-gold text-midnight hover:bg-gold/90 font-semibold">
            <Link href="/contact">Book Free Consultation <ArrowRight size={16} className="ml-2" /></Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Link href="/portfolio">See Our Work</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
