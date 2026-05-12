"use client"

import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Sparkles, Star, MapPin, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ─── Animation primitives ──────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

/* ─── Trust badge ────────────────────────────────────────────────────────── */
function TrustPill({
  icon,
  children,
}: {
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <span
      className="flex items-center gap-2 text-sm px-4 py-2 rounded-full"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--surface-border)",
        color: "var(--text-subtle)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <span style={{ color: "var(--gold-primary)" }}>{icon}</span>
      {children}
    </span>
  )
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function AIAutomationHero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()

  /* Parallax on scroll */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 80])
  const fadeOut = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* ── Ambient background elements (pushed to edges) ─────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-right gold glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: "-15%",
            right: "-10%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.03) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Bottom-left cyan glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            bottom: "-12%",
            left: "-8%",
            background:
              "radial-gradient(circle, rgba(82,193,220,0.1) 0%, rgba(82,193,220,0.02) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Subtle center radial for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(201,168,76,0.03) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-24 sm:pb-32 flex flex-col items-center text-center min-h-screen justify-center"
        style={{ y: reduceMotion ? 0 : yContent, opacity: fadeOut }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase px-5 py-2 rounded-full"
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "1px solid rgba(201,168,76,0.22)",
              color: "var(--gold-primary)",
            }}
          >
            <Sparkles size={12} />
            AI Automation Pipeline
          </motion.span>

          {/* Headline */}
          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="font-display font-bold tracking-tight text-balance"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
              lineHeight: 1.08,
              color: "var(--text-strong)",
            }}
          >
            From raw data to
            <br />
            <span className="gradient-text">automated action</span>
            <br />
            <span style={{ color: "var(--text-medium)", fontWeight: 400 }}>
              — in one pipeline.
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--text-subtle)" }}
          >
            Hijaz.ai connects your messy inputs to intelligent processing and
            real-world actions. Less manual work. Faster decisions. Measurable
            ROI for Toronto businesses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden text-base px-8 h-12 font-semibold"
                style={{
                  background: "linear-gradient(135deg, #B8922A, #D4A83A)",
                  color: "#fff",
                  border: "none",
                  boxShadow:
                    "0 0 24px rgba(201,168,76,0.3), 0 4px 14px rgba(0,0,0,0.2)",
                }}
              >
                <Link href="/contact?intent=demo">
                  <span className="relative z-10 inline-flex items-center gap-2">
                    Request a 15-min demo
                    <ArrowRight size={16} aria-hidden />
                  </span>
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
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--text-strong)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <Link href="#services">See the pipeline in action</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
          >
            <TrustPill icon={<Star size={13} fill="currentColor" />}>
              4.9 / 5 &nbsp;·&nbsp; 30+ Reviews
            </TrustPill>
            <TrustPill icon={<MapPin size={13} />}>Toronto-Based</TrustPill>
            <TrustPill icon={<ShieldCheck size={13} />}>
              100% Satisfaction
            </TrustPill>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ────────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span
          className="text-[10px] tracking-[0.22em] uppercase"
          style={{ color: "rgba(201,168,76,0.45)" }}
        >
          Scroll
        </span>
        <motion.span
          className="block w-px h-7"
          style={{
            background:
              "linear-gradient(to bottom, rgba(201,168,76,0.45), transparent)",
            transformOrigin: "top",
          }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
