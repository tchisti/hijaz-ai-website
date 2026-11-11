"use client"

/**
 * "What's that light?": six dashboard warning lights as toggle buttons. Picking
 * one shows its name, how urgent it is, and what to do. Local state only.
 */

import { useState, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"

type Severity = "stop" | "week" | "monitor"

const SEVERITY: Record<Severity, { label: string; tag: string; action: string; href: string }> = {
  stop: { label: "Stop now", tag: "bg-[#E5262B] text-white", action: "Call (905) 555-0191", href: "tel:+19055550191" },
  week: { label: "Book this week", tag: "bg-[#FFB020] text-[#0B0D10]", action: "Book a diagnostic scan", href: "#enquire" },
  monitor: { label: "Monitor", tag: "bg-[#F4F6F8] text-[#0B0D10]", action: "Book a pressure check", href: "#enquire" },
}
const ORDER: Severity[] = ["stop", "week", "monitor"]

const TONE = { red: "#E5262B", amber: "#FFB020" }

const LIGHTS: { id: string; name: string; tone: keyof typeof TONE; severity: Severity; text: string; icon: ReactNode }[] = [
  {
    id: "engine",
    name: "Check engine",
    tone: "amber",
    severity: "week",
    text: "The engine computer has logged a fault, most often in the ignition or emissions system. If the light is steady, drive gently and book a scan this week; if it flashes, ease off and pull over, because fuel is going unburned.",
    icon: <path d="M17 11h10M22 11v5M12 16h18l3 4h5v14h-5l-3 3H18l-4-4h-2zM12 25H7M7 20v10M38 27h4M42 22v10" />,
  },
  {
    id: "oil",
    name: "Oil pressure",
    tone: "red",
    severity: "stop",
    text: "Oil is not reaching the engine at the pressure it needs, so metal parts are running without protection. Pull over where it is safe, switch the engine off and call us before you drive another kilometre.",
    icon: (
      <>
        <path d="M13 21h14l4 3 9-5 2 3-9 6v2H13zM13 24l-6-2M5 19l3 6M20 21v-4M17 17h6" />
        <path d="M42 27c1.6 2.2 2.4 3.6 2.4 4.8a2.4 2.4 0 0 1-4.8 0c0-1.2.8-2.6 2.4-4.8z" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    id: "battery",
    name: "Battery",
    tone: "red",
    severity: "stop",
    text: "The charging system has stopped topping up the battery, so the car is running on stored power and will stall when that runs out. Switch off the heated seats and rear defroster, park somewhere safe and call us today.",
    icon: <path d="M8 17h32v19H8zM13 17v-4h6v4M29 17v-4h6v4M13 26.5h6M16 23.5v6M29 26.5h6" />,
  },
  {
    id: "tire",
    name: "Tire pressure",
    tone: "amber",
    severity: "monitor",
    text: "At least one tire is well under its recommended pressure, which often happens after the first cold night. Top up to the figure on the driver's door sticker, and book a check if the light returns within a few days.",
    icon: (
      <>
        <path d="M18 9c0 5-7 9-7 17 0 4 1.5 7.5 4 10h18c2.5-2.5 4-6 4-10 0-8-7-12-7-17M16 36v4M21.3 36v4M26.7 36v4M32 36v4M24 15v11" />
        <circle cx="24" cy="30.5" r="1.7" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    id: "abs",
    name: "ABS",
    tone: "amber",
    severity: "week",
    text: "The anti-lock system has switched itself off, usually because a wheel speed sensor has failed. Your ordinary brakes still work, so leave more room on wet or icy roads and book an inspection this week.",
    icon: (
      <>
        <circle cx="24" cy="24" r="12.5" />
        <path d="M8.5 12.5a19.5 19.5 0 0 0 0 23M39.5 12.5a19.5 19.5 0 0 1 0 23" />
        <text x="24" y="24.5" textAnchor="middle" dominantBaseline="central" className="f-display" fontSize="10.5" fontWeight="700" fill="currentColor" stroke="none">
          ABS
        </text>
      </>
    ),
  },
  {
    id: "coolant",
    name: "Coolant temp",
    tone: "red",
    severity: "stop",
    text: "The engine is running hotter than it is built to, and a few more minutes can warp parts that are costly to replace. Pull over, switch off and let it cool, and never open the radiator cap while it is hot.",
    icon: (
      <>
        <path d="M24 8v19M24 12h6M24 17h6M24 22h5M6 34c2.5 0 2.5 2.5 5 2.5s2.5-2.5 5-2.5M32 34c2.5 0 2.5 2.5 5 2.5s2.5-2.5 5-2.5M6 41c3 0 3-2.5 6-2.5s3 2.5 6 2.5 3-2.5 6-2.5 3 2.5 6 2.5 3-2.5 6-2.5 3 2.5 6 2.5" />
        <circle cx="24" cy="30" r="3.6" fill="currentColor" stroke="none" />
      </>
    ),
  },
]

function Lamp({ icon, className }: { icon: ReactNode; className: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icon}
    </svg>
  )
}

export default function WarningLights() {
  const [active, setActive] = useState(0)
  const light = LIGHTS[active]
  const sev = SEVERITY[light.severity]

  return (
    <div className="gbx-cut gbx-frame">
      <div className="gbx-cut bg-[#0B0D10]">
        <div className="f-mono flex items-center justify-between gap-4 border-b border-[#2A313B] px-5 py-3 text-[11px] uppercase tracking-[0.18em] text-[#9AA3AE] sm:px-7">
          <span>Instrument cluster</span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#FFB020]" />
            Select a light
          </span>
        </div>

        <div role="group" aria-label="Dashboard warning lights" className="grid grid-cols-3 gap-px bg-[#2A313B] md:grid-cols-6">
          {LIGHTS.map((l, i) => {
            const on = i === active
            return (
              <button
                key={l.id}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(i)}
                style={{ color: TONE[l.tone] }}
                className={`gbx-lamp group relative flex min-h-[118px] flex-col items-center justify-center gap-2.5 px-2 py-4 transition-colors ${
                  on ? "bg-[#161A20]" : "bg-[#0B0D10] hover:bg-[#11141A]"
                }`}
              >
                <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-[3px] ${on ? "bg-current" : "bg-transparent"}`} />
                <Lamp
                  icon={l.icon}
                  className={`h-11 w-11 transition-opacity ${on ? "gbx-lamp-on" : "opacity-70 group-hover:opacity-100"}`}
                />
                <span
                  className={`f-mono text-center text-[11px] uppercase leading-tight tracking-[0.1em] ${
                    on ? "text-[#F4F6F8]" : "text-[#9AA3AE]"
                  }`}
                >
                  {l.name}
                </span>
              </button>
            )
          })}
        </div>

        <div
          aria-live="polite"
          className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 border-t border-[#2A313B] bg-[#161A20] p-6 sm:p-8 md:gap-x-10 lg:grid-cols-[auto_1fr_auto]"
        >
          <div
            className="gbx-cut-sm flex h-20 w-20 items-center justify-center bg-[#0B0D10] md:row-span-2 md:h-28 md:w-28 md:self-start"
            style={{ color: TONE[light.tone] }}
          >
            <Lamp icon={light.icon} className="gbx-lamp-on h-12 w-12 md:h-16 md:w-16" />
          </div>
          <div>
            <p className="f-mono text-[11px] uppercase tracking-[0.2em] text-[#9AA3AE]">
              Light 0{active + 1} of 0{LIGHTS.length}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3 className="f-display text-[clamp(1.5rem,5vw,2rem)] font-bold uppercase leading-tight">{light.name}</h3>
              <span className={`f-mono gbx-cut-sm px-3.5 py-1.5 text-[12px] uppercase tracking-[0.14em] ${sev.tag}`}>
                {sev.label}
              </span>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 md:col-start-2">
            <p className="max-w-2xl text-[17px] leading-relaxed text-[#D5DAE0]">{light.text}</p>
            <a
              href={sev.href}
              className="f-mono mt-4 inline-flex min-h-[44px] items-center gap-2 border-b border-[#E5262B] text-[14px] uppercase tracking-[0.12em] text-[#F4F6F8] hover:text-[#FF5A5F]"
            >
              {sev.action} <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          {/* Urgency scale: repeats the tag above for sighted readers, so it is hidden from assistive tech */}
          <ul
            aria-hidden="true"
            className="f-mono hidden self-center border-l border-[#2A313B] pl-8 pr-2 text-[12px] uppercase tracking-[0.12em] text-[#9AA3AE] lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:block"
          >
            <li className="mb-2 text-[11px] tracking-[0.2em]">Urgency</li>
            {ORDER.map((k) => (
              <li key={k} className={`flex items-center gap-3 py-2 ${k === light.severity ? "text-[#F4F6F8]" : ""}`}>
                <span className={`h-2.5 w-2.5 ${k === light.severity ? SEVERITY[k].tag : "bg-[#3A424E]"}`} />
                {SEVERITY[k].label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
