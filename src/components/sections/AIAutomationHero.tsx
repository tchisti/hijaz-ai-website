"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import {
  ArrowRight,
  Bot,
  Check,
  MapPin,
  MousePointer2,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const AIPipelineScene = dynamic(
  () => import("@/components/three/AIPipelineScene"),
  { ssr: false },
)

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
}

const outcomes = [
  { icon: Zap, label: "Save time" },
  { icon: Users, label: "Win customers" },
  { icon: TrendingUp, label: "Scale smarter" },
]

const loopSteps = [
  { icon: Users, label: "Attract", detail: "more qualified leads" },
  { icon: Bot, label: "Automate", detail: "repetitive work" },
  { icon: TrendingUp, label: "Grow", detail: "with less overhead" },
]

export default function AIAutomationHero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 54])
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, 86])
  const fadeOut = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 sm:pt-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 size-[32rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-48 -left-48 size-[30rem] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/.22)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/.22)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:gap-10 lg:px-8 lg:pb-24">
        <motion.div
          className="flex flex-col items-start gap-7"
          initial={false}
          animate="visible"
          variants={stagger}
          style={{ y: reduceMotion ? 0 : yContent, opacity: fadeOut }}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary"
          >
            <Sparkles className="size-3.5" aria-hidden />
            AI-powered growth for local businesses
          </motion.div>

          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="max-w-3xl text-balance font-display text-5xl font-bold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-7xl"
          >
            Turn AI into your{" "}
            <span className="gradient-text text-glow-gold">unfair business advantage.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            We help local businesses attract more leads, automate repetitive work,
            and build a stronger digital presence—without the technical overwhelm.
          </motion.p>

          <motion.div variants={fadeUp} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" className="h-12 w-full px-7 text-base font-semibold shadow-[0_12px_40px_hsl(var(--primary)/.24)] sm:w-auto">
                <Link href="/contact?intent=call">
                  Book your free strategy call
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" variant="outline" className="h-12 w-full bg-background/50 px-7 text-base backdrop-blur-md sm:w-auto">
                <Link href="#use-cases">See how we help</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border/70 pt-5">
            {outcomes.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-sm font-medium text-foreground/75">
                <span className="flex size-6 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-primary" aria-hidden /> No tech background needed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" aria-hidden /> Toronto-based, serving Canada
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
          initial={{ opacity: 0, scale: 0.96, x: 18 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: reduceMotion ? 0 : yVisual, opacity: fadeOut }}
        >
          <div className="glass relative overflow-hidden rounded-3xl p-3 shadow-2xl shadow-primary/10 sm:p-4">
            <div aria-hidden className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className="relative h-[370px] overflow-hidden rounded-2xl bg-secondary/55 sm:h-[430px] lg:h-[500px]">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-4 sm:p-5">
                <div className="rounded-full border border-border/80 bg-background/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-md">
                  Your AI growth engine
                </div>
                <div className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                  <MousePointer2 className="size-3.5" aria-hidden /> Move to explore
                </div>
              </div>

              <AIPipelineScene />

              <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 grid grid-cols-3 gap-2 sm:inset-x-4 sm:bottom-4">
                {loopSteps.map(({ icon: Icon, label, detail }, index) => (
                  <motion.div
                    key={label}
                    className="rounded-xl border border-border/80 bg-background/75 p-3 backdrop-blur-lg"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.12 }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 text-primary" aria-hidden />
                      <span className="text-xs font-semibold text-foreground sm:text-sm">{label}</span>
                    </div>
                    <p className="mt-1 hidden text-[11px] text-muted-foreground sm:block">{detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-gradient-to-br from-primary/15 via-transparent to-accent/15 blur-xl" />
        </motion.div>
      </div>
    </section>
  )
}
