import { SITE_CONFIG } from "@/lib/constants"

type JsonLdProps = {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_CONFIG.name,
    description:
      "AI automation, web development, Shopify e-commerce, and printing services in Toronto and Durham Region",
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "Ontario",
      addressCountry: "CA",
    },
    areaServed: SITE_CONFIG.serviceAreas,
    serviceType: [
      "AI Automation", "Web Development", "Shopify E-Commerce",
      "Logo Design", "Printing Services", "Digital Marketing",
    ],
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: Object.values(SITE_CONFIG.social),
  }
  return <JsonLd data={data} />
}

export function FAQJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
  return <JsonLd data={data} />
}

export function ServiceJsonLd({ name, description, url }: { name: string; description: string; url: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: "Greater Toronto Area",
    url,
  }
  return <JsonLd data={data} />
}
