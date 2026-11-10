import { SITE_CONFIG, SERVICES } from "@/lib/constants"
import { LOCATIONS } from "@/lib/locations"
import type { Industry } from "@/lib/industries"
import type { Project } from "@/lib/projects"
import { absoluteUrl } from "@/lib/seo"

type JsonLdProps = {
  data: Record<string, unknown>
}

/**
 * Sanitize JSON-LD data to prevent script injection
 * Removes any script-like content from string values
 */
function sanitizeJsonLdData(obj: unknown): unknown {
  if (typeof obj === "string") {
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
      // "<" is escaped so a string value can never close the script element
      dangerouslySetInnerHTML={{ __html: JSON.stringify(sanitizedData).replace(/</g, "\\u003c") }}
    />
  )
}

export const ORG_ID = `${SITE_CONFIG.url}/#organization`
export const WEBSITE_ID = `${SITE_CONFIG.url}/#website`

const PROVINCE_NAMES = Array.from(new Set(LOCATIONS.map((l) => l.province)))

/**
 * One entity for the whole site: the business, where it operates and what it sells.
 * Rendered once in the root layout; other schemas point at it by @id.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORG_ID,
        name: SITE_CONFIG.name,
        slogan: SITE_CONFIG.tagline,
        description: SITE_CONFIG.description,
        url: SITE_CONFIG.url,
        image: absoluteUrl("/opengraph-image"),
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
        priceRange: "$$",
        currenciesAccepted: "CAD",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Toronto",
          addressRegion: "ON",
          addressCountry: "CA",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        areaServed: [
          ...LOCATIONS.map((l) => ({
            "@type": "City",
            name: l.name,
            containedInPlace: { "@type": "AdministrativeArea", name: l.province },
            url: absoluteUrl(`/locations/${l.slug}`),
          })),
          { "@type": "AdministrativeArea", name: "Durham Region" },
          { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
          ...PROVINCE_NAMES.map((name) => ({ "@type": "AdministrativeArea", name })),
          { "@type": "Country", name: "Canada" },
        ],
        knowsAbout: [
          "Web development",
          "E-commerce",
          "Shopify",
          "AI chatbots",
          "AI workflow automation",
          "Business intelligence dashboards",
          "Local SEO",
          "Generative engine optimization",
          "Custom software development",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Hijaz.ai services",
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.shortDesc,
              url: absoluteUrl(s.href),
            },
            priceCurrency: "CAD",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: s.startingPrice,
              priceCurrency: "CAD",
            },
          })),
        },
        sameAs: [SITE_CONFIG.social.linkedin, SITE_CONFIG.social.instagram, SITE_CONFIG.social.facebook],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
        inLanguage: "en-CA",
        publisher: { "@id": ORG_ID },
      },
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

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
  return <JsonLd data={data} />
}

export function ServiceJsonLd({
  name,
  description,
  url,
  startingPrice,
  areaServed,
}: {
  name: string
  description: string
  url: string
  startingPrice?: number
  areaServed?: string[]
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@id": ORG_ID },
    areaServed: areaServed ?? SITE_CONFIG.serviceAreas,
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

/** A list of builds, each described as a creative work made by the organization */
export function ProjectListJsonLd({ projects, path }: { projects: Project[]; path: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl(path),
    name: "Selected work by Hijaz.ai",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/work/${p.slug}`),
        name: p.name,
      })),
    },
  }
  return <JsonLd data={data} />
}

export function ProjectJsonLd({ project }: { project: Project }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: `${project.name}: ${project.descriptor}`,
    description: project.summary,
    url: absoluteUrl(`/work/${project.slug}`),
    image: absoluteUrl(project.image),
    genre: project.sector,
    keywords: project.capabilities.join(", "),
    creator: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@type": "Thing", name: project.sector },
    sameAs: project.url,
  }
  return <JsonLd data={data} />
}

export function BlogPostingJsonLd({
  post,
}: {
  post: { slug: string; title: string; excerpt: string; date: string; tags: string[] }
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-CA",
  }
  return <JsonLd data={data} />
}

/** What we offer a given sector, described as a service aimed at that business audience */
export function IndustryJsonLd({ industry }: { industry: Industry }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Websites, AI and automation for ${industry.name}`,
    serviceType: industry.builds.map((b) => b.title),
    description: `${industry.headline}. ${industry.intro}`,
    url: absoluteUrl(`/industries/${industry.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: SITE_CONFIG.serviceAreas,
    audience: { "@type": "BusinessAudience", audienceType: industry.audience },
  }
  return <JsonLd data={data} />
}
