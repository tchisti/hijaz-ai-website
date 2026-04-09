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
    name: "Hijaz.ai",
    description:
      "AI automation, web development, Shopify e-commerce, and printing services in Toronto and Durham Region",
    url: "https://hijaz.ai",
    telephone: "+1 (416) 555-0123",
    email: "hello@hijaz.ai",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "Ontario",
      addressCountry: "CA",
    },
    areaServed: [
      "Toronto", "North York", "Durham Region", "Scarborough",
      "Pickering", "Ajax", "Oshawa", "GTA",
    ],
    serviceType: [
      "AI Automation", "Web Development", "Shopify E-Commerce",
      "Logo Design", "Printing Services", "Digital Marketing",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "30",
    },
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [
      "https://instagram.com/hijaz.ai",
      "https://linkedin.com/company/hijaz-ai",
      "https://facebook.com/hijaz.ai",
    ],
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
      name: "Hijaz.ai",
      url: "https://hijaz.ai",
    },
    areaServed: "Greater Toronto Area",
    url,
  }
  return <JsonLd data={data} />
}
