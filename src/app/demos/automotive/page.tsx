import type { CSSProperties, ReactNode } from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { ArrowRight, Camera, CarFront, Clock, KeyRound, Mail, MapPin, MessageSquareText, Phone, ReceiptText, Timer, Truck } from "lucide-react"
import ConceptBar from "@/components/demos/ConceptBar"
import DemoForm from "@/components/demos/DemoForm"
import ServiceEstimator from "@/components/demos/automotive/ServiceEstimator"
import WarningLights from "@/components/demos/automotive/WarningLights"

// Chakra Petch, served from files in the repo so the build never depends on a font host
const display = localFont({
  src: [
    { path: "../../../fonts/demos/chakra-petch-normal-600.woff2", style: "normal", weight: "600" },
    { path: "../../../fonts/demos/chakra-petch-normal-700.woff2", style: "normal", weight: "700" },
  ],
  variable: "--f-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
})
// Manrope, served from files in the repo so the build never depends on a font host
const body = localFont({
  src: [
    { path: "../../../fonts/demos/manrope-normal-200-800.woff2", style: "normal", weight: "200 800" },
  ],
  variable: "--f-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
})
// Share Tech Mono, served from files in the repo so the build never depends on a font host
const mono = localFont({
  src: [
    { path: "../../../fonts/demos/share-tech-mono-normal-400.woff2", style: "normal", weight: "400" },
  ],
  variable: "--f-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
})

export const metadata: Metadata = {
  title: "Gearbox Auto Service, a concept site for an Ajax repair and tire shop",
  description:
    "Concept build for an invented independent repair and tire shop in Ajax, Ontario: instant service estimates, a dashboard warning-light decoder, plain prices and online booking.",
}

const TEL = "tel:+19055550191"
const EMAIL = "service@gearboxauto.example"

const NAV = [
  ["Estimate", "#estimate"],
  ["Warning lights", "#lights"],
  ["Services", "#services"],
  ["Tires", "#tires"],
  ["Fleet", "#fleet"],
  ["Book", "#enquire"],
]

const SERVICES = [
  { code: "GBX-01", name: "Oil change", detail: "Full synthetic up to 5 L, new filter, fluids topped up and tire pressures set.", time: "30–45 min", price: "$89", from: true },
  { code: "GBX-02", name: "Brake service, per axle", detail: "New pads, rotors machined or replaced, slides cleaned and lubricated, then a road test.", time: "1.5–2.5 h", price: "$329", from: true },
  { code: "GBX-03", name: "Seasonal tire swap", detail: "Set of four, torqued by hand and pressures set. $49 on rims, $109 off rims with balancing.", time: "30–60 min", price: "$49", from: true },
  { code: "GBX-04", name: "Wheel alignment", detail: "Four-wheel alignment with a before and after printout you can keep.", time: "60–75 min", price: "$129", from: false },
  { code: "GBX-05", name: "Diagnostic scan", detail: "Code read, live data and a written finding. The fee comes off the repair if you go ahead.", time: "45–90 min", price: "$95", from: false },
  { code: "GBX-06", name: "Battery replacement", detail: "Load test first. New battery fitted, terminals cleaned, old unit recycled.", time: "30 min", price: "$219", from: true },
  { code: "GBX-07", name: "Safety inspection", detail: "Brakes, steering, suspension, tires, lights and glass checked for a sale or a registration.", time: "1.5 h", price: "$119", from: false },
]

const TIRES = [
  { label: "On rims", price: "$49", unit: "set of four", text: "Wheels off, wheels on. Torqued by hand, pressures set, about 30 minutes." },
  { label: "Off rims", price: "$109", unit: "set of four", text: "Tires dismounted, fitted to your rims and balanced. About an hour." },
  { label: "Storage", price: "$89", unit: "per season", text: "Your other set washed, tagged and racked indoors until the next swap." },
]

const STEPS = [
  { icon: KeyRound, title: "Drop off", text: "Book a time, or use the key drop before we open. Tell us what you hear, feel or smell. Plain words are fine." },
  { icon: Camera, title: "Digital inspection", text: "A technician checks the vehicle and sends a report to your phone, with photos and measurements of anything worn." },
  { icon: MessageSquareText, title: "Approve by text", text: "Every line has its own price. Reply to approve all of it, part of it or none of it. Nothing starts until you do." },
  { icon: CarFront, title: "Pick up", text: "We text when it is ready. Pay at the counter or by link, and ask to see the old parts if you like." },
]

