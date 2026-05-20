import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTABanner() {
  return (
    <section className="bg-midnight py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
          Ready to bring AI into your business?
        </h2>
        <p className="text-white/60 text-lg mb-3 max-w-xl mx-auto">
          Book a free 15-minute call and we'll show you exactly how AI can save you time, reduce costs, and grow your sales — tailored to your business.
        </p>
        <p className="text-white/40 text-base mb-8 max-w-md mx-auto">
          No tech knowledge needed. Just bring your questions.
        </p>
        <Button asChild size="lg" className="bg-gold text-midnight hover:bg-gold/90 font-semibold text-base px-10 shadow-lg shadow-gold/20">
          <Link href="/contact?intent=call">Book a free 15-min call <ArrowRight size={16} className="ml-2" /></Link>
        </Button>
        <p className="mt-4 text-white/40 text-sm">⚡ Limited spots available — book yours today</p>
      </div>
    </section>
  )
}
