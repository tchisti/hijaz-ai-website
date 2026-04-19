import { buildMetadata } from "@/lib/seo"
import ContactForm from "@/components/sections/ContactForm"
import { SITE_CONFIG } from "@/lib/constants"
import { ChevronRight, Mail, Phone, MessageCircle, Clock, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata = buildMetadata({
  title: "Contact Us — Book a Free Consultation",
  description:
    "Get in touch with Hijaz.ai for AI automation, web development, and digital marketing services in Toronto and the GTA. We respond within 2 business hours.",
  canonical: "/contact",
})

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-midnight py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-1.5 text-sm text-white/40 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white/70">Contact</span>
          </nav>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Let&apos;s Build Something <span className="text-gold">Great Together</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Book your free consultation today. We respond within 2 business hours.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <CheckCircle size={16} className="text-gold" />
            <span className="text-white/60 text-sm">No commitment. No pressure. Just a conversation.</span>
          </div>
        </div>
      </section>

      {/* Split layout */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">
            {/* Left: Form */}
            <div className="bg-card rounded-3xl p-8 sm:p-10 shadow-sm border border-border">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground text-sm mb-8">Fill out the form and we&apos;ll get back to you within 2 business hours.</p>
              <ContactForm />
            </div>

            {/* Right: Contact details */}
            <div className="space-y-6">
              {/* Response time badge */}
              <div className="bg-gold/10 border border-gold/20 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-midnight" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Fast Response</p>
                  <p className="text-muted-foreground text-xs">We respond within 2 business hours</p>
                </div>
              </div>

              {/* Contact details card */}
              <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
                <h3 className="font-display font-semibold text-foreground">Contact Details</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail size={16} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm font-medium text-foreground hover:text-gold transition-colors">{SITE_CONFIG.email}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone size={16} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                      <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm font-medium text-foreground hover:text-gold transition-colors">{SITE_CONFIG.phone}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle size={16} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">WhatsApp</p>
                      <a href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-gold transition-colors">Chat on WhatsApp</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={16} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Business Hours</p>
                      <p className="text-sm font-medium text-foreground">{SITE_CONFIG.businessHours}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                      <p className="text-sm font-medium text-foreground">{SITE_CONFIG.address}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Service areas */}
              <div className="bg-midnight rounded-2xl p-6 text-white">
                <h3 className="font-display font-semibold text-sm mb-3">Serving the GTA</h3>
                <div className="flex flex-wrap gap-1.5">
                  {SITE_CONFIG.serviceAreas.map((area) => (
                    <span key={area} className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/70">{area}</span>
                  ))}
                </div>
              </div>

              {/* Google Maps placeholder */}
              <div className="bg-muted rounded-2xl h-44 flex items-center justify-center border border-border">
                <div className="text-center">
                  <MapPin size={24} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Google Maps — Toronto, GTA</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">(Embed added once Google Place ID confirmed)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
