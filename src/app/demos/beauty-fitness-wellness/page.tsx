import type { Metadata } from "next"
import type { ReactNode } from "react"
import localFont from "next/font/local"
import { ArrowRight, Car, Mail, MapPin, Phone, TrainFront } from "lucide-react"
import ConceptBar from "@/components/demos/ConceptBar"
import DemoForm from "@/components/demos/DemoForm"
import BookingStepper from "@/components/demos/beauty-fitness-wellness/BookingStepper"
import { Sprig, SprigRule } from "@/components/demos/beauty-fitness-wellness/Sprig"
import { HOURS, MENU, WEEKDAYS, clock, duration } from "@/components/demos/beauty-fitness-wellness/menu"

// Marcellus, served from files in the repo so the build never depends on a font host
const display = localFont({
  src: [
    { path: "../../../fonts/demos/marcellus-normal-400.woff2", style: "normal", weight: "400" },
  ],
  variable: "--f-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
})
// Nunito Sans, served from files in the repo so the build never depends on a font host
const body = localFont({
  src: [
    { path: "../../../fonts/demos/nunito-sans-normal-200-1000.woff2", style: "normal", weight: "200 1000" },
  ],
  variable: "--f-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Juniper Hair & Skin Studio | Pickering, Ontario",
  description:
    "Concept site for an invented boutique salon in Pickering, Ontario: an unhurried hair, colour, skin and brow menu with prices, a three-step booking planner, packages and first-visit notes.",
}

const NAV = [
  ["Services", "#services"],
  ["Book", "#book"],
  ["Packages", "#packages"],
  ["First visit", "#first-visit"],
  ["Visit us", "#visit"],
]

const PLANS = [
  {
    name: "Colour refresh plan",
    price: "$115",
    unit: "per visit, every six weeks",
    fill: "linear-gradient(180deg, #C4674B, #A84B33)",
    art: { shape: "lean", className: "text-[#F7EBE4]", berry: "#F7EBE4" },
    points: ["A root touch-up with a deep conditioning ritual", "$134 at menu prices, so $19 less each visit", "Your next visit is held before you leave"],
  },
  {
    name: "Skin course of six",
    price: "$575",
    unit: "six signature facials",
    fill: "linear-gradient(180deg, #BCBD9A, #9C9D73)",
    art: { shape: "cluster", className: "text-[#2A1B17]", berry: "#F7EBE4" },
    points: ["Six facials for the price of five", "Use them at your own pace within nine months", "A written home-care plan after your first visit"],
  },
  {
    name: "Blow-dry membership",
    price: "$149",
    unit: "per month",
    fill: "linear-gradient(180deg, #EBDACC, #DBC2AE)",
    art: { shape: "tall", className: "text-[#2A1B17]", berry: "#B5543A" },
    points: ["Four wash and blow-dries every month", "$208 at menu prices", "One unused visit rolls over. Pause or stop with 30 days of notice."],
  },
] as const

const FIRST_VISIT = [
  [
    "A seated consultation",
    "Fifteen minutes with your stylist or aesthetician before anything else. We talk through your routine, what you liked and did not like last time, and exactly what the service will cost. It is free, and there is no pressure to go ahead.",
  ],
  [
    "A patch test for colour",
    "New to colour with us, or more than six months since your last one here? We need a patch test at least 48 hours before your appointment. It is a dab of colour behind the ear, takes five minutes and costs nothing. Drop in whenever we are open.",
  ],
  [
    "How to prepare",
    "For hair, arrive with it dry and worn the way you usually wear it, and bring photos of what you love and what you do not. For skin, skip retinol and exfoliating acids for three days beforehand and tell us about any medication you take.",
  ],
]

const CANCELLING = [
  ["More than 24 hours ahead", "Free", "Move or cancel as often as you need to."],
  ["Inside 24 hours", "Half", "We charge half the price of the service."],
  ["No call, no show", "Full", "We charge the full price of the service."],
]

const scrollPad = "scroll-mt-[98px]"
const eyebrow = "text-[12px] font-extrabold uppercase tracking-[0.24em]"
const pillBase = "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors"
const pill = `${pillBase} min-h-[48px] px-7 text-[15px]`
const clay = "bg-[#B5543A] text-white hover:bg-[#96402A]"
const pillClay = `${pill} ${clay}`
const pillLine = `${pill} border border-[#2A1B17] hover:bg-[#2A1B17] hover:text-[#F7EBE4]`
const sway = "jp-sway h-[78%] w-auto"

const h2 = "f-display mt-3 text-balance text-[clamp(2rem,5vw,3.25rem)] leading-[1.1]"

/** Centred section heading: small uppercase label, display title, optional lead paragraph. */
function Heading({ id, label, title, children }: { id: string; label: string; title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className={`${eyebrow} text-[#96402A]`}>{label}</p>
      <h2 id={id} className={h2}>
        {title}
      </h2>
      {children && <p className="mt-4 text-[17px] leading-relaxed text-[#5B4740]">{children}</p>}
    </div>
  )
}

/** An arch-topped frame: gradient fill, a thin inner arch line, and artwork standing on its floor. */
function Arch({ className, fill, line = "border-white/45", children }: { className: string; fill: string; line?: string; children?: ReactNode }) {
  return (
    <div className={`relative overflow-hidden rounded-t-full ${className}`} style={{ background: fill }}>
      <span className={`absolute inset-x-[6px] bottom-0 top-[6px] rounded-t-full border border-b-0 ${line}`} />
      <div className="absolute inset-0 flex items-end justify-center">{children}</div>
    </div>
  )
}

export default function JuniperStudioPage() {
  return (
    <div
      id="top"
      className={`${display.variable} ${body.variable} f-body flex-1 bg-[#F7EBE4] text-[#2A1B17] [--demo-focus:#96402A] [--demo-selection-text:#fff] [--demo-selection:#B5543A]`}
    >
      <ConceptBar industrySlug="beauty-fitness-wellness" industryName="Beauty, Fitness & Wellness" />
      {/* The sprigs sway a degree or so, and only for visitors who have not asked for reduced motion */}
      <style>{`@media (prefers-reduced-motion: no-preference) {
        .jp-sway { transform-origin: 50% 100%; animation: jp-sway 9s ease-in-out infinite alternate; }
        .jp-slow { animation-duration: 13s; animation-delay: -5s; }
        @keyframes jp-sway { from { transform: rotate(-1.4deg); } to { transform: rotate(1.4deg); } }
      }`}</style>

      <header className="sticky top-[34px] z-50 border-b border-[#B5543A]/25 bg-[#F7EBE4]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#top" className="flex min-h-[44px] items-center gap-3" aria-label="Juniper Hair & Skin Studio, back to top">
            <span className="f-display grid h-10 w-8 place-items-center rounded-t-full bg-[#B5543A] pt-1.5 text-[17px] text-white" aria-hidden="true">
              J
            </span>
            <span className="leading-none">
              <span className="f-display block text-[19px] uppercase tracking-[0.24em]">Juniper</span>
              <span className="mt-1 block text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#5B4740]">Hair &amp; Skin Studio</span>
            </span>
          </a>
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex gap-7 text-[14px] font-bold">
              {NAV.map(([name, href]) => (
                <li key={href}>
                  <a href={href} className="flex min-h-[44px] items-center underline-offset-8 hover:text-[#96402A] hover:underline">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#book" className={`${pillBase} ${clay} min-h-[44px] px-6 text-[15px]`}>
            Book
          </a>
        </div>
      </header>
      <nav aria-label="Sections" className="border-b border-[#B5543A]/20 md:hidden">
        <ul className="flex justify-between overflow-x-auto px-3 text-[13px] font-bold">
          {NAV.map(([name, href]) => (
            <li key={href}>
              <a href={href} className="flex min-h-[44px] items-center whitespace-nowrap px-1.5">
                {name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        {/* Hero */}
        <section aria-labelledby="hero-title" className="overflow-hidden px-5 pb-20 pt-12 sm:px-8 lg:pb-28 lg:pt-20">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
            <div className="text-center lg:text-left">
              <p className={`${eyebrow} text-[#96402A]`}>Pickering, Ontario</p>
              <h1 id="hero-title" className="f-display mt-4 text-balance text-[clamp(2.6rem,6.2vw,4.1rem)] leading-[1.06]">Hair and skin, without the hurry.</h1>
              <p className="mx-auto mt-6 max-w-[34rem] text-[18px] leading-relaxed text-[#5B4740] lg:mx-0">
                Juniper is a small studio with six chairs and two treatment rooms. We book longer appointments, begin every visit with a
                seated consultation and never double-book, so the hour you reserve is entirely yours.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a href="#book" className={pillClay}>
                  Plan a visit <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href="#services" className={pillLine}>
                  See the menu
                </a>
              </div>
              <ul className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px] text-[#5B4740] lg:justify-start">
                {["Open Tuesday to Saturday", "Consultations are free", "Patch test before first colour"].map((fact) => (
                  <li key={fact} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7A7B52]" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[540px]" aria-hidden="true">
              <span className="absolute -left-[7%] top-[4%] aspect-square w-[54%] rounded-full bg-[#E6D3C3]" />
              <span className="absolute -right-[6%] bottom-[-7%] aspect-square w-[44%] rounded-full bg-[#B5543A]/[0.14]" />
              <span className="absolute right-[9%] top-[13%] aspect-square w-[27%] rounded-full border border-[#7A7B52]/70" />
              <div className="relative flex items-end justify-center gap-[3.5%]">
                <Arch className="aspect-[10/19] w-[30%]" fill="linear-gradient(180deg, #F3E4D8, #DFC8B6)" line="border-[#B5543A]/40">
                  <Sprig shape="lean" berry="#B5543A" className={`${sway} jp-slow`} />
                </Arch>
                <Arch className="aspect-[10/23] w-[35%] text-[#F7EBE4]" fill="linear-gradient(180deg, #C4674B, #A84B33)">
                  <span className="absolute left-1/2 top-[8%] aspect-square w-[36%] -translate-x-1/2 rounded-full border border-[#F7EBE4]/60" />
                  <Sprig shape="tall" berry="#F7EBE4" className={sway} />
                </Arch>
                <Arch className="aspect-[10/15] w-[28%]" fill="linear-gradient(180deg, #BCBD9A, #9C9D73)">
                  <Sprig shape="cluster" berry="#F7EBE4" className={`${sway} jp-slow`} />
                </Arch>
              </div>
            </div>
          </div>
        </section>

        {/* Service menu */}
        <SprigRule />
        <section id="services" aria-labelledby="services-title" className={`${scrollPad} px-5 py-20 sm:px-8 lg:py-24`}>
          <Heading id="services-title" label="The menu" title="Services and prices">
            Prices are in Canadian dollars before HST, at Stylist level. A Senior stylist adds $15 to any service and a Director adds $30.
          </Heading>
          <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
            {MENU.map((group, i) => (
              <article key={group.id} className="rounded-[28px] bg-white p-6 sm:p-9">
                <div className="flex items-center gap-4">
                  <span className="f-display grid h-14 w-11 shrink-0 place-items-center rounded-t-full bg-[#E6D3C3] pt-2 text-[15px]" aria-hidden="true">
                    {["I", "II", "III", "IV"][i]}
                  </span>
                  <div>
                    <h3 className="f-display text-[28px] leading-none">{group.name}</h3>
                    <p className="mt-2 text-[14px] leading-snug text-[#5B4740]">{group.blurb}</p>
                  </div>
                </div>
                <ul className="mt-6">
                  {group.services.map((s) => (
                    <li key={s.id} className="flex items-baseline gap-4 border-t border-[#E6D3C3] py-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-bold">{s.name}</p>
                        <p className="text-[14px] text-[#5B4740]">{s.note}</p>
                      </div>
                      <p className="shrink-0 text-right">
                        <span className="f-display block text-[21px] leading-none">${s.price}</span>
                        <span className="mt-1.5 block text-[12px] uppercase tracking-[0.1em] text-[#5B4740]">{duration(s.minutes)}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Booking stepper */}
        <section id="book" aria-labelledby="book-title" className={`${scrollPad} bg-[#E6D3C3] px-4 py-20 sm:px-8 md:mx-6 md:rounded-[44px] lg:py-24`}>
          <Heading id="book-title" label="Book" title="Plan your visit in three steps">
            Choose a service, a stylist level and a time. You will see the total before you send anything.
          </Heading>
          <div className="mt-10">
            <BookingStepper />
          </div>
        </section>

        {/* Packages and memberships */}
        <section id="packages" aria-labelledby="packages-title" className={`${scrollPad} px-5 py-20 sm:px-8 lg:py-24`}>
          <Heading id="packages-title" label="Packages and memberships" title="For the regulars">
            If you are here every few weeks anyway, these make it simpler and a little kinder on the budget.
          </Heading>
          <div className="mx-auto mt-10 grid max-w-6xl gap-x-6 gap-y-4 md:grid-cols-3">
            {PLANS.map((plan) => (
              <article key={plan.name} className="relative mt-16 flex flex-col rounded-[28px] bg-white px-7 pb-8 pt-[84px] text-center">
                <div className="absolute left-1/2 top-0 w-[84px] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                  <Arch className="aspect-[10/14] w-full" fill={plan.fill}>
                    <Sprig {...plan.art} weight={2} className={`h-[74%] w-auto ${plan.art.className}`} />
                  </Arch>
                </div>
                <h3 className="f-display text-[26px] leading-tight">{plan.name}</h3>
                <p className="mt-4">
                  <span className="f-display block text-[52px] leading-none">{plan.price}</span>
                  <span className="mt-2 block text-[12px] font-bold uppercase tracking-[0.16em] text-[#5B4740]">{plan.unit}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-[#E6D3C3] pt-6 text-left text-[15px] leading-snug">
                  {plan.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-[#7A7B52]" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a href="#enquire" className={`${pillLine} mt-7`}>
                  Ask about this plan
                </a>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[14px] text-[#5B4740]">
            Plans are priced at Stylist level. Add $15 a visit for a Senior stylist or $30 for a Director.
          </p>
        </section>

        {/* Your first visit */}
        <SprigRule />
        <section id="first-visit" aria-labelledby="first-visit-title" className={`${scrollPad} overflow-hidden px-5 py-20 sm:px-8 lg:py-24`}>
          <Heading id="first-visit-title" label="Your first visit" title="What happens, start to finish">
            No surprises at the chair or at the till. Here is everything we would want to know before walking in.
          </Heading>
          <div className="mx-auto mt-12 grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="relative mx-auto w-full max-w-[300px]" aria-hidden="true">
              <span className="absolute -left-[16%] bottom-[6%] aspect-square w-[62%] rounded-full bg-[#B5543A]/[0.14]" />
              <span className="absolute -right-[14%] top-[10%] aspect-square w-[50%] rounded-full border border-[#7A7B52]/70" />
              <Arch className="aspect-[10/14] w-full" fill="linear-gradient(180deg, #F0DFD2, #DFC8B6)" line="border-[#B5543A]/40">
                <Sprig shape="tall" berry="#B5543A" className={sway} />
              </Arch>
            </div>
            <ol>
              {FIRST_VISIT.map(([title, text], i) => (
                <li key={title} className="flex gap-5 border-t border-[#B5543A]/35 py-7 last:border-b sm:gap-7">
                  <span className="f-display w-9 shrink-0 text-[30px] leading-none text-[#B5543A]" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="f-display text-[24px] leading-tight">{title}</h3>
                    <p className="mt-2 leading-relaxed text-[#5B4740]">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto mt-14 max-w-6xl rounded-[28px] bg-white p-6 sm:p-10">
            <h3 className="f-display text-[28px] leading-tight">Cancelling, in plain words</h3>
            <p className="mt-2 max-w-2xl leading-relaxed text-[#5B4740]">
              Things come up. Tell us as early as you can and we will always try to move you before we charge you.
            </p>
            <dl className="mt-7 grid gap-4 sm:grid-cols-3">
              {CANCELLING.map(([when, cost, detail]) => (
                <div key={when} className="rounded-2xl bg-[#F7EBE4] p-5">
                  <dt className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#5B4740]">{when}</dt>
                  <dd className="f-display mt-2 text-[34px] leading-none">{cost}</dd>
                  <dd className="mt-2 text-[15px] text-[#5B4740]">{detail}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[15px] leading-relaxed text-[#5B4740]">
              Running late? Call us. After 15 minutes we may need to shorten your service or rebook it, so the next guest is not kept waiting.
            </p>
          </div>
        </section>

        {/* Gift card band */}
        <section aria-labelledby="gift-title" className="relative overflow-hidden bg-[#2A1B17] px-5 py-20 text-[#F7EBE4] [--demo-focus:#F7EBE4] sm:px-8 lg:py-24">
          <span className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[#F7EBE4]/15" aria-hidden="true" />
          <span className="absolute -bottom-32 left-[38%] h-80 w-80 rounded-full bg-[#F7EBE4]/[0.04]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <p className={`${eyebrow} text-[#E3A08A]`}>Gift cards</p>
              <h2 id="gift-title" className={h2}>
                Give someone an unhurried hour.
              </h2>
              <p className="mx-auto mt-4 max-w-[32rem] text-[17px] leading-relaxed text-[#E9D8CC] lg:mx-0">
                Printed cards in a cotton envelope at the front desk, or an e-card sent with your own note. Any amount from $25, good for any
                service or package, and they never expire.
              </p>
              <a href="#enquire" className={`${pill} mt-8 bg-[#F7EBE4] text-[#2A1B17] hover:bg-white`}>
                Ask about a gift card
              </a>
            </div>
            <div className="relative mx-auto aspect-[8/5] w-full max-w-[420px]" aria-hidden="true">
              <span className="absolute right-0 top-0 h-[74%] w-[78%] rotate-[7deg] rounded-[22px] bg-[#E6D3C3]" />
              <div
                className="absolute bottom-0 left-0 flex h-[78%] w-[82%] -rotate-[5deg] flex-col justify-between rounded-[22px] p-[7%] shadow-[0_30px_50px_-25px_rgba(0,0,0,0.7)]"
                style={{ background: "linear-gradient(135deg, #C4674B, #A0452E)" }}
              >
                <div className="flex items-start justify-between">
                  <span className="f-display text-[clamp(15px,4.4vw,20px)] uppercase tracking-[0.24em]">Juniper</span>
                  <Arch className="aspect-[10/13] w-[22%]" fill="transparent" line="border-[#F7EBE4]/70">
                    <Sprig shape="lean" berry="#F7EBE4" weight={3} className="h-[78%] w-auto" />
                  </Arch>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Gift card</span>
                  <span className="f-display text-[clamp(30px,9vw,44px)] leading-none">$100</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hours and location */}
        <section id="visit" aria-labelledby="visit-title" className={`${scrollPad} px-5 py-20 sm:px-8 lg:py-24`}>
          <Heading id="visit-title" label="Visit us" title="Hours and location">
            Central Pickering, Ontario, a few minutes from the train station and Highway 401.
          </Heading>
          <div className="mx-auto mt-12 grid max-w-5xl items-center gap-12 md:grid-cols-2">
            <div className="mx-auto w-full max-w-[400px] rounded-t-full bg-white px-8 pb-9 pt-20 sm:px-10">
              <Sprig shape="spray" className="mx-auto h-9 w-24 text-[#B5543A]" />
              <h3 className="f-display mt-3 text-center text-[26px]">Opening hours</h3>
              <dl className="mt-5">
                {[1, 2, 3, 4, 5, 6, 0].map((d) => {
                  const hours = HOURS[d]
                  return (
                    <div key={d} className="flex justify-between gap-4 border-t border-[#E6D3C3] py-3 text-[15px]">
                      <dt className="font-bold">{WEEKDAYS[d]}</dt>
                      <dd className="text-[#5B4740]">{hours ? `${clock(hours[0] * 60)} to ${clock(hours[1] * 60)}` : "Closed"}</dd>
                    </div>
                  )
                })}
              </dl>
            </div>
            <div>
              <h3 className="f-display text-[28px] leading-tight">Finding us</h3>
              <ul className="mt-6 space-y-5 text-[16px] leading-relaxed">
                {[
                  { Icon: MapPin, text: "Central Pickering, Ontario. Street level, with a step-free entrance." },
                  { Icon: Car, text: "Free parking at the door and bike racks out front." },
                  { Icon: TrainFront, text: "About ten minutes on foot from the Pickering train station." },
                ].map(({ Icon, text }) => (
                  <li key={text} className="flex gap-4">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-[#B5543A]" aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-1 border-t border-[#B5543A]/35 pt-6">
                <a href="tel:+19055550158" className="flex min-h-[44px] items-center gap-4 font-bold hover:text-[#96402A]">
                  <Phone className="h-5 w-5 shrink-0 text-[#B5543A]" aria-hidden="true" /> (905) 555-0158
                </a>
                <a href="mailto:hello@juniperstudio.example" className="flex min-h-[44px] items-center gap-4 break-all font-bold hover:text-[#96402A]">
                  <Mail className="h-5 w-5 shrink-0 text-[#B5543A]" aria-hidden="true" /> hello@juniperstudio.example
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Enquiry form */}
        <section id="enquire" aria-labelledby="enquire-title" className={`${scrollPad} bg-[#E6D3C3] px-4 py-20 sm:px-8 md:mx-6 md:mb-6 md:rounded-[44px] lg:py-24`}>
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="text-center lg:pt-6 lg:text-left">
              <p className={`${eyebrow} text-[#96402A]`}>Enquire</p>
              <h2 id="enquire-title" className={h2}>
                Request a booking or ask us anything
              </h2>
              <p className="mx-auto mt-4 max-w-[30rem] text-[17px] leading-relaxed text-[#5B4740] lg:mx-0">
                Tell us what you have in mind and which days suit you. If you came here from the planner above, your choices are already
                in the message box.
              </p>
              <Sprig shape="spray" className="mx-auto mt-8 h-12 w-32 text-[#96402A] lg:mx-0" />
              <p className="mt-6 text-[15px] leading-relaxed text-[#5B4740]">
                Rather talk it through? Call <strong className="whitespace-nowrap text-[#2A1B17]">(905) 555-0158</strong> during opening hours.
              </p>
            </div>
            <div className="rounded-[32px] bg-white p-6 sm:p-10">
              <DemoForm
                demoName="Juniper Hair & Skin Studio"
                industrySlug="beauty-fitness-wellness"
                options={["Hair", "Colour", "Skin", "Brows & lashes", "A package"]}
                optionsLabel="What is it about?"
                messageLabel="Your message"
                messagePlaceholder="The service you would like, days and times that suit you, and anything we should know."
                submitLabel="Send to the studio"
                classes={{
                  form: "relative flex flex-col gap-5",
                  grid: "grid gap-5 sm:grid-cols-2",
                  field: "flex flex-col gap-2",
                  label: "text-[12px] font-bold uppercase tracking-[0.14em] text-[#5B4740]",
                  input:
                    "min-h-[50px] w-full rounded-2xl border border-[#A38A7A] bg-[#FDF9F6] px-4 py-3 text-[16px] text-[#2A1B17] placeholder:text-[#7B655C] focus:border-[#B5543A]",
                  button: `${pillBase} ${clay} min-h-[54px] px-9 text-[16px] disabled:opacity-60 sm:self-start`,
                  note: "text-[13px] leading-relaxed text-[#5B4740]",
                  error: "rounded-2xl border border-[#B5543A] bg-[#FBEFE9] px-4 py-3 text-[15px] text-[#7A2E1B]",
                  success: "rounded-3xl border border-[#7A7B52] bg-[#F4F4EA] p-6 text-[16px] leading-relaxed",
                }}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="px-5 pb-10 pt-14 sm:px-8">
        <SprigRule />
        <div className="mx-auto mt-10 grid max-w-6xl gap-10 text-center md:grid-cols-3 md:text-left">
          <div>
            <p className="f-display text-[24px] uppercase tracking-[0.24em]">Juniper</p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#5B4740]">Hair and skin studio. Central Pickering, Ontario. Open Tuesday to Saturday.</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 text-[15px] font-bold md:justify-items-start">
              {[...NAV, ["Enquire", "#enquire"]].map(([name, href]) => (
                <li key={href}>
                  <a href={href} className="inline-flex min-h-[44px] items-center hover:text-[#96402A]">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-[15px] leading-relaxed text-[#5B4740] md:text-right">
            <p>(905) 555-0158</p>
            <p className="break-all">hello@juniperstudio.example</p>
            <p className="mt-3">On social as @juniperstudio.example, a placeholder handle.</p>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-6xl border-t border-[#B5543A]/25 pt-6 text-center text-[13px] text-[#5B4740]">
          Juniper Hair &amp; Skin Studio is an invented business. This is a concept site designed and built by Hijaz.ai.
        </p>
      </footer>
    </div>
  )
}
