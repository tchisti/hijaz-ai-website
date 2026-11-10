import type { Metadata } from "next"
import { SITE_CONFIG } from "@/lib/constants"

/** Absolute URL for a site path */
export function absoluteUrl(path = "/"): string {
  return `${SITE_CONFIG.url}${path === "/" ? "" : path}`
}

export function buildMetadata({
  title,
  description,
  canonical,
  keywords,
  absoluteTitle = false,
  ogImage = "/opengraph-image",
}: {
  title: string
  description: string
  canonical?: string
  keywords?: string[]
  /** Use the title exactly as given instead of appending the brand template */
  absoluteTitle?: boolean
  /** Site path of the share image; defaults to the generated brand card */
  ogImage?: string
}): Metadata {
  const url = canonical ? absoluteUrl(canonical) : undefined
  const image = { url: absoluteUrl(ogImage), alt: title }
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: SITE_CONFIG.name,
      locale: "en_CA",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.positioning} in Toronto & Durham Region`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: "technology",
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: SITE_CONFIG.name,
  },
  twitter: { card: "summary_large_image" },
  other: {
    // Geographic hints for local search
    "geo.region": "CA-ON",
    "geo.placename": "Toronto",
  },
}
