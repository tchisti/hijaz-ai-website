import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Security Middleware
 * Adds essential HTTP security headers to all responses
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Prevent clickjacking attacks
  response.headers.set("X-Frame-Options", "DENY")

  // Prevent MIME type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff")

  // Enable XSS protection (legacy browsers)
  response.headers.set("X-XSS-Protection", "1; mode=block")

  // Control referrer information
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // Restrict browser features/APIs
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  )

  // HSTS - Force HTTPS (only in production)
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    )
  }

  // Content Security Policy
  // Allows Google Analytics, Microsoft Clarity, and EmailJS
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https: http:",
    "connect-src 'self' https://www.google-analytics.com https://www.clarity.ms https://api.emailjs.com https://region1.google-analytics.com",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
  ].join("; ")

  response.headers.set("Content-Security-Policy", csp)

  return response
}

// Apply middleware to all routes except static files and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/* (public images)
     * - api/* (API routes - these should set their own headers)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|api/).*)",
  ],
}
