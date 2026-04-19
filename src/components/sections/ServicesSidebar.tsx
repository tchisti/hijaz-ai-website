"use client"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SERVICES } from "@/lib/constants"

export default function ServicesSidebar() {
  return (
    <aside className="sticky top-24 space-y-6">
      {/* Audit CTA card */}
      <div className="bg-midnight rounded-2xl p-6 text-white">
        <h3 className="font-display font-bold text-lg mb-2">Not sure what you need?</h3>
        <p className="text-white/60 text-sm mb-4">
          Get a free digital audit and we&apos;ll tell you exactly where you&apos;re leaving money on the table.
        </p>
        <Button asChild className="w-full bg-gold text-midnight hover:bg-gold/90 font-semibold">
          <Link href="/contact">Get Free Audit <ArrowRight size={14} className="ml-1" /></Link>
        </Button>
      </div>

      {/* Quick jump links */}
      <div className="bg-[#F8F9FB] rounded-2xl p-6 border border-border">
        <h3 className="font-semibold text-midnight text-sm mb-4 uppercase tracking-wider">Our Services</h3>
        <ul className="space-y-2">
          {SERVICES.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.slug}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors group"
              >
                <CheckCircle size={14} className="text-gold/40 group-hover:text-gold transition-colors" />
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Trust badges */}
      <div className="space-y-3">
        {["50+ Projects Delivered", "3-Day Turnaround", "100% Satisfaction"].map((badge) => (
          <div key={badge} className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle size={16} className="text-gold shrink-0" />
            {badge}
          </div>
        ))}
      </div>
    </aside>
  )
}
