import { buildMetadata } from "@/lib/seo"
import { ServiceJsonLd } from "@/components/seo/JsonLd"
import { SERVICES, SITE_CONFIG } from "@/lib/constants"
import CTABanner from "@/components/sections/CTABanner"
import ServicesPageHero from "@/components/sections/ServicesPageHero"
import ServiceDetailSection from "@/components/sections/ServiceDetailSection"
import ServicesSidebar from "@/components/sections/ServicesSidebar"

export const metadata = buildMetadata({
  title: "AI, Web, Shopify & Digital Marketing Services",
  description:
    "Explore Hijaz.ai's full range of services: AI automation, web development, Shopify e-commerce, printing & branding, and digital marketing for Toronto and GTA businesses.",
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
        />
      ))}
      <ServicesPageHero />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          <div className="space-y-0">
            {SERVICES.map((service, index) => (
              <ServiceDetailSection key={service.id} service={service} index={index} />
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
