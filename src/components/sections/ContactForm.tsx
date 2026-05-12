"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SERVICES } from "@/lib/constants"
import { Send, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react"

const BUDGET_OPTIONS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000+",
  "Not sure yet",
]

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address").max(254, "Email is too long"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  details: z
    .string()
    .min(20, "Please provide at least 20 characters describing your project")
    .max(5000, "Message is too long"),
  budget: z.string().optional(),
  // Honeypot field - hidden from users, filled by bots
  website: z.string().optional(),
})

type FormData = z.infer<typeof schema>

type SubmitStatus = "idle" | "loading" | "success" | "error"

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="text-destructive text-xs mt-1 flex items-center gap-1">
      <AlertCircle size={12} />
      {message}
    </p>
  )
}

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [formTimestamp, setFormTimestamp] = useState<number>(0)

  // Set timestamp when component mounts (prevents replay attacks)
  useEffect(() => {
    setFormTimestamp(Date.now())
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-ring transition-colors"

  const onSubmit = async (data: FormData) => {
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          timestamp: formTimestamp,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          setErrorMessage("Too many requests. Please wait a minute and try again.")
          setStatus("error")
          return
        }

        // Handle validation errors
        if (result.details) {
          const firstError = Object.values(result.details).flat()[0]
          setErrorMessage(typeof firstError === "string" ? firstError : "Validation failed")
        } else {
          setErrorMessage(result.error || "Something went wrong. Please try again.")
        }
        setStatus("error")
        return
      }

      setStatus("success")
      reset()
      // Reset timestamp for next submission
      setFormTimestamp(Date.now())
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground">Message Sent!</h3>
        <p className="text-muted-foreground max-w-sm">
          Thanks! We&apos;ll get back to you within 2 business hours. Check your inbox for a
          confirmation.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")} className="mt-2 border-border">
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot field - hidden from users, catches bots */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          {...register("website")}
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name + Email row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Name <span className="text-destructive">*</span>
          </label>
          <input
            {...register("name")}
            placeholder="John Smith"
            autoComplete="name"
            className={cn(inputClass, errors.name && "border-destructive")}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="john@company.com"
            autoComplete="email"
            className={cn(inputClass, errors.email && "border-destructive")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Phone <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <input
          {...register("phone")}
          type="tel"
          placeholder="+1 (416) 555-0123"
          autoComplete="tel"
          className={inputClass}
        />
      </div>

      {/* Service dropdown */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Service Interested In <span className="text-destructive">*</span>
        </label>
        <select
          {...register("service")}
          className={cn(inputClass, errors.service && "border-destructive")}
        >
          <option value="">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet — I need advice</option>
        </select>
        <FieldError message={errors.service?.message} />
      </div>

      {/* Project details */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Project Details <span className="text-destructive">*</span>
        </label>
        <textarea
          {...register("details")}
          rows={4}
          placeholder="Tell us about your business, goals, and what you're looking to achieve…"
          className={cn(inputClass, "resize-none", errors.details && "border-destructive")}
        />
        <FieldError message={errors.details?.message} />
      </div>

      {/* Budget (optional) */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Budget Range <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <select {...register("budget")} className={inputClass}>
          <option value="">Prefer not to say</option>
          {BUDGET_OPTIONS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Error state */}
      {status === "error" && (
        <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{errorMessage || "Something went wrong. Please try again or email us directly at hello@hijaz.ai."}</span>
        </div>
      )}

      {/* Security note */}
      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
        <Shield size={14} className="text-green-600" />
        <span>Secure &amp; Confidential — Your information is encrypted and never shared.</span>
      </p>

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-midnight text-white hover:bg-midnight/90 font-semibold h-12 text-base"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="mr-2 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={16} className="mr-2" /> Send Message
          </>
        )}
      </Button>
    </form>
  )
}
