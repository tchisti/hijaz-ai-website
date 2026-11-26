import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { SITE_CONFIG } from "@/lib/constants"

// Shown when delivery fails, so the visitor still has a way to reach us
const DELIVERY_FAILED_MESSAGE = `We couldn't send your message. Please email ${SITE_CONFIG.email} or call ${SITE_CONFIG.phone}.`

const EMAILJS_TIMEOUT_MS = 10_000

/**
 * EmailJS settings, read on the server. The NEXT_PUBLIC_ names are accepted as a
 * fallback so an environment set up from older documentation still delivers enquiries.
 * Server-side sending needs "Allow EmailJS API for non-browser applications" switched
 * on under Account > Security in the EmailJS dashboard.
 */
function getEmailjsConfig() {
  const config = {
    service_id: process.env.EMAILJS_SERVICE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    accessToken: process.env.EMAILJS_PRIVATE_KEY || undefined,
  }
  const missing = (["service_id", "template_id", "user_id"] as const).filter((key) => !config[key])
  return { config, missing }
}

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 5 // 5 requests per minute

/**
 * Simple rate limiter
 * In production, consider using Upstash Redis for distributed rate limiting
 */
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: MAX_REQUESTS - record.count }
}

// Validation schema with sanitization
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .transform((val) => val.trim().replace(/[<>]/g, "")),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email is too long")
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .optional()
    .transform((val) => val?.trim().replace(/[^0-9+\-() ]/g, "")),
  service: z
    .string()
    .min(1, "Please select a service")
    .max(100, "Service name is too long")
    .transform((val) => val.trim().replace(/[<>]/g, "")),
  details: z
    .string()
    .min(20, "Please provide at least 20 characters describing your project")
    .max(5000, "Message is too long")
    .transform((val) => val.trim().replace(/[<>]/g, "")),
  budget: z
    .string()
    .optional()
    .transform((val) => val?.trim().replace(/[<>]/g, "")),
  // Honeypot field - should be empty
  website: z.string().max(0, "Bot detected").optional(),
  // Timestamp validation to prevent replay attacks
  timestamp: z.number().optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown"

    // Check rate limit
    const { allowed, remaining } = checkRateLimit(ip)

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Remaining": "0",
          },
        }
      )
    }

    // Parse and validate request body
    const body = await request.json()

    // Check honeypot field
    if (body.website && body.website.length > 0) {
      // Silently reject bot submissions
      return NextResponse.json({ success: true })
    }

    // Validate timestamp (reject if older than 5 minutes)
    if (body.timestamp) {
      const submissionAge = Date.now() - body.timestamp
      if (submissionAge > 5 * 60 * 1000 || submissionAge < 0) {
        return NextResponse.json(
          { error: "Form session expired. Please refresh and try again." },
          { status: 400 }
        )
      }
    }

    // Validate and sanitize data
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = result.data

    const { config, missing } = getEmailjsConfig()
    if (missing.length > 0) {
      console.error(`EmailJS is not configured, missing: ${missing.join(", ")}`)
      return NextResponse.json({ error: DELIVERY_FAILED_MESSAGE }, { status: 503 })
    }

    // Sent from the server so the keys stay private
    const emailjsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(EMAILJS_TIMEOUT_MS),
      body: JSON.stringify({
        ...config,
        template_params: {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone || "Not provided",
          service: data.service,
          details: data.details,
          budget: data.budget || "Not specified",
          submission_ip: ip,
          submission_time: new Date().toISOString(),
        },
      }),
    }).catch((error: unknown) => {
      console.error("EmailJS request failed:", error)
      return null
    })

    if (!emailjsResponse?.ok) {
      if (emailjsResponse) {
        console.error(`EmailJS error ${emailjsResponse.status}:`, await emailjsResponse.text())
      }
      return NextResponse.json({ error: DELIVERY_FAILED_MESSAGE }, { status: 502 })
    }

    return NextResponse.json(
      { success: true },
      {
        headers: {
          "X-RateLimit-Remaining": String(remaining),
        },
      }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}

// Block other methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
