"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Search,
  Wrench,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  TrendingUp,
  Globe,
  ArrowRight,
} from "lucide-react"

type HelpCard = {
  id: string
  icon: React.ComponentType<{ size?: number | string }>
  title: string
  desc: string
  variant: "gold" | "cyan"
}

const HELP_CARDS: HelpCard[] = [
  {
    id: "audit",
    icon: Search,
    title: "AI Opportunity Audit",
    desc: "We review your business operations and identify the 3–5 highest-impact places where AI can save you time or make you more money — with a clear action plan.",
    variant: "gold",
  },
  {
    id: "setup",
    icon: Wrench,
    title: "Done-For-You AI Setup",
    desc: "We don't just advise — we build it. We set up, configure, and connect AI tools to your existing systems so everything works from day one.",
    variant: "cyan",
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Staff AI Training",
    desc: "Practical, hands-on workshops for your team. We teach your employees how to use AI tools confidently in their daily work — no prior experience needed.",
    variant: "gold",
  },
  {
    id: "chatbots",
    icon: MessageCircle,
    title: "AI Chatbots & Virtual Assistants",
    desc: "We build AI assistants that handle customer questions, bookings, and follow-ups on your website, WhatsApp, Instagram, and more — all connected together.",
    variant: "cyan",
  },
  {
    id: "dashboard",
    icon: LayoutDashboard,
    title: "Business Intelligence Dashboards",
    desc: "Turn your sales, customer, and operations data into clear AI-powered dashboards — so you can make better decisions without drowning in spreadsheets.",
    variant: "gold",
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "AI-Powered Marketing",
    desc: "We build AI systems that write your social content, email campaigns, and ads — and optimize them automatically based on what actually drives conversions.",
    variant: "cyan",
  },
  {
    id: "website",
    icon: Globe,
    title: "AI-Enhanced Website & Store",
    desc: "Your website becomes a 24/7 sales tool — with AI chat, smart product recommendations, automated lead capture, and SEO optimized for local search.",
    variant: "gold",
  },
  {
    id: "support",
    icon: Headphones,
    title: "Ongoing AI Support & Optimization",
    desc: "AI tools evolve fast. We keep yours up to date, monitor performance, and continuously find new ways to get more value out of what you've already built.",
    variant: "cyan",
  },
]

export default function HowWeHelpSection() {
  return (
    <section
      id="how-we-help"
      aria-labelledby="how-we-help-heading"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Ambient orb left */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 640,
          height: 640,
          bottom: "0%",
          left: "-15%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)",
          filter: "blur(2px)",
        }}
      />

      <span
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(82,193,220,0.18), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 gap-3">
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--cyan-primary)" }}
          >
            How we help
          </span>
          <h2
            id="how-we-help-heading"
            className="font-display text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl"
            style={{ color: "var(--text-strong)" }}
          >
            Every way we can implement AI{" "}
            <span className="gradient-text">in your business.</span>
          </h2>
          <p
            className="max-w-2xl text-sm md:text-base leading-relaxed"
            style={{ color: "var(--text-subtle)" }}
          >
            Whether you're starting from zero or ready to go deeper, we meet you
            where you are and build the AI capabilities your business needs.
          </p>
        </div>

        {/* Grid */}
        <ul
          aria-label="Ways Hijaz.ai helps small businesses implement AI"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {HELP_CARDS.map((card, index) => {
            const color =
              card.variant === "gold"
                ? "var(--gold-primary)"
                : "var(--cyan-primary)"
            const colorRgb =
              card.variant === "gold" ? "201,168,76" : "82,193,220"
            const Icon = card.icon
            return (
              <motion.li
                key={card.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: (index % 4) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex flex-col gap-4 p-6 rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--surface-border)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Hover glow */}
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 20% 0%, rgba(${colorRgb},0.10) 0%, transparent 60%)`,
                  }}
                />
                {/* Top accent */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                  }}
                />

                <span
                  className="relative flex items-center justify-center w-11 h-11 rounded-xl"
                  style={{
                    background: `rgba(${colorRgb},0.10)`,
                    border: `1px solid rgba(${colorRgb},0.28)`,
                    color,
                  }}
                  aria-hidden
                >
                  <Icon size={20} />
                </span>

                <h3
                  className="relative font-display text-base md:text-lg font-semibold leading-snug"
                  style={{ color: "var(--text-strong)" }}
                >
                  {card.title}
                </h3>

                <p
                  className="relative text-sm leading-relaxed"
                  style={{ color: "var(--text-medium)" }}
                >
                  {card.desc}
                </p>
              </motion.li>
            )
          })}
        </ul>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <p
            className="text-sm md:text-base max-w-xl"
            style={{ color: "var(--text-subtle)" }}
          >
            Not sure where to start? Book a free 15-minute call and we'll tell you
            exactly which of these will have the biggest impact for your business.
          </p>
          <Link
            href="/contact?intent=call"
            className="inline-flex items-center gap-2 px-7 h-12 rounded-full text-sm font-semibold transition-all"
            style={{
              background: "linear-gradient(135deg, #B8922A, #D4A83A)",
              color: "#fff",
              boxShadow: "0 0 24px rgba(201,168,76,0.30)",
            }}
          >
            Book a free 15-min call
            <ArrowRight size={15} aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
