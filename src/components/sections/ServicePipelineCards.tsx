"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import {
  Bot,
  Code2,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
  Check,
  PlayCircle,
} from "lucide-react"

/* ─── Service card definitions ───────────────────────────────────────────── */
type Outcome = { metric: string; label: string }
type ServiceCard = {
  id: string
  title: string
  pitch: string
  icon: React.ElementType
  variant: "gold" | "cyan"
  href: string
  outcomes: Outcome[]
  steps: string[]
}

const SERVICES: ServiceCard[] = [
  {
    id: "ai-automation",
    title: "AI Receptionist & Workflow",
    pitch: "24/7 conversational AI that books, qualifies, and routes — wired to your CRM.",
    icon: Bot,
    variant: "gold",
    href: "/services#ai-automation",
    outcomes: [
      { metric: "−18h", label: "manual phone work / week" },
      { metric: "+212%", label: "after-hours leads captured" },
      { metric: "<90s", label: "avg. response time" },
    ],
    steps: [
      "Discovery & intent mapping",
      "Custom training on your data",
      "Calendar / CRM integration",
      "Live deployment in 7 days",
    ],
  },
  {
    id: "web-development",
    title: "Conversion-Ready Web",
    pitch: "Next.js sites that load in under 1.5s and turn traffic into measurable revenue.",
    icon: Code2,
    variant: "cyan",
    href: "/services#web-development",
    outcomes: [
      { metric: "1.4s", label: "avg. LCP, mobile" },
      { metric: "+64%", label: "conversion vs. previous site" },
      { metric: "100", label: "Lighthouse SEO score" },
    ],
    steps: [
      "UX audit & wireframes",
      "Server-rendered build (Next.js)",
      "CMS for non-technical edits",
      "Launch & analytics handoff",
    ],
  },
  {
    id: "shopify",
    title: "Shopify Growth Stack",
    pitch: "Stores designed to convert and scale — from product strategy to checkout.",
    icon: ShoppingBag,
    variant: "gold",
    href: "/services#shopify",
    outcomes: [
      { metric: "+47%", label: "checkout completion" },
      { metric: "$40K", label: "avg. first-quarter revenue" },
      { metric: "5 days", label: "store launch time" },
    ],
    steps: [
      "Brand & product strategy",
      "Theme + custom sections",
      "Payment & shipping setup",
      "Post-launch optimization",
    ],
  },
  {
    id: "marketing",
    title: "Performance Marketing",
    pitch: "Local SEO and paid acquisition tuned for the GTA — only metrics that move revenue.",
    icon: TrendingUp,
    variant: "cyan",
    href: "/services#digital-marketing",
    outcomes: [
      { metric: "3.4x", label: "ROAS on Google Ads" },
      { metric: "Top 3", label: "local map pack ranking" },
      { metric: "−38%", label: "cost per qualified lead" },
    ],
    steps: [
      "Keyword & competitor audit",
      "Local SEO foundation",
      "Paid campaign launch",
      "Monthly reporting & iteration",
    ],
  },
]

