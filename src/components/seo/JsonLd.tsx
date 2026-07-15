import { SITE_CONFIG } from "@/lib/constants"

type JsonLdProps = {
  data: Record<string, unknown>
}

/**
 * Sanitize JSON-LD data to prevent script injection
 * Removes any script-like content from string values
 */
function sanitizeJsonLdData(obj: unknown): unknown {
  if (typeof obj === "string") {
    // Remove any potential script tags or event handlers
    return obj
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+on\w+\s*=/gi, "")
      .replace(/javascript:/gi, "")
  }

  if (Array.isArray(obj)) {
    return obj.map(sanitizeJsonLdData)
  }

  if (typeof obj === "object" && obj !== null) {
    const sanitized: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeJsonLdData(value)
    }
    return sanitized
  }

  return obj
}

export function JsonLd({ data }: JsonLdProps) {
  const sanitizedData = sanitizeJsonLdData(data)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(sanitizedData) }}
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
      "AI Consulting",
      "AI Chatbots & Receptionists",
      "AI Workflow Automation",
      "AI Training",
      "Business Intelligence Dashboards",
      "AI Marketing & Local SEO",
      "Web Development",
      "Shopify E-Commerce",
      "Logo Design",
      "Printing Services",
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

export function ServiceJsonLd({
  name,
  description,
  url,
  startingPrice,
}: {
  name: string
  description: string
  url: string
  startingPrice?: number
}) {
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
    areaServed: ["Toronto", "Greater Toronto Area", ...SITE_CONFIG.serviceAreas],
    url,
    ...(startingPrice !== undefined && {
      offers: {
        "@type": "Offer",
        priceCurrency: "CAD",
        price: startingPrice,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: startingPrice,
          priceCurrency: "CAD",
        },
        url,
      },
    }),
  }
  return <JsonLd data={data} />
}
