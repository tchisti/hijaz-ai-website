"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Bath, BedDouble, Ruler } from "lucide-react"
import HouseArt, { type HouseKind } from "./HouseArt"

type Kind = "Detached" | "Townhouse" | "Condo"

interface Listing {
  no: string
  art: HouseKind
  area: string
  town: string
  kind: Kind
  style: string
  beds: number
  baths: number
  sqft: number
  price: number
  note: string
}

const LISTINGS: Listing[] = [
  { no: "01", art: "bungalow", area: "Lynde Creek", town: "Whitby", kind: "Detached", style: "Brick bungalow", beds: 3, baths: 2, sqft: 1480, price: 899000, note: "A low brick bungalow on a deep lot, two streets from the creek trail." },
  { no: "02", art: "detached", area: "Pickering Village", town: "Ajax", kind: "Detached", style: "Two-storey detached", beds: 4, baths: 3, sqft: 2640, price: 1285000, note: "Four bedrooms, a bay window that catches the morning and a double garage." },
  { no: "03", art: "townhouses", area: "Windfields", town: "Oshawa", kind: "Townhouse", style: "Freehold townhouse", beds: 3, baths: 3, sqft: 1720, price: 749000, note: "The middle home of three, with a finished lower level and no monthly fees." },
  { no: "04", art: "lakeside", area: "Frenchman's Bay", town: "Pickering", kind: "Detached", style: "Lakeside modern", beds: 4, baths: 4, sqft: 3150, price: 2150000, note: "Glass on the water side, cedar on the street side and a dock at the end of the garden." },
  { no: "05", art: "condo", area: "Port Whitby", town: "Whitby", kind: "Condo", style: "Corner condominium", beds: 2, baths: 2, sqft: 940, price: 629000, note: "A corner suite on the ninth floor, a short walk from the harbour and the train." },
  { no: "06", art: "farmhouse", area: "Scugog Island", town: "Port Perry", kind: "Detached", style: "Century farmhouse", beds: 4, baths: 2, sqft: 2280, price: 1675000, note: "A restored farmhouse and its barn, on ten acres of pasture and maple bush." },
]

const FILTERS = ["All", "Detached", "Townhouse", "Condo"] as const
type Filter = (typeof FILTERS)[number]

const cad = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 })
const count = (f: Filter) => (f === "All" ? LISTINGS.length : LISTINGS.filter((l) => l.kind === f).length)

export default function Listings() {
  const [filter, setFilter] = useState<Filter>("All")
  const reduce = useReducedMotion()
  const shown = filter === "All" ? LISTINGS : LISTINGS.filter((l) => l.kind === filter)
  const spec = "flex items-center justify-center gap-2 whitespace-nowrap px-1 py-3 text-[14px] font-normal"
  const icon = { "aria-hidden": true, size: 16, strokeWidth: 1.25 } as const

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-[#161412]/20 pb-6">
        <div role="group" aria-label="Filter listings by type" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = f === filter
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={`inline-flex min-h-[44px] items-center gap-2 border px-5 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors ${
                  active
                    ? "border-[#161412] bg-[#161412] text-[#F6F2EA]"
                    : "border-[#161412]/35 text-[#161412] hover:border-[#9A7B3F] hover:bg-[#D9D2C5]/50"
                }`}
              >
                {f}
                <span className="tracking-normal opacity-70">{count(f)}</span>
              </button>
            )
          })}
        </div>
        <p aria-live="polite" className="text-[14px] font-normal text-[#514B43]">
          Showing {shown.length} of {LISTINGS.length} homes{filter === "All" ? "" : `, ${filter.toLowerCase()} only`}
        </p>
      </div>

      <ul className="relative mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((l) => (
            <motion.li
              key={l.no}
              layout={!reduce}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.2, 0.7, 0.2, 1] }}
              className="lg:[&:nth-child(3n+2)]:mt-14"
            >
              <article className="group flex h-full flex-col">
                <div className="relative bg-[#D9D2C5] px-5 pb-3 pt-12">
                  <p className="absolute inset-x-5 top-4 flex justify-between text-[10px] font-medium uppercase tracking-[0.26em]">
                    <span>No. {l.no}</span>
                    <span>{l.kind}</span>
                  </p>
                  <HouseArt kind={l.art} className="h-auto w-full transition-transform duration-700 group-hover:-translate-y-1" />
                </div>

                <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.24em] text-[#514B43]">
                  {l.town} <span aria-hidden="true">/</span> {l.style}
                </p>
                <h3 className="f-display mt-2 text-[34px] font-medium leading-[1.05]">{l.area}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-[#514B43]">{l.note}</p>

                <dl className="mt-5 grid grid-cols-[1fr_1fr_1.35fr] divide-x divide-[#161412]/20 border-y border-[#161412]/20">
                  <div>
                    <dt className="sr-only">Bedrooms</dt>
                    <dd className={spec}>
                      <BedDouble {...icon} />
                      {l.beds} bed
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Bathrooms</dt>
                    <dd className={spec}>
                      <Bath {...icon} />
                      {l.baths} bath
                    </dd>
                  </div>
                  <div>
                    <dt className="sr-only">Floor area</dt>
                    <dd className={spec}>
                      <Ruler {...icon} />
                      {l.sqft.toLocaleString("en-CA")} sq ft
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 pt-5">
                  <p>
                    <span className="block text-[10px] font-medium uppercase tracking-[0.26em] text-[#514B43]">Asking, CAD</span>
                    <span className="f-display text-[32px] font-semibold leading-tight">{cad.format(l.price)}</span>
                  </p>
                  <a
                    href="#enquire"
                    aria-label={`Arrange a viewing of the ${l.style.toLowerCase()} in ${l.area}, ${l.town}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] underline decoration-[#9A7B3F] decoration-1 underline-offset-[7px] hover:decoration-2"
                  >
                    Arrange a viewing
                    <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.25} />
                  </a>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  )
}
