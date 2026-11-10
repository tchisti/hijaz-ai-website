import { buildMetadata } from "@/lib/seo"
import Hero from "@/components/home/Hero"
import WorkMarquee from "@/components/home/WorkMarquee"
import SelectedWork from "@/components/home/SelectedWork"
import Capabilities from "@/components/home/Capabilities"
import Operators from "@/components/home/Operators"
import Process from "@/components/home/Process"
import ServiceArea from "@/components/home/ServiceArea"
import FAQAccordion from "@/components/sections/FAQAccordion"
import CTABanner from "@/components/sections/CTABanner"

export const metadata = buildMetadata({
  title: "Hijaz.ai | Business Technology Partner in Toronto & Durham Region",
  absoluteTitle: true,
  description:
    "Websites, online stores, AI assistants and custom software for businesses in Toronto, Durham Region and across Canada. Built by operators. Fixed prices.",
  canonical: "/",
  keywords: [
    "business technology partner Toronto",
    "web design Durham Region",
    "web design Ajax",
    "AI automation Toronto",
    "Shopify developer Toronto",
    "website design Oshawa",
    "web developer Pickering",
    "AI automation agency Canada",
  ],
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkMarquee />
      <SelectedWork />
      <Capabilities />
      <Operators />
      <Process />
      <ServiceArea />
      <FAQAccordion />
      <CTABanner />
    </>
  )
}
