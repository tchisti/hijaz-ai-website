import type { Metadata } from "next"
import { Fragment, type CSSProperties, type ReactNode } from "react"
import { Barlow, Barlow_Condensed, JetBrains_Mono } from "next/font/google"
import { ArrowRight, Mail, Phone } from "lucide-react"
import ConceptBar from "@/components/demos/ConceptBar"
import DemoForm from "@/components/demos/DemoForm"
import LaneMap from "@/components/demos/logistics-distribution/LaneMap"
import ShipmentTracker from "@/components/demos/logistics-distribution/ShipmentTracker"

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--f-display", display: "swap" })
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--f-body", display: "swap" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono", display: "swap" })

export const metadata: Metadata = {
  title: "Corridor Freight Lines | LTL, truckload and cross-dock, Windsor to Montreal",
  description:
    "Concept site for an invented regional carrier in Oshawa, Ontario: LTL, full truckload, cross-border and cross-dock on the Windsor to Montreal corridor, with a sample shipment tracker.",
}

const PHONE = "(905) 555-0127"
const TEL = "tel:+19055550127"
const EMAIL = "dispatch@corridorfreight.example"

const WRAP = "mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-10"
const ANCHOR = "scroll-mt-12 lg:scroll-mt-28"
const HAZARD = "bg-[repeating-linear-gradient(-45deg,#FFD60A_0_14px,#0F1113_14px_28px)]"
const DISPLAY = "f-display font-extrabold uppercase"
const LABEL = "f-mono text-[12px] uppercase tracking-[0.16em]"
const BTN = "f-display inline-flex min-h-[52px] items-center justify-center gap-3 whitespace-nowrap px-7 text-[20px] font-bold uppercase tracking-[0.04em] transition-colors"

const NAV = [
  { href: "#track", label: "Track" },
  { href: "#services", label: "Services" },
  { href: "#lanes", label: "Lanes" },
  { href: "#terminal", label: "Terminal" },
  { href: "#enquire", label: "Quote" },
]

const SERVICES = [
  { code: "01", name: "LTL", covers: "One to twelve skids, picked up in the afternoon, consolidated at Oshawa and on the linehaul that night. Tailgate and appointment deliveries on request.", spec: "1–12 skids, up to 15,000 lb", price: "From $95 per skid" },
  { code: "02", name: "Full truckload", covers: "A 53-foot dry van, loaded at your dock and sealed. It runs direct, with no transfers and nobody else's freight on board.", spec: "26 skids, up to 44,000 lb", price: "From $1,450 Oshawa to Montreal" },
  { code: "03", name: "Cross-border", covers: "Loads through the Windsor crossing into Michigan and Ohio. The paperwork goes to your customs broker before the truck leaves the yard, not while it waits in line.", spec: "LTL and truckload", price: "Quoted per load" },
  { code: "04", name: "Warehousing + cross-dock", covers: "Racked and floor storage by the week, same-day cross-dock, and re-skidding, labelling and stretch wrap for freight that arrives in rough shape.", spec: "420 racked positions", price: "$18 per skid per month" },
  { code: "05", name: "Dedicated runs", covers: "A truck and a driver on your schedule: plant shuttles, daily milk runs and store replenishment, priced by the day instead of by the skid.", spec: "Straight truck or tractor", price: "From $780 per day" },
]

const LANES = [
  { from: "Oshawa", to: "Toronto", km: 60, transit: "Same day", book: "10:00" },
  { from: "Oshawa", to: "Kitchener", km: 165, transit: "Next day", book: "15:00" },
  { from: "Oshawa", to: "London", km: 250, transit: "Next day", book: "15:00" },
  { from: "Oshawa", to: "Windsor", km: 425, transit: "Next day", book: "15:00" },
  { from: "Oshawa", to: "Kingston", km: 205, transit: "Next day", book: "15:00" },
  { from: "Oshawa", to: "Ottawa", km: 350, transit: "Next day", book: "15:00" },
  { from: "Oshawa", to: "Montreal", km: 480, transit: "Next day", book: "15:00" },
  { from: "Windsor", to: "Montreal", km: 905, transit: "2 days", book: "15:00" },
]

