"use client"

/**
 * Shipment tracker for the Corridor Freight Lines concept build.
 * Everything here is hard-coded sample data held in React state: no network.
 */

import { useId, useState } from "react"
import { ArrowRight, Search, TriangleAlert } from "lucide-react"

const STEPS = ["Picked up", "At terminal", "In transit", "Out for delivery", "Delivered"] as const

interface Shipment {
  id: string
  service: string
  origin: string
  destination: string
  pieces: string
  weight: string
  /** Index into STEPS of the current step */
  step: number
  /** Share of the trip completed, 0 to 100 */
  progress: number
  note: string
  /** One entry per step: where it happens and when (an estimate if the step is still ahead) */
  events: { place: string; time: string }[]
}

const SHIPMENTS: Shipment[] = [
  {
    id: "CFL-204817",
    service: "LTL",
    origin: "Oshawa, ON",
    destination: "Montreal, QC",
    pieces: "6 skids",
    weight: "4,180 lb",
    step: 2,
    progress: 58,
    note: "On the overnight linehaul and running to schedule.",
    events: [
      { place: "Shipper dock, Oshawa", time: "MON 14:20" },
      { place: "Oshawa cross-dock, door 06", time: "MON 16:05" },
      { place: "Left Oshawa 21:30, last scan Kingston", time: "MON 23:55" },
      { place: "Local delivery truck, Montreal", time: "TUE 08:30" },
      { place: "Consignee dock, Montreal", time: "TUE 11:00" },
    ],
  },
  {
    id: "CFL-198342",
    service: "LTL",
    origin: "Windsor, ON",
    destination: "Kingston, ON",
    pieces: "9 skids",
    weight: "7,920 lb",
    step: 4,
    progress: 100,
    note: "Delivered. The signed proof of delivery was emailed to the shipper.",
    events: [
      { place: "Shipper dock, Windsor", time: "WED 13:40" },
      { place: "Oshawa cross-dock, door 03", time: "WED 19:25" },
      { place: "East linehaul out of Oshawa", time: "WED 21:30" },
      { place: "Local delivery truck, Kingston", time: "THU 07:45" },
      { place: "Signed for at receiving, Kingston", time: "THU 10:12" },
    ],
  },
  {
    id: "CFL-211056",
    service: "LTL",
    origin: "London, ON",
    destination: "Ottawa, ON",
    pieces: "2 skids",
    weight: "1,260 lb",
    step: 1,
    progress: 34,
    note: "Scanned and weighed at Oshawa. Loading for tonight's east linehaul.",
    events: [
      { place: "Shipper dock, London", time: "TUE 11:15" },
      { place: "Oshawa cross-dock, door 09", time: "TUE 15:50" },
      { place: "East linehaul out of Oshawa", time: "TUE 21:30" },
      { place: "Local delivery truck, Ottawa", time: "WED 08:00" },
      { place: "Consignee dock, Ottawa", time: "WED 12:00" },
    ],
  },
]

type Result = { kind: "found"; shipment: Shipment } | { kind: "missing"; query: string } | { kind: "empty" }

/** "204817", "cfl204817" and " cfl-204817 " all become "CFL-204817" */
function normalise(raw: string) {
  const value = raw.trim().toUpperCase().replace(/\s+/g, "")
  return value.replace(/^(?:CFL-?)?(\d{6})$/, "CFL-$1")
}

const city = (place: string) => place.split(",")[0]

