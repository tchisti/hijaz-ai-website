"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Database, Cpu, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

/* Lazy-load the Three.js scene only on capable, non-mobile devices.
 * `ssr: false` keeps the initial HTML lean for SEO; the page is server-rendered,
 * the 3D layer hydrates after first paint. */
const AIPipelineScene = dynamic(() => import("@/components/three/AIPipelineScene"), {
  ssr: false,
  loading: () => null,
})

/* ─── Animation primitives ──────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

/* ─── Stage chip ─────────────────────────────────────────────────────────── */
function StageChip({
  icon: Icon,
  label,
  sublabel,
  variant,
}: {
  icon: React.ElementType
  label: string
  sublabel: string
  variant: "cyan" | "gold"
}) {
  const color =
    variant === "gold" ? "var(--gold-primary)" : "var(--cyan-primary)"
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-md"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${color}33`,
        boxShadow: `0 0 24px ${color}22`,
      }}
    >
      <span
        className="flex items-center justify-center w-9 h-9 rounded-xl"
        style={{
          background: `${color}1A`,
          border: `1px solid ${color}40`,
          color,
        }}
        aria-hidden
      >
        <Icon size={18} />
      </span>
      <div className="flex flex-col leading-tight">
        <span
          className="text-[10px] font-semibold tracking-[0.18em] uppercase"
          style={{ color }}
        >
          {sublabel}
        </span>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--text-strong)" }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function AIAutomationHero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const [enable3D, setEnable3D] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Detect capability for 3D: viewport >= md, no reduced motion, no save-data
  useEffect(() => {
    setMounted(true)
    if (typeof window === "undefined") return
    const mql = window.matchMedia("(min-width: 768px)")
    interface NavigatorWithConn extends Navigator {
      connection?: { saveData?: boolean }
    }
    const conn = (navigator as NavigatorWithConn).connection
    const saveData = conn?.saveData === true
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setEnable3D(mql.matches && !saveData && !prefersReduced)
    const handler = (e: MediaQueryListEvent) => setEnable3D(e.matches && !saveData && !prefersReduced)
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  /* Layered parallax on scroll */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 60])
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 120])
  const yFront = useTransform(scrollYProgress, [0, 1], [0, 200])
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* ── Layer 1: ambient orbs (parallax back) ─────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ y: reduceMotion ? 0 : yBack }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 760,
            height: 760,
            top: "-22%",
            right: "-12%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.04) 50%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 640,
            height: 640,
            bottom: "-18%",
            left: "-10%",
            background:
              "radial-gradient(circle, rgba(82,193,220,0.14) 0%, rgba(82,193,220,0.03) 50%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── Layer 2: 3D scene (parallax mid) — desktop only ───────────────── */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ y: reduceMotion ? 0 : yMid, opacity: fadeOut }}
      >
        {/* Static fallback (mobile, reduced motion, save-data) */}
        {(!enable3D || !mounted) && (
          <div className="relative w-full h-full">
            <Image
              src="/images/hero/ai-pipeline-fallback.jpg"
              alt=""
              role="presentation"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-60 md:opacity-50"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 0%, rgba(3,5,15,0.4) 50%, var(--bg-base) 90%)",
              }}
            />
          </div>
        )}

        {/* Three.js canvas — lazy, capability-gated */}
        {enable3D && mounted && (
          <div className="absolute inset-0">
            <AIPipelineScene />
            {/* Vignette to keep text legible */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 30%, rgba(3,5,15,0.55) 75%, var(--bg-base) 100%)",
              }}
            />
          </div>
        )}
      </motion.div>

      {/* ── Layer 3: foreground content ───────────────────────────────────── */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-20 md:pb-28 flex flex-col items-center text-center min-h-[100svh] justify-center"
        style={{ y: reduceMotion ? 0 : yFront }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col items-center gap-6 md:gap-8"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase px-4 py-2 rounded-full"
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.25)",
              color: "var(--gold-primary)",
            }}
          >
            <Sparkles size={12} />
            AI Automation Pipeline
          </motion.span>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight text-balance max-w-4xl"
            style={{ color: "var(--text-strong)" }}
          >
            From raw data to{" "}
            <span className="gradient-text">automated action</span>
            <span style={{ color: "var(--text-medium)" }}> — in one pipeline.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-subtle)" }}
          >
            Hijaz.ai connects your messy inputs to intelligent processing and
            real-world actions. Less manual work. Faster decisions. Measurable
            ROI for Toronto businesses.
          </motion.p>

          {/* Pipeline stage chips — visible labels for the 3D scene */}
          <motion.ol
            variants={fadeUp}
            aria-label="Automation pipeline stages"
            className="flex flex-col sm:flex-row items-stretch justify-center gap-2 sm:gap-3 mt-2 w-full max-w-3xl"
          >
            <li className="flex-1">
              <StageChip
                icon={Database}
                sublabel="01 / Input"
                label="Data ingestion"
                variant="cyan"
              />
            </li>
            <li
              className="hidden sm:flex items-center justify-center text-2xl"
              style={{ color: "var(--text-muted-custom)" }}
              aria-hidden
            >
              →
            </li>
            <li className="flex-1">
              <StageChip
                icon={Cpu}
                sublabel="02 / Process"
                label="AI reasoning"
                variant="gold"
              />
            </li>
            <li
              className="hidden sm:flex items-center justify-center text-2xl"
              style={{ color: "var(--text-muted-custom)" }}
              aria-hidden
            >
              →
            </li>
            <li className="flex-1">
              <StageChip
                icon={Zap}
                sublabel="03 / Action"
                label="Automated workflows"
                variant="cyan"
              />
            </li>
          </motion.ol>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2"
          >
            <Button
              asChild
              size="lg"
              className="relative overflow-hidden text-base px-8 h-12 font-semibold"
              style={{
                background: "linear-gradient(135deg, #B8922A, #D4A83A)",
                color: "#fff",
                border: "none",
                boxShadow:
                  "0 0 28px rgba(201,168,76,0.35), 0 4px 16px rgba(0,0,0,0.25)",
              }}
            >
              <Link href="/contact?intent=demo">
                <span className="relative z-10 inline-flex items-center gap-2">
                  Request a 15-min demo
                  <ArrowRight size={16} aria-hidden />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base px-8 h-12 font-medium"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--surface-border)",
                color: "var(--text-strong)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Link href="#services">See the pipeline in action</Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ────────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span
          className="text-[10px] tracking-[0.24em] uppercase"
          style={{ color: "rgba(201,168,76,0.5)" }}
        >
          Scroll
        </span>
        <motion.span
          className="block w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)",
            transformOrigin: "top",
          }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
