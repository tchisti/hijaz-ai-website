import { buildMetadata } from "@/lib/seo"
import Hero from "@/components/home/Hero"
import LogoStrip from "@/components/home/LogoStrip"
import SelectedWork from "@/components/home/SelectedWork"
import Capabilities from "@/components/home/Capabilities"
import Industries from "@/components/home/Industries"
import WhyUs from "@/components/home/WhyUs"
import Process from "@/components/home/Process"
import ServiceArea from "@/components/home/ServiceArea"
import FAQAccordion from "@/components/sections/FAQAccordion"
import EnquirySection from "@/components/sections/EnquirySection"

export const metadata = buildMetadata({
  title: "Hijaz.ai | Business Technology Partner in Toronto & Durham Region",
  absoluteTitle: true,
  description:
    "Websites, online stores, AI assistants and custom software for businesses in Toronto, Durham Region and across Canada. Fixed prices, live in days.",
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
      <LogoStrip />
      <SelectedWork />
      <Capabilities />
      <Industries />
      <WhyUs />
      <Process />
      <ServiceArea />
      <FAQAccordion number="08" />
      <EnquirySection context="Homepage enquiry" />
    </>
  )
}