const LANE_NOTES = [
  "Transit is counted in business days, dock to dock. The day we pick up is day zero.",
  "Book by 15:00 and the freight rides that night's linehaul. After that it rides tomorrow's.",
  "Points off the corridor, such as Sarnia, Peterborough and Cornwall, add one day.",
]

const FACTS = [
  { label: "Pickup cut-off", value: "15:00", sub: "3:00 PM, for that night's linehaul" },
  { label: "Dock hours", value: "06:00–22:00", sub: "Monday to Friday" },
  { label: "Quote reply", value: "< 60 MIN", sub: "Within the hour, in dock hours" },
  { label: "Linehaul departs", value: "21:30", sub: "Every weeknight, east and west" },
]

const TERMINAL = [
  { figure: "14", unit: "doors", name: "Dock doors", text: "Twelve dock-height doors with levellers, plus two grade-level doors for vans, flat decks and anything that cannot back up to a dock." },
  { figure: "6 HR", unit: "to turn", name: "Cross-dock", text: "Freight comes in one door and leaves by another. Most of it is back on a trailer inside six hours, and nothing sits on the floor over a weekend." },
  { figure: "420", unit: "positions", name: "Short-term storage", text: "Racked skid positions rented by the week or the month, counted on the way in and again on the way out." },
  { figure: "30", unit: "spots", name: "Trailer yard", text: "A fenced, lit yard beside the building. Drop trailers and pre-loads are welcome by arrangement with dispatch." },
]

const APPOINTMENT = [
  "Call or email dispatch with your shipment or PO number, skid count and trailer type.",
  "We give you a door number and a 30-minute window. Same-day slots are usually open before 10:00.",
  "Check in at the driver window beside door 01 with your paperwork, then back in when the door goes up.",
  "Running late? Call. We would rather move your slot than have you wait in the yard.",
]

const STEPS = [
  { name: "Quote", text: "Send origin, destination, piece count, weight and dimensions. Dispatch prices it and replies within the hour." },
  { name: "Pickup", text: "Book by 15:00. The driver arrives inside a two-hour window and leaves you a signed bill of lading." },
  { name: "Cross-dock", text: "At Oshawa every skid is scanned, weighed and measured, then loaded on the trailer for its lane." },
  { name: "Linehaul", text: "Trailers pull out at 21:30 and run overnight. Each scan updates the shipment number you were given." },
  { name: "Proof of delivery", text: "The consignee signs, and the signed copy is in your inbox the same day. The invoice follows it." },
]

const FORM_INPUT = "w-full min-h-[52px] rounded-none border border-[#4A5059] bg-[#0F1113] px-4 py-3 text-[16px] text-white placeholder:text-[#8A9099] [color-scheme:dark]"

function SectionHead({ id, num, label, title, light = false, children }: { id: string; num: string; label: string; title: string; light?: boolean; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <p className={`${LABEL} ${light ? "text-[#4B5158]" : "text-[#8A9099]"}`}>
          <span className={light ? "font-bold text-[#0F1113]" : "text-[#FFD60A]"}>{num}</span> / {label}
        </p>
        <h2 id={id} className={`${DISPLAY} mt-4 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.9] [text-wrap:balance]`}>{title}</h2>
      </div>
      <p className={`text-[17px] leading-relaxed lg:col-span-4 ${light ? "text-[#33383F]" : "text-white/80"}`}>{children}</p>
    </div>
  )
}

function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" aria-hidden="true" className="h-7 w-7 shrink-0">
        <rect width="28" height="28" fill="#FFD60A" />
        <path d="M6 7l7 7-7 7M14 7l7 7-7 7" fill="none" stroke="#0F1113" strokeWidth="3.5" />
      </svg>
      <span className="f-display whitespace-nowrap text-[19px] font-extrabold uppercase leading-none tracking-[0.02em] sm:text-[24px]">
        Corridor <span className="text-[#8A9099]">Freight Lines</span>
      </span>
    </span>
  )
}

