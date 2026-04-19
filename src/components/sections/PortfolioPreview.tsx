"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PORTFOLIO_PROJECTS } from "@/lib/constants"

const gradients = [
  "from-midnight to-blue-800",
  "from-gold/80 to-amber-600",
  "from-emerald-700 to-teal-500",
]

export default function PortfolioPreview() {
  const preview = PORTFOLIO_PROJECTS.slice(0, 3)
  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold font-medium text-sm uppercase tracking-widest">Our Work</span>
          <h2 className="font-display text-4xl font-bold text-foreground mt-2">Results That Speak</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Real projects, real outcomes. See how we&apos;ve helped Toronto businesses grow.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {preview.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`h-48 bg-gradient-to-br ${gradients[i]} flex items-end p-5`}>
                <span className="font-display font-bold text-white text-xl">{project.title}</span>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                <p className="text-gold font-semibold text-sm mb-4">{project.outcome}</p>
                <Link href={`/portfolio#${project.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-gold transition-colors group-hover:gap-2">
                  View Case Study <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-midnight hover:text-white transition-colors">
            <Link href="/portfolio">See All Work <ArrowRight size={16} className="ml-2" /></Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
