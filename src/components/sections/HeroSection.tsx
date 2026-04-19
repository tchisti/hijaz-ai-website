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
        className="text-[#C9A84C]"
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

/* ─── Glowing badge ───────────────────────────────────────────────────────── */
function GlowBadge() {
  return (
    <motion.div
      variants={fadeUp}
      className="inline-flex items-center gap-2 relative"
    >
      {/* Glow */}
      <span
        className="absolute inset-0 rounded-full blur-md"
        style={{ background: "rgba(201,168,76,0.15)" }}
      />
      <span
        className="relative inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full"
        style={{
          background: "rgba(201,168,76,0.08)",
          border: "1px solid rgba(201,168,76,0.25)",
          color: "#C9A84C",
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
        style={{ color: "rgba(201,168,76,0.4)" }}
      >
        Scroll
      </span>
      <motion.div
        className="w-px h-8"
        style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)" }}
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
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(8px)",
      }}
      whileHover={{
        background: "rgba(201,168,76,0.08)",
        borderColor: "rgba(201,168,76,0.2)",
        color: "rgba(201,168,76,0.9)",
        scale: 1.04,
        transition: { duration: 0.2 },
      }}
    >
      <span style={{ color: "#C9A84C" }}>{icon}</span>
      {children}
    </motion.span>
  )
}

/* ─── HeroSection ────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 20 })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Hero-specific layered glass panel */}
      <div
        className="absolute inset-x-0 top-0 h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(10,15,44,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal accent lines */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          top: "calc(50% - 160px)",
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.08), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          top: "calc(50% + 160px)",
          background: "linear-gradient(90deg, transparent, rgba(82,193,220,0.06), transparent)",
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
          {/* Badge */}
          <GlowBadge />

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight text-pretty"
            style={{ color: "rgba(255,255,255,0.94)" }}
          >
            Toronto&apos;s AI &amp;{" "}
            <br className="hidden sm:block" />
            <WordCycler />
            <br className="hidden sm:block" />
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 400 }}>
              Partner
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-lg sm:text-xl leading-relaxed font-sans"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Stop losing customers to competitors.{" "}
            <span style={{ color: "rgba(255,255,255,0.75)" }}>Hijaz.ai</span> automates
            your workflows, builds your digital presence, and drives real growth —
            all from one trusted Toronto team.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden group text-base px-8 h-12 font-semibold"
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #E8C46A)",
                  color: "#03050F",
                  border: "none",
                  boxShadow: "0 0 30px rgba(201,168,76,0.3), 0 4px 16px rgba(0,0,0,0.4)",
                }}
              >
                <Link href="/contact">
                  <span className="relative z-10 flex items-center gap-2">
                    Book Free Consultation
                    <ArrowRight size={16} />
                  </span>
                  {/* Shimmer */}
                  <motion.span
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                    }}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-base px-8 h-12 font-medium"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Link href="/services">See Our Services</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats row */}
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

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  )
}
