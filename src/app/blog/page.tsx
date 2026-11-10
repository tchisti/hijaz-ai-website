import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { Badge } from "@/components/ui/badge"
import { ALL_POSTS } from "@/content/blog"
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd"
import { PageHero } from "@/components/layout/Sheet"
import CTABanner from "@/components/sections/CTABanner"
import { Clock, User } from "lucide-react"

export const metadata = buildMetadata({
  title: "Blog: Websites, E-commerce, AI Automation and Search Visibility",
  description:
    "Practical guides from Hijaz.ai on websites, online stores, AI automation and search visibility for businesses in Toronto, Durham Region and across Canada.",
  canonical: "/blog",
})

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <PageHero
        label="Blog · Notes from the build"
        title="What we have learned building and running this."
        intro="Practical guides on websites, online stores, AI automation and search visibility, written for business owners in Toronto, Durham Region and across Canada."
        breadcrumb={[{ name: "Blog" }]}
      />

      {/* Posts grid */}
      <section className="border-b border-ink/15 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-card rounded-none overflow-hidden border border-border hover:border-ink transition-colors"
              >
                {/* Image placeholder */}
                <div className="surface-blueprint flex h-44 items-end p-5">
                  <span className="font-display text-xl font-extrabold leading-tight tracking-tight text-white line-clamp-3">{post.title}</span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                    <span className="flex items-center gap-1.5">
                      <User size={12} />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  )
}
