"use client"

/**
 * Hero console for Gearbox Auto Service: the tachometer and the service
 * estimator share one piece of state, so the needle swings to the bay time of
 * whatever is selected. Everything comes from the lookup table below. No network.
 */

import { useEffect, useState, type ReactNode } from "react"
import { ArrowRight } from "lucide-react"

type Vehicle = "car" | "suv" | "truck"
type Range = [number, number]

const VEHICLES: { id: Vehicle; label: string }[] = [
  { id: "car", label: "Car" },
  { id: "suv", label: "SUV" },
  { id: "truck", label: "Truck" },
]

/** Price range in CAD before tax, and bay time in minutes, by vehicle type. */
const SERVICES: {
  id: string
  label: string
  form: string
  note: string
  price: Record<Vehicle, Range>
  mins: Record<Vehicle, Range>
}[] = [
  {
    id: "oil",
    label: "Oil change",
    form: "Oil change",
    note: "Full synthetic, new filter and a fluid top-up.",
    price: { car: [89, 109], suv: [99, 124], truck: [114, 149] },
    mins: { car: [30, 45], suv: [35, 50], truck: [40, 60] },
  },
  {
    id: "brakes",
    label: "Brake service",
    form: "Brake service",
    note: "Per axle: pads, rotors and hardware.",
    price: { car: [329, 449], suv: [369, 499], truck: [419, 589] },
    mins: { car: [90, 120], suv: [90, 150], truck: [120, 180] },
  },
  {
    id: "swap",
    label: "Seasonal tire swap",
    form: "Seasonal tire swap",
    note: "Low end is on rims, high end is off rims with balancing.",
    price: { car: [49, 109], suv: [55, 119], truck: [65, 139] },
    mins: { car: [30, 60], suv: [35, 65], truck: [40, 75] },
  },
  {
    id: "diag",
    label: "Diagnostic",
    form: "Diagnostic scan",
    note: "Code read, live data and a written finding.",
    price: { car: [95, 140], suv: [95, 140], truck: [110, 160] },
    mins: { car: [45, 90], suv: [45, 90], truck: [60, 90] },
  },
  {
    id: "align",
    label: "Alignment",
    form: "Wheel alignment",
    note: "Four wheels, with a before and after printout.",
    price: { car: [129, 149], suv: [139, 169], truck: [159, 199] },
    mins: { car: [60, 75], suv: [60, 90], truck: [75, 105] },
  },
]

const money = ([lo, hi]: Range) => `$${lo}–$${hi}`
const duration = ([lo, hi]: Range) => (hi <= 105 ? `${lo}–${hi} min` : `${lo / 60}–${hi / 60} h`)

// Tachometer geometry: a 240 degree sweep that reads 0 to 4 hours of bay time
const CX = 200
const CY = 200
const R = 156
const angle = (h: number) => 150 + (Math.min(Math.max(h, 0), 4) / 4) * 240
const xy = (h: number, r: number) => {
  const a = (angle(h) * Math.PI) / 180
  return [(CX + r * Math.cos(a)).toFixed(1), (CY + r * Math.sin(a)).toFixed(1)]
}
const arc = (from: number, to: number, r: number) =>
  `M${xy(from, r).join(" ")}A${r} ${r} 0 ${angle(to) - angle(from) > 180 ? 1 : 0} 1 ${xy(to, r).join(" ")}`

function Tachometer({ mins, needle, readout }: { mins: Range; needle: number; readout: string }) {
  const dropOff = mins[1] > 60
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      className="mx-auto block w-full max-w-[330px] sm:max-w-[400px] lg:max-w-[470px]"
    >
      <circle cx={CX} cy={CY} r="194" fill="#161A20" stroke="#3A424E" strokeWidth="1.5" />
      <circle cx={CX} cy={CY} r="178" fill="#0B0D10" stroke="#2A313B" strokeWidth="1.5" />
      {[68.5, 331.5].flatMap((x) => [68.5, 331.5].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" fill="#6B7480" />))}

      <path d={arc(0, 4, R)} fill="none" stroke="#9AA3AE" strokeWidth="1.5" />
      <path d={arc(3, 4, R - 8)} fill="none" stroke="#E5262B" strokeWidth="10" />
      {/* The estimate itself: a white band from the shortest to the longest bay time */}
      <path d={arc(mins[0] / 60, mins[1] / 60, R + 10)} fill="none" stroke="#F4F6F8" strokeWidth="4" />
      {Array.from({ length: 17 }, (_, i) => {
        const major = i % 4 === 0
        const [x1, y1] = xy(i / 4, R - 3)
        const [x2, y2] = xy(i / 4, R - (major ? 26 : i % 2 === 0 ? 18 : 12))
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={major || i >= 12 ? "#F4F6F8" : "#9AA3AE"}
            strokeWidth={major ? 3 : 1.5}
          />
        )
      })}
      {[0, 1, 2, 3, 4].map((h) => {
        const [x, y] = xy(h, R - 48)
        return (
          <text
            key={h}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className="f-display"
            fontSize="26"
            fontWeight="700"
            fill={h === 4 ? "#E5262B" : "#F4F6F8"}
          >
            {h}
          </text>
        )
      })}

      <text x={CX} y="244" textAnchor="middle" className="f-mono" fontSize="11" letterSpacing="2.5" fill="#9AA3AE">
        HOURS IN BAY
      </text>
      <polygon points="120,256 270,256 280,266 280,316 130,316 120,306" fill="#161A20" stroke="#3A424E" />
      <text x={CX} y="284" textAnchor="middle" className="f-mono" fontSize="23" letterSpacing="1" fill="#F4F6F8">
        {readout.toUpperCase()}
      </text>
      <circle cx="151" cy="301" r="3.5" fill={dropOff ? "#FFB020" : "#3A424E"} />
      <text x="161" y="305" className="f-mono" fontSize="11" letterSpacing="2" fill={dropOff ? "#FFB020" : "#9AA3AE"}>
        {dropOff ? "DROP-OFF JOB" : "WAIT-IN JOB"}
      </text>

      <circle cx={CX} cy={CY} r="22" fill="#161A20" stroke="#3A424E" strokeWidth="1.5" />
      <g className="gbx-needle" style={{ transform: `rotate(${angle(needle)}deg)` }}>
        <polygon
          points={`${CX - 30},${CY - 5} ${CX + R - 30},${CY - 1.3} ${CX + R - 30},${CY + 1.3} ${CX - 30},${CY + 5}`}
          fill="#E5262B"
        />
      </g>
      <circle cx={CX} cy={CY} r="9" fill="#0B0D10" stroke="#E5262B" strokeWidth="3" />
    </svg>
  )
}

