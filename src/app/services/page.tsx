import { buildMetadata } from "@/lib/seo"
import { ServiceJsonLd } from "@/components/seo/JsonLd"
import { SERVICES, AI_SERVICES, FOUNDATION_SERVICES, SITE_CONFIG } from "@/lib/constants"
import CTABanner from "@/components/sections/CTABanner"
import ServicesPageHero from "@/components/sections/ServicesPageHero"
import ServiceDetailSection from "@/components/sections/ServiceDetailSection"
import PopularPackages from "@/components/sections/PopularPackages"
import ServicesSidebar from "@/components/sections/ServicesSidebar"

export const metadata = buildMetadata({
  title: "AI Services for Local Businesses — Chatbots, Automation & Training",
  description:
    "AI chatbots, workflow automation, team training, dashboards, and AI-powered marketing for Toronto & GTA businesses — plus the web, Shopify, and print foundations they run on. Clear starting prices and a free 15-min consultation.",
  canonical: "/services",
})

export default function ServicesPage() {
  return (
    <>
      {SERVICES.map((service) => (
        <ServiceJsonLd
          key={service.id}
          name={service.title}
          description={service.fullDesc}
          url={`${SITE_CONFIG.url}${service.href}`}
          startingPrice={service.startingPrice}
        />
      ))}
      <ServicesPageHero />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          <div className="space-y-0">
            {/* Section 1 — AI Services */}
            <div className="pb-4">
              <span className="text-gold font-medium text-sm uppercase tracking-widest">Section 01</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">AI Services</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl">
                Productized AI offers with clear starting prices — start with the audit, scale from there.
              </p>
            </div>
            {AI_SERVICES.map((service, index) => (
              <ServiceDetailSection key={service.id} service={service} index={index} />
            ))}

            {/* Popular packages strip */}
            <PopularPackages />

            {/* Section 2 — Digital Foundations */}
            <div className="pt-16 pb-4">
              <span className="text-gold font-medium text-sm uppercase tracking-widest">Section 02</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">Digital Foundations</h2>
              <p className="mt-3 text-muted-foreground max-w-2xl">The platforms your AI runs on.</p>
            </div>
            {FOUNDATION_SERVICES.map((service, index) => (
              <ServiceDetailSection
                key={service.id}
                service={service}
                index={AI_SERVICES.length + index}
              />
            ))}
          </div>
          <div className="hidden lg:block">
            <ServicesSidebar />
          </div>
        </div>
      </div>
      <CTABanner />
    </>
  )
}
