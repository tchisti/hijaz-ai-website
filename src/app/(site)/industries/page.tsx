import { buildMetadata } from "@/lib/seo"
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd"
import { BookCallButton, PageHero, SecondaryButton } from "@/components/layout/Sheet"
import IndustryCard from "@/components/industries/IndustryCard"
import EnquirySection from "@/components/sections/EnquirySection"
import { INDUSTRIES } from "@/lib/industries"

export const metadata = buildMetadata({
  title: "Industries: Websites, AI and Automation by Sector",
  description:
    "What Hijaz.ai builds for retail, clinics, trades, real estate, restaurants, professional services, manufacturing, logistics, education, energy, wellness and automotive businesses.",
  canonical: "/industries",
})

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }]} />

      <PageHero
        label={`Industries · ${INDUSTRIES.length} sectors`}
        title="Built for the way your industry works."
        intro="Every sector loses money in a different place. Pick yours to see the problems we hear most, what we build for them, and what a first project costs."
        breadcrumb={[{ name: "Industries" }]}
      >
        <div className="flex flex-wrap gap-3">
          <BookCallButton />
          <SecondaryButton href="#enquire">Get a fixed quote</SecondaryButton>
        </div>
      </PageHero>

      <section className="border-b border-ink/15 bg-paper-deep">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <ul className="grid grid-cols-2 border-l border-t border-ink/25 bg-paper lg:grid-cols-4">
            {INDUSTRIES.map((industry, i) => (
              <li key={industry.slug} className="border-b border-r border-ink/25">
                <IndustryCard industry={industry} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquirySection
        context="Industries page enquiry"
        title="Not listed? Tell us what you do."
        body="Most of what we build applies to any business that takes enquiries, bookings or orders. Send a few lines and we will tell you plainly whether we can help."
      />
    </>
  )
}