/* ─── Single card ────────────────────────────────────────────────────────── */
function Card({ service, index }: { service: ServiceCard; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const color =
    service.variant === "gold" ? "var(--gold-primary)" : "var(--cyan-primary)"
  const colorRgb =
    service.variant === "gold" ? "201,168,76" : "82,193,220"
  const Icon = service.icon
  const panelId = `service-card-${service.id}-details`

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={(e) => {
        // Only collapse when focus leaves the card entirely
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setExpanded(false)
      }}
      className="group relative flex flex-col rounded-3xl overflow-hidden transition-transform duration-500"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid var(--surface-border)",
        backdropFilter: "blur(14px)",
        transform: expanded ? "translateY(-6px)" : "translateY(0)",
        boxShadow: expanded
          ? `0 24px 60px -20px rgba(${colorRgb},0.35), 0 0 0 1px rgba(${colorRgb},0.35)`
          : "0 1px 0 rgba(255,255,255,0.02)",
      }}
    >
      {/* Hover gradient */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 0%, rgba(${colorRgb},0.10) 0%, transparent 60%)`,
        }}
      />

      {/* Top accent line */}
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: expanded ? 1 : 0.4,
        }}
      />

      <div className="relative p-6 md:p-7 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <span
            className="flex items-center justify-center w-12 h-12 rounded-2xl transition-transform duration-500"
            style={{
              background: `rgba(${colorRgb},0.10)`,
              border: `1px solid rgba(${colorRgb},0.30)`,
              color,
              transform: expanded ? "scale(1.08) rotate(-4deg)" : "scale(1)",
            }}
            aria-hidden
          >
            <Icon size={22} />
          </span>
          <span
            className="text-[10px] font-semibold tracking-[0.18em] uppercase pt-1"
            style={{ color: "var(--text-subtle)" }}
          >
            0{index + 1}
          </span>
        </div>

        <h3
          className="font-display text-xl md:text-2xl font-semibold leading-tight"
          style={{ color: "var(--text-strong)" }}
        >
          {service.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--text-medium)" }}
        >
          {service.pitch}
        </p>

        {/* Outcomes — visible always, animated emphasis on hover */}
        <ul
          className="grid grid-cols-3 gap-2 mt-2"
          aria-label="Typical outcomes"
        >
          {service.outcomes.map((o) => (
            <li
              key={o.label}
              className="flex flex-col gap-1 p-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--surface-border)",
              }}
            >
              <span
                className="font-display text-base md:text-lg font-bold tabular-nums leading-none"
                style={{ color }}
              >
                {o.metric}
              </span>
              <span
                className="text-[10px] leading-tight"
                style={{ color: "var(--text-subtle)" }}
              >
                {o.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Expanded panel — hover/focus reveals steps + demo CTA */}
        <motion.div
          id={panelId}
          aria-hidden={!expanded}
          initial={false}
          animate={{
            height: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-2 flex flex-col gap-3">
            <div
              className="h-px"
              style={{ background: "var(--surface-border)" }}
              aria-hidden
            />
            <span
              className="text-[10px] font-semibold tracking-[0.18em] uppercase"
              style={{ color: "var(--text-subtle)" }}
            >
              How it ships
            </span>
            <ol className="flex flex-col gap-1.5">
              {service.steps.map((step, i) => (
                <li
                  key={step}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "var(--text-medium)" }}
                >
                  <Check
                    size={14}
                    className="mt-1 shrink-0"
                    style={{ color }}
                    aria-hidden
                  />
                  <span>
                    <span className="tabular-nums opacity-60">0{i + 1}.</span>{" "}
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        {/* CTAs */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t" style={{ borderColor: "var(--surface-border)" }}>
          <Link
            href={`/contact?intent=demo&service=${service.id}`}
            className="inline-flex items-center gap-2 px-4 h-10 rounded-full text-sm font-semibold transition-all"
            style={{
              background: color,
              color: "#0A1828",
              boxShadow: `0 0 22px rgba(${colorRgb},0.35)`,
            }}
            aria-controls={panelId}
            aria-expanded={expanded}
          >
            <PlayCircle size={15} aria-hidden />
            Request demo
          </Link>
          <Link
            href={service.href}
            className="inline-flex items-center gap-1 px-3 h-10 text-sm font-medium rounded-full transition-colors"
            style={{
              color: "var(--text-medium)",
            }}
          >
            Learn more
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function ServicePipelineCards() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative py-20 md:py-28"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="flex flex-col gap-3 max-w-2xl">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "var(--gold-primary)" }}
            >
              The pipeline, productized
            </span>
            <h2
              id="services-heading"
              className="font-display text-3xl md:text-5xl font-bold tracking-tight text-balance"
              style={{ color: "var(--text-strong)" }}
            >
              Four services. One{" "}
              <span className="gradient-text">end-to-end stack.</span>
            </h2>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "var(--text-subtle)" }}
            >
              Hover any card for the full delivery flow — or request a focused
              15-minute demo for the service that matters today.
            </p>
          </div>
          <Link
            href="/services"
            className="self-start md:self-end inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "var(--text-medium)" }}
          >
            View all services
            <ArrowRight size={14} aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {SERVICES.map((s, i) => (
            <Card key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
