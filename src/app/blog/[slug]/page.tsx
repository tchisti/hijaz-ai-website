import { notFound } from "next/navigation"
import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ALL_POSTS } from "@/content/blog"
import { ChevronRight, Clock, User, ArrowRight, Calendar } from "lucide-react"
import { Metadata } from "next"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ALL_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = ALL_POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    canonical: `/blog/${post.slug}`,
  })
}

// Render markdown-like content (bold, headings, links, paragraphs)
function renderContent(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) { elements.push(<br key={key++} />); continue }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="font-display text-2xl font-bold text-foreground mt-10 mb-4">
          {trimmed.slice(3)}
        </h2>
      )
    } else if (trimmed.startsWith("- **")) {
      // Bullet with bold label
      const match = trimmed.match(/^- \*\*(.+?)\*\*(.*)$/)
      if (match) {
        elements.push(
          <li key={key++} className="text-muted-foreground mb-2">
            <strong className="text-foreground">{match[1]}</strong>{match[2]}
          </li>
        )
      }
    } else if (trimmed.startsWith("- ")) {
      elements.push(
        <li key={key++} className="text-muted-foreground mb-2">{trimmed.slice(2)}</li>
      )
    } else if (trimmed.startsWith("---")) {
      elements.push(<hr key={key++} className="border-border my-8" />)
    } else {
      // Process inline bold and links in paragraph text
      const parts = trimmed.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/)
      const renderedParts = parts.map((part, i) => {
        const boldMatch = part.match(/^\*\*(.+)\*\*$/)
        if (boldMatch) return <strong key={i} className="text-foreground font-semibold">{boldMatch[1]}</strong>
        const linkMatch = part.match(/^\[(.+)\]\((.+)\)$/)
        if (linkMatch) return <Link key={i} href={linkMatch[2]} className="text-gold hover:underline font-medium">{linkMatch[1]}</Link>
        return part
      })
      elements.push(
        <p key={key++} className="text-muted-foreground leading-relaxed mb-4">{renderedParts}</p>
      )
    }
  }
  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = ALL_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const relatedPosts = ALL_POSTS.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-10" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
        <ChevronRight size={14} />
        <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
      </nav>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
      </div>

      {/* Title */}
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">{post.title}</h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
        <span className="flex items-center gap-1.5"><User size={14} />{post.author}</span>
        <span className="flex items-center gap-1.5"><Calendar size={14} />{new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</span>
        <span className="flex items-center gap-1.5"><Clock size={14} />{post.readTime}</span>
      </div>

      {/* Content */}
      <div className="prose-custom">
        {renderContent(post.content)}
      </div>

      {/* Mid-article CTA */}
      <div className="my-12 bg-midnight rounded-2xl p-8 text-center">
        <h3 className="font-display text-xl font-bold text-white mb-2">Want this done for your business?</h3>
        <p className="text-white/60 text-sm mb-6">Book a free consultation with the Hijaz.ai team — Toronto&apos;s local AI &amp; digital agency.</p>
        <Button asChild className="bg-gold text-foreground hover:bg-gold/90 font-semibold">
          <Link href="/contact">Get Started <ArrowRight size={14} className="ml-2" /></Link>
        </Button>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16 pt-10 border-t border-border">
          <h3 className="font-display text-2xl font-bold text-foreground mb-8">Related Articles</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-gold/30 hover:shadow-md transition-all">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {related.tags.slice(0, 2).map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                </div>
                <h4 className="font-display font-semibold text-foreground text-sm mb-2 group-hover:text-gold transition-colors">{related.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{related.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
