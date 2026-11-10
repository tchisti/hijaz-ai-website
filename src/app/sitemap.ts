import type { MetadataRoute } from "next"
import { ALL_POSTS } from "@/content/blog"
import { INDUSTRIES } from "@/lib/industries"
import { LOCATIONS } from "@/lib/locations"
import { PROJECTS } from "@/lib/projects"
import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const page = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
    lastModified: Date = now
  ) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority })

  return [
    page("/", 1, "weekly"),
    page("/services", 0.9, "monthly"),
    page("/work", 0.9, "weekly"),
    page("/industries", 0.9, "monthly"),
    page("/locations", 0.8, "monthly"),
    page("/about", 0.6, "monthly"),
    page("/contact", 0.7, "yearly"),
    page("/blog", 0.6, "weekly"),
    ...INDUSTRIES.map((i) => page(`/industries/${i.slug}`, 0.8, "monthly")),
    ...PROJECTS.map((p) => page(`/work/${p.slug}`, 0.7, "monthly")),
    ...LOCATIONS.map((l) => page(`/locations/${l.slug}`, l.tier === "onsite" ? 0.8 : 0.6, "monthly")),
    ...ALL_POSTS.map((post) => page(`/blog/${post.slug}`, 0.5, "yearly", new Date(post.date))),
  ]
}
