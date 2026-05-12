/**
 * Security utilities for input validation and sanitization
 */

/**
 * Sanitize user input to prevent XSS attacks
 * Removes HTML tags and dangerous patterns
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .trim()
}

/**
 * Escape HTML entities to safely display user content
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (char) => map[char] || char)
}

/**
 * Validate and sanitize email addresses
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

/**
 * Validate and sanitize phone numbers
 * Only allows digits, spaces, parentheses, hyphens, and plus sign
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^0-9+\-() ]/g, "").trim()
}

/**
 * Generate a secure random token for CSRF protection
 * Note: In production, use server-side session-based CSRF tokens
 */
export function generateToken(length = 32): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

/**
 * Check if a URL is safe (same origin or allowed domains)
 */
export function isSafeUrl(url: string, allowedDomains: string[] = []): boolean {
  try {
    const parsed = new URL(url, window.location.origin)

    // Allow same origin
    if (parsed.origin === window.location.origin) {
      return true
    }

    // Check against allowed domains
    return allowedDomains.some((domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`))
  } catch {
    return false
  }
}

/**
 * Rate limiting helper for client-side actions
 * Returns true if action is allowed, false if rate limited
 */
export class ClientRateLimiter {
  private attempts: number[] = []
  private readonly maxAttempts: number
  private readonly windowMs: number

  constructor(maxAttempts = 5, windowMs = 60000) {
    this.maxAttempts = maxAttempts
    this.windowMs = windowMs
  }

  canAttempt(): boolean {
    const now = Date.now()
    // Remove old attempts outside the window
    this.attempts = this.attempts.filter((time) => now - time < this.windowMs)

    if (this.attempts.length >= this.maxAttempts) {
      return false
    }

    this.attempts.push(now)
    return true
  }

  reset(): void {
    this.attempts = []
  }

  getRemainingTime(): number {
    if (this.attempts.length === 0) return 0
    const oldestAttempt = Math.min(...this.attempts)
    const remainingMs = this.windowMs - (Date.now() - oldestAttempt)
    return Math.max(0, Math.ceil(remainingMs / 1000))
  }
}

/**
 * Validate that a value matches expected type
 * Useful for validating API responses
 */
export function isValidResponse<T>(
  value: unknown,
  validator: (val: unknown) => val is T
): value is T {
  return validator(value)
}

/**
 * Content Security Policy nonce generator
 * For use with inline scripts when needed
 */
export function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
}
