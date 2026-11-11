import type { Metadata } from "next"
import localFont from "next/font/local"
import {
  ArrowRight,
  Check,
  Clock,
  FileText,
  Hand,
  HeartHandshake,
  LifeBuoy,
  Mail,
  MapPin,
  MessagesSquare,
  Phone,
  Plus,
  Receipt,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Sun,
  Wallet,
} from "lucide-react"
import ConceptBar from "@/components/demos/ConceptBar"
import DemoForm from "@/components/demos/DemoForm"
import AppointmentPicker, { RequestedSlot } from "@/components/demos/healthcare-clinics/AppointmentPicker"
import HoursTable from "@/components/demos/healthcare-clinics/HoursTable"
import SiteHeader from "@/components/demos/healthcare-clinics/SiteHeader"

// Fraunces, served from files in the repo so the build never depends on a font host
const display = localFont({
  src: [
    { path: "../../../fonts/demos/fraunces-normal-100-900.woff2", style: "normal", weight: "100 900" },
    { path: "../../../fonts/demos/fraunces-italic-100-900.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--f-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
})
// DM Sans, served from files in the repo so the build never depends on a font host
const body = localFont({
  src: [
    { path: "../../../fonts/demos/dm-sans-normal-100-1000.woff2", style: "normal", weight: "100 1000" },
  ],
  variable: "--f-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Oakline Dental Studio, a family dentist in Whitby (concept build)",
  description:
    "Concept website for an invented family dental clinic in Whitby, Ontario: example fees shown openly, direct insurance billing, a first visit explained in three steps and an appointment picker.",
}

const CSS = `
.oak .f-display { font-variation-settings: "SOFT" 100; letter-spacing: -0.012em; }
.oak-form select {
  appearance: none;
  padding-right: 2.75rem;
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%2312332E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
}
.oak-form textarea { min-height: 7.5rem; resize: vertical; }
@media (prefers-reduced-motion: no-preference) {
  .oak-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: oak-draw 3.4s cubic-bezier(0.6, 0, 0.2, 1) 0.25s forwards; }
  @keyframes oak-draw { to { stroke-dashoffset: 0; } }
}
`

/* ── Signature art ────────────────────────────────────────────────────────── */

// One unbroken stroke: it arrives from the left, draws the tooth, crosses itself at the root and leaves as a smile.
const TOOTH_LINE =
  "M-1600 200C-1000 300-200 268 158 268C172 268 176 232 181 212C185 196 190 186 200 186C210 186 215 196 219 212C224 232 228 266 243 266C256 266 259 228 265 192C271 156 287 136 283 104C279 72 250 58 228 64C214 68 210 78 200 78C190 78 186 68 172 64C150 58 121 72 117 104C113 136 129 156 135 192C141 228 143 258 152 272C170 300 330 330 520 262C615 228 900 150 2300 150"
const TOOTH_MARK =
  "M158 266C146 266 141 228 135 192C129 156 113 136 117 104C121 72 150 58 172 64C186 68 190 78 200 78C210 78 214 68 228 64C250 58 279 72 283 104C287 136 271 156 265 192C259 228 256 266 243 266C228 266 224 232 219 212C215 196 210 186 200 186C190 186 185 196 181 212C176 232 172 266 158 266Z"

function ToothLine({ className = "" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 ${className}`} aria-hidden="true">
      <svg viewBox="100 40 200 290" fill="none" className="h-full w-full overflow-visible">
        <circle cx="216" cy="148" r="98" fill="#F6E7B4" />
        <path
          className="oak-draw"
          pathLength={1}
          d={TOOTH_LINE}
          stroke="#12332E"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function ToothMark({ tone = "bg-[#F6E7B4] text-[#12332E]" }: { tone?: string }) {
  return (
    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${tone}`} aria-hidden="true">
      <svg viewBox="104 50 192 228" fill="none" className="h-[22px] w-auto">
        <path
          d={TOOTH_MARK}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  )
}

/** The recurring motif: three nested smile arcs. Position and tint come from the caller. */
function SmileArcs({ className = "" }: { className?: string }) {
  const arcs = [
    "M10 20C200 560 800 560 990 20",
    "M130 20C290 420 710 420 870 20",
    "M250 20C370 290 630 290 750 20",
  ]
  return (
    <svg aria-hidden="true" viewBox="0 0 1000 440" fill="none" className={`pointer-events-none absolute ${className}`}>
      {arcs.map((d) => (
        <path key={d} d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  )
}

/** The one italic word in each headline, sitting on a small smile. */
function Em({ children }: { children: React.ReactNode }) {
  return (
    <em className="relative isolate inline-block italic">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        fill="none"
        className="absolute -bottom-[0.08em] left-0 -z-10 h-[0.3em] w-full text-[#9DBFAE]"
      >
        <path d="M3 2.5C28 11 72 11 97 2.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </em>
  )
}

function Kicker({ children, tone = "text-[#47625C]" }: { children: React.ReactNode; tone?: string }) {
  return (
    <p className={`inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.16em] ${tone}`}>
      <svg aria-hidden="true" width="22" height="10" viewBox="0 0 22 10" fill="none">
        <path d="M2 2C6 9 16 9 20 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {children}
    </p>
  )
}

/* ── Content ──────────────────────────────────────────────────────────────── */

const wrap = "mx-auto w-full max-w-[1264px] px-4 sm:px-8"
const h2 = "f-display mt-4 text-balance text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.08]"
const lead = "text-[17px] leading-[1.65] text-[#47625C] sm:text-[18px]"
const coral =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#EF6F5C] px-7 text-[16px] font-semibold text-[#12332E] transition-colors hover:bg-[#F2836F]"
const quiet =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#12332E]/30 bg-white/70 px-7 text-[16px] font-semibold text-[#12332E] transition-colors hover:border-[#12332E] hover:bg-white"

const VISIT_TYPES = ["New patient exam", "Cleaning", "Emergency", "Whitening consult"]

const PROMISES = ["Fees shown before you sit down", "Direct billing to most plans", "Evenings and Saturdays"]

const STEPS = [
  {
    when: "First 10 minutes",
    title: "We talk first",
    text: "Forms are done online before you arrive. The visit starts as a conversation in an ordinary chair: what brought you in, what worries you and what you want to leave with.",
  },
  {
    when: "Next 35 minutes",
    title: "We look, and narrate",
    text: "A full exam and only the X-rays you need. Every image goes up on the screen and we point at it, including the parts that are perfectly fine.",
  },
  {
    when: "Last 15 minutes",
    title: "You leave with one page",
    text: "A written plan sorted into now, soon and whenever, with a fee beside every line. Nothing is booked on the day unless you ask for it.",
  },
]

const TREATMENTS = [
  {
    icon: Sparkles,
    name: "Cleaning",
    time: "45 minutes",
    text: "Scaling and polish with a hygienist who says what each tool is for before it goes anywhere near you.",
    from: true,
    fee: "$165",
  },
  {
    icon: ShieldCheck,
    name: "White filling",
    time: "30 to 50 minutes",
    text: "Tooth-coloured composite, matched to the tooth. The fee depends on how many surfaces need rebuilding.",
    from: true,
    fee: "$210",
  },
  {
    icon: Sun,
    name: "Whitening",
    time: "Two short visits",
    text: "Custom trays and gel to use at home. We check first that your teeth and gums are ready for it.",
    from: false,
    fee: "$349",
  },
  {
    icon: LifeBuoy,
    name: "Emergency visit",
    time: "Same day where we can",
    text: "Pain, swelling, or a broken or lost tooth. An assessment, one X-ray and a straight answer on what happens next.",
    from: false,
    fee: "$95",
  },
]

const BILLING = [
  {
    icon: Receipt,
    title: "We send the claim",
    text: "Bring your plan details. The claim goes in while you are still in the chair.",
  },
  {
    icon: FileText,
    title: "You see your share first",
    text: "A written estimate before any treatment starts, never a surprise after it.",
  },
  {
    icon: Wallet,
    title: "No plan? Same fees",
    text: "The fees on this page apply. Pay by debit or credit card on the day.",
  },
]

const COMFORTS = [
  {
    icon: Clock,
    title: "Longer appointments",
    text: "We book extra time, so nothing is rushed and there is always room to pause, ask or just breathe.",
  },
  {
    icon: Hand,
    title: "A stop signal",
    text: "Raise your left hand and everything stops. No questions and no sighing, every single time.",
  },
  {
    icon: MessagesSquare,
    title: "Numbing, explained",
    text: "Gel first, then we say what you will feel and for how long, and we wait until it has properly worked.",
  },
  {
    icon: HeartHandshake,
    title: "No lectures",
    text: "Ten years since your last visit? Fine. We start from today, and nobody will ask why.",
  },
]

const FAQS = [
  {
    q: "Do I need a referral, or records from my last dentist?",
    a: "No. You can book directly. If you had X-rays taken somewhere else in the last year, we can ask for them with your permission, so you are not paying for the same pictures twice.",
  },
  {
    q: "What will my first visit cost?",
    a: "The example fee for a new patient exam with X-rays is $149. If you have a plan we bill it directly and tell you your share before you sit down.",
  },
  {
    q: "What if the exam finds something that needs treatment?",
    a: "You get a written plan with a fee beside every item, sorted into now, soon and whenever. You take it home. Nothing is booked on the day unless you ask.",
  },
  {
    q: "I have not been in years. Will I be told off?",
    a: "No. People stay away for all sorts of reasons and none of them are our business. We look at where things are today and plan from there.",
  },
  {
    q: "Do you see children?",
    a: "Yes, from the first tooth. Family appointments can be booked back to back, so it is one trip and one parking spot.",
  },
  {
    q: "What counts as a dental emergency?",
    a: "Pain that keeps you awake, swelling, a knocked-out or broken tooth, or a lost filling that hurts. Call the emergency line and we will tell you honestly whether it can wait until morning.",
  },
]

const FORM_CLASSES = {
  form: "oak-form grid gap-5",
  grid: "grid gap-5 sm:grid-cols-2",
  field: "grid gap-2",
  label: "text-[14px] font-semibold text-[#12332E]",
  input:
    "block min-h-[52px] w-full rounded-[18px] border border-[#9DBFAE] bg-[#EEF5F0] px-4 py-3 text-[16px] text-[#12332E] transition-colors placeholder:text-[#47625C] hover:border-[#12332E] focus:border-[#12332E] focus:bg-white",
  button: `${coral} w-full disabled:opacity-60 sm:w-auto sm:justify-self-start`,
  note: "text-[13.5px] leading-relaxed text-[#47625C]",
  error: "rounded-[18px] bg-[#FBE3DE] px-4 py-3 text-[15px] font-medium text-[#7A2415]",
  success: "rounded-[28px] bg-[#F6E7B4] p-6 text-[17px] leading-relaxed text-[#12332E] sm:p-8",
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function OaklineDentalStudio() {
  return (
    <div
      className={`${display.variable} ${body.variable} oak f-body relative flex-1 overflow-x-clip bg-[#EEF5F0] text-[#12332E]`}
      style={
        {
          "--demo-selection": "#F6E7B4",
          "--demo-selection-text": "#12332E",
          "--demo-focus": "#12332E",
        } as React.CSSProperties
      }
    >
      <ConceptBar industrySlug="healthcare-clinics" industryName="Healthcare & Clinics" />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <SiteHeader mark={<ToothMark />} />

      <main>
        {/* Hero */}
        <section id="top" className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-14">
          <SmileArcs className="right-[-380px] top-[-170px] w-[1100px] text-[#9DBFAE]/60" />
          <div className={`${wrap} relative grid items-start gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:grid-rows-[auto_1fr] lg:gap-y-10`}>
            <div className="lg:pt-8">
              <p className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-[13.5px] font-semibold ring-1 ring-[#9DBFAE]/50">
                <span className="h-2.5 w-2.5 rounded-full bg-[#9DBFAE]" aria-hidden="true" />
                Family dental studio in Whitby, Ontario
              </p>
              <h1 className="f-display mt-6 text-[clamp(2.6rem,6.4vw,5.5rem)] font-medium leading-[1.02]">
                Dentistry that
                <br />
                <Em>explains</Em> itself.
              </h1>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <div className="max-w-[31rem] sm:pb-[88px]">
                  <p className={lead}>
                    We put the X-ray on the screen, say what we see in plain words and show you the fee before anything
                    starts. You always know what is happening, and why.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="#enquire" className={coral}>
                      Book a visit
                      <ArrowRight size={18} aria-hidden="true" />
                    </a>
                    <a href="#treatments" className={quiet}>
                      See example fees
                    </a>
                  </div>
                </div>
                <ToothLine className="mr-8 h-[203px] w-[140px] self-end sm:mr-0 sm:h-[261px] sm:w-[180px] lg:h-[229px] lg:w-[158px] xl:h-[261px] xl:w-[180px]" />
              </div>
            </div>
            <div id="picker" className="relative z-10 scroll-mt-[124px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <AppointmentPicker />
            </div>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15.5px] font-medium lg:col-start-1 lg:row-start-2">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex items-center gap-2.5">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#9DBFAE]/50" aria-hidden="true">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  {promise}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Your first visit */}
        <section id="first-visit" className="scroll-mt-[124px] pb-16 sm:pb-24">
          <div className={wrap}>
            <div className="rounded-[32px] bg-white px-6 py-12 sm:rounded-[40px] sm:px-12 sm:py-16">
              <div className="max-w-[44rem]">
                <Kicker>Your first visit</Kicker>
                <h2 className={h2}>
                  Your first visit, in three <Em>plain</Em> steps.
                </h2>
                <p className={`${lead} mt-5`}>About an hour from hello to goodbye. This is exactly what is in it.</p>
              </div>
              <div className="relative mt-12 md:mt-14">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 600 120"
                  preserveAspectRatio="none"
                  fill="none"
                  className="absolute inset-x-0 top-0 hidden h-[120px] w-full text-[#9DBFAE] md:block"
                >
                  <path
                    d="M0 14C200 118 400 118 600 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <ol className="relative grid gap-9 md:grid-cols-3 md:gap-8">
                  {STEPS.map((step, i) => (
                    <li key={step.title} className="flex gap-5 md:block md:text-center">
                      <span
                        className={`f-display grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#F6E7B4] text-[24px] font-semibold ring-8 ring-white md:mx-auto md:h-16 md:w-16 md:text-[27px] ${
                          i === 1 ? "md:mt-[60px]" : "md:mt-[25px]"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div className="md:mt-7">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#47625C]">{step.when}</p>
                        <h3 className="f-display mt-2 text-[25px] font-medium leading-tight">{step.title}</h3>
                        <p className="mt-3 text-[16px] leading-[1.65] text-[#47625C] md:mx-auto md:max-w-[19rem]">
                          {step.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Treatments and example fees */}
        <section id="treatments" className="scroll-mt-[124px] pb-16 sm:pb-24">
          <div className={wrap}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
              <div className="max-w-[40rem]">
                <Kicker>Treatments and fees</Kicker>
                <h2 className={h2}>
                  What we do, and what it <Em>costs</Em>.
                </h2>
              </div>
              <p className="max-w-[26rem] rounded-[24px] bg-[#F6E7B4] px-5 py-4 text-[15px] leading-relaxed">
                <strong className="font-semibold">These are example fees,</strong> shown for illustration. Your own
                written estimate comes before any treatment.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <article className="relative overflow-hidden rounded-[32px] bg-[#D7E6DD] p-7 sm:p-9 md:col-span-2">
                <SmileArcs className="bottom-[-150px] right-[-170px] w-[620px] text-white/70" />
                <div className="relative grid gap-8 sm:grid-cols-[1.1fr_0.9fr] sm:items-end">
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold">
                      <ScanSearch size={16} aria-hidden="true" />
                      Start here · about 60 minutes
                    </p>
                    <h3 className="f-display mt-6 text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-[1.12]">
                      New patient exam and X-rays
                    </h3>
                    <p className="mt-3 max-w-[26rem] text-[16px] leading-[1.6]">
                      The whole picture in one visit, and a plan you can take home and think about.
                    </p>
                    <p className="mt-7">
                      <span className="block text-[12px] font-semibold uppercase tracking-[0.14em]">Example fee</span>
                      <span className="f-display text-[56px] font-semibold leading-none">$149</span>
                    </p>
                  </div>
                  <div>
                    <ul className="grid gap-2.5 text-[15.5px] font-medium">
                      {[
                        "Full exam of teeth and gums",
                        "Only the X-rays you need",
                        "Photos on screen as we go",
                        "Written plan, fees included",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 rounded-full bg-white/75 py-2.5 pl-3 pr-4">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#12332E] text-white" aria-hidden="true">
                            <Check size={14} strokeWidth={2.5} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a href="#picker" className={`${quiet} mt-5 w-full !bg-white`}>
                      Pick a time for this
                    </a>
                  </div>
                </div>
              </article>

              {TREATMENTS.map((t) => (
                <article key={t.name} className="flex flex-col rounded-[32px] bg-white p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-[#EEF5F0]" aria-hidden="true">
                      <t.icon size={22} strokeWidth={1.75} />
                    </span>
                    <span className="text-right text-[13.5px] font-medium text-[#47625C]">{t.time}</span>
                  </div>
                  <h3 className="f-display mt-6 text-[25px] font-medium leading-tight">{t.name}</h3>
                  <p className="mt-2.5 text-[16px] leading-[1.6] text-[#47625C]">{t.text}</p>
                  <p className="mt-auto pt-7">
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#47625C]">
                      Example fee
                    </span>
                    <span className="f-display text-[40px] font-semibold leading-[1.1]">
                      {t.from && <span className="mr-1.5 text-[17px] font-normal italic">from</span>}
                      {t.fee}
                    </span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Direct billing */}
        <section id="fees" className="scroll-mt-[124px] pb-16 sm:pb-24">
          <div className={wrap}>
            <div className="relative overflow-hidden rounded-[32px] bg-[#F6E7B4] px-6 py-11 sm:rounded-[40px] sm:px-12 sm:py-14">
              <SmileArcs className="left-[-300px] top-[-385px] w-[1000px] text-white/80" />
              <div className="relative grid gap-9 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
                <div>
                  <Kicker tone="text-[#12332E]">Fees and insurance</Kicker>
                  <h2 className={h2}>
                    We bill most insurance plans <Em>directly</Em>.
                  </h2>
                  <p className="mt-5 max-w-[32rem] text-[17px] leading-[1.65] sm:text-[18px]">
                    You pay only the part your plan leaves, and we tell you that number before we start. No forms to post,
                    no waiting to be paid back.
                  </p>
                </div>
                <ul className="grid gap-3">
                  {BILLING.map((item) => (
                    <li key={item.title} className="flex items-start gap-4 rounded-[26px] bg-white/80 p-5">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F6E7B4]" aria-hidden="true">
                        <item.icon size={20} strokeWidth={1.75} />
                      </span>
                      <div>
                        <h3 className="text-[17px] font-semibold">{item.title}</h3>
                        <p className="mt-1 text-[15.5px] leading-[1.55] text-[#47625C]">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Nervous patients */}
        <section id="nervous" className="scroll-mt-[124px] pb-16 sm:pb-24">
          <div className={wrap}>
            <div className="relative overflow-hidden rounded-[32px] bg-[#12332E] px-6 py-12 text-[#EEF5F0] [--demo-focus:#F6E7B4] sm:rounded-[40px] sm:px-12 sm:py-16">
              <SmileArcs className="bottom-[-220px] left-[-300px] w-[1000px] text-[#9DBFAE]/25" />
              <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                <div>
                  <Kicker tone="text-[#9DBFAE]">For nervous patients</Kicker>
                  <h2 className={h2}>
                    Nervous? We do a few things <Em>differently</Em>.
                  </h2>
                  <p className="mt-5 text-[17px] leading-[1.65] text-[#CFE0D7] sm:text-[18px]">
                    Plenty of people would rather be anywhere else. You do not have to explain why. Say so once when you
                    book and it goes on your file, so nobody asks twice.
                  </p>
                  <p className="mt-7 rounded-[24px] bg-[#F6E7B4] px-5 py-4 text-[15.5px] leading-relaxed text-[#12332E]">
                    <strong className="font-semibold">You can start with no treatment at all.</strong> Just the chair, a
                    chat and a look around the room.
                  </p>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {COMFORTS.map((item) => (
                    <li key={item.title} className="rounded-[28px] bg-[#1D433C] p-6 ring-1 ring-[#9DBFAE]/30 sm:p-7">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#9DBFAE] text-[#12332E]" aria-hidden="true">
                        <item.icon size={22} strokeWidth={1.75} />
                      </span>
                      <h3 className="f-display mt-5 text-[23px] font-medium leading-tight">{item.title}</h3>
                      <p className="mt-2.5 text-[15.5px] leading-[1.6] text-[#CFE0D7]">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Hours and location */}
        <section id="hours" className="scroll-mt-[124px] pb-16 sm:pb-24">
          <div className={wrap}>
            <div className="max-w-[44rem]">
              <Kicker>Hours and location</Kicker>
              <h2 className={h2}>
                Open early, open late, open <Em>Saturdays</Em>.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[32px] bg-white p-5 sm:p-9">
                <HoursTable />
                <p className="mt-5 px-1 text-[15px] leading-relaxed text-[#47625C]">
                  Closed on statutory holidays. The last appointment starts 45 minutes before closing.
                </p>
              </div>
              <div className="grid gap-5">
                <div className="relative overflow-hidden rounded-[32px] bg-[#D7E6DD] p-7 sm:p-9">
                  <SmileArcs className="right-[-300px] top-[-130px] w-[560px] text-white/80" />
                  <div className="relative">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white" aria-hidden="true">
                      <MapPin size={22} strokeWidth={1.75} />
                    </span>
                    <h3 className="f-display mt-5 text-[28px] font-medium leading-tight">Downtown Whitby, Ontario</h3>
                    <ul className="mt-4 grid gap-2 text-[16px] leading-snug">
                      <li>Ground floor, with a step-free entrance</li>
                      <li>Free parking right beside the door</li>
                      <li>On a local bus route, a short walk from the stop</li>
                    </ul>
                  </div>
                </div>
                <div className="rounded-[32px] bg-[#F6E7B4] p-7 sm:p-9">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em]">Emergency line</p>
                  <a
                    href="tel:+19055550143"
                    className="f-display mt-2 inline-flex min-h-[48px] items-center text-[clamp(1.9rem,4vw,2.5rem)] font-semibold leading-none underline decoration-[#12332E]/30 decoration-2 underline-offset-[6px] hover:decoration-[#12332E]"
                  >
                    (905) 555-0143
                  </a>
                  <p className="mt-3 text-[15.5px] leading-[1.6]">
                    Answered every day from 7 am to 9 pm, for pain, swelling, or a broken or knocked-out tooth. If
                    swelling is spreading or you are struggling to breathe or swallow, go to the nearest emergency
                    department.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-[124px] pb-16 sm:pb-24">
          <div className={`${wrap} grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
            <div className="lg:sticky lg:top-[140px] lg:self-start">
              <Kicker>Questions</Kicker>
              <h2 className={h2}>
                Questions people ask <Em>first</Em>.
              </h2>
              <p className={`${lead} mt-5`}>
                Something else on your mind? Put it in the booking form, or call{" "}
                <a href="tel:+19055550142" className="whitespace-nowrap font-semibold text-[#12332E] underline underline-offset-4">
                  (905) 555-0142
                </a>
                .
              </p>
            </div>
            <div className="grid gap-3">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group rounded-[28px] bg-white px-5 sm:px-7">
                  <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 rounded-[20px] py-4 text-[17px] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#EEF5F0] transition-transform duration-200 group-open:rotate-45 group-open:bg-[#F6E7B4]"
                      aria-hidden="true"
                    >
                      <Plus size={18} />
                    </span>
                  </summary>
                  <p className="max-w-[40rem] pb-6 pr-6 text-[16px] leading-[1.65] text-[#47625C]">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <section id="enquire" className="scroll-mt-[124px] pb-16 sm:pb-24">
          <div className={wrap}>
            <div className="grid gap-10 rounded-[32px] bg-white px-5 py-10 sm:rounded-[40px] sm:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:p-16">
              <div>
                <Kicker>Book a visit</Kicker>
                <h2 className={h2}>
                  Request a time that <Em>suits</Em> you.
                </h2>
                <p className={`${lead} mt-5`}>
                  Tell us the kind of visit and when works. If you are nervous, say so here and we will plan for it.
                </p>
                <RequestedSlot />
                <ul className="mt-7 grid gap-1 text-[16px] font-medium">
                  <li>
                    <a href="tel:+19055550142" className="inline-flex min-h-[44px] items-center gap-3">
                      <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
                      (905) 555-0142
                    </a>
                  </li>
                  <li>
                    <a href="mailto:hello@oaklinedental.example" className="inline-flex min-h-[44px] items-center gap-3 break-all">
                      <Mail size={18} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
                      hello@oaklinedental.example
                    </a>
                  </li>
                  <li className="flex min-h-[44px] items-center gap-3">
                    <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />
                    Downtown Whitby, Ontario
                  </li>
                </ul>
              </div>
              <DemoForm
                demoName="Oakline Dental Studio"
                industrySlug="healthcare-clinics"
                options={VISIT_TYPES}
                optionsLabel="Type of visit"
                messageLabel="Anything we should know?"
                messagePlaceholder="A day or time that suits you, a tooth that is bothering you, or that you are nervous."
                submitLabel="Send booking request"
                classes={FORM_CLASSES}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="relative overflow-hidden rounded-t-[32px] bg-[#12332E] text-[#EEF5F0] [--demo-focus:#F6E7B4] sm:rounded-t-[40px]">
        <SmileArcs className="right-[-260px] top-[-60px] w-[900px] text-[#9DBFAE]/15" />
        <div className={`${wrap} relative py-14 sm:py-16`}>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
            <div>
              <p className="flex items-center gap-3">
                <ToothMark />
                <span className="f-display text-[26px] font-semibold">Oakline Dental Studio</span>
              </p>
              <p className="mt-5 max-w-[22rem] text-[16px] leading-[1.65] text-[#CFE0D7]">
                A family dental studio in Whitby, Ontario. Fees shown openly, treatment explained plainly.
              </p>
            </div>
            <div>
              <h2 className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#9DBFAE]">Visit</h2>
              <p className="mt-4 text-[16px] leading-[1.8] text-[#CFE0D7]">
                Downtown Whitby, Ontario
                <br />
                Monday to Friday from 8 am
                <br />
                Saturday 9 am to 2 pm
              </p>
            </div>
            <div>
              <h2 className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#9DBFAE]">Contact</h2>
              <ul className="mt-2 text-[16px]">
                <li>
                  <a href="tel:+19055550142" className="inline-flex min-h-[44px] items-center hover:underline">
                    (905) 555-0142
                  </a>
                </li>
                <li>
                  <a href="tel:+19055550143" className="inline-flex min-h-[44px] items-center hover:underline">
                    (905) 555-0143, emergencies
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@oaklinedental.example" className="inline-flex min-h-[44px] items-center break-all hover:underline">
                    hello@oaklinedental.example
                  </a>
                </li>
              </ul>
            </div>
            <nav aria-label="Footer">
              <h2 className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#9DBFAE]">On this page</h2>
              <ul className="mt-2 text-[16px]">
                {[
                  ["#treatments", "Treatments"],
                  ["#fees", "Fees and insurance"],
                  ["#first-visit", "First visit"],
                  ["#hours", "Hours"],
                  ["#enquire", "Book a visit"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="inline-flex min-h-[44px] items-center hover:underline">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p className="mt-12 border-t border-[#9DBFAE]/30 pt-6 text-[14px] leading-relaxed text-[#CFE0D7]">
            Oakline Dental Studio is an invented business in a concept build by Hijaz.ai. The fees, hours and
            appointment times on this page are examples.
          </p>
        </div>
      </footer>
    </div>
  )
}
