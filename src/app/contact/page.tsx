import { buildMetadata } from "@/lib/seo"
import ContactForm from "@/components/sections/ContactForm"
import { SITE_CONFIG } from "@/lib/constants"
import { Mail, Phone, MessageCircle, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd"
import { BookCallButton, PageHero } from "@/components/layout/Sheet"
import { LOCATIONS } from "@/lib/locations"

export const metadata = buildMetadata({
  title: "Contact Hijaz.ai: Book a Free 15-Minute Call",
  description:
    "Contact Hijaz.ai for websites, online stores, AI automation and custom software in Toronto, Durham Region and across Canada. We reply within 2 business hours.",
  canonical: "/contact",
})

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHero
        label="Contact · Replies within 2 business hours"
        title="Tell us what is costing you time or customers."
        intro="Send the details below or book a 15-minute call. You will get a plain answer on what we would build first and what it would cost. No commitment."
        breadcrumb={[{ name: "Contact" }]}
      >
        <BookCallButton />
      </PageHero>

      {/* Split layout */}
      <section className="border-b border-ink/15 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12">
            {/* Left: Form */}
            <div className="bg-card rounded-none p-8 sm:p-10 border border-border">
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
              <p className="text-muted-foreground text-sm mb-8">Fill out the form and we&apos;ll get back to you within 2 business hours.</p>
              <ContactForm />
            </div>

            {/* Right: Contact details */}
            <div className="space-y-6">
              {/* Response time badge */}
              <div className="bg-redline/10 border border-ink rounded-none p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-redline flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Fast Response</p>
                  <p className="text-muted-foreground text-xs">We respond within 2 business hours</p>
                </div>
              </div>

              {/* Contact details card */}
              <div className="bg-card rounded-none p-6 border border-border space-y-4">
                <h3 className="font-display font-semibold text-foreground">Contact Details</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail size={16} className="text-redline-deep mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm font-medium text-foreground hover:text-redline-deep transition-colors">{SITE_CONFIG.email}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone size={16} className="text-redline-deep mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                      <a href={`tel:${SITE_CONFIG.phone}`} className="text-sm font-medium text-foreground hover:text-redline-deep transition-colors">{SITE_CONFIG.phone}</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageCircle size={16} className="text-redline-deep mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">WhatsApp</p>
                      <a href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-redline-deep transition-colors">Chat on WhatsApp</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={16} className="text-redline-deep mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Business Hours</p>
                      <p className="text-sm font-medium text-foreground">{SITE_CONFIG.businessHours}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin size={16} className="text-redline-deep mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                      <p className="text-sm font-medium text-foreground">{SITE_CONFIG.address}</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Service areas */}
              <div className="surface-blueprint p-6">
                <h3 className="font-display text-sm font-semibold text-white">Where we work</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {LOCATIONS.map((loc) => (
                    <li key={loc.slug}>
                      <Link
                        href={`/locations/${loc.slug}`}
                        className="label block border border-chalk/30 px-2 py-1 text-chalk/80 hover:border-highlight hover:text-highlight"
                      >
                        {loc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
