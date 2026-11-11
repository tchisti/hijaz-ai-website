"use client"

/**
 * Three-step booking planner: service, stylist level, then day and time, ending
 * on a summary with the total. Nothing is sent from here. "Request this booking"
 * carries the choices into the enquiry form further down the page.
 */

import { useEffect, useMemo, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { HOURS, LEVELS, MENU, WEEKDAYS, clock, duration } from "./menu"

type Day = { key: string; name: string; dow: string; date: number; month: string; open: number; close: number }

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const STEPS = ["Service", "Level", "Day & time"]
const TITLES = ["Choose a service", "Choose a stylist level", "Choose a day and a time", "Here is your visit"]

const pill = "rounded-full border px-5 text-[14px] font-bold transition-colors"
const chip = `min-h-[44px] ${pill}`
const nav = `inline-flex min-h-[48px] items-center gap-2 ${pill}`
const option = "border-[#CDB5A3] bg-white hover:border-[#B5543A]"
const picked = "border-[#B5543A] bg-[#FBEFE9] shadow-[inset_0_0_0_1px_#B5543A]"
const solid = "border-[#B5543A] bg-[#B5543A] text-white"
const small = "text-[12px] font-bold uppercase tracking-[0.14em]"

export default function BookingStepper() {
  const [step, setStep] = useState(0)
  const [groupId, setGroupId] = useState(MENU[0].id)
  const [serviceId, setServiceId] = useState("")
  const [levelId, setLevelId] = useState("")
  const [days, setDays] = useState<Day[]>([])
  const [dayKey, setDayKey] = useState("")
  const [time, setTime] = useState<number | null>(null)
  const heading = useRef<HTMLHeadingElement>(null)

  // The next six open days are worked out in the browser after mount, so the
  // server render and the visitor's clock can never disagree about "tomorrow".
  useEffect(() => {
    const next: Day[] = []
    const d = new Date()
    while (next.length < 6) {
      d.setDate(d.getDate() + 1)
      const hours = HOURS[d.getDay()]
      if (!hours) continue
      next.push({
        key: d.toDateString(),
        name: WEEKDAYS[d.getDay()],
        dow: WEEKDAYS[d.getDay()].slice(0, 3),
        date: d.getDate(),
        month: MONTHS[d.getMonth()],
        open: hours[0] * 60,
        close: hours[1] * 60,
      })
    }
    setDays(next)
  }, [])

  const group = MENU.find((g) => g.id === groupId) ?? MENU[0]
  const serviceGroup = MENU.find((g) => g.services.some((s) => s.id === serviceId))
  const service = serviceGroup?.services.find((s) => s.id === serviceId)
  const level = LEVELS.find((l) => l.id === levelId)
  const day = days.find((d) => d.key === dayKey)
  const total = (service?.price ?? 0) + (level?.add ?? 0)
  const when = day && time !== null ? `${day.dow} ${day.date} ${day.month} at ${clock(time)}` : ""
  const ready = [Boolean(service), Boolean(level), when !== ""][step] ?? true

  // Start times every 90 minutes that still finish before closing
  const slots = useMemo(() => {
    const out: number[] = []
    if (day && service) for (let t = day.open; t + service.minutes <= day.close; t += 90) out.push(t)
    return out
  }, [day, service])

  function go(to: number) {
    setStep(to)
    requestAnimationFrame(() => heading.current?.focus())
  }

  /** Copy the summary into the enquiry form (uncontrolled inputs), unless the visitor has already written a message. */
  function carryToForm() {
    if (!service || !level || !serviceGroup) return
    const note = `Booking request: ${service.name} (${duration(service.minutes)}) with a ${level.name}, ${when}. Total $${total} before HST.`
    const box = document.querySelector<HTMLTextAreaElement>("#enquire textarea[name='message']")
    const choice = document.querySelector<HTMLSelectElement>("#enquire select[name='choice']")
    if (box && (!box.value.trim() || box.value.startsWith("Booking request:"))) box.value = note
    if (choice) choice.value = serviceGroup.name
  }

  return (
    <div className="mx-auto max-w-4xl rounded-[32px] bg-white p-5 shadow-[0_30px_60px_-40px_rgba(42,27,23,0.5)] sm:p-10">
      <style>{`@media (prefers-reduced-motion: no-preference) {
        .jp-pane { animation: jp-pane 0.4s ease both; }
        @keyframes jp-pane { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
      }`}</style>

      <ol className="flex items-start" aria-label="Booking progress">
        {STEPS.map((name, i) => (
          <li key={name} className="relative flex flex-1 flex-col items-center" aria-current={step === i ? "step" : undefined}>
            {i > 0 && (
              <span
                className={`absolute right-1/2 top-[22px] h-px w-full ${step >= i ? "bg-[#B5543A]" : "bg-[#E6D3C3]"}`}
                aria-hidden="true"
              />
            )}
            <button
              type="button"
              disabled={step <= i}
              onClick={() => go(i)}
              aria-label={step > i ? `Go back to step ${i + 1}, ${name}` : `Step ${i + 1}, ${name}`}
              className={`f-display relative z-10 grid h-11 w-11 place-items-center rounded-full border text-[17px] transition-colors ${
                step > i ? `${solid} hover:bg-[#96402A]` : step === i ? "border-[#B5543A] bg-white text-[#96402A]" : "border-[#CDB5A3] bg-white text-[#5B4740]"
              }`}
            >
              {step > i ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
            </button>
            <span className={`mt-2 text-center ${small} ${step >= i ? "text-[#2A1B17]" : "text-[#5B4740]"}`}>{name}</span>
          </li>
        ))}
      </ol>

      <div className="mt-7 border-t border-[#E6D3C3] pt-7">
        <p className={`${small} text-[#96402A]`}>{step < 3 ? `Step ${step + 1} of 3` : "Summary"}</p>
        <h3 ref={heading} tabIndex={-1} className="f-display mt-2 scroll-mt-32 text-[26px] leading-tight sm:text-[32px]" style={{ outline: "none" }}>
          {TITLES[step]}
        </h3>

        <div key={step} className="jp-pane mt-6">
          {step === 0 && (
            <>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Service category">
                {MENU.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    aria-pressed={g.id === groupId}
                    onClick={() => setGroupId(g.id)}
                    className={`${chip} ${g.id === groupId ? "border-[#2A1B17] bg-[#2A1B17] text-[#F7EBE4]" : "border-[#CDB5A3] bg-white hover:border-[#2A1B17]"}`}
                  >
                    {g.name}
                  </button>
                ))}
              </div>
              <ul className="mt-4 grid gap-2.5">
                {group.services.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      aria-pressed={s.id === serviceId}
                      onClick={() => {
                        setServiceId(s.id)
                        setTime(null)
                      }}
                      className={`flex min-h-[68px] w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-colors sm:px-5 ${s.id === serviceId ? picked : option}`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold">{s.name}</span>
                        <span className="block text-[14px] text-[#5B4740]">{s.note}</span>
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="f-display block text-[21px] leading-none">${s.price}</span>
                        <span className="mt-1 block text-[12px] uppercase tracking-[0.1em] text-[#5B4740]">{duration(s.minutes)}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label="Stylist level">
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    aria-pressed={l.id === levelId}
                    onClick={() => setLevelId(l.id)}
                    className={`flex flex-col rounded-2xl border p-5 text-left transition-colors ${l.id === levelId ? picked : option}`}
                  >
                    <span className="f-display text-[22px] leading-tight">{l.name}</span>
                    <span className="mt-1.5 flex-1 text-[14px] leading-relaxed text-[#5B4740]">{l.note}</span>
                    <span className="f-display mt-5 text-[30px] leading-none">${(service?.price ?? 0) + l.add}</span>
                    <span className={`mt-1.5 ${small} text-[#96402A]`}>{l.add ? `Menu price plus $${l.add}` : "Menu price"}</span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[14px] text-[#5B4740]">The same three levels apply to our skin and brow team.</p>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6" role="group" aria-label="Day">
                {days.length === 0 && [0, 1, 2, 3, 4, 5].map((i) => <span key={i} className="h-[108px] rounded-t-full bg-[#F7EBE4]" />)}
                {days.map((d) => (
                  <button
                    key={d.key}
                    type="button"
                    aria-pressed={d.key === dayKey}
                    aria-label={`${d.name} ${d.date} ${d.month}`}
                    onClick={() => {
                      setDayKey(d.key)
                      setTime(null)
                    }}
                    className={`flex h-[108px] flex-col items-center justify-end rounded-t-full border pb-3 transition-colors ${
                      d.key === dayKey ? solid : "border-[#CDB5A3] bg-[#F7EBE4] hover:border-[#B5543A]"
                    }`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em]">{d.dow}</span>
                    <span className="f-display text-[30px] leading-[1.15]">{d.date}</span>
                    <span className="text-[12px]">{d.month}</span>
                  </button>
                ))}
              </div>
              {day ? (
                <div className="mt-6" role="group" aria-label={`Start time on ${day.dow} ${day.date} ${day.month}`}>
                  <p className="text-[15px] font-bold">
                    Start times on {day.dow} {day.date} {day.month}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {slots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={t === time}
                        onClick={() => setTime(t)}
                        className={`${chip} ${t === time ? solid : option}`}
                      >
                        {clock(t)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mt-6 text-[15px] text-[#5B4740]">Pick a day to see start times. We are closed on Sundays and Mondays.</p>
              )}
            </>
          )}

          {step === 3 && service && level && (
            <>
              <dl className="divide-y divide-[#E6D3C3] border-y border-[#E6D3C3]">
                {[
                  ["Service", `${service.name}, ${duration(service.minutes)}`, `$${service.price}`],
                  ["Level", level.name, level.add ? `+ $${level.add}` : "Included"],
                  ["When", when, ""],
                ].map(([term, value, amount]) => (
                  <div key={term} className="flex items-baseline gap-4 py-4">
                    <dt className={`w-[68px] shrink-0 ${small} text-[#5B4740]`}>{term}</dt>
                    <dd className="min-w-0 flex-1 text-[16px] font-bold">{value}</dd>
                    <dd className="f-display shrink-0 text-[19px]">{amount}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex items-end justify-between gap-4">
                <p className="text-[14px] text-[#5B4740]">
                  <span className={`block ${small} text-[#2A1B17]`}>Total</span>Before HST. You pay in the studio.
                </p>
                <p className="f-display text-[48px] leading-none text-[#B5543A]">${total}</p>
              </div>
              <a
                href="#enquire"
                onClick={carryToForm}
                className="mt-7 flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[#B5543A] px-8 text-[16px] font-bold text-white transition-colors hover:bg-[#96402A]"
              >
                Request this booking <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-4 text-center text-[14px] leading-relaxed text-[#5B4740]">
                Nothing is booked yet. This takes your choices down to the enquiry form, where you add your name and send it.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-[#E6D3C3] pt-6">
        <p className="min-w-0 text-[14px] text-[#5B4740]" aria-live="polite">
          {service && step < 3 ? (
            <>
              <strong className="text-[#2A1B17]">{service.name}</strong>
              {level && `, ${level.name}`}
              {when && `, ${when}`}. <strong className="text-[#2A1B17]">${total}</strong>
            </>
          ) : step < 3 ? (
            "Nothing chosen yet. Your total appears here as you go."
          ) : (
            "Want to change something? Go back a step."
          )}
        </p>
        <div className="ml-auto flex gap-2.5">
          {step > 0 && (
            <button type="button" onClick={() => go(step - 1)} className={`${nav} border-[#2A1B17] hover:bg-[#2A1B17] hover:text-[#F7EBE4]`}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              disabled={!ready}
              onClick={() => go(step + 1)}
              className={`${nav} ${ready ? `${solid} hover:bg-[#96402A]` : "cursor-not-allowed border-[#E6D3C3] bg-[#E6D3C3] text-[#5B4740]"}`}
            >
              {step === 2 ? "Review" : "Next"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
