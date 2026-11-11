import type { Metadata } from "next"
import type { CSSProperties, ReactNode } from "react"
import { Cormorant_Garamond, Jost } from "next/font/google"
import { ArrowDown, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import ConceptBar from "@/components/demos/ConceptBar"
import DemoForm from "@/components/demos/DemoForm"
import { DurhamSketch, HeroHouse } from "@/components/demos/real-estate/HouseArt"
import Listings from "@/components/demos/real-estate/Listings"
import MortgageCalculator from "@/components/demos/real-estate/MortgageCalculator"
import SiteHeader from "@/components/demos/real-estate/SiteHeader"

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--f-display", display: "swap" })
const body = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--f-body", display: "swap" })

export const metadata: Metadata = {
  title: "Kestrel & Rowe Realty | Homes in Whitby and Durham Region (concept)",
  description:
    "Concept site for an invented boutique brokerage in Whitby, Ontario: illustrated listings, a Durham Region neighbourhood guide, a four-step selling timeline and a mortgage payment calculator.",
}

/* Palette: paper #F6F2EA, ink #161412, brass #9A7B3F, stone #D9D2C5, deep green #1F3A34 */
const WRAP = "mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12"
const LABEL = "text-[11px] font-medium uppercase tracking-[0.26em]"
const H2 = "f-display text-[clamp(2.4rem,5.6vw,4.5rem)] font-medium leading-[1.02]"
const LEAD = "text-[17px] leading-[1.7] text-[#514B43] sm:text-[18px]"
const EM = "italic text-[#9A7B3F]"
const BUTTON =
  "inline-flex min-h-[52px] items-center justify-center gap-3 bg-[#161412] px-8 text-[12px] font-medium uppercase tracking-[0.22em] text-[#F6F2EA] transition-colors hover:bg-[#1F3A34]"
const TEXT_LINK =
  "inline-flex min-h-[52px] items-center gap-2 text-[12px] font-medium uppercase tracking-[0.22em] underline decoration-[#9A7B3F] decoration-1 underline-offset-[8px] hover:decoration-2"

const css = `
.kr-art * { vector-effect: non-scaling-stroke; }
@media (prefers-reduced-motion: no-preference) {
  .kr-draw * { stroke-dasharray: 900; stroke-dashoffset: 900; animation: kr-draw 2.6s cubic-bezier(.3,0,.2,1) .3s forwards; }
  .kr-draw .kr-fill { fill-opacity: 0; animation: kr-draw 2.6s cubic-bezier(.3,0,.2,1) .3s forwards, kr-ink .9s ease 1.6s forwards; }
  .kr-rise { animation: kr-rise .9s cubic-bezier(.2,.7,.2,1) both; }
  @keyframes kr-draw { to { stroke-dashoffset: 0; } }
  @keyframes kr-ink { to { fill-opacity: 1; } }
  @keyframes kr-rise { from { opacity: 0; transform: translateY(14px); } }
}
`

const FACTS = [
  ["Office", "Whitby, Ontario. Visits by appointment."],
  ["Territory", "Pickering to Bowmanville, and north to Port Perry."],
  ["Homes", "Detached, townhouse, condominium and rural."],
]

const PRACTICE = [
  ["One point of contact", "The person who values your home is the person who answers the phone on offer night."],
  ["A short list", "We keep the list of homes we represent short on purpose, so each one gets a proper launch."],
  ["Reasons in writing", "Every price we suggest comes with the reasoning behind it, on paper, before you sign anything."],
]

const TOWNS = [
  ["Whitby", "A harbour at the bottom, a village green at the top in Brooklin, and brick century homes on the old streets between. We live here, so we are biased.", "Century brick, harbour condominiums, family streets"],
  ["Ajax", "Built in a hurry in the 1940s and softened ever since. The lakefront is parkland from one end of town to the other, which is rarer than it sounds.", "Wartime bungalows, lakeside townhouses"],
  ["Pickering", "The nearest to Toronto, and it knows it. Commuters by the station, sailboats in Frenchman's Bay and working farms a short drive north.", "Bayside rebuilds, commuter condominiums"],
  ["Oshawa", "A motor city well into its second act, with a university on the hill and solid post-war bungalows that a first-time buyer can still reach.", "Post-war bungalows, new townhouses"],
  ["Bowmanville", "A small town that still behaves like one: a main street with a bakery on it, orchards at the edge and new streets filling the fields.", "Victorian main-street homes, newer subdivisions"],
  ["Port Perry", "Victorian storefronts on Queen Street and Lake Scugog at the end of it. People come for a Sunday and start asking about listings.", "Heritage homes, lake cottages, hobby farms"],
]

const STEPS = [
  ["Valuation", "Week one", "We walk the house with you, study what has sold on nearby streets and give you a price range in writing, with our reasoning."],
  ["Preparation", "Weeks two and three", "A short list of repairs worth doing and a longer list of ones that are not. Then staging, floor plans and the line drawing."],
  ["Launch", "Week four", "The listing goes out on a weekday morning. Showings are booked through one person who knows the house and its quirks."],
  ["Offers", "When they arrive", "We bring every offer to you in person, explain each condition in plain English and negotiate until the terms suit you."],
]

function Eyebrow({ no, children, dark = false }: { no: string; children: ReactNode; dark?: boolean }) {
  return (
    <p className={`${LABEL} flex items-center gap-4 border-t pt-5 ${dark ? "border-[#F6F2EA]/30" : "border-[#161412]/20"}`}>
      <span className={`f-display text-[26px] font-medium normal-case italic leading-none tracking-normal ${dark ? "text-[#C9AE78]" : "text-[#9A7B3F]"}`}>
        No. {no}
      </span>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
      {children}
    </p>
  )
}

export default function RealEstateDemo() {
  return (
    <>
      <ConceptBar industrySlug="real-estate" industryName="Real Estate & Property" />
      <div
        className={`${display.variable} ${body.variable} f-body flex flex-1 flex-col bg-[#F6F2EA] font-light text-[#161412]`}
        style={{ "--demo-selection": "#1F3A34", "--demo-selection-text": "#F6F2EA", "--demo-focus": "#9A7B3F" } as CSSProperties}
      >
        <style>{css}</style>
        <SiteHeader />

        <main className="flex-1">
          {/* Hero */}
          <section id="top" aria-labelledby="hero-title" className="scroll-mt-[99px]">
            <div className={`${WRAP} grid gap-x-8 gap-y-12 pb-16 pt-12 lg:grid-cols-12 lg:pb-24 lg:pt-20`}>
              <div className="lg:col-span-7">
                <p className={`${LABEL} kr-rise flex items-center gap-4`}>
                  <span aria-hidden="true" className="h-px w-10 bg-[#9A7B3F]" />
                  Residential brokerage, Whitby, Ontario
                </p>
                <h1
                  id="hero-title"
                  className="f-display kr-rise mt-8 text-[clamp(2.9rem,6.6vw,6.25rem)] font-medium leading-[0.96]"
                  style={{ animationDelay: "90ms" }}
                >
                  Buying and selling in Durham Region, without the <em className={EM}>noise</em>.
                </h1>
                <p className={`${LEAD} kr-rise mt-8 max-w-[34rem]`} style={{ animationDelay: "180ms" }}>
                  Kestrel &amp; Rowe is a small residential brokerage in Whitby. We represent a short list of homes at a time, from the
                  lakeshore in Pickering to the main street in Port Perry, and we stay with each one from the first valuation to the day
                  the keys change hands.
                </p>
                <div className="kr-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-3" style={{ animationDelay: "270ms" }}>
                  <a href="#listings" className={BUTTON}>
                    View the listings
                    <ArrowDown aria-hidden="true" size={15} strokeWidth={1.5} />
                  </a>
                  <a href="#enquire" className={TEXT_LINK}>
                    Request a valuation
                    <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              <figure className="lg:col-span-5 lg:mt-24">
                <div className="relative bg-[#D9D2C5] px-5 pb-2 pt-12 sm:px-8">
                  <p className="absolute inset-x-5 top-5 flex justify-between text-[10px] font-medium uppercase tracking-[0.26em] sm:inset-x-8">
                    <span>Plate I</span>
                    <span>Front elevation</span>
                  </p>
                  <HeroHouse className="mx-auto h-auto w-full max-w-[560px]" />
                </div>
                <figcaption className="mt-4 flex items-baseline gap-4 text-[14px] leading-relaxed text-[#514B43]">
                  <span className="f-display shrink-0 whitespace-nowrap text-[18px] italic leading-snug text-[#161412]">Fig. 1</span>
                  A brick four-square of the kind that lines the old streets of Whitby. Our listings are drawn, not photographed.
                </figcaption>
              </figure>

              <dl className="grid border-t border-[#161412]/20 sm:grid-cols-3 lg:col-span-12">
                {FACTS.map(([term, text]) => (
                  <div key={term} className="border-b border-[#161412]/20 py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                    <dt className={LABEL}>{term}</dt>
                    <dd className="mt-2 text-[16px] leading-relaxed text-[#514B43]">{text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* The practice */}
          <section aria-labelledby="practice-title" className="border-y border-[#161412]/20">
            <div className={`${WRAP} grid gap-x-8 gap-y-10 py-16 lg:grid-cols-12 lg:py-20`}>
              <h2 id="practice-title" className="f-display text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.05] lg:col-span-4">
                A practice, not a <em className={EM}>pipeline</em>.
              </h2>
              <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-3 lg:col-span-8">
                {PRACTICE.map(([title, text], i) => (
                  <li key={title}>
                    <span aria-hidden="true" className="f-display text-[26px] italic leading-none text-[#9A7B3F]">
                      {["i", "ii", "iii"][i]}.
                    </span>
                    <h3 className="mt-3 text-[12px] font-medium uppercase !tracking-[0.22em]">{title}</h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-[#514B43]">{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* No. 01 Listings */}
          <section id="listings" aria-labelledby="listings-title" className="scroll-mt-[99px]">
            <div className={`${WRAP} py-20 lg:py-28`}>
              <Eyebrow no="01">Listings</Eyebrow>
              <div className="mb-12 mt-10 grid gap-x-8 gap-y-6 lg:mb-16 lg:grid-cols-12">
                <h2 id="listings-title" className={`${H2} lg:col-span-7`}>
                  Six homes for sale, drawn in <em className={EM}>ink</em>.
                </h2>
                <p className={`${LEAD} lg:col-span-4 lg:col-start-9 lg:pt-3`}>
                  We do not photograph a home until it is ready to be seen. Until then, each listing is introduced by a line drawing of
                  its front elevation and the plain facts.
                </p>
              </div>
              <Listings />
            </div>
          </section>

          {/* No. 02 Neighbourhood guide */}
          <section id="neighbourhoods" aria-labelledby="towns-title" className="scroll-mt-[99px] border-t border-[#161412]/20">
            <div className={`${WRAP} grid gap-x-8 gap-y-12 py-20 lg:grid-cols-12 lg:py-28`}>
              <div className="flex flex-col lg:col-span-5">
                <div className="flex-1">
                  <div className="lg:sticky lg:top-[122px]">
                    <Eyebrow no="02">Neighbourhood guide</Eyebrow>
                    <h2 id="towns-title" className={`${H2} mt-10`}>
                      Six towns, described <em className={EM}>honestly</em>.
                    </h2>
                    <p className={`${LEAD} mt-6 max-w-[30rem]`}>
                      Durham Region runs along Lake Ontario east of Toronto and north into farm country. These are the places we know
                      street by street.
                    </p>
                  </div>
                </div>
                <figure className="mt-12 max-w-[26rem]">
                  <div className="bg-[#D9D2C5] p-5">
                    <DurhamSketch className="h-auto w-full" />
                  </div>
                  <figcaption className="mt-3 flex items-baseline gap-4 text-[14px] leading-relaxed text-[#514B43]">
                    <span className="f-display shrink-0 whitespace-nowrap text-[18px] italic text-[#161412]">Fig. 2</span>
                    Durham Region, roughly, and not to scale. Our office is the brass dot.
                  </figcaption>
                </figure>
              </div>

              <ol className="border-b border-[#161412]/20 lg:col-span-6 lg:col-start-7">
                {TOWNS.map(([town, note, homes], i) => (
                  <li key={town} className="grid grid-cols-[2.75rem_1fr] gap-x-3 border-t border-[#161412]/20 py-8 sm:grid-cols-[4.5rem_1fr]">
                    <span aria-hidden="true" className="f-display pt-1 text-[26px] italic leading-none text-[#9A7B3F]">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="f-display text-[clamp(2.1rem,4vw,3.1rem)] font-medium leading-none">{town}</h3>
                      <p className="mt-4 text-[17px] leading-[1.65] text-[#514B43]">{note}</p>
                      <p className="mt-4 text-[11px] font-medium uppercase leading-relaxed tracking-[0.2em]">{homes}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* No. 03 Selling with us: the one dark section */}
          <section id="selling" aria-labelledby="selling-title" className="scroll-mt-[99px] bg-[#1F3A34] text-[#F6F2EA]">
            <div className={`${WRAP} py-20 lg:py-28`}>
              <Eyebrow no="03" dark>
                Selling with us
              </Eyebrow>
              <div className="mt-10 grid gap-x-8 gap-y-6 lg:grid-cols-12">
                <h2 id="selling-title" className={`${H2} lg:col-span-7`}>
                  A sale in four <em className="italic text-[#C9AE78]">unhurried</em> steps.
                </h2>
                <p className="text-[17px] leading-[1.7] text-[#F6F2EA]/85 sm:text-[18px] lg:col-span-4 lg:col-start-9 lg:pt-3">
                  Most of the work happens before the sign goes up. This is the order we do it in, and roughly how long each part takes.
                </p>
              </div>

              <ol className="mt-14 md:mt-20 md:grid md:grid-cols-4">
                {STEPS.map(([title, when, text], i) => (
                  <li key={title} className="relative border-l border-[#F6F2EA]/30 pb-12 pl-7 last:pb-0 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pr-8 md:pt-9">
                    <span aria-hidden="true" className="absolute -left-[5px] top-0 h-[9px] w-[9px] rounded-full bg-[#9A7B3F] ring-4 ring-[#1F3A34] md:-top-[5px] md:left-0" />
                    <p className={`${LABEL} -mt-1 text-[#C9AE78] md:mt-0`}>{when}</p>
                    <h3 className="f-display mt-4 flex items-baseline gap-4 text-[clamp(2rem,3vw,2.6rem)] font-medium leading-none">
                      <span aria-hidden="true" className="text-[22px] italic text-[#C9AE78]">0{i + 1}</span>
                      {title}
                    </h3>
                    <p className="mt-4 max-w-[26rem] text-[16px] leading-[1.65] text-[#F6F2EA]/85">{text}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-[#F6F2EA]/30 pt-8">
                <p className="f-display text-[clamp(1.5rem,2.6vw,2rem)] italic leading-snug">It starts with a conversation and a walk through the house.</p>
                <a
                  href="#enquire"
                  className="inline-flex min-h-[52px] items-center gap-3 bg-[#F6F2EA] px-8 text-[12px] font-medium uppercase tracking-[0.22em] text-[#161412] transition-colors hover:bg-[#D9D2C5]"
                >
                  Book a valuation
                  <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </section>

          {/* No. 04 Mortgage calculator */}
          <section id="calculator" aria-labelledby="calc-title" className="scroll-mt-[99px]">
            <div className={`${WRAP} grid gap-x-8 gap-y-12 py-20 lg:py-28 xl:grid-cols-12`}>
              <div className="max-w-[40rem] xl:col-span-4">
                <Eyebrow no="04">Mortgage calculator</Eyebrow>
                <h2 id="calc-title" className={`${H2} mt-10`}>
                  What would it cost each <em className={EM}>month</em>?
                </h2>
                <p className={`${LEAD} mt-6`}>
                  Move the numbers until the payment looks like something you could live with. Then call us, and we will tell you what
                  that budget buys in each town.
                </p>
              </div>
              <div className="xl:col-span-8 xl:pt-[4.5rem]">
                <MortgageCalculator />
              </div>
            </div>
          </section>

          {/* No. 05 Home valuation request */}
          <section id="enquire" aria-labelledby="enquire-title" className="scroll-mt-[99px] border-t border-[#161412]/20">
            <div className={`${WRAP} grid gap-x-8 gap-y-12 py-20 lg:grid-cols-12 lg:py-28`}>
              <div className="lg:col-span-5">
                <Eyebrow no="05">Home valuation</Eyebrow>
                <h2 id="enquire-title" className={`${H2} mt-10`}>
                  Curious what your home is <em className={EM}>worth</em>?
                </h2>
                <p className={`${LEAD} mt-6 max-w-[30rem]`}>
                  Tell us a little about the property. We arrange a visit, walk through it with you and send a written price range with
                  our reasoning. There is no charge and no obligation to list.
                </p>
                <ul className="mt-10 max-w-[30rem] border-b border-[#161412]/20 text-[17px]">
                  <li className="border-t border-[#161412]/20">
                    <a href="tel:+19055550116" className="flex min-h-[56px] items-center gap-4 font-normal">
                      <Phone aria-hidden="true" size={17} strokeWidth={1.25} className="text-[#9A7B3F]" />
                      (905) 555-0116
                    </a>
                  </li>
                  <li className="border-t border-[#161412]/20">
                    <a href="mailto:homes@kestrelrowe.example" className="flex min-h-[56px] items-center gap-4 break-all font-normal">
                      <Mail aria-hidden="true" size={17} strokeWidth={1.25} className="shrink-0 text-[#9A7B3F]" />
                      homes@kestrelrowe.example
                    </a>
                  </li>
                  <li className="flex min-h-[56px] items-center gap-4 border-t border-[#161412]/20">
                    <MapPin aria-hidden="true" size={17} strokeWidth={1.25} className="shrink-0 text-[#9A7B3F]" />
                    Whitby, Ontario. Monday to Saturday, by appointment.
                  </li>
                </ul>
              </div>

              <div className="border border-[#161412]/20 p-6 sm:p-10 lg:col-span-6 lg:col-start-7">
                <DemoForm
                  demoName="Kestrel & Rowe Realty"
                  industrySlug="real-estate"
                  options={["Selling", "Buying", "Both", "Curious what my home is worth"]}
                  optionsLabel="I am"
                  messageLabel="About the property"
                  messagePlaceholder="The town or neighbourhood, the type of home and anything you would like us to know."
                  submitLabel="Request a valuation"
                  classes={{
                    form: "space-y-7",
                    grid: "grid gap-x-8 gap-y-7 sm:grid-cols-2",
                    field: "flex flex-col gap-1",
                    label: `${LABEL} text-[#161412]`,
                    input:
                      "w-full min-h-[48px] rounded-none border-0 border-b border-[#161412]/55 bg-transparent px-0 py-2 text-[17px] font-normal text-[#161412] placeholder:text-[#6B655C]",
                    button: `${BUTTON} w-full disabled:opacity-60 sm:w-auto`,
                    note: "text-[14px] leading-relaxed text-[#514B43]",
                    error: "border-l-2 border-[#9A7B3F] pl-4 text-[15px] font-normal text-[#161412]",
                    success: "f-display border-t border-[#9A7B3F] pt-6 text-[26px] leading-snug text-[#161412]",
                  }}
                />
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t-2 border-[#161412]">
          <div className={`${WRAP} pb-10 pt-14`}>
            <p className="f-display text-[clamp(2.6rem,9.5vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.015em]">
              Kestrel <em className={EM}>&amp;</em> Rowe
            </p>
            <div className="mt-12 grid gap-10 border-t border-[#161412]/20 pt-8 text-[16px] sm:grid-cols-3">
              <div>
                <p className={LABEL}>Office</p>
                <p className="mt-3 leading-relaxed text-[#514B43]">
                  Kestrel &amp; Rowe Realty
                  <br />
                  Whitby, Ontario
                  <br />
                  Serving Durham Region
                </p>
              </div>
              <div>
                <p className={LABEL}>Contact</p>
                <p className="mt-1">
                  <a href="tel:+19055550116" className="flex min-h-[44px] items-center font-normal underline decoration-[#9A7B3F] decoration-1 underline-offset-[6px]">
                    (905) 555-0116
                  </a>
                  <a href="mailto:homes@kestrelrowe.example" className="flex min-h-[44px] items-center break-all font-normal underline decoration-[#9A7B3F] decoration-1 underline-offset-[6px]">
                    homes@kestrelrowe.example
                  </a>
                </p>
              </div>
              <nav aria-label="Footer">
                <p className={LABEL}>On this page</p>
                <ul className="mt-1 grid grid-cols-2">
                  {["Listings", "Neighbourhoods", "Selling", "Calculator", "Enquire"].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase()}`} className="flex min-h-[44px] items-center text-[#514B43] hover:text-[#161412]">
                        {item === "Enquire" ? "Contact" : item}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <p className="mt-12 border-t border-[#161412]/20 pt-6 text-[14px] leading-relaxed text-[#514B43]">
              Kestrel &amp; Rowe Realty is an invented business. This is a concept site designed and built by Hijaz.ai. The listings,
              prices and drawings are illustrative and are not offers of real property.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
