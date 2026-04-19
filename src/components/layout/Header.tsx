"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import { NAV_LINKS } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Read preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = saved === "dark" || (!saved && prefersDark)
    setDark(isDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  // Apply + persist on toggle
  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  const navLinks = NAV_LINKS.filter((l) => l.href !== "/")

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled
        ? "backdrop-blur-xl border-b"
        : "border-b border-transparent",
    )}
    style={{
      background: scrolled
        ? "rgba(3,5,15,0.85)"
        : "rgba(3,5,15,0.2)",
      borderColor: scrolled ? "rgba(201,168,76,0.12)" : "transparent",
      boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center font-display text-xl font-bold">
            <span style={{ color: "rgba(255,255,255,0.9)" }}>Hijaz</span>
            <span style={{ color: "#C9A84C" }}>.ai</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-all duration-200 hover:text-[#C9A84C]",
                  pathname === link.href
                    ? "text-[#C9A84C]"
                    : "text-white/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button
              asChild
              className="hidden md:inline-flex font-semibold text-sm"
              style={{
                background: "linear-gradient(135deg, #C9A84C, #E8C46A)",
                color: "#03050F",
                border: "none",
                boxShadow: "0 0 20px rgba(201,168,76,0.25)",
              }}
            >
              <a href="https://cal.com/tchisti/15min" target="_blank" rel="noopener noreferrer">Book a Free Call</a>
            </Button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div id="mobile-nav" className="md:hidden border-t border-border py-4 space-y-1 animate-in slide-in-from-top-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-gold bg-gold/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild className="w-full bg-midnight text-white dark:bg-gold dark:text-midnight">
                <a href="https://cal.com/tchisti/15min" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>Book a Free Call</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
