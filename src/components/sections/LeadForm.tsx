"use client"

/**
 * Short enquiry form used on the homepage and on every industry page.
 * It asks for the minimum needed to reply, and posts to the same
 * /api/contact endpoint as the full contact form.
 */

import { useEffect, useId, useState } from "react"
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"

type Status = "idle" | "loading" | "success" | "error"

const DEFAULT_NEEDS = [
  "A new or better website",
  "An online store",
  "An AI assistant or chatbot",
  "Workflow automation",
  "A dashboard or custom software",
  "More enquiries from search",
]

const field =
  "w-full border border-ink/30 bg-paper-bright px-3.5 py-3 text-[0.95rem] text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none focus:ring-2 focus:ring-redline/30"

export default function LeadForm({
  context,
  needs = DEFAULT_NEEDS,
  submitLabel = "Send my enquiry",
  className,
}: {
  /** Where the enquiry came from, e.g. "Industry: Real Estate & Property". Sent with the message. */
  context: string
  /** Options for the "what do you need" select */
  needs?: string[]
  submitLabel?: string
  className?: string
}) {
  const id = useId()
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")
  const [startedAt, setStartedAt] = useState(0)

  useEffect(() => setStartedAt(Date.now()), [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const message = String(data.get("message") ?? "").trim()
    const need = String(data.get("need") ?? "") || "Not sure yet"

    if (message.length < 10) {
      setError("Tell us a little more about what you need, a sentence is enough.")
      setStatus("error")
      return
    }

    setStatus("loading")
    setError("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone") || undefined,
          service: need,
          details: `${context}\nPage: ${window.location.pathname}\n\n${message}`,
          website: data.get("website") || undefined,
          timestamp: startedAt,
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) {
        const first = result.details ? Object.values(result.details).flat()[0] : null
        setError(
          response.status === 429
            ? "Too many requests. Please wait a minute and try again."
            : typeof first === "string"
              ? first
              : result.error || "Something went wrong. Please try again or call us."
        )
        setStatus("error")
        return
      }
      // Report the conversion to analytics when it is installed
      const w = window as unknown as { gtag?: (...args: unknown[]) => void }
      w.gtag?.("event", "generate_lead", { lead_source: context })
      form.reset()
      setStartedAt(Date.now())
      setStatus("success")
    } catch {
      setError("Network error. Please check your connection and try again.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className={cn("border border-ink bg-paper-bright p-7", className)} role="status">
        <CheckCircle2 aria-hidden="true" size={32} className="text-redline" />
        <h3 className="mt-4 text-2xl font-extrabold">Enquiry received.</h3>
        <p className="mt-2 leading-relaxed text-ink-soft">
          We reply within 2 business hours, {SITE_CONFIG.businessHours.replace("Mon–Fri: ", "Monday to Friday, ")}. If it
          is urgent, call{" "}
          <a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} className="font-semibold text-ink underline">
            {SITE_CONFIG.phone}
          </a>
          .
        </p>
        <a
          href={SITE_CONFIG.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 font-semibold text-redline-deep hover:text-ink"
        >
          Or pick a time for a 15-minute call <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className={cn("border border-ink bg-paper-bright p-6 sm:p-7", className)}>
      {/* Honeypot: hidden from people, filled by bots */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="label mb-1.5 block text-ink-soft">
            Name
          </label>
          <input id={`${id}-name`} name="name" required minLength={2} maxLength={100} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="label mb-1.5 block text-ink-soft">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className="label mb-1.5 block text-ink-soft">
            Phone <span className="normal-case tracking-normal text-ink-faint">(optional)</span>
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-need`} className="label mb-1.5 block text-ink-soft">
            What do you need?
          </label>
          <select id={`${id}-need`} name="need" defaultValue="" className={field}>
            <option value="">Not sure yet</option>
            {needs.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={`${id}-message`} className="label mb-1.5 block text-ink-soft">
          What is costing you time or customers?
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={4}
          maxLength={4000}
          placeholder="A sentence or two is enough."
          className={cn(field, "resize-y")}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 border border-redline bg-redline/10 px-3.5 py-2.5 text-sm text-redline-deep">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-5 flex w-full items-center justify-center gap-2 bg-redline px-6 py-4 font-semibold text-white transition-colors hover:bg-redline-deep disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </>
        )}
      </button>
      <p className="label mt-3 text-ink-faint">Reply within 2 business hours · No obligation</p>
    </form>
  )
}
