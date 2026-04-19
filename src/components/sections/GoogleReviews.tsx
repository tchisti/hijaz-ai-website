import { Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GoogleReviews() {
  return (
    <section className="py-16 bg-[#F8F9FB] border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={24} className="text-gold" fill="currentColor" />
          ))}
        </div>
        <h3 className="font-display text-2xl font-bold text-midnight mb-2">4.9 out of 5 stars</h3>
        <p className="text-muted-foreground mb-6">Based on 30+ verified Google Reviews from Toronto &amp; GTA clients</p>
        <Button variant="outline" asChild className="border-midnight/20 text-midnight hover:bg-midnight hover:text-white">
          <a href="https://g.page/hijaz-ai" target="_blank" rel="noopener noreferrer">
            View on Google <ExternalLink size={14} className="ml-2" />
          </a>
        </Button>
        {/* TODO: Replace with actual Google Reviews embed once Place ID is available */}
      </div>
    </section>
  )
}
