import type { MetadataRoute } from "next"
import { SITE_CONFIG } from "@/lib/constants"

/**
 * Search and AI crawlers are named explicitly so the intent is unambiguous:
 * this site wants to be indexed, quoted and cited by answer engines.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  }
}
