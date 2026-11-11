"use client"

import { useState } from "react"
import { ArrowRight, CalendarClock, Check, Clock, Timer } from "lucide-react"
import { AFTER_HOURS, BTN_COPPER, SERVICES, URGENCIES, money } from "./data"
import { PriceTag } from "./Parts"

const PILL =
  "flex min-h-[46px] items-center justify-center rounded-[10px] border-2 border-[#1B1F1D] bg-[#FAF6EE] px-2 py-1.5 text-center text-[15px] font-bold leading-tight text-[#1B1F1D] transition-colors peer-checked:bg-[#153F2E] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#C8642A] peer-[:not(:checked)]:hover:bg-[#DDE8DF]"
const LEGEND = "mb-2 text-[15px] font-bold uppercase tracking-[0.08em] text-[#3A423E]"

/**
 * Instant estimate: pick a job and how soon, read a ballpark from a lookup
 * table. Nothing is sent anywhere. "Get this quoted" carries the chosen job
 * down to the quote form.
 */
export default function EstimateCard() {
  const [job, setJob] = useState(0)
  const [when, setWhen] = useState(0)

  const service = SERVICES[job]
  const urgency = URGENCIES[when]
  const today = urgency.id === "today"
  const arrival = today && service.today ? service.today.arrival : urgency.arrival
  const note = today ? (service.today?.note ?? AFTER_HOURS) : null

  function getQuoted() {
    const select = document.querySelector<HTMLSelectElement>('#enquire select[name="choice"]')
    if (select) select.value = service.name
    // No behaviour given, so the page's own scroll-behavior (and reduced-motion rule) decides.
    document.getElementById("enquire")?.scrollIntoView({ block: "start" })
  }

  return (
    <div id="estimate" className="relative scroll-mt-[112px] rounded-[18px] border-2 border-[#1B1F1D] bg-white shadow-[6px_6px_0_#1B1F1D]">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes cl-pop { from { transform: translateY(6px) scale(.96); opacity: 0 } to { transform: none; opacity: 1 } }
          .cl-pop { animation: cl-pop .28s cubic-bezier(.2, .8, .2, 1) both }
        }
      `}</style>

      <div className="rounded-t-[15px] border-b-2 border-[#1B1F1D] bg-[#153F2E] py-4 pl-5 pr-28">
        <h2 className="f-display text-[25px] font-extrabold leading-none text-white">Instant estimate</h2>
        <p className="mt-1.5 text-[15px] font-semibold leading-snug text-[#DDE8DF]">Two taps, one ballpark price.</p>
      </div>
      <p
        aria-hidden="true"
        className="f-display absolute -top-7 right-4 grid h-[88px] w-[88px] rotate-[10deg] place-content-center rounded-full border-2 border-[#1B1F1D] bg-[#C8642A] text-center font-extrabold uppercase leading-none text-[#1B1F1D] shadow-[3px_3px_0_#1B1F1D]"
      >
        <span className="block text-[19px]">Call</span>
        <span className="block text-[28px]">24/7</span>
      </p>

      <div className="p-5 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:p-6 lg:block lg:p-5">
        <div>
          <fieldset>
            <legend className={LEGEND}>1. What is the job?</legend>
            <div className="grid grid-cols-2 gap-2">
              {SERVICES.map((s, i) => (
                <label key={s.name} className="relative block cursor-pointer">
                  <input type="radio" name="cl-job" className="peer sr-only" checked={job === i} onChange={() => setJob(i)} />
                  <span className={PILL}>{s.short}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-4">
            <legend className={LEGEND}>2. How soon?</legend>
            <div className="grid grid-cols-3 gap-2">
              {URGENCIES.map((u, i) => (
                <label key={u.id} className="relative block cursor-pointer">
                  <input type="radio" name="cl-when" className="peer sr-only" checked={when === i} onChange={() => setWhen(i)} />
                  <span className={PILL}>{u.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div
          aria-live="polite"
          className="mt-5 rounded-[14px] border-2 border-[#1B1F1D] bg-[#DDE8DF] p-4 sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:mt-0 lg:mt-5"
        >
          <p className="text-[15px] font-bold text-[#1B1F1D]">
            Ballpark for {service.short.toLowerCase()}, {urgency.label.toLowerCase()}
          </p>
          <div key={`${job}-${when}`} className="cl-pop mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
            <PriceTag className="text-[clamp(1.5rem,7vw,2.125rem)]">
              {money(service.low)} – {money(service.high)}
            </PriceTag>
            <span className="text-[15px] font-semibold text-[#3A423E]">plus HST</span>
          </div>

          <ul className="mt-4 space-y-2 text-[16px] leading-snug">
            <li className="flex gap-2.5">
              <Timer className="mt-0.5 h-5 w-5 shrink-0 text-[#A3491A]" aria-hidden="true" />
              <span>
                <strong>Usually takes:</strong> {service.time.toLowerCase()}
              </span>
            </li>
            <li className="flex gap-2.5">
              <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-[#A3491A]" aria-hidden="true" />
              <span>
                <strong>When:</strong> {arrival}
              </span>
            </li>
          </ul>

          <p className="mt-4 text-[15px] font-bold uppercase tracking-[0.08em] text-[#3A423E]">Included</p>
          <ul className="mt-1.5 space-y-1.5 text-[16px] leading-snug">
            {service.includes.map((line) => (
              <li key={line} className="flex gap-2.5">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#153F2E]" strokeWidth={3} aria-hidden="true" />
                {line}
              </li>
            ))}
          </ul>

          {note && (
            <p className="mt-4 flex gap-2.5 rounded-[10px] border-2 border-[#1B1F1D] bg-white p-3 text-[15px] leading-snug">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#A3491A]" aria-hidden="true" />
              <span>{note}</span>
            </p>
          )}
        </div>

        <div className="sm:self-end">
          <button type="button" onClick={getQuoted} className={`${BTN_COPPER} mt-5 w-full`}>
            Get this quoted
            <ArrowRight className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
          </button>
          <p className="mt-3 text-[15px] leading-snug text-[#3A423E]">
            A ballpark for a typical Durham home. Your firm price is written down on site, before any work starts.
          </p>
        </div>
      </div>
    </div>
  )
}
