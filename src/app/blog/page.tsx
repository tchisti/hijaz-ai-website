import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { Badge } from "@/components/ui/badge"
import { ALL_POSTS } from "@/content/blog"
import { ChevronRight, Clock, User } from "lucide-react"

export const metadata = buildMetadata({
  title: "Blog — AI, Web & Business Growth Tips",
  description:
    "Insights from Hijaz.ai on AI automation, web development, Shopify e-commerce, and digital marketing for Toronto and GTA businesses.",
  canonical: "/blog",
})

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-midnight py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-1.5 text-sm text-white/40 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white/70">Blog</span>
          </nav>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Insights for <span className="text-gold">Growing Businesses</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Practical guides on AI automation, web development, Shopify, and digital marketing — written for Toronto business owners.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image placeholder */}
                <div className="h-44 bg-gradient-to-br from-midnight to-blue-800 flex items-end p-5">
                  <span className="font-display font-bold text-white text-base leading-tight line-clamp-2">{post.title}</span>
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
    </>
  )
}
