import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import localFont from "next/font/local"
import ConceptBar from "@/components/demos/ConceptBar"
import DemoForm from "@/components/demos/DemoForm"
import MenuTabs from "@/components/demos/restaurants-hospitality/MenuTabs"
import ReservationPicker from "@/components/demos/restaurants-hospitality/ReservationPicker"
import SiteHeader from "@/components/demos/restaurants-hospitality/SiteHeader"

// Bodoni Moda, served from files in the repo so the build never depends on a font host
const display = localFont({
  src: [
    { path: "../../../fonts/demos/bodoni-moda-normal-400-900.woff2", style: "normal", weight: "400 900" },
    { path: "../../../fonts/demos/bodoni-moda-italic-400-900.woff2", style: "italic", weight: "400 900" },
  ],
  variable: "--f-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
})
// Karla, served from files in the repo so the build never depends on a font host
const body = localFont({
  src: [
    { path: "../../../fonts/demos/karla-normal-200-800.woff2", style: "normal", weight: "200 800" },
  ],
  variable: "--f-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Ember & Rye: wood-fired kitchen and bar in Oshawa (concept build)",
  description:
    "Concept website for Ember & Rye, an invented wood-fired kitchen and bar in Oshawa, Ontario: the menu, a table request picker, private dining, catering and hours.",
}

const wrap = "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12"
const section = "scroll-mt-[98px] py-20 sm:py-28 lg:py-36"
const eyebrow = "text-[11px] font-medium uppercase tracking-[0.24em] text-[#A39683]"
const rule = "border-t border-[#F2E7D5]/25 pt-5"
const h2 = "f-display text-[clamp(2.6rem,7.4vw,6rem)] font-normal leading-[0.98] tracking-[-0.015em]"
const lede = "text-lg leading-relaxed text-[#A39683]"
const btn =
  "inline-flex min-h-[52px] items-center justify-center px-7 text-sm font-bold uppercase tracking-[0.16em] transition-colors"
const btnSolid = `${btn} bg-[#E4572E] text-[#14110F] hover:bg-[#F2E7D5]`
const btnLine = `${btn} border border-[#F2E7D5]/50 text-[#F2E7D5] hover:bg-[#F2E7D5] hover:text-[#14110F]`
const linkBase = "underline decoration-[#E4572E] underline-offset-4 transition-colors hover:text-[#E4572E]"
/* Links inside a sentence carry vertical padding so the tap area stays above 44px without moving the line. */
const textLink = `${linkBase} py-3.5`
const rowLink = `${linkBase} inline-flex min-h-[44px] items-center`

/* The ember glow: three radial gradients that drift slowly behind the hero and fade into the
   page at its foot, plus a few rising sparks. Everything that moves sits inside a no-preference
   query, so the glow is still and the sparks stay hidden under reduced motion. */
const css = `
.er-glow { position: absolute; inset: 0; z-index: -1; pointer-events: none; -webkit-mask-image: linear-gradient(to top, transparent, #000 26%); mask-image: linear-gradient(to top, transparent, #000 26%); }
.er-blob { position: absolute; left: var(--c); bottom: calc(var(--b) - var(--s) * 0.5); width: var(--s); height: var(--s); margin-left: calc(var(--s) * -0.5); border-radius: 50%; }
.er-g1 { --s: clamp(680px, 150vw, 1280px); --c: 28%; --b: 28%; background: radial-gradient(closest-side, rgba(228,87,46,.46), rgba(228,87,46,.2) 38%, rgba(228,87,46,.06) 62%, transparent 82%); }
.er-g2 { --s: clamp(520px, 110vw, 940px); --c: 88%; --b: 20%; background: radial-gradient(closest-side, rgba(201,162,39,.14), rgba(228,87,46,.08) 46%, rgba(228,87,46,.025) 66%, transparent 84%); }
.er-g3 { --s: clamp(460px, 100vw, 800px); --c: 62%; --b: 34%; background: radial-gradient(closest-side, rgba(240,112,60,.22), rgba(240,112,60,.08) 44%, transparent 80%); }
.er-spark { position: absolute; bottom: 0; width: 3px; height: 3px; border-radius: 50%; background: #FFB48A; box-shadow: 0 0 10px 2px rgba(228,87,46,.75); opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .er-g1 { animation: er-drift-a 24s ease-in-out infinite alternate; }
  .er-g2 { animation: er-drift-b 33s ease-in-out infinite alternate; }
  .er-g3 { animation: er-drift-c 19s ease-in-out infinite alternate; }
  .er-spark { animation: er-rise var(--d) linear var(--delay) infinite; }
  .er-flame { transform-box: fill-box; transform-origin: 50% 100%; animation: er-flicker 2.6s ease-in-out infinite alternate; }
  .er-flame-b { animation-duration: 3.4s; animation-delay: -1.2s; }
  .er-panel { animation: er-fade .4s ease both; }
  @keyframes er-drift-a { from { transform: translate3d(-5%, 2%, 0) scale(1); opacity: .8; } to { transform: translate3d(7%, -4%, 0) scale(1.1); opacity: 1; } }
  @keyframes er-drift-b { from { transform: translate3d(4%, -3%, 0) scale(1.08); opacity: 1; } to { transform: translate3d(-8%, 3%, 0) scale(.96); opacity: .7; } }
  @keyframes er-drift-c { from { transform: translate3d(-9%, 0, 0) scale(.94); opacity: .65; } to { transform: translate3d(10%, -5%, 0) scale(1.12); opacity: 1; } }
  @keyframes er-rise { 0% { transform: translate3d(0, 0, 0); opacity: 0; } 8% { opacity: .9; } 70% { opacity: .45; } 100% { transform: translate3d(var(--x), -58vh, 0); opacity: 0; } }
  @keyframes er-flicker { from { transform: scaleY(1) skewX(0deg); } 50% { transform: scaleY(1.06) skewX(-1.5deg); } to { transform: scaleY(.95) skewX(1.5deg); } }
  @keyframes er-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
}
`

const SPARKS = [
  { left: "8%", d: "13s", delay: "0s", x: "36px" },
  { left: "19%", d: "17s", delay: "-6s", x: "-28px" },
  { left: "31%", d: "11s", delay: "-3s", x: "52px" },
  { left: "44%", d: "15s", delay: "-9s", x: "-40px" },
  { left: "57%", d: "12s", delay: "-1s", x: "24px" },
  { left: "68%", d: "18s", delay: "-12s", x: "-56px" },
  { left: "81%", d: "14s", delay: "-7s", x: "44px" },
  { left: "92%", d: "16s", delay: "-4s", x: "-20px" },
]

const FIRE_FACTS = [
  { figure: "4 pm", text: "The first split of oak goes onto last night's coals." },
  { figure: "3 heights", text: "In the embers, on the grill, and high on the chain." },
  { figure: "12 hours", text: "How long a lamb shoulder sits beside the fire." },
]

const GATHERINGS = [
  {
    name: "The hearth table",
    size: "10 to 16 guests",
    text: "One long oak table beside the fire, set apart from the dining room. Five courses served family style, built around a lamb shoulder or a whole fish.",
    price: "From $78 a guest",
  },
  {
    name: "The whole room",
    size: "Up to 64 seated, 90 standing",
    text: "The dining room and the bar to yourselves, Sunday to Wednesday. The kitchen writes the menu with you, and the fire stays lit until the last guest leaves.",
    price: "Minimum spend from $4,500",
  },
  {
    name: "Catering",
    size: "20 to 150 guests",
    text: "Trays ready for pickup, or our cooks and a travelling grill at your door anywhere in Durham Region. Weddings, office lunches, backyard dinners.",
    price: "From $34 a guest",
  },
]

const ASK_STEPS = [
  "Send us the date, the head count and anything your guests cannot eat.",
  "We write back with a menu and a price, usually within two days.",
  "A 20% deposit holds the date. Final numbers are due one week ahead.",
]

const HOURS = [
  ["The bar", "Every day, 4 pm to 11 pm"],
  ["Dinner", "Every day, 5 pm to 10 pm"],
  ["Last table seated", "9 pm"],
  ["Pickup window", "Every day, 4:30 pm to 9 pm"],
  ["Private lunches", "By arrangement"],
]

const FOOTER_LINKS = [
  ["#menu", "Menu"],
  ["#reserve", "Reserve"],
  ["#the-fire", "The fire"],
  ["#private-dining", "Private dining"],
  ["#find-us", "Find us"],
  ["#enquire", "Enquire"],
]

const formClasses = {
  form: "space-y-6 [color-scheme:dark]",
  grid: "grid gap-6 sm:grid-cols-2",
  field: "flex flex-col gap-2",
  label: eyebrow,
  input:
    "min-h-[52px] w-full rounded-none border border-[#F2E7D5]/20 bg-[#14110F] px-4 py-3 text-base text-[#F2E7D5] transition-colors placeholder:text-[#A39683] hover:border-[#F2E7D5]/50 focus:border-[#E4572E]",
  button: `${btnSolid} w-full disabled:opacity-60 sm:w-auto`,
  note: "max-w-xl text-sm leading-relaxed text-[#A39683]",
  error: "border-l-2 border-[#E4572E] pl-4 text-[#F2E7D5]",
  success: "border border-[#F2E7D5]/20 bg-[#14110F] p-6 text-lg leading-relaxed text-[#F2E7D5] sm:p-8",
}

/** Section opener: a thin rule with a small label, then the display heading and an optional lede beside it. */
function SectionHead({ id, label, aside, text, children }: { id: string; label: string; aside?: string; text?: string; children: ReactNode }) {
  return (
    <div>
      <div className={`${rule} flex items-baseline justify-between gap-6`}>
        <p className={eyebrow}>{label}</p>
        {aside && <p className={`${eyebrow} hidden sm:block`}>{aside}</p>}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end lg:gap-16">
        <h2 id={id} className={h2}>
          {children}
        </h2>
        {text && <p className={lede}>{text}</p>}
      </div>
    </div>
  )
}

/** Line drawing of the hearth: brick arch, a chain and hook, two logs and the fire. */
function Hearth({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 372" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M10 8h300M10 18h300M24 18v322M296 18v322" />
      <path d="M40 340V152a120 120 0 0 1 240 0v188M74 340V152a86 86 0 0 1 172 0v188" />
      <path d="M80.5 119.1 49.1 106.1M99.2 91.2 75.1 67.1M127.1 72.5 114.1 41.1M160 66V32M192.9 72.5l13-31.4M220.8 91.2l24.1-24.1M239.5 119.1l31.4-13" />
      <path d="M40 190h34M40 228h34M40 266h34M40 304h34M246 190h34M246 228h34M246 266h34M246 304h34" />
      <path d="M57 152v38M57 228v38M57 304v36M263 152v38M263 228v38M263 304v36" opacity=".55" />
      <path d="M8 340h304M20 356h280M20 340v16M300 340v16M34 364h252" />
      <path d="M160 66v40" strokeDasharray="1.5 5" />
      <path d="M160 108v8a7 7 0 0 0 14 0" />
      <rect x="92" y="324" width="136" height="15" rx="7.5" />
      <rect x="108" y="309" width="104" height="15" rx="7.5" />
      <path d="M118 331.5h22M158 331.5h40M128 316.5h30M176 316.5h18" opacity=".55" />
      <g stroke="#E4572E" strokeWidth="1.5">
        <g className="er-flame">
          <path d="M160 309c-30-16-34-52-14-78 0 16 10 22 14 8 4-22-6-36-2-56 28 24 44 56 36 86-4 18-16 34-34 40Z" />
          <path d="M160 303c-12-10-12-28-2-40 2 10 10 8 10-2 12 14 10 34-8 42Z" />
        </g>
        <path className="er-flame er-flame-b" d="M122 309c-16-14-14-36-2-50 0 12 8 16 10 6 10 16 8 36-8 44Z" />
        <path className="er-flame er-flame-b" d="M198 309c16-12 16-32 6-46-1 10-8 14-10 6-8 14-8 32 4 40Z" />
        <path d="M146 166v-7M176 150v-9M163 132v-6M132 196v-5M190 188v-5" opacity=".8" />
      </g>
    </svg>
  )
}

export default function EmberAndRyePage() {
  return (
    <div
      id="top"
      className={`${display.variable} ${body.variable} f-body w-full flex-1 bg-[#14110F] text-[#F2E7D5]`}
      style={{ "--demo-selection": "#E4572E", "--demo-selection-text": "#14110F", "--demo-focus": "#F2E7D5" } as CSSProperties}
    >
      <ConceptBar industrySlug="restaurants-hospitality" industryName="Restaurants & Hospitality" />
      <style>{css}</style>
      <SiteHeader />

      <main>
        {/* 1. Hero */}
        <section aria-labelledby="er-hero-title" className="relative isolate flex min-h-[calc(100svh-98px)] flex-col justify-between overflow-hidden">
          <div className="er-glow" aria-hidden="true">
            <span className="er-blob er-g1" />
            <span className="er-blob er-g2" />
            <span className="er-blob er-g3" />
            {SPARKS.map((s) => (
              <span key={s.left} className="er-spark" style={{ left: s.left, "--d": s.d, "--delay": s.delay, "--x": s.x } as CSSProperties} />
            ))}
          </div>
          <div className={`${wrap} flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-8`}>
            <p className={eyebrow}>Wood-fired kitchen &amp; bar</p>
            <p className={eyebrow}>Oshawa, Ontario</p>
          </div>
          <div className={`${wrap} pb-10 pt-16 sm:pb-14`}>
            <h1 id="er-hero-title" className="f-display text-[clamp(3rem,13.5vw,10.5rem)] font-normal leading-[0.9] tracking-[-0.025em]">
              <span className="block">Lit at four.</span>
              <span className="block italic">Seated at five.</span>
            </h1>
            <div className="mt-10 grid gap-8 border-t border-[#F2E7D5]/30 pt-8 md:grid-cols-2 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] xl:items-end xl:gap-12">
              <p className="max-w-md text-lg leading-relaxed sm:text-xl">
                Dinner cooked over Ontario oak and maple, in a room built around one open hearth.
              </p>
              <p className="max-w-sm leading-relaxed">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.24em]">Tonight</span>
                Bar from 4 pm. Kitchen from 5 pm to 10 pm. Last table seated at 9 pm.
              </p>
              <div className="flex flex-wrap gap-3 md:col-span-2 xl:col-span-1">
                <a href="#reserve" className={btnSolid}>
                  Reserve a table
                </a>
                <a href="#menu" className={btnLine}>
                  Read the menu
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Menu */}
        <section id="menu" aria-labelledby="er-menu-title" className={section}>
          <div className={wrap}>
            <SectionHead
              id="er-menu-title"
              label="The menu"
              aside="Rewritten every Tuesday"
              text="Written around what the farms send and what the fire does best. Plates land as they are ready and belong in the middle of the table."
            >
              This week, <em>over the coals</em>
            </SectionHead>
            <div className="mt-12 lg:mt-16">
              <MenuTabs />
            </div>
          </div>
        </section>

        {/* 3. Reservation picker */}
        <section id="reserve" aria-labelledby="er-reserve-title" className={`${section} bg-[#1E1915]`}>
          <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}>
            <div className="lg:sticky lg:top-[138px] lg:self-start">
              <p className={`${eyebrow} ${rule}`}>Reserve</p>
              <h2 id="er-reserve-title" className={`${h2} mt-8`}>
                Hold <em>a table</em>
              </h2>
              <p className={`${lede} mt-8 max-w-md`}>
                Choose a night, a time and the size of your party. We hold tables for fifteen minutes, and the eight
                counter seats facing the hearth are always kept for walk-ins.
              </p>
              <p className="mt-6 max-w-md leading-relaxed text-[#A39683]">
                Would you rather talk to a person? Call{" "}
                <a href="tel:+19055550173" className={`${textLink} whitespace-nowrap text-[#F2E7D5]`}>
                  (905) 555-0173
                </a>{" "}
                any day after 2 pm.
              </p>
            </div>
            <ReservationPicker />
          </div>
        </section>

        {/* 4. The fire */}
        <section id="the-fire" aria-labelledby="er-fire-title" className={section}>
          <div className={`${wrap} grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-20`}>
            <figure className="relative mx-auto w-full max-w-[400px] lg:mx-0">
              <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[14%] top-[38%] rounded-full bg-[radial-gradient(closest-side,rgba(228,87,46,0.3),transparent)]" />
              <Hearth className="relative h-auto w-full text-[#F2E7D5]/75" />
              <figcaption className={`${eyebrow} mt-6`}>The hearth. Oak underneath, maple to finish.</figcaption>
            </figure>
            <div>
              <p className={`${eyebrow} ${rule}`}>The fire</p>
              <h2 id="er-fire-title" className={`${h2} mt-8`}>
                Oak for the long cook, <em>maple for the finish</em>
              </h2>
              <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-[#F2E7D5]/85">
                <p>
                  There is no gas line into the kitchen. Every evening starts at four, when the first split of Ontario
                  red oak goes onto what is left of last night&apos;s coals. Oak burns slow and even, so it does the
                  heavy work: the lamb shoulder, the short rib, the bread.
                </p>
                <p>
                  Sugar maple burns hotter and a little sweeter. It goes on for the last few minutes of a chicken or a
                  trout, when a hard char and a thread of smoke are the whole point.
                </p>
                <p>
                  The wood is split and stacked to season for a full year before it comes inside. By ten the fire is
                  banked down to embers, and the oven is just warm enough to bake tomorrow&apos;s bread.
                </p>
              </div>
              <dl className="mt-12 grid gap-8 border-t border-[#F2E7D5]/25 pt-8 sm:grid-cols-3">
                {FIRE_FACTS.map((fact) => (
                  <div key={fact.figure}>
                    <dt className="f-display text-4xl italic">{fact.figure}</dt>
                    <dd className="mt-2 text-[#A39683]">{fact.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 5. Private dining and catering */}
        <section id="private-dining" aria-labelledby="er-private-title" className={`${section} bg-[#1E1915]`}>
          <div className={wrap}>
            <SectionHead
              id="er-private-title"
              label="Private dining and catering"
              aside="10 to 150 guests"
              text="A birthday at one long table, the whole room for a wedding dinner, or the fire brought to you."
            >
              Bring <em>everyone</em>
            </SectionHead>
            <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-14">
              {GATHERINGS.map((item) => (
                <li key={item.name} className="flex flex-col border-t border-[#F2E7D5]/25 pt-6">
                  <p className={eyebrow}>{item.size}</p>
                  <h3 className="f-display mt-4 text-[2rem] font-normal leading-tight">{item.name}</h3>
                  <p className="mt-4 flex-1 leading-relaxed text-[#A39683]">{item.text}</p>
                  <p className="mt-6 font-medium tabular-nums">{item.price}</p>
                </li>
              ))}
            </ul>
            <div className="mt-16 grid gap-8 border border-[#F2E7D5]/15 bg-[#14110F] p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
              <div>
                <h3 className="f-display text-3xl font-normal italic">How to ask</h3>
                <ol className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8">
                  {ASK_STEPS.map((step, i) => (
                    <li key={step} className="flex gap-4 leading-relaxed text-[#F2E7D5]/85">
                      <span aria-hidden="true" className="f-display text-2xl italic leading-none text-[#E4572E]">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <a href="#enquire" className={btnLine}>
                Ask about a date
              </a>
            </div>
          </div>
        </section>

        {/* 6. Hours and find us */}
        <section id="find-us" aria-labelledby="er-find-title" className={section}>
          <div className={wrap}>
            <SectionHead id="er-find-title" label="Hours and find us" aside="Oshawa, Ontario">
              Open <em>every night</em>
            </SectionHead>
            <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
              <dl>
                {HOURS.map(([name, time]) => (
                  <div key={name} className="flex flex-col gap-1 border-b border-[#F2E7D5]/10 py-4 sm:flex-row sm:items-baseline sm:gap-3">
                    <dt className="f-display flex items-baseline gap-3 text-2xl sm:flex-1">
                      {name}
                      <span aria-hidden="true" className="hidden min-w-5 flex-1 border-b border-dotted border-[#F2E7D5]/40 sm:block" />
                    </dt>
                    <dd className="tabular-nums text-[#A39683] sm:text-[#F2E7D5]">{time}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <p className="f-display text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.05]">
                  Downtown Oshawa, <em>Ontario</em>
                </p>
                <p className={`${lede} mt-6 max-w-lg`}>
                  Follow the oak smoke. There is street parking out front and a municipal lot around the corner, and the
                  door is level with the sidewalk.
                </p>
                <div className="mt-8 border-l-2 border-[#E4572E] pl-5">
                  <p className={eyebrow}>Pickup orders</p>
                  <p className="mt-2 max-w-lg text-lg leading-relaxed">
                    Call{" "}
                    <a href="tel:+19055550173" className={`${textLink} whitespace-nowrap`}>
                      (905) 555-0173
                    </a>{" "}
                    from 4 pm. Most orders are ready in 30 minutes, wrapped in butcher paper and still warm.
                  </p>
                </div>
                <p className="mt-8 leading-relaxed text-[#A39683]">
                  Anything else:{" "}
                  <a href="mailto:table@emberandrye.example" className={`${textLink} break-words text-[#F2E7D5]`}>
                    table@emberandrye.example
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Enquiry form */}
        <section id="enquire" aria-labelledby="er-enquire-title" className={`${section} bg-[#1E1915]`}>
          <div className={`${wrap} grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20`}>
            <div>
              <p className={`${eyebrow} ${rule}`}>Enquire</p>
              <h2 id="er-enquire-title" className={`${h2} mt-8`}>
                Write to <em>the kitchen</em>
              </h2>
              <p className={`${lede} mt-8 max-w-md`}>
                A table for Friday, a dinner for forty, lunch for the office, or a question about the menu. Tell us what
                you have in mind and we will take it from there.
              </p>
            </div>
            <DemoForm
              demoName="Ember & Rye"
              industrySlug="restaurants-hospitality"
              options={["Table reservation", "Private dining", "Catering", "Something else"]}
              optionsLabel="What is this about?"
              messageLabel="Your message"
              messagePlaceholder="The date, how many of you, and anything we should know"
              submitLabel="Send enquiry"
              classes={formClasses}
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-[#F2E7D5]/15">
        <div className={`${wrap} py-14 sm:py-20`}>
          <p className="f-display text-[clamp(2.75rem,10vw,7.5rem)] italic leading-none tracking-[-0.02em]">
            Ember <span className="text-[#C9A227]">&amp;</span> Rye
          </p>
          <div className="mt-12 grid gap-8 border-t border-[#F2E7D5]/15 pt-6 sm:grid-cols-3">
            <p>
              <span className="flex min-h-[44px] items-center">Wood-fired kitchen &amp; bar</span>
              <span className="flex min-h-[44px] items-center text-[#A39683]">Downtown Oshawa, Ontario</span>
            </p>
            <p className="flex flex-col items-start">
              <a href="tel:+19055550173" className={rowLink}>
                (905) 555-0173
              </a>
              <a href="mailto:table@emberandrye.example" className={`${rowLink} break-all`}>
                table@emberandrye.example
              </a>
            </p>
            <nav aria-label="Footer">
              <ul className="grid grid-cols-2 gap-x-6 text-[#A39683]">
                {FOOTER_LINKS.map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="inline-flex min-h-[44px] items-center transition-colors hover:text-[#F2E7D5]">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[#A39683]">
            Ember &amp; Rye is an invented restaurant. This page is a concept build by Hijaz.ai, so the menu, the hours
            and the phone number are for show.
          </p>
        </div>
      </footer>
    </div>
  )
}
