"use client"

/**
 * The hero's proof: a drawing sheet that cycles through real, live builds.
 * Each one is marked up in red with what was built and stamped "in production".
 */

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Stamp } from "@/components/motion/Redline"
import type { Project } from "@/lib/projects"

const INTERVAL_MS = 5200

export default function HeroSheet({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const project = projects[index]

  useEffect(() => {
    if (paused || reduce) return
    const id = setInterval(() => setIndex((i) => (i + 1) % projects.length), INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused, reduce, projects.length])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* The sheet */}
      <div className="relative -rotate-1 border border-ink bg-paper-bright shadow-[10px_10px_0_0_#11151B]">
        {/* Top strip */}
        <div className="label flex items-center justify-between border-b border-ink/25 px-3 py-2 text-ink-soft">
          <span>
            DWG HJZ-{String(index + 1).padStart(2, "0")} <span className="mx-1 opacity-40">/</span> {project.sector}
          </span>
          <span className="flex items-center gap-1.5 text-redline-deep">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-redline opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-redline" />
            </span>
            Live
          </span>
        </div>

        {/* Screenshot */}
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={project.slug}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Image
                src={project.image}
                alt={`${project.name}: ${project.descriptor}. Live website built by Hijaz.ai.`}
                fill
                sizes="(min-width: 1024px) 600px, 92vw"
                priority={index === 0}
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>

          {/* Red markup: corner bracket + annotation */}
          <svg aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-10 w-10 text-redline" viewBox="0 0 40 40">
            <motion.path
              key={`b-${project.slug}`}
              d="M38 2 H2 V38"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            />
          </svg>
          <motion.p
            key={`n-${project.slug}`}
            className="label absolute bottom-3 left-3 max-w-[78%] border border-redline bg-paper-bright px-2.5 py-1.5 font-medium text-redline-deep"
            initial={reduce ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.6 }}
          >
            <span aria-hidden="true">→ </span>
            {project.note}
          </motion.p>
        </div>

        {/* Title block */}
        <div className="grid grid-cols-[1.4fr_1fr_auto] border-t border-ink text-ink">
          <div className="border-r border-ink/25 px-3 py-2.5">
            <span className="label block text-ink-faint">Project</span>
            <Link href={`/work/${project.slug}`} className="text-sm font-bold leading-tight hover:text-redline-deep">
              {project.name}
            </Link>
          </div>
          <div className="border-r border-ink/25 px-3 py-2.5">
            <span className="label block text-ink-faint">Location</span>
            <span className="text-sm font-medium leading-tight">{project.location}</span>
          </div>
          <div className="px-3 py-2.5">
            <span className="label block text-ink-faint">Sheet</span>
            <span className="font-mono text-sm tabular-nums">
              {index + 1}/{projects.length}
            </span>
          </div>
        </div>
      </div>

      <Stamp className="absolute -bottom-1 right-5 bg-paper-bright" rotate={-7} delay={1.1}>
        In
        <br />
        production
      </Stamp>

      {/* Sheet selector */}
      <div className="mt-7 flex items-center gap-1.5" role="group" aria-label="Choose a project to preview">
        {projects.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => setIndex(i)}
            aria-label={`Show ${p.name}`}
            aria-pressed={i === index}
            className="group py-2"
          >
            <span
              className={`block h-[3px] transition-all duration-300 ${
                i === index ? "w-9 bg-redline" : "w-5 bg-ink/25 group-hover:bg-ink/60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
