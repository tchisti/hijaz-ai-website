"use client"

import { useEffect, useState } from "react"
import { Menu, Phone, X } from "lucide-react"

const NAV = [
  { href: "#treatments", label: "Treatments" },
  { href: "#fees", label: "Fees" },
  { href: "#first-visit", label: "First visit" },
  { href: "#hours", label: "Hours" },
  { href: "#enquire", label: "Book" },
]

/** Floating pill header. Sits under the concept bar; the menu folds into a rounded sheet below 1024px. */
export default function SiteHeader({ mark }: { mark: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="sticky top-[34px] z-50 px-3 pt-3 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center justify-between gap-2 rounded-full bg-white/90 py-2 pl-3 pr-2 shadow-[0_18px_40px_-28px_rgba(18,51,46,0.6)] ring-1 ring-[#9DBFAE]/50 backdrop-blur-md sm:pl-4">
          <a
            href="#top"
            aria-label="Oakline Dental Studio, back to top"
            className="flex min-h-[44px] items-center gap-2.5 rounded-full pr-2"
          >
            {mark}
            <span className="leading-none">
              <span className="f-display block text-[21px] font-semibold">Oakline</span>
              <span className="mt-1 block text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#47625C]">
                Dental Studio
              </span>
            </span>
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center rounded-full px-4 text-[15px] font-medium transition-colors hover:bg-[#EEF5F0]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href="tel:+19055550142"
              className="hidden min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full px-3 text-[15px] font-semibold md:inline-flex"
            >
              <Phone size={16} strokeWidth={2} aria-hidden="true" />
              (905) 555-0142
            </a>
            <a
              href="#enquire"
              className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full bg-[#EF6F5C] px-5 text-[15px] font-semibold text-[#12332E] transition-colors hover:bg-[#F2836F]"
            >
              Book<span className="hidden min-[400px]:inline">&nbsp;a visit</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="oakline-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full bg-[#EEF5F0] lg:hidden"
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        <nav id="oakline-menu" aria-label="Menu" hidden={!open} className="lg:hidden">
          <ul className="mt-2 rounded-[28px] bg-white p-3 shadow-[0_30px_60px_-30px_rgba(18,51,46,0.6)] ring-1 ring-[#9DBFAE]/50">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center rounded-full px-4 text-[17px] font-medium hover:bg-[#EEF5F0]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-[#9DBFAE]/50 pt-2">
              <a
                href="tel:+19055550142"
                className="flex min-h-[48px] items-center gap-2.5 rounded-full px-4 text-[17px] font-semibold"
              >
                <Phone size={18} aria-hidden="true" />
                (905) 555-0142
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