const step = "f-mono text-[12px] uppercase tracking-[0.16em] text-[#9AA3AE]"

export default function ServiceEstimator({ children }: { children: ReactNode }) {
  const [service, setService] = useState(1)
  const [vehicle, setVehicle] = useState<Vehicle>("car")
  // The needle rests at zero until the page is live, then sweeps up like a cluster at ignition
  const [live, setLive] = useState(false)
  useEffect(() => setLive(true), [])

  const svc = SERVICES[service]
  const mins = svc.mins[vehicle]
  const price = money(svc.price[vehicle])
  const time = duration(mins)
  const vehicleLabel = VEHICLES.find((v) => v.id === vehicle)?.label ?? "Car"
  const dropOff = mins[1] > 60

  /** Carry the estimate into the booking form further down the page. */
  function book() {
    const form = document.getElementById("enquire")
    const select = form?.querySelector<HTMLSelectElement>('select[name="choice"]')
    if (select) select.value = svc.form
    const box = form?.querySelector<HTMLTextAreaElement>('textarea[name="message"]')
    if (box && (!box.value || box.value.startsWith("Estimate shown"))) {
      box.value = `Estimate shown: ${svc.label}, ${vehicleLabel}, ${price}, ${time}.\n`
    }
  }

  return (
    <>
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
        <div>{children}</div>
        <Tachometer mins={mins} needle={live ? (mins[0] + mins[1]) / 120 : 0} readout={time} />
      </div>

      <section
        id="estimate"
        aria-labelledby="gbx-est-title"
        className="gbx-cut gbx-frame mt-12 scroll-mt-[112px] lg:mt-16"
      >
        <div className="gbx-cut bg-[#161A20]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[#2A313B] px-5 py-4 sm:px-7">
            <h2 id="gbx-est-title" className="f-display text-lg font-semibold uppercase tracking-[0.06em]">
              Service estimator
            </h2>
            <p className="f-mono text-[12px] uppercase tracking-[0.1em] text-[#9AA3AE]">Ballpark in ten seconds. Exact quote in writing.</p>
          </div>

          <div className="grid lg:grid-cols-[1.25fr_0.75fr_1fr]">
            <div
              role="radiogroup"
              aria-labelledby="gbx-est-svc"
              className="border-b border-[#2A313B] p-5 sm:p-7 lg:border-b-0 lg:border-r"
            >
              <p id="gbx-est-svc" className={step}>
                <span className="text-[#FF5A5F]">01</span> Service
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {SERVICES.map((s, i) => (
                  <label key={s.id} className={`gbx-chip ${s.id === "swap" ? "col-span-2" : ""}`}>
                    <input
                      type="radio"
                      name="gbx-service"
                      className="sr-only"
                      checked={service === i}
                      onChange={() => setService(i)}
                    />
                    <span>{s.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div
              role="radiogroup"
              aria-labelledby="gbx-est-veh"
              className="border-b border-[#2A313B] p-5 sm:p-7 lg:border-b-0 lg:border-r"
            >
              <p id="gbx-est-veh" className={step}>
                <span className="text-[#FF5A5F]">02</span> Vehicle
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 lg:grid-cols-1">
                {VEHICLES.map((v) => (
                  <label key={v.id} className="gbx-chip">
                    <input
                      type="radio"
                      name="gbx-vehicle"
                      className="sr-only"
                      checked={vehicle === v.id}
                      onChange={() => setVehicle(v.id)}
                    />
                    <span>{v.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col bg-[#0B0D10] p-5 sm:p-7">
              <p className={step}>
                <span className="text-[#FF5A5F]">03</span> Estimate
              </p>
              <div aria-live="polite" aria-atomic="true" className="mt-4">
                <p className="f-mono text-[clamp(2rem,9vw,2.75rem)] leading-none text-[#F4F6F8]">{price}</p>
                <p className="f-mono mt-3 text-[13px] uppercase leading-relaxed tracking-[0.08em] text-[#C5CBD3]">
                  {time} in the bay · {vehicleLabel} · before HST
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-[#9AA3AE]">
                  {svc.note} {dropOff ? "Best left with us as a drop-off." : "Short enough to wait for."}
                </p>
              </div>
              <a href="#enquire" onClick={book} className="gbx-btn gbx-btn-red mt-6 self-start">
                Book this <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
