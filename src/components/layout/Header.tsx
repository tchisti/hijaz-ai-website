"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu on navigation
  useEffect(() => setMobileOpen(false), [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || mobileOpen ? "border-ink/15 bg-paper/95 backdrop-blur" : "border-transparent bg-paper/0"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2" aria-label="Hijaz.ai home">
          <span className="font-display text-[1.35rem] font-extrabold tracking-tight text-ink [font-stretch:118%]">
            Hijaz<span className="text-redline">.ai</span>
          </span>
          <span className="label hidden text-ink-soft xl:inline">{SITE_CONFIG.positioning}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative py-1 text-sm font-medium transition-colors",
                isActive(link.href) ? "text-ink" : "text-ink-soft hover:text-ink"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-redline" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE_CONFIG.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 bg-ink px-3.5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-redline sm:px-4 sm:py-2.5"
          >
            Book a call
            <ArrowUpRight size={15} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <button
            className="p-2 text-ink lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-ink/15 bg-paper px-5 pb-6 pt-2 lg:hidden">
          <ul>
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} className="border-b border-ink/10">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="flex items-baseline justify-between py-4 font-display text-2xl font-bold tracking-tight text-ink"
                >
                  {link.label}
                  <span className="label text-ink-faint">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={SITE_CONFIG.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 bg-redline px-5 py-4 font-semibold text-white"
          >
            Book a 15-minute call <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  )
}
