"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PORTFOLIO_PROJECTS } from "@/lib/constants"
import type { PortfolioProject } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"

const FILTERS = ["All", "AI", "Web", "E-Commerce", "Print", "Branding"]

const GRADIENTS = [
  "from-midnight to-blue-900",
  "from-amber-600 to-yellow-500",
  "from-emerald-700 to-teal-600",
  "from-purple-700 to-indigo-600",
  "from-rose-600 to-pink-500",
  "from-cyan-700 to-sky-500",
]

function ProjectCard({
  project,
  gradientIndex,
  onClick,
}: {
  project: PortfolioProject
  gradientIndex: number
  onClick: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={onClick}
      id={project.id}
    >
      {/* Image placeholder */}
      <div className={`h-52 bg-gradient-to-br ${GRADIENTS[gradientIndex]} relative overflow-hidden`}>
        <div className="absolute inset-0 flex flex-col items-start justify-end p-5">
          <span className="text-white/40 text-xs uppercase tracking-widest mb-1">{project.industry}</span>
          <span className="font-display font-bold text-white text-xl">{project.title}</span>
        </div>
        <div className="absolute top-4 right-4">
          <ExternalLink size={16} className="text-white/40 group-hover:text-white transition-colors" />
        </div>
      </div>
      {/* Card body */}
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
        <p className="text-gold font-semibold text-sm mb-4">{project.outcome}</p>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-midnight group-hover:text-gold transition-colors group-hover:gap-2">
          View Case Study <ArrowRight size={14} />
        </span>
      </div>
    </motion.div>
  )
}

function ProjectModal({
  project,
  gradientIndex,
  onClose,
}: {
  project: PortfolioProject
  gradientIndex: number
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header image */}
        <div className={`h-56 bg-gradient-to-br ${GRADIENTS[gradientIndex]} relative flex items-end p-8`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">{project.industry}</p>
            <h2 className="font-display text-3xl font-bold text-white">{project.title}</h2>
          </div>
        </div>
        {/* Modal content */}
        <div className="p-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 mb-6 text-center">
            <p className="text-gold font-display font-bold text-xl">{project.outcome}</p>
            <p className="text-sm text-muted-foreground mt-1">Outcome</p>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            This project involved a comprehensive engagement with the client to understand their business goals, target audience, and competitive landscape in the {project.industry} sector. Hijaz.ai delivered a tailored solution that addressed their specific pain points and drove measurable results within the first 60 days of launch.
          </p>
          <div className="flex gap-4">
            <Button asChild className="bg-midnight text-white hover:bg-midnight/90">
              <Link href="/contact" onClick={onClose}>Start a Similar Project <ArrowRight size={14} className="ml-2" /></Link>
            </Button>
            <Button variant="outline" onClick={onClose} className="border-midnight/20">
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filtered = activeFilter === "All"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.tags.includes(activeFilter))

  return (
    <section className="py-20 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeFilter === filter
                  ? "bg-midnight text-white shadow-md"
                  : "bg-white text-muted-foreground border border-border hover:border-midnight/30 hover:text-midnight"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                gradientIndex={PORTFOLIO_PROJECTS.indexOf(project)}
                onClick={() => {
                  setSelectedProject(project)
                  setSelectedIndex(PORTFOLIO_PROJECTS.indexOf(project))
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No projects found for this filter.</p>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-10 bg-white rounded-3xl border border-border">
          <h3 className="font-display text-2xl font-bold text-midnight mb-3">
            Want results like these?
          </h3>
          <p className="text-muted-foreground mb-6">Start your project with Toronto&apos;s leading AI &amp; digital agency.</p>
          <Button asChild size="lg" className="bg-midnight text-white hover:bg-midnight/90">
            <Link href="/contact">Start Your Project <ArrowRight size={16} className="ml-2" /></Link>
          </Button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            gradientIndex={selectedIndex}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
