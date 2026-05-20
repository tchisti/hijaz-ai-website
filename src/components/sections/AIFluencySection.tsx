"use client"

import { motion } from "framer-motion"
import {
  BookOpen,
  Lightbulb,
  Users,
  Target,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

const PILLARS = [
  {
    icon: BookOpen,
    title: "What is AI — and why it matters for small business",
    desc: "Most business owners hear 'AI' and think robots or Silicon Valley. We break it down to what it actually means for a shop, clinic, or service company like yours.",
    variant: "gold" as const,
  },
  {
    icon: Lightbulb,
    title: "Which AI tools are worth your time",
    desc: "There are thousands of AI tools. We cut through the noise and show you the 5–10 that will actually move the needle for your specific type of business.",
    variant: "cyan" as const,
  },
  {
    icon: Users,
    title: "How to get your team using AI confidently",
    desc: "AI only helps if your staff actually use it. We run hands-on sessions that turn skeptical employees into confident AI users — usually in a single afternoon.",
    variant: "gold" as const,
  },
  {
    icon: Target,
    title: "Building an AI habit that sticks",
    desc: "We help you embed AI into your existing daily routines — so it becomes a natural part of how your business runs, not another tool that collects dust.",
    variant: "cyan" as const,
  },
]

const WHAT_YOU_LEARN = [
  "How to use ChatGPT and other AI assistants for customer communication and content",
  "How to automate email, social media, and scheduling without hiring extra staff",
  "How to use AI to write quotes, proposals, and job descriptions in minutes",
  "How to analyze your sales data and spot opportunities with AI-powered reports",
  "Which free and low-cost AI tools are available right now for small businesses",
  "How to spot AI misinformation and use these tools responsibly",
]

export default function AIFluencySection() {
  return (
    <section
      id="ai-fluency"
      aria-labelledby="ai-fluency-heading"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Ambient orb */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: "10%",
          right: "-15%",
          background:
            "radial-gradient(circle, rgba(82,193,220,0.07) 0%, transparent 65%)",
          filter: "blur(2px)",
        }}
      />

      <span
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 gap-3">
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--gold-primary)" }}
          >
            AI fluency for small businesses
          </span>
          <h2
            id="ai-fluency-heading"
            className="font-display text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl"
            style={{ color: "var(--text-strong)" }}
          >
            You don't need to be a tech expert.{" "}
            <span className="gradient-text">You need to be AI-fluent.</span>
          </h2>
          <p
            className="max-w-2xl text-sm md:text-base leading-relaxed"
            style={{ color: "var(--text-subtle)" }}
          >
            AI fluency doesn't mean coding or understanding algorithms. It means
            knowing which tools exist, how to use them daily, and how to apply
            them to your business goals. That's exactly what we teach.
          </p>
        </div>

        {/* Two-column layout: pillars + what you learn */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left: Pillars */}
          <div className="flex flex-col gap-4">
            {PILLARS.map((pillar, index) => {
              const color =
                pillar.variant === "gold"
                  ? "var(--gold-primary)"
                  : "var(--cyan-primary)"
              const colorRgb =
                pillar.variant === "gold" ? "201,168,76" : "82,193,220"
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative flex gap-4 p-5 rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--surface-border)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 0% 50%, rgba(${colorRgb},0.08) 0%, transparent 60%)`,
                    }}
                  />
                  <span
                    className="relative shrink-0 flex items-center justify-center w-11 h-11 rounded-xl mt-0.5"
                    style={{
                      background: `rgba(${colorRgb},0.10)`,
                      border: `1px solid rgba(${colorRgb},0.28)`,
                      color,
                    }}
                    aria-hidden
                  >
                    <Icon size={20} />
                  </span>
                  <div className="relative flex flex-col gap-1.5">
                    <h3
                      className="font-display font-semibold text-base leading-snug"
                      style={{ color: "var(--text-strong)" }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-medium)" }}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right: What you'll learn list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col gap-6 p-7 md:p-9 rounded-3xl overflow-hidden self-start lg:sticky lg:top-28"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--surface-border)",
              backdropFilter: "blur(14px)",
            }}
          >
            {/* Accent top bar */}
            <span
              aria-hidden
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--gold-primary), transparent)",
                opacity: 0.5,
              }}
            />

            <div className="flex flex-col gap-2">
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: "var(--gold-primary)" }}
              >
                In our AI fluency workshop
              </span>
              <h3
                className="font-display text-2xl font-bold leading-snug"
                style={{ color: "var(--text-strong)" }}
              >
                What you'll walk away knowing
              </h3>
            </div>

            <ul className="flex flex-col gap-3" aria-label="Workshop learning outcomes">
              {WHAT_YOU_LEARN.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                  style={{ color: "var(--text-medium)" }}
                >
                  <ChevronRight
                    size={15}
                    className="shrink-0 mt-0.5"
                    style={{ color: "var(--gold-primary)" }}
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t" style={{ borderColor: "var(--surface-border)" }}>
              <Link
                href="/contact?intent=call&service=ai-training"
                className="inline-flex items-center gap-2 px-6 h-11 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: "linear-gradient(135deg, #B8922A, #D4A83A)",
                  color: "#fff",
                  boxShadow: "0 0 22px rgba(201,168,76,0.30)",
                }}
              >
                Book a free 15-min call
                <ChevronRight size={15} aria-hidden />
              </Link>
              <p
                className="mt-3 text-xs"
                style={{ color: "var(--text-subtle)" }}
              >
                Book a 15-minute call to learn AI tailored to your business.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
