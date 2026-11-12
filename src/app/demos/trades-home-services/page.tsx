import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import localFont from "next/font/local"
import { ArrowRight, Check, Clock, Mail, MapPin, Phone, Plus, Timer } from "lucide-react"
import ConceptBar from "@/components/demos/ConceptBar"
import DemoForm from "@/components/demos/DemoForm"
import EstimateCard from "@/components/demos/trades-home-services/EstimateCard"
import { Fitting, PipeRun, PriceTag, Van } from "@/components/demos/trades-home-services/Parts"
import { BTN_COPPER, BTN_WHITE, EMAIL, PHONE, SERVICES, TEL, money } from "@/components/demos/trades-home-services/data"

// Bricolage Grotesque, served from files in the repo so the build never depends on a font host
const display = localFont({
  src: [
    { path: "../../../fonts/demos/bricolage-grotesque-normal-700-800.woff2", style: "normal", weight: "700 800" },
  ],
  variable: "--f-display",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
})
// Source Sans 3, served from files in the repo so the build never depends on a font host
const body = localFont({
  src: [
    { path: "../../../fonts/demos/source-sans-3-normal-400-700.woff2", style: "normal", weight: "400 700" },
  ],
  variable: "--f-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Copperline Plumbing & Heating | Ajax and Durham Region (concept site)",
  description:
    "Concept site for an invented plumbing and heating company in Ajax, Ontario: same-day repairs, a price before work starts, and an instant estimate for six common jobs.",
}

const NAV = [
  { href: "#estimate", label: "Estimate" },
  { href: "#services", label: "Services" },
  { href: "#areas", label: "Areas" },
  { href: "#how", label: "How we work" },
  { href: "#plan", label: "Plan" },
  { href: "#enquire", label: "Quote" },
]

const AREAS = [
  { town: "Ajax", time: "25 min" },
  { town: "Pickering", time: "35 min" },
  { town: "Whitby", time: "35 min" },
  { town: "Oshawa", time: "45 min" },
  { town: "Bowmanville", time: "60 min" },
  { town: "Port Perry", time: "55 min" },
  { town: "Uxbridge", time: "60 min" },
]

const STEPS = [
  {
    title: "A price before work starts",
    text: "We look, explain what is wrong in plain words and write down one price. Nothing starts until you say yes.",
  },
  {
    title: "A technician in the window",
    text: "You get a two-hour arrival window and a text when the van is 30 minutes out. If we are running late, you hear it from us first.",
  },
  {
    title: "The job done and tested",
    text: "Every repair is run in front of you: pressure on, burner lit, drain flowing. We do not leave on a \"should be fine\".",
  },
  {
    title: "A tidy site, a written warranty",
    text: "Boot covers on, drop sheets down, old parts taken away. Your invoice lists the work and carries the warranty in writing.",
  },
]

const PROMISES = [
  {
    title: "Two-year workmanship warranty",
    text: "If a joint we made or a part we fitted fails within two years because of our work, we come back and put it right for free.",
  },
  {
    title: "No call-out fee if you go ahead",
    text: "The $79 visit fee comes off your bill when you approve the work. You only pay it if you decide not to proceed.",
  },
  {
    title: "The price we wrote is the price you pay",
    text: "If we open a wall and find something new, we stop and show you before anything is added. No surprise lines on the invoice.",
  },
  {
    title: "On time, or we call first",
    text: "Miss our own two-hour window without warning you and $50 comes off the job.",
  },
]

const PLAN = [
  "Fall furnace or boiler tune-up, before the heating season",
  "Spring plumbing check: shut-offs, hose bibs, sump pump and a water heater flush",
  "Front of the line for same-day calls",
  "No after-hours fee, ever",
  "10% off any repair",
]

const FAQ = [
  {
    q: "How fast can you get here?",
    a: `For a burst pipe or no heat, call ${PHONE}. Around Ajax, Pickering and Whitby we are usually at the door in 25 to 35 minutes during the day. Bowmanville, Port Perry and Uxbridge take closer to an hour. The phone is answered around the clock.`,
  },
  {
    q: "Do you charge to come out?",
    a: "There is a $79 visit fee that covers the trip and the diagnosis. Approve the work and it comes off the bill, so you only pay it if you decide not to go ahead.",
  },
  {
    q: "Is the estimate on this site the price I will pay?",
    a: "It is a ballpark for a typical home. Your firm price is written down on site, before any work starts, once a technician has seen the job.",
  },
  {
    q: "Do you work evenings, weekends and holidays?",
    a: "Yes. Emergencies are covered 24/7. After 6 pm, on weekends and on holidays there is one flat $95 after-hours fee. Plan members never pay it.",
  },
  {
    q: "Are your technicians licensed and insured?",
    a: "Yes. Every technician holds the Ontario trade qualification for the work they are doing, and the company carries liability insurance. Ask to see either before we start.",
  },
  {
    q: "What does the warranty cover?",
    a: "Two years on our workmanship: the joints we make and the way parts are fitted. Parts carry their maker's own warranty, and we handle that claim for you.",
  },
  {
    q: "How do I pay?",
    a: "Card, debit or e-transfer once the job is finished and tested. Larger jobs such as a bathroom rough-in are split into a deposit to book and the balance on completion.",
  },
]

const ROOT_VARS = { "--demo-selection": "#C8642A", "--demo-selection-text": "#1B1F1D", "--demo-focus": "#C8642A" } as CSSProperties

/** Content column. On large screens the left 148px is the lane the copper pipe runs down. */
const WRAP = "relative z-[2] mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:pl-[148px] lg:pr-8"
const SECTION = "scroll-mt-[100px] py-16 sm:py-20 lg:py-24"
const H2 = "f-display mt-4 text-[clamp(2.1rem,4.4vw,3.4rem)] font-extrabold leading-[0.98] !tracking-[-0.03em]"
const LEAD = "mt-5 max-w-[60ch] text-[18px] leading-[1.6]"
const CARD = "rounded-[16px] border-2 border-[#1B1F1D] bg-white shadow-[5px_5px_0_#1B1F1D]"

function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[15px] font-bold uppercase tracking-[0.14em] ${dark ? "text-[#F2B48A]" : "text-[#A3491A]"}`}>
      <Fitting kind="elbow" className="h-6 w-6 shrink-0" />
      {children}
    </p>
  )
}

function Wordmark({ light }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2 sm:gap-2.5">
      <Fitting kind="elbow" className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
      <span className="leading-none">
        <span className={`f-display block text-[21px] font-extrabold tracking-[-0.03em] sm:text-[24px] ${light ? "text-white" : "text-[#153F2E]"}`}>
          Copperline
        </span>
        <span className={`mt-0.5 hidden text-[11px] font-bold uppercase tracking-[0.12em] sm:block ${light ? "text-[#DDE8DF]" : "text-[#3A423E]"}`}>
          Plumbing &amp; Heating
        </span>
      </span>
    </span>
  )
}

export default function TradesHomeServicesDemo() {
  return (
    <div id="top" className={`${display.variable} ${body.variable} f-body relative overflow-x-clip bg-[#FAF6EE] text-[18px] text-[#1B1F1D]`} style={ROOT_VARS}>
      <ConceptBar industrySlug="trades-home-services" industryName="Trades & Home Services" />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes cl-ping { 0% { transform: scale(1); opacity: .75 } 80%, 100% { transform: scale(2.6); opacity: 0 } }
          .cl-ping { animation: cl-ping 1.8s cubic-bezier(0, 0, .2, 1) infinite }
          @keyframes cl-turn { to { transform: rotate(360deg) } }
          .cl-wheel { animation: cl-turn 60s linear infinite }
        }
      `}</style>

      <a
        href={TEL}
        className="flex min-h-[44px] items-center justify-center gap-3 bg-[#A3491A] px-5 py-2 text-center text-[16px] font-bold leading-snug text-white [--demo-focus:#FFFFFF] focus-visible:!-outline-offset-4 sm:text-[17px]"
      >
        <span aria-hidden="true" className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="cl-ping absolute inset-0 rounded-full bg-white" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
        </span>
        <span>
          Burst pipe or no heat? Call <span className="whitespace-nowrap underline underline-offset-2">{PHONE}</span>, answered 24/7.
        </span>
      </a>

      <header className="sticky top-[34px] z-[60] border-b-2 border-[#1B1F1D] bg-[#FAF6EE]">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-5 py-2.5 sm:px-6 lg:px-8">
          <a href="#top" aria-label="Copperline Plumbing and Heating, back to top" className="flex min-h-[44px] min-w-0 items-center rounded-[8px]">
            <Wordmark />
          </a>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="flex min-h-[44px] items-center rounded-[8px] px-3 text-[17px] font-bold text-[#1B1F1D] underline-offset-4 hover:text-[#A3491A] hover:underline">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={TEL}
            aria-label={`Call Copperline on ${PHONE}`}
            className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border-2 border-[#1B1F1D] bg-white px-3 text-[17px] font-bold leading-none text-[#1B1F1D] shadow-[3px_3px_0_#1B1F1D] transition-[transform,box-shadow] duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#1B1F1D] sm:px-4 sm:text-[22px] sm:font-extrabold sm:tracking-[-0.01em] sm:[font-family:var(--f-display)] xl:text-[25px]"
          >
            <Phone className="hidden h-[18px] w-[18px] text-[#A3491A] min-[400px]:block sm:h-5 sm:w-5" strokeWidth={2.75} aria-hidden="true" />
            {PHONE}
          </a>
        </div>
      </header>
      <nav aria-label="Page sections" className="border-b-2 border-[#1B1F1D] bg-white lg:hidden">
        <ul className="flex overflow-x-auto px-2 [scrollbar-width:none] sm:px-3">
          {NAV.map((n) => (
            <li key={n.href} className="shrink-0">
              <a href={n.href} className="flex min-h-[46px] items-center px-3 text-[16px] font-bold text-[#1B1F1D] !-outline-offset-2">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="relative isolate">
        <PipeRun className="pointer-events-none absolute left-[max(8px,calc(50%-612px))] top-0 z-[1] hidden h-full lg:block" />

        {/* Hero */}
        <section aria-labelledby="hero-title" className="pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-16">
          <div className={`${WRAP} grid gap-y-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-x-10 xl:gap-x-16`}>
            <div className="flex flex-col">
              <Eyebrow>Ajax, Ontario. Serving Durham Region.</Eyebrow>
              <h1
                id="hero-title"
                className="f-display mt-5 text-[clamp(2.5rem,12.5vw,4.5rem)] font-extrabold leading-[0.94] !tracking-[-0.035em] text-[#153F2E] lg:text-[clamp(3rem,5.4vw,4.75rem)]"
              >
                <span className="block">No heat?</span>
                <span className="block">No hot water?</span>
                <span className="relative block w-fit">
                  Sorted today.
                  <span aria-hidden="true" className="absolute -bottom-3 left-0 right-0 h-3.5 rounded-full border-2 border-[#1B1F1D] bg-[#C8642A] shadow-[inset_0_2px_0_rgba(255,255,255,0.35)]" />
                </span>
              </h1>
              <p className="mt-10 max-w-[52ch] text-[19px] leading-[1.55] text-[#2B322E] sm:text-[20px]">
                Copperline is a small plumbing and heating crew based in Ajax. Call before noon and a technician is usually at your door the same
                day, with one clear price agreed before any work starts.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a href={TEL} className={BTN_COPPER}>
                  <Phone className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
                  Call {PHONE}
                </a>
                <a href="#enquire" className={BTN_WHITE}>
                  Request a quote
                  <ArrowRight className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
                </a>
              </div>
              <ul className="mt-9 grid gap-2.5 text-[17px] font-semibold leading-snug text-[#1B1F1D] sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 xl:gap-4">
                {["A price agreed before work starts", "Two-hour arrival windows", "Two-year workmanship warranty"].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#A3491A]" strokeWidth={3} aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <Van className="mt-auto hidden w-full max-w-[500px] pt-12 lg:block" />
            </div>
            <div className="lg:mt-3">
              <EstimateCard />
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" aria-labelledby="services-title" className={`${SECTION} !pt-4 lg:!pt-6`}>
          <div className={WRAP}>
            <Eyebrow>Services and prices</Eyebrow>
            <h2 id="services-title" className={`${H2} text-[#153F2E]`}>
              Six jobs we do every week.
            </h2>
            <p className={`${LEAD} text-[#2B322E]`}>
              &quot;From&quot; prices are for a straightforward job in a typical Durham home, in Canadian dollars before HST. Yours is confirmed
              in writing before we pick up a wrench.
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {SERVICES.map((s) => (
                <li key={s.name} className={`${CARD} flex flex-col p-5 sm:p-6`}>
                  <div className="flex items-start justify-between gap-3">
                    <Fitting kind={s.icon} className="h-14 w-14 shrink-0" />
                    <p className="flex items-center gap-2 text-[15px] font-bold uppercase tracking-[0.08em] text-[#3A423E]">
                      from <PriceTag>{money(s.low)}</PriceTag>
                    </p>
                  </div>
                  <h3 className="f-display mt-5 text-[27px] font-extrabold leading-none !tracking-[-0.02em] text-[#153F2E]">{s.name}</h3>
                  <p className="mb-5 mt-2.5 text-[17px] leading-[1.55] text-[#2B322E]">{s.blurb}</p>
                  <p className="mt-auto flex items-center gap-2 border-t-2 border-dashed border-[#1B1F1D]/25 pt-3.5 text-[16px] font-semibold text-[#3A423E]">
                    <Timer className="h-5 w-5 shrink-0 text-[#A3491A]" aria-hidden="true" />
                    Usually {s.time.toLowerCase()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Service areas */}
        <section id="areas" aria-labelledby="areas-title" className={`${SECTION} border-y-2 border-[#1B1F1D] bg-[#DDE8DF]`}>
          <div className={`${WRAP} grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12`}>
            <div>
              <Eyebrow>Service areas</Eyebrow>
              <h2 id="areas-title" className={`${H2} text-[#153F2E]`}>
                Seven towns, one crew.
              </h2>
              <p className={`${LEAD} text-[#2B322E]`}>
                The vans leave from Ajax and cover Durham Region from the lake up to Uxbridge. These are typical arrival times for a same-day
                call on a weekday.
              </p>
              <Van className="mt-8 w-full max-w-[400px] lg:hidden" />
            </div>
            <div>
              <ul className="flex flex-wrap gap-x-3.5 gap-y-4">
                {AREAS.map((a) => (
                  <li key={a.town} className="flex min-h-[52px] items-center gap-3 rounded-full border-2 border-[#1B1F1D] bg-white py-1.5 pl-4 pr-2 shadow-[3px_3px_0_#1B1F1D]">
                    <MapPin className="h-5 w-5 shrink-0 text-[#A3491A]" strokeWidth={2.5} aria-hidden="true" />
                    <span className="f-display text-[21px] font-extrabold leading-none text-[#153F2E]">{a.town}</span>
                    <span className="whitespace-nowrap rounded-full bg-[#153F2E] px-3 py-1.5 text-[15px] font-bold leading-none text-white">about {a.time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[16px] leading-[1.55] text-[#2B322E]">
                Evenings and snow days can add 15 to 30 minutes. Somewhere else in Durham? Call and ask, because we can usually make it work.
              </p>
            </div>
          </div>
        </section>

        {/* How we work */}
        <section id="how" aria-labelledby="how-title" className={`${SECTION} bg-[#153F2E] text-white`}>
          <div className={WRAP}>
            <Eyebrow dark>How we work</Eyebrow>
            <h2 id="how-title" className={`${H2} text-white`}>
              Four steps. No surprises.
            </h2>
            <div className="relative mt-12">
              <div
                aria-hidden="true"
                className="absolute bottom-4 left-[22px] top-2 w-3.5 rounded-full border-2 border-[#0E1210] bg-[#C8642A] shadow-[inset_2px_0_0_rgba(255,255,255,0.35)] sm:hidden lg:inset-x-0 lg:bottom-auto lg:top-[22px] lg:block lg:h-3.5 lg:w-auto lg:shadow-[inset_0_2px_0_rgba(255,255,255,0.35)]"
              />
              <ol className="relative grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
                {STEPS.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[58px_minmax(0,1fr)] gap-x-4 lg:block">
                    <span className="f-display row-span-2 grid h-[58px] w-[58px] place-items-center rounded-full border-2 border-[#0E1210] bg-[#FAF6EE] text-[27px] font-extrabold leading-none text-[#153F2E] shadow-[3px_3px_0_#0E1210]">
                      {i + 1}
                    </span>
                    <h3 className="f-display pt-0.5 text-[24px] font-extrabold leading-[1.05] !tracking-[-0.015em] text-white lg:mt-6">{s.title}</h3>
                    <p className="mt-2.5 text-[17px] leading-[1.55] text-[#DDE8DF]">{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Guarantees and the maintenance plan */}
        <section id="plan" aria-labelledby="plan-title" className={SECTION}>
          <div className={`${WRAP} grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,410px)] lg:gap-10 xl:gap-16`}>
            <div>
              <Eyebrow>Guarantees</Eyebrow>
              <h2 id="plan-title" className={`${H2} text-[#153F2E]`}>
                Promises in plain words.
              </h2>
              <ul className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-1">
                {PROMISES.map((p) => (
                  <li key={p.title} className="flex gap-3.5">
                    <span aria-hidden="true" className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#1B1F1D] bg-[#C8642A]">
                      <Check className="h-4 w-4 text-[#1B1F1D]" strokeWidth={3.5} />
                    </span>
                    <div>
                      <h3 className="f-display text-[22px] font-bold leading-[1.1] text-[#1B1F1D]">{p.title}</h3>
                      <p className="mt-1.5 text-[17px] leading-[1.55] text-[#2B322E]">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <aside aria-labelledby="plan-card-title" className="self-start rounded-[18px] border-2 border-[#1B1F1D] bg-white shadow-[6px_6px_0_#1B1F1D]">
              <div className="rounded-t-[15px] border-b-2 border-[#1B1F1D] bg-[#153F2E] px-6 py-5">
                <p className="text-[14px] font-bold uppercase tracking-[0.14em] text-[#F2B48A]">Seasonal maintenance plan</p>
                <h3 id="plan-card-title" className="f-display mt-1.5 text-[30px] font-extrabold leading-none !tracking-[-0.02em] text-white">
                  The Copperline Plan
                </h3>
              </div>
              <div className="p-6">
                <p className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[17px] font-semibold leading-snug text-[#2B322E]">
                  <PriceTag className="text-[42px]">$19</PriceTag>
                  <span>
                    a month, plus HST.
                    <br />
                    Cancel any time.
                  </span>
                </p>
                <ul className="mt-6 space-y-3 text-[17px] leading-snug">
                  {PLAN.map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#153F2E]" strokeWidth={3} aria-hidden="true" />
                      {line}
                    </li>
                  ))}
                </ul>
                <a href="#enquire" className={`${BTN_COPPER} mt-7 w-full`}>
                  Ask about the plan
                  <ArrowRight className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
                </a>
                <p className="mt-4 text-[15px] leading-snug text-[#3A423E]">Covers one home and one heating system. That works out to $228 a year.</p>
              </div>
            </aside>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-title" className={`${SECTION} border-t-2 border-[#1B1F1D] bg-[#DDE8DF]`}>
          <div className={`${WRAP} grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12`}>
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 id="faq-title" className={`${H2} text-[#153F2E]`}>
                Asked on most calls.
              </h2>
              <p className={`${LEAD} text-[#2B322E]`}>Not answered here? Ring us and ask a person. It is quicker than typing.</p>
              <a href={TEL} className={`${BTN_WHITE} mt-6`}>
                <Phone className="h-5 w-5 text-[#A3491A]" strokeWidth={2.5} aria-hidden="true" />
                Call {PHONE}
              </a>
            </div>
            <div className="space-y-4">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-[14px] border-2 border-[#1B1F1D] bg-white shadow-[4px_4px_0_#1B1F1D]">
                  <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 rounded-[12px] px-5 py-3 text-[19px] font-bold leading-snug text-[#1B1F1D] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-[#1B1F1D] bg-[#C8642A] transition-transform duration-200 group-open:rotate-45">
                      <Plus className="h-4 w-4" strokeWidth={3.5} />
                    </span>
                  </summary>
                  <p className="border-t-2 border-dashed border-[#1B1F1D]/25 px-5 py-4 text-[17px] leading-[1.6] text-[#2B322E]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Quote form */}
        <section id="enquire" aria-labelledby="quote-title" className={`${SECTION} border-t-2 border-[#1B1F1D] bg-[#153F2E] text-white`}>
          <div className={`${WRAP} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10 xl:gap-16`}>
            <div className="[--demo-focus:#F2B48A]">
              <Eyebrow dark>Get a quote</Eyebrow>
              <h2 id="quote-title" className={`${H2} text-white`}>
                Tell us what is wrong. We will put a price on it.
              </h2>
              <p className={`${LEAD} text-[#DDE8DF]`}>
                Send a few lines about the job and we reply with a written quote, or a time to come and look. If there is water on the floor
                right now, phone instead.
              </p>
              <ul className="mt-8 space-y-3 text-[18px] leading-snug text-[#DDE8DF]">
                <li>
                  <a
                    href={TEL}
                    className="f-display inline-flex min-h-[52px] items-center gap-3 text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold leading-none text-white underline decoration-[#C8642A] decoration-4 underline-offset-[7px]"
                  >
                    <Phone className="h-7 w-7 shrink-0 text-[#F2B48A]" strokeWidth={2.5} aria-hidden="true" />
                    {PHONE}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${EMAIL}`} className="inline-flex min-h-[44px] items-center gap-3 font-bold text-white underline decoration-[#C8642A] decoration-2 underline-offset-4 [overflow-wrap:anywhere]">
                    <Mail className="h-5 w-5 shrink-0 text-[#F2B48A]" aria-hidden="true" />
                    {EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-3 py-1.5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#F2B48A]" aria-hidden="true" />
                  Based in Ajax, Ontario. We come to you.
                </li>
                <li className="flex items-start gap-3 py-1.5">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#F2B48A]" aria-hidden="true" />
                  Phones answered 24/7. Booked visits Monday to Saturday, 7 am to 6 pm.
                </li>
              </ul>
            </div>
            <div className="rounded-[18px] border-2 border-[#0E1210] bg-white p-5 text-[#1B1F1D] shadow-[6px_6px_0_#C8642A] sm:p-7">
              <DemoForm
                demoName="Copperline Plumbing & Heating"
                industrySlug="trades-home-services"
                options={SERVICES.map((s) => s.name)}
                optionsLabel="What do you need done?"
                messageLabel="What is going on?"
                messagePlaceholder="e.g. The water heater is 14 years old and leaking from the bottom. Semi-detached in south Ajax."
                submitLabel="Request my quote"
                classes={{
                  form: "relative grid gap-5",
                  grid: "grid gap-5 sm:grid-cols-2",
                  field: "flex flex-col gap-1.5",
                  label: "text-[16px] font-bold text-[#1B1F1D]",
                  input:
                    "min-h-[50px] w-full rounded-[10px] border-2 border-[#1B1F1D] bg-[#FAF6EE] px-3.5 py-2.5 text-[17px] text-[#1B1F1D] placeholder:text-[#5A635E] focus:bg-white",
                  button: `${BTN_COPPER} w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:justify-self-start`,
                  note: "text-[15px] leading-[1.5] text-[#3A423E]",
                  error: "rounded-[10px] border-2 border-[#8F2A16] bg-[#FCEBE6] px-4 py-3 text-[16px] font-semibold text-[#7A1F10]",
                  success: "rounded-[14px] border-2 border-[#1B1F1D] bg-[#DDE8DF] p-5 text-[18px] leading-[1.55] text-[#1B1F1D]",
                }}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[#0E1210] bg-[#1B1F1D] py-12 text-[17px] text-[#FAF6EE]">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:px-8">
          <div>
            <Wordmark light />
            <p className="mt-4 max-w-[34ch] leading-[1.55] text-[#C3CCC6]">Plumbing and heating for homes across Durham Region, from a yard in Ajax.</p>
          </div>
          <div>
            <h2 className="f-display text-[19px] font-bold text-white">Contact</h2>
            <ul className="mt-2 leading-[1.5] text-[#C3CCC6]">
              <li>
                <a href={TEL} className="inline-flex min-h-[44px] items-center font-bold text-white underline underline-offset-4">
                  {PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex min-h-[44px] items-center text-white underline underline-offset-4 [overflow-wrap:anywhere]">
                  {EMAIL}
                </a>
              </li>
              <li className="mt-2">Ajax, Ontario</li>
            </ul>
          </div>
          <div>
            <h2 className="f-display text-[19px] font-bold text-white">Hours</h2>
            <ul className="mt-4 space-y-2 leading-[1.5] text-[#C3CCC6]">
              <li>Emergency line: 24/7</li>
              <li>Booked visits: Mon to Sat, 7 am to 6 pm</li>
              <li>{AREAS.map((a) => a.town).join(", ")}</li>
            </ul>
          </div>
          <nav aria-label="Footer">
            <h2 className="f-display text-[19px] font-bold text-white">On this page</h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-4">
              {[...NAV, { href: "#faq", label: "FAQ" }].map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-flex min-h-[44px] items-center text-white underline underline-offset-4">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="mx-auto mt-10 max-w-[1240px] px-5 text-[15px] leading-[1.5] text-[#C3CCC6] sm:px-6 lg:px-8">
          Copperline Plumbing &amp; Heating is an invented business, shown here as a design concept. Prices, fees and arrival times are
          illustrative.
        </p>
      </footer>
    </div>
  )
}
