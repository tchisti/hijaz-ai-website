import { buildMetadata } from "@/lib/seo"
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd"
import HeroSection from "@/components/sections/HeroSection"
import StatsBar from "@/components/sections/StatsBar"
import ServicesGrid from "@/components/sections/ServicesGrid"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import PortfolioPreview from "@/components/sections/PortfolioPreview"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import GoogleReviews from "@/components/sections/GoogleReviews"
import FAQAccordion from "@/components/sections/FAQAccordion"
import CTABanner from "@/components/sections/CTABanner"

export const metadata = buildMetadata({
  title: "Hijaz.ai — Toronto AI & Digital Growth Partner",
  description:
    "Toronto's leading AI automation, web development, Shopify e-commerce, and digital marketing agency. Serving GTA businesses in North York, Durham Region, and beyond.",
  canonical: "/",
})

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HeroSection />
      <StatsBar />
      <ServicesGrid />
      <WhyChooseUs />
      <PortfolioPreview />
      <TestimonialsSection />
      <GoogleReviews />
      <FAQAccordion />
      <CTABanner />
    </>
  )
}
