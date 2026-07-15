"use client"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AI_SERVICES, FOUNDATION_SERVICES, type Service } from "@/lib/constants"

function ServiceLinkGroup({ heading, services }: { heading: string; services: Service[] }) {
  return (
    <div>
      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{heading}</h4>
      <ul className="space-y-2">
        {services.map((s) => (
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
  )
}

export default function ServicesSidebar() {
  return (
    <aside className="sticky top-24 space-y-6">
      {/* Audit CTA card */}
      <div className="bg-midnight rounded-2xl p-6 text-white">
        <h3 className="font-display font-bold text-lg mb-2">Not sure where to start?</h3>
        <p className="text-white/60 text-sm mb-4">
          Book a free 15-min consultation — or start with the AI Opportunity Audit and get a ranked action plan within 48 hours.
        </p>
        <Button asChild className="w-full bg-gold text-midnight hover:bg-gold/90 font-semibold">
          <Link href="/contact?intent=call&service=ai-audit">
            Book Free Consultation <ArrowRight size={14} className="ml-1" />
          </Link>
        </Button>
      </div>

      {/* Quick jump links */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-semibold text-foreground text-sm mb-4 uppercase tracking-wider">Our Services</h3>
        <div className="space-y-5">
          <ServiceLinkGroup heading="AI Services" services={AI_SERVICES} />
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Packages</h4>
            <a
              href="#packages"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors group"
            >
              <CheckCircle size={14} className="text-gold/40 group-hover:text-gold transition-colors" />
              Popular Packages
            </a>
          </div>
          <ServiceLinkGroup heading="Digital Foundations" services={FOUNDATION_SERVICES} />
        </div>
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
