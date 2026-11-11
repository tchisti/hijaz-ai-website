"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

const LINKS = [
  { href: "#menu", label: "Menu" },
  { href: "#reserve", label: "Reserve" },
  { href: "#the-fire", label: "The fire" },
  { href: "#private-dining", label: "Private dining" },
  { href: "#find-us", label: "Find us" },
]

/** Sticky header. Sits under the concept bar (34px) and folds the anchors into a panel on small screens. */
export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header
      onKeyDown={(event) => event.key === "Escape" && setOpen(false)}
      className="sticky top-[34px] z-50 border-b border-[#F2E7D5]/10 bg-[#14110F]/90 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a href="#top" className="f-display flex min-h-[44px] items-center whitespace-nowrap text-[1.4rem] italic leading-none tracking-[-0.01em] sm:text-[1.6rem]">
          Ember <span className="mx-[0.25em] text-[#C9A227]">&amp;</span> Rye
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[13px] uppercase tracking-[0.18em] text-[#A39683]">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-flex min-h-[44px] items-center transition-colors hover:text-[#F2E7D5]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#reserve"
            className="inline-flex min-h-[44px] items-center border border-[#E4572E] px-4 text-[13px] font-bold uppercase tracking-[0.16em] text-[#F2E7D5] transition-colors hover:bg-[#E4572E] hover:text-[#14110F]"
          >
            Reserve
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="er-mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center border border-[#F2E7D5]/20 text-[#F2E7D5] lg:hidden"
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav
        id="er-mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className="absolute inset-x-0 top-full border-y border-[#F2E7D5]/10 bg-[#14110F] lg:hidden"
      >
        <ul className="mx-auto max-w-[1320px] px-5 py-2 sm:px-8">
          {LINKS.map((link) => (
            <li key={link.href} className="border-b border-[#F2E7D5]/10 last:border-b-0">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="f-display flex min-h-[52px] items-center text-2xl italic"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