export default function ShipmentTracker() {
  const inputId = useId()
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<Result>({ kind: "found", shipment: SHIPMENTS[0] })

  function track(raw: string) {
    const number = normalise(raw)
    const shipment = SHIPMENTS.find((s) => s.id === number)
    if (!number) setResult({ kind: "empty" })
    else if (shipment) setResult({ kind: "found", shipment })
    else setResult({ kind: "missing", query: number })
  }

  return (
    <div className="border border-[#2C3138] bg-[#181B1F]">
      <div className="flex items-center justify-between gap-3 border-b border-[#2C3138] px-4 py-3 sm:px-6">
        <h2 className="f-mono text-[12px] font-bold uppercase tracking-[0.16em] text-white">Track a shipment</h2>
        <p className="f-mono border border-[#FFD60A] px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-[#FFD60A]">
          Sample data
        </p>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          track(query)
        }}
        className="px-4 pt-5 sm:px-6"
      >
        <label htmlFor={inputId} className="f-mono block text-[11px] uppercase tracking-[0.14em] text-[#8A9099]">
          Shipment number
        </label>
        <div className="mt-2 flex">
          <input
            id={inputId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="CFL-204817"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={16}
            className="f-mono h-14 min-w-0 flex-1 rounded-none border border-r-0 border-[#4A5059] bg-[#0F1113] px-4 text-[18px] uppercase tracking-[0.06em] text-white placeholder:text-[#8A9099]"
          />
          <button
            type="submit"
            className="f-display flex h-14 shrink-0 items-center gap-2 bg-[#FFD60A] px-5 text-[20px] font-bold uppercase tracking-[0.04em] text-[#0F1113] transition-colors hover:bg-white sm:px-7"
          >
            <Search aria-hidden="true" className="h-5 w-5" strokeWidth={2.5} />
            Track
          </button>
        </div>
      </form>

      <div className="flex flex-wrap items-center gap-2 px-4 pt-4 sm:px-6">
        <p className="f-mono w-full text-[11px] uppercase tracking-[0.14em] text-[#8A9099] sm:mr-1 sm:w-auto">
          Try a sample number
        </p>
        <div className="grid w-full grid-cols-3 gap-1.5 sm:flex sm:w-auto sm:gap-2">
          {SHIPMENTS.map((s) => {
            const active = result.kind === "found" && result.shipment.id === s.id
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setQuery(s.id)
                  track(s.id)
                }}
                className={`f-mono min-h-[44px] border px-1 text-[12px] transition-colors sm:px-3 sm:text-[13px] sm:tracking-[0.04em] ${
                  active
                    ? "border-white bg-white text-[#0F1113]"
                    : "border-[#4A5059] text-white hover:border-[#FFD60A] hover:text-[#FFD60A]"
                }`}
              >
                {s.id}
              </button>
            )
          })}
        </div>
      </div>

      <div aria-live="polite" className="mt-5 border-t border-[#2C3138]">
        {result.kind === "found" ? (
          <Found s={result.shipment} />
        ) : (
          <div className="flex gap-4 px-4 py-6 sm:px-6">
            <TriangleAlert aria-hidden="true" className="mt-0.5 h-6 w-6 shrink-0 text-[#FFD60A]" />
            <div className="min-w-0">
              <p className="f-display text-[26px] font-bold uppercase leading-none">
                {result.kind === "empty" ? "Enter a shipment number" : "Shipment not found"}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                {result.kind === "missing" && (
                  <>
                    Nothing on file for <span className="f-mono break-all text-white">{result.query}</span>.{" "}
                  </>
                )}
                This tracker runs on sample data only, so try a sample number:{" "}
                <span className="f-mono text-white">{SHIPMENTS.map((s) => s.id).join(", ")}</span>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Found({ s }: { s: Shipment }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-6 px-4 py-5 sm:px-6 sm:py-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      <div>
        <p className="f-mono flex flex-wrap justify-between gap-x-4 text-[13px] text-[#8A9099]">
          <span>{s.id}</span>
          <span className="font-bold uppercase tracking-[0.1em] text-white">{STEPS[s.step]}</span>
        </p>
        <p className="f-display mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[clamp(1.75rem,4vw,2.375rem)] font-bold uppercase leading-none">
          <span>
            <span className="sr-only">From </span>
            {s.origin}
          </span>
          <ArrowRight aria-hidden="true" className="h-6 w-6 text-[#8A9099]" strokeWidth={3} />
          <span>
            <span className="sr-only">to </span>
            {s.destination}
          </span>
        </p>

        <div className="mt-5">
          <div
            role="progressbar"
            aria-label={`Trip progress for ${s.id}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={s.progress}
            className="h-3 border border-[#4A5059] bg-[#0F1113]"
          >
            <div
              className="h-full bg-[#FFD60A] motion-safe:transition-[width] motion-safe:duration-700 motion-safe:ease-out"
              style={{ width: `${s.progress}%` }}
            />
          </div>
          <p className="f-mono mt-2 flex justify-between gap-2 text-[11px] uppercase tracking-[0.1em] text-[#8A9099]">
            <span>{city(s.origin)}</span>
            <span className="text-white">{s.progress}% of trip</span>
            <span>{city(s.destination)}</span>
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-3 border border-[#2C3138]">
          {[
            ["Pieces", s.pieces],
            ["Weight", s.weight],
            ["Service", s.service],
          ].map(([term, value]) => (
            <div key={term} className="border-l border-[#2C3138] px-3 py-3 first:border-l-0">
              <dt className="f-mono text-[11px] uppercase tracking-[0.12em] text-[#8A9099]">{term}</dt>
              <dd className="f-mono mt-1 text-[13px] text-white sm:text-[14px]">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-[14px] leading-relaxed text-white/80">{s.note}</p>
      </div>

      <ol className="border-b border-[#2C3138]">
        {STEPS.map((label, i) => {
          const state = i < s.step ? "done" : i === s.step ? "current" : "ahead"
          return (
            <li
              key={label}
              aria-current={state === "current" ? "step" : undefined}
              className={`relative grid grid-cols-[1fr_auto] items-baseline gap-x-3 border-t border-[#2C3138] py-2.5 pl-9 pr-3 ${
                state === "current" ? "bg-[#FFD60A] text-[#0F1113]" : state === "ahead" ? "text-[#8A9099]" : "text-white"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-3 top-[17px] h-2.5 w-2.5 ${
                  state === "done" ? "bg-white" : state === "current" ? "bg-[#0F1113]" : "border border-[#8A9099]"
                }`}
              />
              <span className="f-display text-[19px] font-bold uppercase leading-tight tracking-[0.02em]">
                <span className="sr-only">
                  {state === "done" ? "Completed: " : state === "current" ? "Current step: " : "Still ahead: "}
                </span>
                {label}
              </span>
              <span className="f-mono text-[12px]">
                {state === "ahead" ? "EST " : ""}
                {s.events[i].time}
              </span>
              <span className="col-span-2 text-[13px] leading-snug">{s.events[i].place}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
