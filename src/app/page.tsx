import { buildMetadata } from "@/lib/seo"
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd"
import AIAutomationHero from "@/components/sections/AIAutomationHero"
import KPIStrip from "@/components/sections/KPIStrip"
import ServicePipelineCards from "@/components/sections/ServicePipelineCards"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import PortfolioPreview from "@/components/sections/PortfolioPreview"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import GoogleReviews from "@/components/sections/GoogleReviews"
import FAQAccordion from "@/components/sections/FAQAccordion"
import CTABanner from "@/components/sections/CTABanner"

export const metadata = buildMetadata({
  title: "Hijaz.ai — AI Automation Pipeline for Toronto Businesses",
  description:
    "Turn raw data into automated action with Hijaz.ai. AI receptionists, conversion-ready websites, Shopify, and performance marketing — measurable ROI for GTA businesses.",
  canonical: "/",
})

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <AIAutomationHero />
      <KPIStrip />
      <ServicePipelineCards />
      <WhyChooseUs />
      <PortfolioPreview />
      <TestimonialsSection />
      <GoogleReviews />
      <FAQAccordion />
      <CTABanner />
    </>
  )
}
