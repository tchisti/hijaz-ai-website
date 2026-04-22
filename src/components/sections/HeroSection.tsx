"use client"

import Link from "next/link"
import {
  motion,
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
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
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
    <span className="relative inline-block">
      <motion.span
        key={index}
        className="text-[#C9A84C] dark:text-[#C9A84C]"
        style={{ color: "var(--gold-primary)" }}
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {CYCLE_WORDS[index]}
      </motion.span>
    </span>
  )
}

/* ─── Animated background orbs ───────────────────────────────────────────── */
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Warm gold orb — top right */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          top: "-15%",
          right: "-10%",
          background:
            "radial-gradient(circle, rgba(184,146,42,0.13) 0%, rgba(184,146,42,0.05) 50%, transparent 70%)",
          filter: "blur(1px)",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -25, 15, 0],
          scale: [1, 1.06, 0.97, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyan orb — bottom left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          bottom: "-10%",
          left: "-8%",
          background:
            "radial-gradient(circle, rgba(26,122,154,0.10) 0%, rgba(26,122,154,0.04) 50%, transparent 70%)",
          filter: "blur(1px)",
        }}
        animate={{
          x: [0, -20, 25, 0],
          y: [0, 20, -15, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Small warm accent — center left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 320,
          height: 320,
          top: "35%",
          left: "5%",
          background:
            "radial-gradient(circle, rgba(184,146,42,0.08) 0%, transparent 65%)",
        }}
        animate={{
          x: [0, 15, -10, 0],
          y: [0, -18, 10, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      {/* Dot grid — light theme only */}
      <div
        className="absolute inset-0 dark:opacity-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(10,12,22,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Top-edge soft gradient wash — lifts the section cleanly */}
      <div
        className="absolute inset-x-0 top-0 h-64"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, transparent 100%)",
        }}
      />
    </div>
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
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
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

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 20 })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      <HeroBackground />

      {/* Horizontal accent lines */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          top: "calc(50% - 160px)",
          background:
            "linear-gradient(90deg, transparent, rgba(184,146,42,0.1), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          top: "calc(50% + 160px)",
          background:
            "linear-gradient(90deg, transparent, rgba(26,122,154,0.08), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y: smoothY, opacity: heroOpacity }}
      >
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="flex flex-col items-center gap-6"
        >
          <GlowBadge />

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight text-pretty"
            style={{ color: "var(--text-strong)" }}
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
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2"
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
                    "0 0 28px rgba(184,146,42,0.25), 0 4px 14px rgba(0,0,0,0.12)",
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
                  background: "rgba(255,255,255,0.6)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--text-medium)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Link href="/services">See Our Services</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            className="flex flex-wrap items-center justify-center gap-3 mt-4"
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
