import type { Metadata } from "next"
import { SITE_CONFIG } from "@/lib/constants"

export function buildMetadata({
  title,
  description,
  canonical,
  ogImage = `${SITE_CONFIG.url}/images/og-default.jpg`,
}: {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}): Metadata {
  const fullCanonical = canonical ? `${SITE_CONFIG.url}${canonical}` : undefined
  return {
    title,
    description,
    alternates: fullCanonical ? { canonical: fullCanonical } : undefined,
    openGraph: {
      title,
      description,
      url: fullCanonical,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: "website",
      siteName: SITE_CONFIG.name,
      locale: "en_CA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name} — Toronto AI & Digital Services`,
  },
  description:
    "Hijaz.ai provides AI automation, web development, Shopify e-commerce, and printing services for businesses in Toronto and the GTA.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: SITE_CONFIG.name,
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: SITE_CONFIG.name }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico" },
}
