"use client"

import { animate, motion, useInView, useMotionValue } from "framer-motion"
import { useEffect, useRef } from "react"
import { Clock, DollarSign, TrendingUp, Zap } from "lucide-react"

/* ─── KPI definitions ────────────────────────────────────────────────────── */
type KPI = {
  id: string
  label: string
  prefix?: string
  suffix?: string
  value: number
  decimals?: number
  caption: string
  icon: React.ElementType
  variant: "gold" | "cyan"
}

export const KPIS: KPI[] = [
  {
    id: "time-saved",
    label: "Hours saved / week",
    value: 32,
    suffix: "h",
    caption: "Average across active automation clients",
    icon: Clock,
    variant: "gold",
  },
  {
    id: "cost-reduction",
    label: "Operating cost reduction",
    value: 41,
    suffix: "%",
    caption: "Compared to manual workflows in year one",
    icon: DollarSign,
    variant: "cyan",
  },
  {
    id: "lead-conversion",
    label: "Lead-to-customer lift",
    value: 2.8,
    suffix: "x",
    decimals: 1,
    caption: "After deploying AI receptionist + CRM sync",
    icon: TrendingUp,
    variant: "gold",
  },
  {
    id: "response-time",
    label: "Response time",
    prefix: "<",
    value: 90,
    suffix: "s",
    caption: "From customer message to AI-handled action",
    icon: Zap,
    variant: "cyan",
  },
]

/* ─── Count-up primitive ─────────────────────────────────────────────────── */
function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  inView,
}: {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  inView: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const mv = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(mv, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    })
    const unsub = mv.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent =
          prefix + (decimals > 0 ? v.toFixed(decimals) : Math.floor(v).toString()) + suffix
      }
    })
    return () => {
      controls.stop()
      unsub()
    }
  }, [inView, value, decimals, prefix, suffix, mv])

  return (
    <span
      ref={ref}
      aria-label={`${prefix}${value.toFixed(decimals)}${suffix}`}
    >
      {prefix}0{suffix}
    </span>
  )
}

/* ─── KPI card ───────────────────────────────────────────────────────────── */
function KPICard({ kpi, inView, index }: { kpi: KPI; inView: boolean; index: number }) {
  const color =
    kpi.variant === "gold" ? "var(--gold-primary)" : "var(--cyan-primary)"
  const Icon = kpi.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col gap-3 p-6 md:p-7 rounded-2xl overflow-hidden"
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
          background: `radial-gradient(circle at 30% 0%, ${
            kpi.variant === "gold" ? "rgba(201,168,76,0.10)" : "rgba(82,193,220,0.10)"
          } 0%, transparent 60%)`,
        }}
      />
      {/* Top accent bar */}
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.6,
        }}
      />

      <div className="flex items-center gap-3">
        <span
          className="flex items-center justify-center w-10 h-10 rounded-xl"
          style={{
            background: kpi.variant === "gold" ? "rgba(201,168,76,0.10)" : "rgba(82,193,220,0.10)",
            border: `1px solid ${color}33`,
            color,
          }}
          aria-hidden
        >
          <Icon size={18} />
        </span>
        <span
          className="text-xs font-semibold tracking-[0.18em] uppercase"
          style={{ color: "var(--text-subtle)" }}
        >
          {kpi.label}
        </span>
      </div>

      <div
        className="font-display text-5xl md:text-6xl font-bold tabular-nums leading-none"
        style={{ color }}
      >
        <CountUp
          value={kpi.value}
          decimals={kpi.decimals}
          prefix={kpi.prefix}
          suffix={kpi.suffix}
          inView={inView}
        />
      </div>

      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--text-medium)" }}
      >
        {kpi.caption}
      </p>
    </motion.div>
  )
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function KPIStrip() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      aria-labelledby="kpi-heading"
      className="relative py-20 md:py-28"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Subtle background line */}
      <span
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.18), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12 md:mb-14 gap-3">
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--gold-primary)" }}
          >
            Measurable outcomes
          </span>
          <h2
            id="kpi-heading"
            className="font-display text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl"
            style={{ color: "var(--text-strong)" }}
          >
            Time saved. Cost reduced.{" "}
            <span className="gradient-text">Real numbers.</span>
          </h2>
          <p
            className="max-w-2xl text-sm md:text-base leading-relaxed"
            style={{ color: "var(--text-subtle)" }}
          >
            Aggregated across our last 50 deployments. Numbers verified by
            client analytics dashboards, not vanity metrics.
          </p>
        </div>

        <ul
          aria-label="Key performance indicators"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {KPIS.map((kpi, i) => (
            <li key={kpi.id}>
              <KPICard kpi={kpi} inView={inView} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
