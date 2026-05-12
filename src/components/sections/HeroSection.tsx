"use client"

import Link from "next/link"
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, MapPin, ShieldCheck } from "lucide-react"

/* ─── Animation variants ──────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
}

/* ─── Typewriter word cycler ─────────────────────────────────────────────── */
const CYCLE_WORDS = ["Automation", "Web Design", "Shopify", "Marketing", "Growth"]

function WordCycler() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % CYCLE_WORDS.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <span
      className="relative inline-block"
      /* Reserve width for the longest word so the line never reflows */
      style={{ minWidth: "10ch" }}
    >
      {/* Invisible spacer keeps the row height stable */}
      <span aria-hidden className="invisible select-none">
        {CYCLE_WORDS.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: "var(--gold-primary)" }}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {CYCLE_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

/* ─── Glowing badge ───────────────────────────────────────────────────────── */
function GlowBadge() {
  return (
    <motion.div variants={fadeUp} className="inline-flex items-center gap-2 relative">
      <span
        className="absolute inset-0 rounded-full blur-md"
        style={{ background: "var(--glow-gold)" }}
      />
      <span
        className="relative inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full"
        style={{
          background: "rgba(184,146,42,0.08)",
          border: "1px solid rgba(184,146,42,0.22)",
          color: "var(--gold-primary)",
          letterSpacing: "0.12em",
        }}
      >
        <Star size={12} fill="currentColor" />
        GTA&apos;s #1 AI &amp; Digital Agency
        <Star size={12} fill="currentColor" />
      </span>
    </motion.div>
  )
}

/* ─── Scroll indicator ───────────────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
    >
      <span
        className="text-xs tracking-[0.2em] uppercase"
        style={{ color: "rgba(184,146,42,0.4)" }}
      >
        Scroll
      </span>
      <motion.div
        className="w-px h-8"
        style={{
          background:
            "linear-gradient(to bottom, rgba(184,146,42,0.4), transparent)",
        }}
        animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  )
}

/* ─── Stat pill ──────────────────────────────────────────────────────────── */
function StatPill({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <motion.span
      variants={fadeUp}
      className="flex items-center gap-2 text-sm px-4 py-2 rounded-full"
      style={{
        background: "var(--surface-subtle)",
        border: "1px solid var(--surface-border)",
        color: "var(--text-subtle)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      whileHover={{
        background: "rgba(184,146,42,0.09)",
        borderColor: "rgba(184,146,42,0.22)",
        color: "var(--gold-primary)",
        scale: 1.04,
        transition: { duration: 0.2 },
      }}
    >
      <span style={{ color: "var(--gold-primary)" }}>{icon}</span>
      {children}
    </motion.span>
  )
}

/* ─── HeroSection ────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  /*
   * Gentle parallax: the content drifts up only 40 px over the full scroll
   * distance, staying well within the visible viewport so text never escapes
   * its readable zone. Spring is heavily damped to prevent springy overshoot.
   */
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const smoothY = useSpring(heroY, { stiffness: 60, damping: 28, mass: 0.8 })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      /* The global AnimatedBackground handles the base colour — keep transparent */
      style={{ background: "transparent" }}
    >
      {/*
       * Soft radial wash centred on the content column.
       * This creates a subtle "stage light" effect that lifts text off the
       * animated background without adding competing motion elements.
       */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 68% 55% at 50% 48%, rgba(var(--hero-wash-rgb, 248,247,243), 0.18) 0%, transparent 75%)",
        }}
      />

      {/* Main content — only this block moves on scroll */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y: smoothY, opacity: heroOpacity }}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="flex flex-col items-center gap-7"
        >
          <GlowBadge />

          {/*
           * Heading: line-height is bumped to 1.05 so the descenders of
           * animated words don't overlap the next line.
           */}
          <motion.h1
            variants={fadeUp}
            className="font-display font-bold tracking-tight text-pretty"
            style={{
              fontSize: "clamp(2.75rem, 8vw, 5.5rem)",
              lineHeight: 1.05,
              color: "var(--text-strong)",
              /*
               * Backdrop blur behind the heading text prevents particle /
               * orb animation from rendering through letterforms.
               */
              textShadow:
                "0 2px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            Toronto&apos;s AI &amp;{" "}
            <br className="hidden sm:block" />
            <WordCycler />
            <br className="hidden sm:block" />
            <span style={{ color: "var(--text-medium)", fontWeight: 400 }}>
              Partner
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-lg sm:text-xl leading-relaxed font-sans"
            style={{ color: "var(--text-subtle)" }}
          >
            Stop losing customers to competitors.{" "}
            <span style={{ color: "var(--text-medium)" }}>Hijaz.ai</span> automates
            your workflows, builds your digital presence, and drives real growth —
            all from one trusted Toronto team.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-1"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden group text-base px-8 h-12 font-semibold"
                style={{
                  background: "linear-gradient(135deg, #B8922A, #D4A83A)",
                  color: "#fff",
                  border: "none",
                  boxShadow:
                    "0 0 28px rgba(184,146,42,0.3), 0 4px 14px rgba(0,0,0,0.14)",
                }}
              >
                <Link href="/contact">
                  <span className="relative z-10 flex items-center gap-2">
                    Book Free Consultation
                    <ArrowRight size={16} />
                  </span>
                  <motion.span
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                    }}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 h-12 font-medium"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--text-medium)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <Link href="/services">See Our Services</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            className="flex flex-wrap items-center justify-center gap-3 mt-3"
          >
            <StatPill icon={<Star size={13} fill="currentColor" />}>
              4.9 / 5 &nbsp;·&nbsp; 30+ Reviews
            </StatPill>
            <StatPill icon={<MapPin size={13} />}>Toronto-Based</StatPill>
            <StatPill icon={<ShieldCheck size={13} />}>
              100% Satisfaction Guarantee
            </StatPill>
          </motion.div>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
