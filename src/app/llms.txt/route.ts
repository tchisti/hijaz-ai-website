import { FAQ_ITEMS, SERVICES, SITE_CONFIG } from "@/lib/constants"
import { INDUSTRIES } from "@/lib/industries"
import { LOCATION_GROUPS, LOCATIONS } from "@/lib/locations"
import { PROJECTS } from "@/lib/projects"
import { absoluteUrl } from "@/lib/seo"

export const dynamic = "force-static"

/**
 * /llms.txt: a plain-language summary of the business for AI assistants,
 * generated from the same data the pages use so it cannot drift out of date.
 */
export function GET() {
  const lines: string[] = [
    `# ${SITE_CONFIG.name}`,
    "",
    `> ${SITE_CONFIG.description}`,
    "",
    "## Key facts",
    "",
    `- Positioning: ${SITE_CONFIG.positioning}. Tagline: "${SITE_CONFIG.tagline}"`,
    `- Operated by: ${SITE_CONFIG.legalName}.`,
    `- Based in: ${SITE_CONFIG.address}. On-site across Toronto and Durham Region; remote across Canada.`,
    `- Contact: ${SITE_CONFIG.email}, ${SITE_CONFIG.phone}. Hours: ${SITE_CONFIG.businessHours}.`,
    `- Book a call: ${SITE_CONFIG.bookingUrl}`,
    "- Pricing: fixed-price quotes in Canadian dollars, agreed before work starts.",
    "",
    "## Services",
    "",
    ...SERVICES.map(
      (s) => `- [${s.title}](${absoluteUrl(s.href)}): ${s.shortDesc} ${s.pricingTeaser}.`
    ),
    "",
    "## Industries",
    "",
    ...INDUSTRIES.map(
      (i) => `- [${i.name}](${absoluteUrl(`/industries/${i.slug}`)}): ${i.headline}. For ${i.audience.toLowerCase()}.`
    ),
    "",
    "## Selected work",
    "",
    ...PROJECTS.map((p) => `- [${p.name}](${absoluteUrl(`/work/${p.slug}`)}): ${p.summary}`),
    "",
    "## Service areas",
    "",
    ...LOCATION_GROUPS.map((g) => {
      const cities = g.slugs
        .map((slug) => LOCATIONS.find((l) => l.slug === slug))
        .filter((l) => l !== undefined)
        .map((l) => `[${l.name}](${absoluteUrl(`/locations/${l.slug}`)})`)
      return `- ${g.label} (${g.note.toLowerCase()}): ${cities.join(", ")}`
    }),
    "",
    "## Frequently asked questions",
    "",
    ...FAQ_ITEMS.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/")})`,
    `- [Services and pricing](${absoluteUrl("/services")})`,
    `- [Industries](${absoluteUrl("/industries")})`,
    `- [Work](${absoluteUrl("/work")})`,
    `- [Locations](${absoluteUrl("/locations")})`,
    `- [About](${absoluteUrl("/about")})`,
    `- [Contact](${absoluteUrl("/contact")})`,
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