const REPORT = [
  { item: "Front brake pads", reading: "3 mm left, minimum 2", status: "Now", tone: "bg-[#E5262B] text-white" },
  { item: "Cabin air filter", reading: "Clogged, airflow down", status: "Soon", tone: "bg-[#FFB020] text-[#0B0D10]" },
  { item: "Battery", reading: "12.6 V, tests healthy", status: "OK", tone: "bg-[#222831] text-[#D5DAE0]" },
  { item: "Tires", reading: "6/32 in. all round", status: "OK", tone: "bg-[#222831] text-[#D5DAE0]" },
]

const FLEET = [
  { icon: Timer, title: "Priority bays", text: "Two bays are held every weekday morning for account vehicles, so a van that arrives at 7:30 is usually earning again the same day." },
  { icon: ReceiptText, title: "Monthly invoicing", text: "One statement at month end, itemised by unit number and plate, with the inspection photos attached to each line." },
  { icon: Truck, title: "Pickup and return", text: "We collect from your yard in Ajax, Pickering or Whitby and bring the vehicle back when the work is done." },
]

const BOARD = [
  ["Unit 01", "Cargo van", "In bay 2", true],
  ["Unit 02", "Pickup", "Ready 14:30", false],
  ["Unit 03", "Cargo van", "Due in 9 days", false],
  ["Unit 04", "Cube van", "Due in 3 weeks", false],
  ["Unit 05", "Pickup", "Collect Friday", false],
] as const

const HOURS = [
  ["Monday to Friday", "7:30 – 18:00"],
  ["Saturday", "8:00 – 14:00"],
  ["Sunday", "Closed"],
]

const FORM_OPTIONS = ["Oil change", "Brake service", "Seasonal tire swap", "Wheel alignment", "Diagnostic scan", "Battery replacement", "Safety inspection", "Fleet or commercial account"]

const wrap = "mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10"
const sec = "scroll-mt-[98px] py-16 sm:py-20 lg:py-24"
const tag = "f-mono text-[12px] uppercase tracking-[0.16em] text-[#9AA3AE]"

const css = `
.gbx-cut{clip-path:polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,18px 100%,0 calc(100% - 18px))}
.gbx-frame{background:#2A313B;padding:1px}
.gbx-frame > .gbx-cut{height:100%;clip-path:polygon(0 0,calc(100% - 17.4px) 0,100% 17.4px,100% 100%,17.4px 100%,0 calc(100% - 17.4px))}
.gbx-cut-sm{clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))}
.gbx-grid{background-image:linear-gradient(rgba(154,163,174,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(154,163,174,.08) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:linear-gradient(#000,transparent 88%);mask-image:linear-gradient(#000,transparent 88%)}
.gbx-hatch{background-image:repeating-linear-gradient(135deg,rgba(154,163,174,.2) 0 2px,transparent 2px 7px)}
.gbx-btn{display:inline-flex;align-items:center;justify-content:center;gap:.6rem;min-height:50px;padding:0 1.5rem;font-family:var(--f-display),sans-serif;font-size:.9375rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;cursor:pointer;transition:background-color .15s,color .15s;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,12px 100%,0 calc(100% - 12px))}
.gbx .gbx-btn:focus-visible,.gbx .gbx-lamp:focus-visible{outline-offset:-5px}
.gbx-btn-red{background:#E5262B;color:#fff}
.gbx-btn-red:hover{background:#F4F6F8;color:#0B0D10}
.gbx-btn-ghost{position:relative;isolation:isolate;background:#9AA3AE;color:#F4F6F8}
.gbx-btn-ghost::before{content:"";position:absolute;inset:1.5px;z-index:-1;background:#0B0D10;transition:background-color .15s;clip-path:polygon(0 0,calc(100% - 11.1px) 0,100% 11.1px,100% 100%,11.1px 100%,0 calc(100% - 11.1px))}
.gbx-btn-ghost:hover::before{background:#222831}
.gbx-chip{position:relative;display:block}
.gbx-chip span{display:flex;align-items:center;min-height:46px;padding:8px 14px;background:#222831;color:#D5DAE0;font-family:var(--f-mono),monospace;font-size:13px;line-height:1.2;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:background-color .15s,color .15s;clip-path:polygon(0 0,calc(100% - 9px) 0,100% 9px,100% 100%,0 100%)}
.gbx-chip span:hover{background:#2E3641;color:#fff}
.gbx-chip input:checked + span{background:#E5262B;color:#fff}
.gbx-chip input:focus-visible + span{outline:2px solid #F4F6F8;outline-offset:-4px}
.gbx-needle{transform-box:view-box;transform-origin:200px 200px}
.gbx-lamp-on{filter:drop-shadow(0 0 7px currentColor)}
@media (prefers-reduced-motion:no-preference){
  .gbx-needle{transition:transform .9s cubic-bezier(.25,1.25,.4,1)}
  .gbx-lamp-on{animation:gbx-glow 2.6s ease-in-out infinite}
  @keyframes gbx-glow{0%,100%{filter:drop-shadow(0 0 4px currentColor)}50%{filter:drop-shadow(0 0 11px currentColor)}}
}
`

