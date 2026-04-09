import Link from "next/link"
import { Instagram, Linkedin, Facebook, MessageCircle, MapPin, Phone, Mail, Clock } from "lucide-react"
import { SITE_CONFIG, NAV_LINKS, SERVICES } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="bg-midnight text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block font-display text-2xl font-bold">
              Hijaz<span className="text-gold">.ai</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              {SITE_CONFIG.tagline}<br />
              Smart technology for growing businesses across the GTA.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="p-2 rounded-lg bg-white/10 hover:bg-gold hover:text-midnight transition-colors">
                <Instagram size={16} />
              </a>
              <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="p-2 rounded-lg bg-white/10 hover:bg-gold hover:text-midnight transition-colors">
                <Linkedin size={16} />
              </a>
              <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="p-2 rounded-lg bg-white/10 hover:bg-gold hover:text-midnight transition-colors">
                <Facebook size={16} />
              </a>
              <a href={SITE_CONFIG.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="p-2 rounded-lg bg-white/10 hover:bg-gold hover:text-midnight transition-colors">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-gold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-gold text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-gold mb-4">Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={s.href} className="text-white/60 hover:text-gold text-sm transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-gold mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-0.5 shrink-0 text-gold" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-gold transition-colors">{SITE_CONFIG.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={14} className="mt-0.5 shrink-0 text-gold" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-gold transition-colors">{SITE_CONFIG.phone}</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="mt-0.5 shrink-0 text-gold" />
                <span>{SITE_CONFIG.businessHours}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                <span>{SITE_CONFIG.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} Hijaz.ai. All rights reserved.{" "}
            <span className="text-white/60">Proudly Canadian 🍁</span>
          </p>
          <p className="text-center">
            Serving: {SITE_CONFIG.serviceAreas.join(" | ")}
          </p>
        </div>
      </div>
    </footer>
  )
}
