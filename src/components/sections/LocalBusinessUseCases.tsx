"use client"

import { motion } from "framer-motion"
import {
  MessageSquare,
  CalendarCheck,
  FileText,
  BarChart2,
  Mail,
  ShoppingCart,
  Star,
  Repeat,
} from "lucide-react"

type UseCase = {
  id: string
  icon: React.ComponentType<{ size?: number | string }>
  title: string
  desc: string
  example: string
  variant: "gold" | "cyan"
}

const USE_CASES: UseCase[] = [
  {
    id: "customer-replies",
    icon: MessageSquare,
    title: "Answer Customer Questions Automatically",
    desc: "AI handles incoming messages on WhatsApp, Instagram DMs, your website chat, or email — instantly, 24/7.",
    example: "A plumbing company gets 40+ DMs a day. AI answers FAQs, collects job details, and books estimates without the owner lifting a finger.",
    variant: "gold",
  },
  {
    id: "appointments",
    icon: CalendarCheck,
    title: "Book & Confirm Appointments",
    desc: "Customers can self-book directly from a chat or link. AI sends reminders and reschedules automatically.",
    example: "A dental clinic stopped losing no-shows after AI sent automated reminders 48h and 2h before each appointment.",
    variant: "cyan",
  },
  {
    id: "invoices-quotes",
    icon: FileText,
    title: "Generate Quotes & Invoices in Seconds",
    desc: "Describe the job and AI drafts a quote or invoice in your format — ready to send in one click.",
    example: "A renovation contractor used to spend 2 hours a day on quotes. Now it takes 5 minutes with AI filling the template.",
    variant: "gold",
  },
  {
    id: "social-content",
    icon: BarChart2,
    title: "Create Social Media Content",
    desc: "AI drafts posts, captions, and promo copy based on your products, services, or weekly specials.",
    example: "A bakery posts daily Instagram stories written and scheduled by AI — the owner just reviews and approves in 2 minutes.",
    variant: "cyan",
  },
  {
    id: "follow-ups",
    icon: Mail,
    title: "Follow Up With Leads Automatically",
    desc: "Every new inquiry gets a personalized follow-up within minutes — not days. No lead slips through the cracks.",
    example: "A real estate agent connected AI to her contact form. Response time dropped from 6 hours to under 3 minutes.",
    variant: "gold",
  },
  {
    id: "inventory",
    icon: ShoppingCart,
    title: "Track Inventory & Reorder Alerts",
    desc: "AI monitors your stock levels and alerts you — or places reorders automatically — before you run out.",
    example: "A café owner stopped running out of supplies after AI tracked usage patterns and sent reorder reminders every Monday.",
    variant: "cyan",
  },
  {
    id: "reviews",
    icon: Star,
    title: "Collect More Google Reviews",
    desc: "AI sends a friendly review request automatically after each completed job or purchase.",
    example: "A cleaning service went from 12 Google reviews to 94 in 3 months — just by adding an automated post-job review request.",
    variant: "gold",
  },
  {
    id: "repeat-customers",
    icon: Repeat,
    title: "Win Back Repeat Customers",
    desc: "AI identifies customers who haven't returned and sends them personalized offers at the right time.",
    example: "A hair salon recovered 22% of lapsed clients in one month using an AI win-back sequence triggered after 60 days of inactivity.",
    variant: "cyan",
  },
]

export default function LocalBusinessUseCases() {
  return (
    <section
      id="use-cases"
      aria-labelledby="use-cases-heading"
      className="relative py-20 md:py-28"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Section separator */}
      <span
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(82,193,220,0.20), transparent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14 gap-3">
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--cyan-primary)" }}
          >
            Daily AI applications
          </span>
          <h2
            id="use-cases-heading"
            className="font-display text-3xl md:text-5xl font-bold tracking-tight text-balance max-w-3xl"
            style={{ color: "var(--text-strong)" }}
          >
            Practical AI your business can use{" "}
            <span className="gradient-text">starting tomorrow.</span>
          </h2>
          <p
            className="max-w-2xl text-sm md:text-base leading-relaxed"
            style={{ color: "var(--text-subtle)" }}
          >
            These aren't futuristic concepts — they're tools your competitors are
            already using. Here's how local businesses put AI to work every single day.
          </p>
        </div>

        {/* Grid */}
        <ul
          aria-label="AI use cases for local businesses"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {USE_CASES.map((uc, index) => {
            const color =
              uc.variant === "gold" ? "var(--gold-primary)" : "var(--cyan-primary)"
            const colorRgb =
              uc.variant === "gold" ? "201,168,76" : "82,193,220"
            const Icon = uc.icon
            return (
              <motion.li
                key={uc.id}
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
                  className="absolute top-0 left-0 right-0 h-px opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                  }}
                />

                {/* Icon */}
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
                  {uc.title}
                </h3>

                <p
                  className="relative text-sm leading-relaxed"
                  style={{ color: "var(--text-medium)" }}
                >
                  {uc.desc}
                </p>

                {/* Real-world example callout */}
                <div
                  className="relative mt-auto pt-4 border-t text-xs leading-relaxed italic"
                  style={{
                    borderColor: "var(--surface-border)",
                    color: "var(--text-subtle)",
                  }}
                >
                  <span
                    className="not-italic font-semibold text-[10px] tracking-[0.15em] uppercase block mb-1"
                    style={{ color }}
                  >
                    Real example
                  </span>
                  {uc.example}
                </div>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
