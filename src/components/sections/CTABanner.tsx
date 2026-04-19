import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTABanner() {
  return (
    <section className="bg-midnight py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
          Ready to grow your business?
        </h2>
        <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
          Join 50+ Toronto businesses already using Hijaz.ai to automate, scale, and dominate their market.
        </p>
        <Button asChild size="lg" className="bg-gold text-midnight hover:bg-gold/90 font-semibold text-base px-10 shadow-lg shadow-gold/20">
          <Link href="/contact">Let&apos;s Talk <ArrowRight size={16} className="ml-2" /></Link>
        </Button>
        <p className="mt-4 text-white/40 text-sm">⚡ Limited spots available this month</p>
      </div>
    </section>
  )
}