export default function LogisticsDistributionDemo() {
  const theme = { "--demo-selection": "#FFD60A", "--demo-selection-text": "#0F1113", "--demo-focus": "#FFD60A" } as CSSProperties

  return (
    <>
      <ConceptBar industrySlug="logistics-distribution" industryName="Logistics & Distribution" />
      <div id="top" style={theme} className={`${display.variable} ${body.variable} ${mono.variable} f-body flex-1 overflow-x-clip bg-[#0F1113] text-white`}>
        {/* 1. Header */}
        <header className="z-[50] border-b border-[#2C3138] bg-[#0F1113] lg:sticky lg:top-[34px]">
          <div className={`${WRAP} flex flex-wrap items-center justify-between gap-x-3 lg:h-16 lg:flex-nowrap lg:gap-x-8`}>
            <a href="#top" aria-label="Corridor Freight Lines, back to top" className="flex min-h-[52px] items-center">
              <Wordmark />
            </a>
            <nav aria-label="Primary" className="order-3 -mx-4 w-[calc(100%+2rem)] border-t border-[#2C3138] px-4 sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6 lg:order-none lg:mx-0 lg:ml-auto lg:w-auto lg:border-0 lg:px-0">
              <ul className="flex justify-between sm:justify-start sm:gap-10 lg:gap-8">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="f-display flex min-h-[44px] items-center text-[16px] font-semibold uppercase tracking-[0.08em] text-white hover:text-[#FFD60A] lg:text-[17px]">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a href={TEL} aria-label={`Call dispatch at ${PHONE}`} className="f-mono flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 whitespace-nowrap text-[14px] text-white hover:text-[#FFD60A]">
              <Phone aria-hidden="true" className="h-4 w-4 text-[#FFD60A]" />
              <span className="hidden sm:inline">{PHONE}</span>
            </a>
          </div>
        </header>

        <main>
          {/* 2. Hero with the shipment tracker */}
          <section aria-labelledby="hero-title" className={`${WRAP} pb-16 pt-8 md:pb-24 md:pt-12`}>
            <p className={`${LABEL} flex flex-wrap justify-between gap-x-8 gap-y-1 border-y border-[#2C3138] py-3 text-[#8A9099]`}>
              <span>Regional carrier + cross-dock</span>
              <span className="hidden sm:inline">Oshawa, Ontario</span>
              <span>Windsor to Montreal</span>
            </p>
            <h1 id="hero-title" className={`${DISPLAY} mt-8 text-[clamp(3.4rem,16.5vw,13rem)] leading-[0.86] tracking-[-0.01em] md:mt-10`}>
              <span className="block">Freight that</span>
              <span className="mt-[0.07em] inline-block bg-[#FFD60A] px-[0.09em] pb-[0.1em] text-[#0F1113]">shows up.</span>
            </h1>

            <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-12 md:mt-14 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="text-[18px] leading-relaxed text-white/80 sm:text-[20px]">
                  Corridor Freight Lines moves skids and full loads between Windsor and Montreal every weeknight, out of
                  one cross-dock in Oshawa. You get a pickup window, a shipment number, and a straight answer when you
                  call dispatch.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <a href="#enquire" className={`${BTN} bg-[#FFD60A] text-[#0F1113] hover:bg-white`}>
                    Request a quote <ArrowRight aria-hidden="true" className="h-5 w-5" strokeWidth={3} />
                  </a>
                  <a href={TEL} className={`${BTN} border-2 border-white text-white hover:border-[#FFD60A] hover:text-[#FFD60A]`}>
                    Call dispatch
                  </a>
                </div>
                <dl className="mt-10 border-t border-[#2C3138]">
                  {[
                    ["One corridor", "Windsor to Montreal, both directions, five nights a week"],
                    ["One building", "Every skid crosses the same 14-door dock in Oshawa"],
                    ["One phone number", "Dispatch picks up. There is no phone tree"],
                  ].map(([term, detail]) => (
                    <div key={term} className="grid grid-cols-[9.5rem_1fr] gap-x-4 border-b border-[#2C3138] py-3">
                      <dt className={`${LABEL} pt-0.5 text-white`}>{term}</dt>
                      <dd className="text-[15px] leading-snug text-[#8A9099]">{detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div id="track" className={`${ANCHOR} lg:col-span-7`}>
                <ShipmentTracker />
              </div>
            </div>
          </section>

          {/* 3. Services as a ruled manifest */}
          <section id="services" aria-labelledby="services-title" className={`${ANCHOR} border-t border-[#2C3138] py-16 md:py-24`}>
            <div className={WRAP}>
              <SectionHead id="services-title" num="02" label="Services" title="Five ways we move it">
                No brokered mystery trucks. These are the five things we do with our own equipment, our own drivers and
                our own dock.
              </SectionHead>
              <div aria-hidden="true" className={`${LABEL} mt-12 hidden grid-cols-12 gap-x-8 pb-3 text-[#8A9099] md:grid`}>
                <span className="col-span-1">No.</span>
                <span className="col-span-4">Service</span>
                <span className="col-span-4">What it covers</span>
                <span className="col-span-3 text-right">Capacity / from</span>
              </div>
              <ul className="mt-10 border-t-2 border-white md:mt-0">
                {SERVICES.map((s) => (
                  <li key={s.code} className="grid grid-cols-1 gap-x-8 gap-y-3 border-b border-[#2C3138] py-7 transition-colors hover:bg-[#181B1F] md:-mx-4 md:grid-cols-12 md:items-baseline md:px-4">
                    <span aria-hidden="true" className="f-mono text-[13px] text-[#FFD60A] md:col-span-1">{s.code}</span>
                    <h3 className="f-display text-[clamp(1.9rem,3.4vw,2.75rem)] font-bold uppercase leading-none md:col-span-4">
                      {s.name.split(" ").map((word, i) => (
                        <Fragment key={word}>
                          {i > 0 && " "}
                          <span className="whitespace-nowrap">{word}</span>
                        </Fragment>
                      ))}
                    </h3>
                    <p className="text-[16px] leading-relaxed text-white/80 md:col-span-4">{s.covers}</p>
                    <p className="f-mono text-[13px] leading-relaxed text-white md:col-span-3 md:text-right">
                      {s.spec}
                      <span className="block text-[#8A9099]">{s.price}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 4. Lane map and transit times */}
          <section id="lanes" aria-labelledby="lanes-title" className={`${ANCHOR} border-t border-[#2C3138] py-16 md:py-24`}>
            <div className={WRAP}>
              <SectionHead id="lanes-title" num="03" label="Lanes" title="One road. Eight cities.">
                We do not try to cover the country. We cover 905 kilometres of it, properly, with Oshawa in the middle
                and a trailer leaving in each direction every weeknight.
              </SectionHead>
              <div className="mt-12">
                <LaneMap />
              </div>
              <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <table className="w-full border-collapse text-left">
                    <caption className="sr-only">Transit times by lane, in business days, dock to dock</caption>
                    <thead>
                      <tr className="f-mono border-b-2 border-white text-[11px] uppercase tracking-[0.14em] text-[#8A9099]">
                        <th scope="col" className="py-3 pr-2 font-normal">Lane</th>
                        <th scope="col" className="hidden px-3 py-3 text-right font-normal sm:table-cell">Distance</th>
                        <th scope="col" className="px-2 py-3 font-normal sm:px-6">Transit</th>
                        <th scope="col" className="py-3 pl-2 text-right font-normal">Book by</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LANES.map((lane) => (
                        <tr key={`${lane.from}-${lane.to}`} className="border-b border-[#2C3138]">
                          <th scope="row" className="f-display py-3.5 pr-2 text-[18px] font-semibold uppercase leading-tight tracking-[0.02em] sm:text-[24px]">
                            <span className="inline-flex flex-wrap items-center gap-x-1.5 sm:gap-x-3">
                              {lane.from}
                              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-[#8A9099] sm:h-5 sm:w-5" strokeWidth={3} />
                              <span className="sr-only">to</span>
                              {lane.to}
                            </span>
                          </th>
                          <td className="f-mono hidden px-3 text-right text-[14px] text-[#8A9099] sm:table-cell">{lane.km} km</td>
                          <td className="f-mono px-2 text-[12px] font-bold uppercase text-white sm:px-6 sm:text-[14px]">{lane.transit}</td>
                          <td className="f-mono pl-2 text-right text-[12px] text-white sm:text-[14px]">{lane.book}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ul className="lg:col-span-4 lg:border-t-2 lg:border-white">
                  {LANE_NOTES.map((note, i) => (
                    <li key={note} className="grid grid-cols-[2.5rem_1fr] border-b border-[#2C3138] py-4 text-[15px] leading-relaxed text-white/80">
                      <span aria-hidden="true" className="f-mono pt-0.5 text-[13px] text-[#FFD60A]">N{i + 1}</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 5. Operating facts */}
          <section aria-label="Operating facts" className="bg-[#181B1F]">
            <div aria-hidden="true" className={`h-3 ${HAZARD}`} />
            <dl className={`${WRAP} grid grid-cols-1 py-3 sm:grid-cols-2 sm:py-0 lg:grid-cols-4`}>
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-[#2C3138] py-4 last:border-b-0 sm:block sm:border-b-0 sm:border-l sm:px-6 sm:py-9 sm:[&:nth-child(n+3)]:border-t lg:first:border-l-0 lg:first:pl-0 lg:[&:nth-child(n+3)]:border-t-0"
                >
                  <dt className={`${LABEL} text-[#8A9099]`}>{fact.label}</dt>
                  <dd className="f-mono col-start-2 row-span-2 row-start-1 whitespace-nowrap text-[clamp(1.375rem,2.6vw,2.25rem)] font-bold leading-none text-white sm:mt-4">
                    {fact.value}
                  </dd>
                  <dd className="col-start-1 mt-1 text-[14px] leading-snug text-[#8A9099] sm:mt-3">{fact.sub}</dd>
                </div>
              ))}
            </dl>
            <div aria-hidden="true" className={`h-3 ${HAZARD}`} />
          </section>

          {/* 6. The terminal: the one light section */}
          <section id="terminal" aria-labelledby="terminal-title" style={{ "--demo-focus": "#0F1113" } as CSSProperties} className={`${ANCHOR} bg-[#F3F4F1] py-16 text-[#0F1113] md:py-24`}>
            <div className={WRAP}>
              <SectionHead id="terminal-title" num="04" label="The terminal" title="One building. Fourteen doors." light>
                The cross-dock sits in south Oshawa, a few minutes off Highway 401. Every skid we carry passes over
                this floor, which is why we can tell you where yours is.
              </SectionHead>

              <ul aria-hidden="true" className="mt-12 grid grid-cols-7 gap-1.5 md:grid-cols-[repeat(14,minmax(0,1fr))] md:gap-2">
                {Array.from({ length: 14 }, (_, i) => (
                  <li key={i} className={`relative aspect-[4/5] border-2 border-[#0F1113] ${i > 11 ? "bg-[#FFD60A]" : "bg-[repeating-linear-gradient(180deg,#E3E5E0_0_9px,#0F1113_9px_10px)]"}`}>
                    <span className="f-mono absolute left-0 top-0 bg-[#0F1113] px-1 text-[11px] font-bold leading-[18px] text-[#F3F4F1]">{String(i + 1).padStart(2, "0")}</span>
                  </li>
                ))}
              </ul>
              <div aria-hidden="true" className={`mt-1.5 h-3 md:mt-2 ${HAZARD}`} />
              <p className={`${LABEL} mt-3 flex flex-wrap gap-x-8 gap-y-1 text-[#4B5158]`}>
                <span>Doors 01 to 12: dock height</span>
                <span>Doors 13 and 14: grade level</span>
              </p>

              <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">
                <dl className="border-t-2 border-[#0F1113] lg:col-span-7">
                  {TERMINAL.map((item) => (
                    <div key={item.name} className="grid grid-cols-[5.5rem_1fr] gap-x-4 border-b border-[#C9CCC6] py-6 sm:grid-cols-[9rem_1fr] sm:gap-x-8">
                      <dt className="col-start-2 row-start-1 f-display text-[26px] font-bold uppercase leading-none">{item.name}</dt>
                      <dd className="col-start-1 row-span-2 row-start-1">
                        <span className="f-mono block text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-none">{item.figure}</span>
                        <span className="f-mono mt-2 block text-[11px] uppercase tracking-[0.14em] text-[#4B5158]">{item.unit}</span>
                      </dd>
                      <dd className="col-start-2 mt-2 text-[16px] leading-relaxed text-[#33383F]">{item.text}</dd>
                    </div>
                  ))}
                </dl>

                <div style={{ "--demo-focus": "#FFD60A" } as CSSProperties} className="self-start bg-[#0F1113] p-6 text-white sm:p-8 lg:col-span-5">
                  <h3 className="f-display text-[32px] font-bold uppercase leading-none">Book a dock appointment</h3>
                  <ol className="mt-6">
                    {APPOINTMENT.map((step, i) => (
                      <li key={step} className="grid grid-cols-[2.25rem_1fr] border-t border-[#2C3138] py-4 text-[15px] leading-relaxed text-white/80">
                        <span aria-hidden="true" className="f-mono pt-0.5 text-[13px] font-bold text-[#FFD60A]">0{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <p className="f-mono border-t border-[#2C3138] pt-5 text-[13px] leading-loose">
                    <a href={TEL} className="flex min-h-[44px] items-center underline decoration-[#FFD60A] underline-offset-4 hover:text-[#FFD60A]">{PHONE}</a>
                    <a href={`mailto:${EMAIL}`} className="flex min-h-[44px] items-center break-all underline decoration-[#FFD60A] underline-offset-4 hover:text-[#FFD60A]">{EMAIL}</a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 7. How a shipment moves */}
          <section id="process" aria-labelledby="process-title" className={`${ANCHOR} py-16 md:py-24`}>
            <div className={WRAP}>
              <SectionHead id="process-title" num="05" label="How a shipment moves" title="Quote to signature">
                Five steps, the same five every time. If a shipment is ever somewhere other than where this says it
                should be, we call you before you call us.
              </SectionHead>
              <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
                {STEPS.map((step, i) => (
                  <li key={step.name} className="border-t-2 border-white pt-5">
                    <p className="f-mono flex items-center justify-between text-[13px] text-[#FFD60A]">
                      <span>STEP 0{i + 1}</span>
                      {i < STEPS.length - 1 && <ArrowRight aria-hidden="true" className="hidden h-4 w-4 text-[#8A9099] lg:block" strokeWidth={2.5} />}
                    </p>
                    <h3 className="f-display mt-6 text-[30px] font-bold uppercase leading-none">{step.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/80">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 8. Quote request */}
          <section id="enquire" aria-labelledby="quote-title" className={`${ANCHOR} border-t border-[#2C3138] py-16 md:py-24`}>
            <div className={`${WRAP} grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12`}>
              <div className="lg:col-span-5">
                <p className={`${LABEL} text-[#8A9099]`}>
                  <span className="text-[#FFD60A]">06</span> / Quote
                </p>
                <h2 id="quote-title" className={`${DISPLAY} mt-4 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.9] [text-wrap:balance]`}>Tell us what is on the skid</h2>
                <p className="mt-6 text-[17px] leading-relaxed text-white/80">
                  The more of this you send, the closer the first price is to the final invoice.
                </p>
                <ul className="mt-6 border-t border-[#2C3138] text-[15px] text-white/80">
                  {["Pickup town and delivery town", "Piece count, weight and dimensions per skid", "Ready date, and dock hours at both ends", "Anything unusual: tailgate, appointment, heat"].map((line) => (
                    <li key={line} className="flex gap-3 border-b border-[#2C3138] py-3">
                      <span aria-hidden="true" className="mt-[7px] h-2 w-2 shrink-0 bg-[#FFD60A]" />
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="f-mono mt-8 flex flex-col gap-1 text-[14px]">
                  <a href={TEL} className="flex min-h-[44px] items-center gap-3 hover:text-[#FFD60A]">
                    <Phone aria-hidden="true" className="h-4 w-4 text-[#FFD60A]" /> {PHONE}
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex min-h-[44px] items-center gap-3 break-all hover:text-[#FFD60A]">
                    <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-[#FFD60A]" /> {EMAIL}
                  </a>
                </p>
              </div>
              <div className="border border-[#2C3138] bg-[#181B1F] p-5 sm:p-8 lg:col-span-7">
                <DemoForm
                  demoName="Corridor Freight Lines"
                  industrySlug="logistics-distribution"
                  options={["LTL", "Full truckload", "Cross-border", "Warehousing"]}
                  optionsLabel="Service"
                  messageLabel="Shipment details"
                  messagePlaceholder="Oshawa to Montreal, 4 skids, 2,900 lb, 48 x 40 x 60 in each, ready Thursday"
                  submitLabel="Request quote"
                  classes={{
                    form: "relative flex flex-col gap-5",
                    grid: "grid grid-cols-1 gap-5 sm:grid-cols-2",
                    field: "flex flex-col gap-2",
                    label: "f-mono text-[11px] uppercase tracking-[0.14em] text-[#8A9099]",
                    input: FORM_INPUT,
                    button: `${BTN} w-full bg-[#FFD60A] text-[#0F1113] hover:bg-white disabled:opacity-60 sm:w-auto sm:self-start`,
                    note: "border-t border-[#2C3138] pt-4 text-[13px] leading-relaxed text-[#8A9099]",
                    error: "border-l-4 border-[#FFD60A] bg-[#0F1113] px-4 py-3 text-[15px] text-white",
                    success: "border-l-4 border-[#FFD60A] bg-[#0F1113] p-6 text-[17px] leading-relaxed text-white",
                  }}
                />
              </div>
            </div>
          </section>
        </main>

        {/* 9. Footer */}
        <footer className="bg-[#181B1F]">
          <div aria-hidden="true" className={`h-3 ${HAZARD}`} />
          <div className={`${WRAP} grid grid-cols-1 gap-x-12 gap-y-10 py-14 sm:grid-cols-2 lg:grid-cols-12`}>
            <div className="sm:col-span-2 lg:col-span-5">
              <Wordmark />
              <p className="mt-5 max-w-[26rem] text-[15px] leading-relaxed text-[#8A9099]">
                LTL, truckload and cross-dock on the Windsor to Montreal corridor. Based in Oshawa, Ontario, in Durham
                Region.
              </p>
            </div>
            <div className="lg:col-span-4">
              <h2 className={`${LABEL} text-[#8A9099]`}>Dispatch</h2>
              <p className="f-mono mt-4 text-[14px] leading-loose">
                <a href={TEL} className="flex min-h-[44px] items-center hover:text-[#FFD60A]">{PHONE}</a>
                <a href={`mailto:${EMAIL}`} className="flex min-h-[44px] items-center break-all hover:text-[#FFD60A]">{EMAIL}</a>
                <span className="block text-[#8A9099]">Mon to Fri, 06:00–22:00</span>
              </p>
            </div>
            <nav aria-label="Footer" className="lg:col-span-3">
              <h2 className={`${LABEL} text-[#8A9099]`}>On this page</h2>
              <ul className="mt-2 grid grid-cols-2 gap-x-6">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="f-display flex min-h-[44px] items-center text-[17px] font-semibold uppercase tracking-[0.08em] hover:text-[#FFD60A]">{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className={WRAP}>
            <p className="f-mono border-t border-[#2C3138] py-6 text-[12px] leading-relaxed text-[#8A9099]">
              Corridor Freight Lines is an invented business made for a concept site. Shipment numbers, prices and
              times on this page are sample data.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
