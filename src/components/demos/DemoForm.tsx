"use client"

/**
 * Enquiry form for concept builds. Unstyled by default: each demo passes its
 * own class names so the form matches that design. It posts to /api/contact
 * and always tells the visitor that the message goes to Hijaz.ai, because the
 * business on the page does not exist.
 */

import { useEffect, useId, useState } from "react"

type Status = "idle" | "loading" | "success" | "error"

export interface DemoFormClasses {
  form?: string
  grid?: string
  field?: string
  label?: string
  input?: string
  button?: string
  note?: string
  error?: string
  success?: string
}

export default function DemoForm({
  demoName,
  industrySlug,
  options,
  optionsLabel = "What do you need?",
  messageLabel = "Message",
  messagePlaceholder = "",
  submitLabel = "Send enquiry",
  classes = {},
}: {
  /** The invented business name, e.g. "Oakline Dental Studio" */
  demoName: string
  /** Matching industry slug on Hijaz.ai, e.g. "healthcare-clinics" */
  industrySlug: string
  /** Choices for the select, e.g. the demo's services. Omit to hide the select. */
  options?: string[]
  optionsLabel?: string
  messageLabel?: string
  messagePlaceholder?: string
  submitLabel?: string
  classes?: DemoFormClasses
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
    const choice = String(data.get("choice") ?? "")

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
          service: `Concept build: ${demoName}`.slice(0, 100),
          details: [
            `Enquiry sent from the ${demoName} concept build (industry: ${industrySlug}).`,
            `Page: ${window.location.pathname}`,
            choice ? `Selected: ${choice}` : "",
            "",
            message || "(no message)",
          ]
            .filter((line, i) => line !== "" || i === 3)
            .join("\n"),
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
              : result.error || "Something went wrong. Please try again."
        )
        setStatus("error")
        return
      }
      const w = window as unknown as { gtag?: (...args: unknown[]) => void }
      w.gtag?.("event", "generate_lead", { lead_source: `Concept build: ${demoName}` })
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
      <div role="status" className={classes.success}>
        <p>
          <strong>Message sent to Hijaz.ai.</strong> {demoName} is a concept build, so your enquiry went to the team
          that designed it. They reply within 2 business hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      {/* Honeypot: hidden from people, filled by bots */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={classes.grid}>
        <div className={classes.field}>
          <label htmlFor={`${id}-name`} className={classes.label}>
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className={classes.input}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor={`${id}-email`} className={classes.label}>
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={classes.input}
          />
        </div>
        <div className={classes.field}>
          <label htmlFor={`${id}-phone`} className={classes.label}>
            Phone (optional)
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={classes.input} />
        </div>
        {options && options.length > 0 && (
          <div className={classes.field}>
            <label htmlFor={`${id}-choice`} className={classes.label}>
              {optionsLabel}
            </label>
            <select id={`${id}-choice`} name="choice" defaultValue="" className={classes.input}>
              <option value="">Choose one</option>
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className={classes.field}>
        <label htmlFor={`${id}-message`} className={classes.label}>
          {messageLabel}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          maxLength={4000}
          placeholder={messagePlaceholder}
          className={classes.input}
        />
      </div>

      {status === "error" && (
        <p role="alert" className={classes.error}>
          {error}
        </p>
      )}

      <button type="submit" disabled={status === "loading"} className={classes.button}>
        {status === "loading" ? "Sending" : submitLabel}
      </button>
      <p className={classes.note}>
        This is a concept site. {demoName} is an invented business, so this form sends your message to Hijaz.ai, who
        designed and built it.
      </p>
    </form>
  )
}
