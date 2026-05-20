import { buildMetadata } from "@/lib/seo"
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd"
import AIAutomationHero from "@/components/sections/AIAutomationHero"
import KPIStrip from "@/components/sections/KPIStrip"
import LocalBusinessUseCases from "@/components/sections/LocalBusinessUseCases"
import ServicePipelineCards from "@/components/sections/ServicePipelineCards"
import AIFluencySection from "@/components/sections/AIFluencySection"
import HowWeHelpSection from "@/components/sections/HowWeHelpSection"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import PortfolioPreview from "@/components/sections/PortfolioPreview"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import GoogleReviews from "@/components/sections/GoogleReviews"
import FAQAccordion from "@/components/sections/FAQAccordion"
import CTABanner from "@/components/sections/CTABanner"

export const metadata = buildMetadata({
  title: "Hijaz.ai — Learn AI for Your Local Business | Toronto",
  description:
    "Hijaz.ai helps local businesses in Toronto and across Canada discover, learn, and implement AI tools that save time, reduce costs, and drive more sales. Book a free 15-min call today.",
  canonical: "/",
})

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <AIAutomationHero />
      <KPIStrip />
      <LocalBusinessUseCases />
      <ServicePipelineCards />
      <AIFluencySection />
      <HowWeHelpSection />
      <WhyChooseUs />
      <PortfolioPreview />
      <TestimonialsSection />
      <GoogleReviews />
      <FAQAccordion />
      <CTABanner />
    </>
  )
}
