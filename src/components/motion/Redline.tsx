"use client"

/**
 * Redline motion primitives.
 *
 * The site's motion language is an engineer marking up a drawing: red strokes
 * that draw themselves, dimension lines that extend, a stamp that lands.
 * Every primitive renders its final state when the visitor prefers reduced motion.
 */

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const EASE = [0.2, 0.8, 0.2, 1] as const
const VIEWPORT = { once: true, margin: "-12% 0px" } as const

/** Fade and rise into place when scrolled into view */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/** Inline text with a hand-drawn red underline that draws itself */
export function Underline({
  children,
  delay = 0.5,
  color = "#CC3A1D",
}: {
  children: ReactNode
  delay?: number
  color?: string
}) {
  const reduce = useReducedMotion()
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 18"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.14em] left-[-2%] h-[0.22em] w-[104%] overflow-visible"
      >
        <motion.path
          d="M3 11 C 48 4, 92 15, 140 8 S 232 3, 297 10"
          fill="none"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, delay, ease: EASE }}
        />
        <motion.path
          d="M22 16 C 90 12, 170 17, 262 13"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: delay + 0.55, ease: EASE }}
        />
      </svg>
    </span>
  )
}

/** Inline text circled in red, the way a reviewer flags something on a print */
export function Circled({
  children,
  delay = 0.3,
  color = "#CC3A1D",
}: {
  children: ReactNode
  delay?: number
  color?: string
}) {
  const reduce = useReducedMotion()
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-[-7%] top-[-12%] h-[124%] w-[114%] overflow-visible"
      >
        <motion.path
          d="M150 6 C 60 4, 8 24, 8 52 C 8 82, 78 96, 156 95 C 236 94, 293 78, 292 48 C 291 20, 232 5, 136 9"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1, delay, ease: EASE }}
        />
      </svg>
    </span>
  )
}

/** A hairline that extends from the left edge */
export function Rule({
  className,
  delay = 0,
  origin = "left",
}: {
  className?: string
  delay?: number
  origin?: "left" | "center"
}) {
  const reduce = useReducedMotion()
  return (
    <motion.span
      aria-hidden="true"
      className={cn("block h-px w-full bg-current", className)}
      style={{ transformOrigin: origin }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  )
}

/**
 * A dimension line: end ticks, arrowheads and a centred measurement,
 * extending outward from the middle like a drafter pulling a tape.
 */
export function Dimension({
  label,
  className,
  delay = 0,
}: {
  label: string
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  return (
    <div className={cn("flex items-center text-redline", className)} aria-hidden="true">
      <span className="h-3 w-px bg-current" />
      <motion.span
        className="relative h-px flex-1 bg-current"
        style={{ transformOrigin: "right" }}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        <span className="absolute left-0 top-1/2 -translate-y-1/2 border-y-[3px] border-r-[7px] border-y-transparent border-r-current" />
      </motion.span>
      <motion.span
        className="label whitespace-nowrap px-3 font-medium"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, delay: delay + 0.5 }}
      >
        {label}
      </motion.span>
      <motion.span
        className="relative h-px flex-1 bg-current"
        style={{ transformOrigin: "left" }}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        <span className="absolute right-0 top-1/2 -translate-y-1/2 border-y-[3px] border-l-[7px] border-y-transparent border-l-current" />
      </motion.span>
      <span className="h-3 w-px bg-current" />
    </div>
  )
}

/** A rubber stamp that lands with a slight overshoot */
export function Stamp({
  children,
  className,
  delay = 0.9,
  rotate = -8,
}: {
  children: ReactNode
  className?: string
  delay?: number
  rotate?: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      aria-hidden="true"
      className={cn(
        "label inline-block select-none rounded-[3px] border-2 border-current px-2.5 py-1.5 text-center font-semibold leading-tight text-redline",
        className
      )}
      style={{ rotate }}
      initial={reduce ? false : { opacity: 0, scale: 1.9 }}
      whileInView={{ opacity: 0.92, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.28, delay, ease: [0.3, 1.4, 0.5, 1] }}
    >
      {children}
    </motion.div>
  )
}
