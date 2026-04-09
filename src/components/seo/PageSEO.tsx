"use client"

import { DefaultSeo, NextSeo } from "next-seo"

export function SiteDefaultSeo() {
  return (
    <DefaultSeo
      titleTemplate="%s | Hijaz.ai — Toronto AI & Digital Services"
      defaultTitle="Hijaz.ai — Smart Solutions. Powerful Presence."
      description="Hijaz.ai provides AI automation, web development, Shopify e-commerce, and printing services for businesses in Toronto and the GTA."
      openGraph={{
        type: "website",
        locale: "en_CA",
        url: "https://hijaz.ai",
        siteName: "Hijaz.ai",
        images: [{ url: "https://hijaz.ai/images/og-default.jpg", width: 1200, height: 630, alt: "Hijaz.ai" }],
      }}
      twitter={{ cardType: "summary_large_image" }}
      additionalLinkTags={[{ rel: "icon", href: "/favicon.ico" }]}
    />
  )
}

type PageSEOProps = {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}

export function PageSEO({ title, description, canonical, ogImage }: PageSEOProps) {
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
      openGraph={{
        title,
        description,
        url: canonical,
        images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined,
      }}
    />
  )
}
