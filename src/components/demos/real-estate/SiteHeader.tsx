"use client"

import { useState } from "react"
import { Menu, Phone, X } from "lucide-react"

const NAV = [
  ["Listings", "#listings"],
  ["Neighbourhoods", "#neighbourhoods"],
  ["Selling", "#selling"],
  ["Calculator", "#calculator"],
  ["Contact", "#enquire"],
] as const

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-[34px] z-[60] border-b border-[#161412]/15 bg-[#F6F2EA]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a href="#top" aria-label="Kestrel and Rowe Realty, back to top" className="flex min-h-[44px] items-center gap-3">
          <span className="f-display whitespace-nowrap text-[25px] font-semibold leading-none">
            Kestrel <i className="font-medium text-[#9A7B3F]">&amp;</i> Rowe
          </span>
          <span className="hidden border-l border-[#161412]/30 pl-3 text-[10px] font-medium uppercase tracking-[0.3em] sm:block lg:hidden xl:block">
            Realty
          </span>
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-9">
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="inline-flex min-h-[44px] items-center whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.22em] decoration-[#9A7B3F] decoration-1 underline-offset-[10px] hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href="tel:+19055550116"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 whitespace-nowrap text-[14px] font-normal tracking-[0.04em]"
          >
            <Phone aria-hidden="true" size={15} strokeWidth={1.5} className="text-[#9A7B3F]" />
            <span className="max-[430px]:sr-only">(905) 555-0116</span>
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="kr-menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
          >
            {open ? <X aria-hidden="true" size={22} strokeWidth={1.25} /> : <Menu aria-hidden="true" size={22} strokeWidth={1.25} />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <nav
        id="kr-menu"
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full mt-px border-b border-[#161412]/15 bg-[#F6F2EA] shadow-[0_24px_40px_-24px_rgba(22,20,18,0.35)] lg:hidden"
      >
        <ul className="mx-auto max-w-[1320px] px-5 pb-4 sm:px-8">
          {NAV.map(([label, href], i) => (
            <li key={href} className="border-b border-[#161412]/15 last:border-b-0">
              <a href={href} onClick={() => setOpen(false)} className="flex min-h-[56px] items-baseline gap-5 py-3">
                <span className="text-[11px] font-medium tracking-[0.2em]">0{i + 1}</span>
                <span className="f-display text-[28px] font-medium leading-none">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