/** Hex nut: the Gearbox mark. */
function HexMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 shrink-0">
      <polygon points="30,16 23,28.1 9,28.1 2,16 9,3.9 23,3.9" fill="#E5262B" />
      <circle cx="16" cy="16" r="5.5" fill="#0B0D10" />
    </svg>
  )
}

/** Tire tread band, used as the divider between sections. */
function TreadBand({ id }: { id: string }) {
  return (
    <svg aria-hidden="true" className="block h-[60px] w-full bg-[#0B0D10]">
      <defs>
        <pattern id={id} width="40" height="60" patternUnits="userSpaceOnUse" fill="#2A313B">
          <rect x="3" width="28" height="9" />
          <rect x="3" y="51" width="28" height="9" />
          <polygon points="0,28 10,13 32,13 22,28" />
          <polygon points="0,32 10,47 32,47 22,32" />
          <path d="M9 20.5h15M9 39.5h15M11 4.5h12M11 55.5h12" stroke="#0B0D10" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="60" fill={`url(#${id})`} />
    </svg>
  )
}

/** Section heading with a stamped part-number label. */
function SectionHead({ no, label, title, children }: { no: string; label: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className={`${tag} flex flex-wrap items-center gap-3`}>
        <span className="border border-[#6B7480] px-2 py-1 text-[#F4F6F8]">P/N {no}</span>
        {label}
      </p>
      <h2 className="f-display mt-5 text-[clamp(1.9rem,6vw,3.25rem)] font-bold uppercase leading-[1.02]">{title}</h2>
      {children && <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#9AA3AE]">{children}</p>}
    </div>
  )
}

export default function AutomotiveDemo() {
  const vars = { "--demo-selection": "#E5262B", "--demo-selection-text": "#fff", "--demo-focus": "#F4F6F8" } as CSSProperties

  return (
    <>
      <ConceptBar industrySlug="automotive" industryName="Automotive" />
      <div
        id="top"
        style={vars}
        className={`${display.variable} ${body.variable} ${mono.variable} gbx f-body flex-1 overflow-x-clip bg-[#0B0D10] text-[#F4F6F8] antialiased`}
      >
        <style>{css}</style>

        <header className="sticky top-[34px] z-50 border-b border-[#2A313B] bg-[#0B0D10]/95 backdrop-blur-sm">
          <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
            <a href="#top" aria-label="Gearbox Auto Service, top of page" className="flex min-h-[44px] items-center gap-2.5">
              <HexMark />
              <span className="f-display text-[22px] font-bold uppercase leading-none tracking-[0.04em]">Gearbox</span>
              <span className="f-mono hidden border-l border-[#3A424E] pl-2.5 text-[10px] uppercase leading-tight tracking-[0.2em] text-[#9AA3AE] sm:block lg:hidden xl:block">
                Auto
                <br />
                service
              </span>
            </a>
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="f-mono flex items-center text-[13px] uppercase tracking-[0.1em]">
                {NAV.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="flex min-h-[44px] items-center px-2.5 text-[#9AA3AE] transition-colors hover:text-[#F4F6F8] xl:px-3.5">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a href={TEL} className="f-mono flex min-h-[44px] items-center gap-2 text-[15px] transition-colors hover:text-[#FF5A5F]">
              <Phone aria-hidden="true" className="h-4 w-4 text-[#E5262B]" />
              (905) 555-0191
            </a>
          </div>
        </header>
        <nav aria-label="Sections" className="border-b border-[#2A313B] bg-[#2A313B] lg:hidden">
          <ul className="f-mono grid grid-cols-3 gap-px text-[11px] uppercase tracking-[0.1em]">
            {NAV.map(([label, href]) => (
              <li key={href} className="bg-[#0B0D10]">
                <a href={href} className="flex min-h-[44px] items-center justify-center px-1 text-center text-[#C5CBD3]">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main>
          {/* 01 Hero, tachometer and estimator */}
          <section className="relative overflow-hidden border-b border-[#2A313B]">
            <div aria-hidden="true" className="gbx-grid absolute inset-0" />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 right-0 hidden w-[44%] bg-[#161A20] [clip-path:polygon(26%_0,100%_0,100%_100%,0_100%)] lg:block"
            />
            <div className={`${wrap} relative py-12 sm:py-16 lg:py-20`}>
              <ServiceEstimator>
                <p className={`${tag} flex items-center gap-3`}>
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-[#E5262B]" />
                  Independent repair + tire · Ajax, Ontario
                </p>
                <h1 className="f-display mt-6 text-[clamp(2.75rem,13vw,5rem)] font-bold uppercase leading-[0.94] lg:text-[clamp(4rem,6.4vw,5.5rem)]">
                  <span className="block">Fixed right.</span>
                  <span className="block">Explained</span>
                  <span className="block text-[#E5262B]">plainly.</span>
                </h1>
                <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#C5CBD3]">
                  Gearbox is an independent repair and tire shop in Ajax. You get photos of what we found, a price in writing
                  before a wrench turns, and your old parts back if you want to see them.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href="#enquire" className="gbx-btn gbx-btn-red">
                    Book a bay <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                  <a href="#lights" className="gbx-btn gbx-btn-ghost">
                    What&apos;s that light?
                  </a>
                </div>
                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-[#2A313B] pt-5">
                  {[
                    ["Bays", "06"],
                    ["Open", "Mon–Sat"],
                    ["Quotes", "In writing"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="f-mono text-[11px] uppercase tracking-[0.18em] text-[#9AA3AE]">{k}</dt>
                      <dd className="f-display mt-1 text-[15px] font-semibold uppercase tracking-[0.04em] sm:text-lg">{v}</dd>
                    </div>
                  ))}
                </dl>
              </ServiceEstimator>
            </div>
          </section>

          {/* 02 Warning lights */}
          <section id="lights" className={sec}>
            <div className={wrap}>
              <SectionHead no="02" label="Dashboard decoder" title="What's that light?">
                Pick the symbol that has come on. You get its name, how soon it needs attention and what to do next, in two
                sentences.
              </SectionHead>
              <div className="mt-10">
                <WarningLights />
              </div>
              <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-[#9AA3AE]">
                {"A general guide, not a diagnosis. Symbols vary a little between vehicles, so check your owner's manual too."}
              </p>
            </div>
          </section>

          {/* 03 Services and prices */}
          <section id="services" className={`${sec} border-t border-[#2A313B]`}>
            <div className={wrap}>
              <SectionHead no="03" label="Services + prices" title="The price is on the wall.">
                The jobs we do most, with what is included and how long the vehicle is in the bay.
              </SectionHead>
              <table className="mt-10 w-full border-collapse border-y-2 border-[#9AA3AE] text-left">
                <caption className="sr-only">Service prices in Canadian dollars, before tax</caption>
                <thead>
                  <tr className="f-mono border-b border-[#3A424E] text-[11px] uppercase tracking-[0.18em] text-[#9AA3AE]">
                    <th scope="col" className="hidden py-3 pl-3 pr-4 font-normal sm:table-cell">
                      Part no.
                    </th>
                    <th scope="col" className="py-3 pr-4 font-normal">
                      Service
                    </th>
                    <th scope="col" className="hidden py-3 pr-4 font-normal md:table-cell">
                      Bay time
                    </th>
                    <th scope="col" className="py-3 text-right font-normal sm:pr-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICES.map((s) => (
                    <tr key={s.code} className="border-b border-[#2A313B] align-top transition-colors last:border-b-0 hover:bg-[#161A20]">
                      <td className="f-mono hidden py-5 pr-4 text-[13px] text-[#9AA3AE] sm:table-cell sm:pl-3">{s.code}</td>
                      <th scope="row" className="py-5 pr-4 font-normal">
                        <span className="f-display block text-lg font-semibold uppercase tracking-[0.04em]">{s.name}</span>
                        <span className="mt-1 block max-w-xl text-[15px] leading-relaxed text-[#9AA3AE]">{s.detail}</span>
                        <span className="f-mono mt-2 block text-[12px] uppercase tracking-[0.12em] text-[#C5CBD3] md:hidden">{s.time}</span>
                      </th>
                      <td className="f-mono hidden whitespace-nowrap py-5 pr-4 text-[15px] text-[#C5CBD3] md:table-cell">{s.time}</td>
                      <td className="f-mono whitespace-nowrap py-5 text-right text-[22px] leading-none sm:pr-3">
                        {s.from && <span className="mr-2 text-[11px] uppercase tracking-[0.14em] text-[#9AA3AE]">from</span>}
                        {s.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-[#9AA3AE]">
                Prices are in Canadian dollars before HST. Trucks and larger SUVs can run higher, and you always get the exact
                figure in writing before work starts.
              </p>
            </div>
          </section>

          {/* 04 Tire season */}
          <section id="tires" className="scroll-mt-[98px] bg-[#161A20]">
            <TreadBand id="gbx-tread-a" />
            <div className={`${wrap} grid gap-12 py-14 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-20`}>
              <div>
                <SectionHead no="04" label="Winter changeover" title="Book before the first frost.">
                  Winter tires out-grip all-seasons once the days stay under 7 °C. In Ajax that is usually late October, and
                  the week after the first frost is the busiest of our year.
                </SectionHead>
                <svg viewBox="0 0 320 60" aria-hidden="true" className="mt-8 block w-full max-w-md">
                  {Array.from({ length: 26 }, (_, i) => {
                    const x = (4 + i * 12.48).toFixed(1)
                    return <line key={i} x1={x} x2={x} y1="28" y2={i % 5 === 0 ? 42 : 36} stroke={i >= 8 ? "#F4F6F8" : "#6B7480"} strokeWidth="1.5" />
                  })}
                  <line x1="4" x2="316" y1="28" y2="28" stroke="#6B7480" />
                  <polygon points="103.8,24 97.3,12 110.3,12" fill="#E5262B" />
                  <g className="f-mono" fontSize="12" letterSpacing="1.5" fill="#9AA3AE">
                    <text x="118" y="20" fill="#F4F6F8">
                      7 °C · SWAP LINE
                    </text>
                    <text x="4" y="58">+15</text>
                    <text x="191.2" y="58" textAnchor="middle">
                      0
                    </text>
                    <text x="316" y="58" textAnchor="end">
                      −10 °C
                    </text>
                  </g>
                </svg>
                <a href="#enquire" className="gbx-btn gbx-btn-red mt-8">
                  Book a changeover <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
              </div>
              <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {TIRES.map((t, i) => (
                  <li key={t.label} className="gbx-cut gbx-frame">
                    <div className="gbx-cut bg-[#0B0D10] p-6">
                      <p className={tag}>
                        <span className="text-[#FF5A5F]">T-0{i + 1}</span> {t.label}
                      </p>
                      <p className="f-mono mt-5 text-[2.75rem] leading-none">{t.price}</p>
                      <p className="f-mono mt-2 text-[12px] uppercase tracking-[0.14em] text-[#C5CBD3]">{t.unit}</p>
                      <p className="mt-4 text-[15px] leading-relaxed text-[#9AA3AE]">{t.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <TreadBand id="gbx-tread-b" />
          </section>

          {/* 05 How it works */}
          <section id="how" className={sec}>
            <div className={wrap}>
              <SectionHead no="05" label="How it works" title="You see what we see.">
                No phone tag and no surprises on the bill. Four steps, and you approve the work from wherever you are.
              </SectionHead>
              <div className="mt-10 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:items-start">
                <ol className="grid gap-4 sm:grid-cols-2">
                  {STEPS.map((s, i) => (
                    <li key={s.title} className="gbx-cut gbx-frame">
                      <div className="gbx-cut bg-[#161A20] p-6">
                        <div className="flex items-center justify-between">
                          <span className="f-mono text-[13px] uppercase tracking-[0.2em] text-[#FF5A5F]">Step 0{i + 1}</span>
                          <s.icon aria-hidden="true" className="h-6 w-6 text-[#9AA3AE]" />
                        </div>
                        <h3 className="f-display mt-6 text-xl font-semibold uppercase tracking-[0.04em]">{s.title}</h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-[#9AA3AE]">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div
                  role="img"
                  aria-label="Sample inspection report: front brake pads need replacing now, cabin air filter soon, battery and tires are fine, with buttons to approve or decline the work."
                  className="gbx-cut gbx-frame mx-auto w-full max-w-[400px]"
                >
                  <div className="gbx-cut bg-[#0B0D10] p-5">
                    <div className="f-mono flex justify-between text-[11px] uppercase tracking-[0.16em] text-[#9AA3AE]">
                      <span>Inspection report</span>
                      <span>Sample</span>
                    </div>
                    <ul className="mt-4 border-t border-[#2A313B]">
                      {REPORT.map((r) => (
                        <li key={r.item} className="flex items-center gap-3 border-b border-[#2A313B] py-3">
                          <span className="gbx-hatch flex h-11 w-11 shrink-0 items-center justify-center bg-[#161A20]">
                            <Camera aria-hidden="true" className="h-4 w-4 text-[#9AA3AE]" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[14px] font-semibold">{r.item}</span>
                            <span className="f-mono block text-[12px] text-[#9AA3AE]">{r.reading}</span>
                          </span>
                          <span className={`f-mono px-2 py-1 text-[11px] uppercase tracking-[0.1em] ${r.tone}`}>{r.status}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="f-mono mt-4 grid grid-cols-2 gap-2 text-center text-[12px] uppercase tracking-[0.1em]">
                      <span className="bg-[#E5262B] py-3 text-white">Approve $329</span>
                      <span className="bg-[#222831] py-3 text-[#D5DAE0]">Decline</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 06 Fleet and commercial */}
          <section id="fleet" className={`${sec} border-t border-[#2A313B]`}>
            <div className={`${wrap} grid gap-12 lg:grid-cols-2 lg:items-center`}>
              <div>
                <SectionHead no="06" label="Fleet + commercial" title="A van in the shop earns nothing.">
                  Accounts for trades, couriers and anyone running three or more light-duty vehicles out of Durham Region.
                </SectionHead>
                <ul className="mt-8 border-t border-[#2A313B]">
                  {FLEET.map((f, i) => (
                    <li key={f.title} className="grid grid-cols-[auto_1fr] gap-x-5 border-b border-[#2A313B] py-5">
                      <span className="f-mono pt-1 text-[13px] text-[#FF5A5F]">F-0{i + 1}</span>
                      <div>
                        <h3 className="f-display flex items-center gap-2.5 text-lg font-semibold uppercase tracking-[0.04em]">
                          <f.icon aria-hidden="true" className="h-5 w-5 shrink-0 text-[#9AA3AE]" />
                          {f.title}
                        </h3>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-[#9AA3AE]">{f.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <a href="#enquire" className="gbx-btn gbx-btn-ghost mt-8">
                  Open a fleet account
                </a>
              </div>
              <div
                role="img"
                aria-label="Sample fleet board listing five vehicles by unit number, with one in a bay, one ready, and the rest showing when service is next due."
                className="gbx-cut gbx-frame"
              >
                <div className="gbx-cut bg-[#161A20]">
                  <div className="f-mono flex justify-between border-b border-[#2A313B] px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-[#9AA3AE]">
                    <span>Fleet board</span>
                    <span>Sample account</span>
                  </div>
                  <ul className="f-mono text-[13px] uppercase tracking-[0.06em]">
                    {BOARD.map(([unit, kind, status, live]) => (
                      <li key={unit} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-[#2A313B] px-5 py-4 sm:gap-5">
                        <span>{unit}</span>
                        <span className="truncate text-[#9AA3AE]">{kind}</span>
                        <span className={live ? "bg-[#E5262B] px-2 py-1 text-white" : "text-[#C5CBD3]"}>{status}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="f-mono px-5 py-4 text-[12px] uppercase tracking-[0.14em] text-[#9AA3AE]">
                    One statement · itemised by unit · photos attached
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 07 Hours, location and booking */}
          <section id="enquire" className={`${sec} bg-[#161A20]`}>
            <div className={`${wrap} grid gap-12 lg:grid-cols-[0.85fr_1.15fr]`}>
              <div>
                <SectionHead no="07" label="Hours + location" title="Book a bay.">
                  Tell us what the vehicle is doing and when suits you. We reply with a time and a rough price, usually within
                  two working hours.
                </SectionHead>
                <dl className="f-mono mt-8 border-t border-[#3A424E] text-[15px]">
                  {HOURS.map(([day, time]) => (
                    <div key={day} className="flex justify-between gap-6 border-b border-[#3A424E] py-3">
                      <dt className="uppercase tracking-[0.1em] text-[#9AA3AE]">{day}</dt>
                      <dd>{time}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-6 text-[15px] leading-relaxed">
                  <li className="flex min-h-[44px] items-center gap-3">
                    <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-[#E5262B]" />
                    Ajax, Ontario. Five minutes off Highway 401.
                  </li>
                  <li>
                    <a href={TEL} className="flex min-h-[44px] items-center gap-3 hover:text-[#FF5A5F]">
                      <Phone aria-hidden="true" className="h-5 w-5 shrink-0 text-[#E5262B]" />
                      (905) 555-0191
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${EMAIL}`} className="flex min-h-[44px] items-center gap-3 break-all hover:text-[#FF5A5F]">
                      <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-[#E5262B]" />
                      {EMAIL}
                    </a>
                  </li>
                  <li className="flex min-h-[44px] items-center gap-3 text-[#C5CBD3]">
                    <Clock aria-hidden="true" className="h-5 w-5 shrink-0 text-[#E5262B]" />
                    Key drop by the bay door, any night of the week.
                  </li>
                </ul>
              </div>
              <div className="gbx-cut gbx-frame self-start">
                <div className="gbx-cut bg-[#0B0D10] p-6 sm:p-8">
                  <p className={tag}>
                    <span className="text-[#FF5A5F]">W/O</span> New work order
                  </p>
                  <h3 className="f-display mb-7 mt-3 text-2xl font-bold uppercase">Request a booking</h3>
                  <DemoForm
                    demoName="Gearbox Auto Service"
                    industrySlug="automotive"
                    options={FORM_OPTIONS}
                    optionsLabel="Service"
                    messageLabel="What is the vehicle doing?"
                    messagePlaceholder="Type of vehicle, what you hear or feel, and a day that suits you."
                    submitLabel="Request a booking"
                    classes={{
                      form: "space-y-5",
                      grid: "grid gap-5 sm:grid-cols-2",
                      field: "flex flex-col gap-2",
                      label: "f-mono text-[12px] uppercase tracking-[0.16em] text-[#9AA3AE]",
                      input:
                        "min-h-[48px] w-full rounded-none border border-[#6B7480] bg-[#0B0D10] px-3.5 py-3 text-[16px] text-[#F4F6F8] [color-scheme:dark] placeholder:text-[#8A939E] focus:border-[#F4F6F8]",
                      button: "gbx-btn gbx-btn-red w-full disabled:opacity-60 sm:w-auto",
                      note: "text-[13px] leading-relaxed text-[#9AA3AE]",
                      error: "border-l-2 border-[#E5262B] bg-[#E5262B]/10 px-3 py-2.5 text-[14px] text-[#FFC9CB]",
                      success: "border-l-2 border-[#E5262B] bg-[#161A20] p-5 text-[16px] leading-relaxed text-[#F4F6F8]",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <TreadBand id="gbx-tread-c" />
          <div className={`${wrap} grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]`}>
            <div>
              <p className="flex items-center gap-2.5">
                <HexMark />
                <span className="f-display text-[22px] font-bold uppercase leading-none tracking-[0.04em]">Gearbox</span>
              </p>
              <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-[#9AA3AE]">
                Independent repair and tire shop in Ajax, Ontario. Fixed right, explained plainly.
              </p>
            </div>
            <nav aria-label="Footer">
              <ul className="f-mono grid grid-cols-2 text-[13px] uppercase tracking-[0.12em]">
                {NAV.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="flex min-h-[44px] items-center text-[#C5CBD3] hover:text-[#F4F6F8]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="f-mono text-[14px]">
              <a href={TEL} className="flex min-h-[44px] items-center hover:text-[#FF5A5F]">
                (905) 555-0191
              </a>
              <a href={`mailto:${EMAIL}`} className="flex min-h-[44px] items-center break-all hover:text-[#FF5A5F]">
                {EMAIL}
              </a>
              <p className="mt-2 text-[#9AA3AE]">Mon–Fri 7:30–18:00 · Sat 8:00–14:00</p>
            </div>
          </div>
          <div className="border-t border-[#2A313B]">
            <p className={`${wrap} f-mono py-5 text-[12px] uppercase leading-relaxed tracking-[0.12em] text-[#9AA3AE]`}>
              © 2026 Gearbox Auto Service · Concept site. The business, its prices and its phone number are invented.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
