import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/JsonLd"
import { SERVICES, AI_SERVICES, FOUNDATION_SERVICES, SITE_CONFIG } from "@/lib/constants"
import { BookCallButton, PageHero, SecondaryButton } from "@/components/layout/Sheet"
import CTABanner from "@/components/sections/CTABanner"
import ServiceDetailSection from "@/components/sections/ServiceDetailSection"
import PopularPackages from "@/components/sections/PopularPackages"
import ServicesSidebar from "@/components/sections/ServicesSidebar"

export const metadata = buildMetadata({
  title: "Services & Pricing: Web, Shopify & AI Automation",
  description:
    "Fixed-price websites, Shopify stores, AI receptionists, workflow automation and dashboards in Toronto and Durham Region. Websites from $1,200 CAD.",
  canonical: "/services",
})

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      {SERVICES.map((service) => (
        <ServiceJsonLd
          key={service.id}
          name={service.title}
          description={service.fullDesc}
          url={`${SITE_CONFIG.url}${service.href}`}
          startingPrice={service.startingPrice}
        />
      ))}

      <PageHero
        label={`Services · ${SERVICES.length} offers · Prices in CAD`}
        title="Every service has a price on it."
        intro="Productized offers with clear starting prices. Start with the audit to find out what is worth building, or go straight to the piece you already know you need."
        breadcrumb={[{ name: "Services" }]}
      >
        <div className="flex flex-wrap gap-3">
          <BookCallButton />
          <SecondaryButton href="/work">See the work</SecondaryButton>
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-14">
          <div>
            <div className="border-b border-ink pb-5">
              <p className="label text-redline-deep">Section 01</p>
              <h2 className="headline mt-2 text-[clamp(2rem,4.4vw,3.4rem)]">AI services</h2>
              <p className="mt-3 max-w-2xl text-lg text-ink-soft">
                Start with the audit, then build the highest-payback piece first.
              </p>
            </div>
            {AI_SERVICES.map((service, index) => (
              <ServiceDetailSection key={service.id} service={service} index={index} />
            ))}

            <PopularPackages />

            <div className="border-b border-ink pb-5 pt-16">
              <p className="label text-redline-deep">Section 02</p>
              <h2 className="headline mt-2 text-[clamp(2rem,4.4vw,3.4rem)]">Digital foundations</h2>
              <p className="mt-3 max-w-2xl text-lg text-ink-soft">The platforms everything else runs on.</p>
            </div>
            {FOUNDATION_SERVICES.map((service, index) => (
              <ServiceDetailSection key={service.id} service={service} index={AI_SERVICES.length + index} />
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
