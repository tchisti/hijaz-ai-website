"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Minus, Plus } from "lucide-react"

/** Seatings, in minutes after midnight: every half hour from 5:00 pm to 9:00 pm. */
const SLOTS = [1020, 1050, 1080, 1110, 1140, 1170, 1200, 1230, 1260]
const LAST_SLOT = SLOTS[SLOTS.length - 1]
const MIN_PARTY = 1
const MAX_PARTY = 10

interface Day {
  key: string
  top: string
  num: number
  month: string
  long: string
  isToday: boolean
}

const formatTime = (minutes: number) => `${Math.floor(minutes / 60) - 12}:${String(minutes % 60).padStart(2, "0")} pm`

/** Six nights starting tonight, or tomorrow once tonight's last seating is too close to book. */
function buildDays(now: Date, nowMinutes: number): Day[] {
  const start = nowMinutes > LAST_SLOT - 30 ? 1 : 0
  return Array.from({ length: 6 }, (_, i) => {
    const offset = start + i
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset)
    return {
      key: date.toDateString(),
      top: offset === 0 ? "Tonight" : date.toLocaleDateString("en-CA", { weekday: "short" }).replace(".", ""),
      num: date.getDate(),
      month: date.toLocaleDateString("en-CA", { month: "short" }).replace(".", ""),
      long: date.toLocaleDateString("en-CA", { weekday: "long", month: "long", day: "numeric" }),
      isToday: offset === 0,
    }
  })
}

const chip =
  "min-h-[48px] border text-center transition-colors disabled:cursor-not-allowed disabled:border-[#F2E7D5]/10 disabled:text-[#A39683]/50 disabled:line-through"
const chipOn = "border-[#E4572E] bg-[#E4572E] text-[#14110F]"
const chipOff = "border-[#F2E7D5]/20 text-[#F2E7D5] hover:border-[#F2E7D5]/70"
const label = "text-[11px] font-medium uppercase tracking-[0.24em] text-[#A39683]"

export default function ReservationPicker() {
  // The calendar depends on the visitor's clock, so it is built after mount to keep hydration stable.
  const [calendar, setCalendar] = useState<{ days: Day[]; nowMinutes: number } | null>(null)
  const [dayKey, setDayKey] = useState<string | null>(null)
  const [slot, setSlot] = useState(1140)
  const [party, setParty] = useState(2)

  useEffect(() => {
    const now = new Date()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()
    setCalendar({ days: buildDays(now, nowMinutes), nowMinutes })
  }, [])

  const day = calendar ? (calendar.days.find((d) => d.key === dayKey) ?? calendar.days[0]) : null
  const cutoff = calendar && day?.isToday ? calendar.nowMinutes + 30 : 0
  const isOpen = (minutes: number) => minutes >= cutoff
  const chosen = isOpen(slot) ? slot : (SLOTS.find(isOpen) ?? LAST_SLOT)

  const guests = `${party} ${party === 1 ? "guest" : "guests"}`
  const when = day ? (day.isToday ? "tonight" : `on ${day.long}`) : ""
  const summary = `A table for ${party}${when ? ` ${when}` : ""} at ${formatTime(chosen)}.`

  /** Carry the selection into the enquiry form. The link itself does the scrolling. */
  function carryToForm() {
    const form = document.querySelector<HTMLFormElement>("#enquire form")
    if (!form) return
    const choice = form.elements.namedItem("choice")
    const message = form.elements.namedItem("message")
    if (choice instanceof HTMLSelectElement) choice.value = "Table reservation"
    if (message instanceof HTMLTextAreaElement && (!message.value.trim() || message.value.startsWith("Table request:"))) {
      message.value = `Table request: ${guests}, ${day ? day.long : "date to confirm"}, ${formatTime(chosen)}.`
    }
  }

  return (
    <div className="border border-[#F2E7D5]/15 bg-[#14110F] p-5 sm:p-8">
      <fieldset>
        <legend className={`${label} mb-3`}>Night</legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6">
          {calendar
            ? calendar.days.map((d) => (
                <button
                  key={d.key}
                  type="button"
                  aria-pressed={d.key === day?.key}
                  aria-label={d.isToday ? `Tonight, ${d.long}` : d.long}
                  onClick={() => setDayKey(d.key)}
                  className={`${chip} flex flex-col items-center justify-center px-1 py-3 ${d.key === day?.key ? chipOn : chipOff}`}
                >
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em]">{d.top}</span>
                  <span className="f-display text-3xl leading-none">{d.num}</span>
                  <span className="text-xs">{d.month}</span>
                </button>
              ))
            : Array.from({ length: 6 }, (_, i) => (
                <span key={i} aria-hidden="true" className="block h-[86px] border border-[#F2E7D5]/10 bg-[#1E1915]" />
              ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className={`${label} mb-3`}>Time</legend>
        <div className="grid grid-cols-3 gap-2">
          {SLOTS.map((minutes) => (
            <button
              key={minutes}
              type="button"
              disabled={!isOpen(minutes)}
              aria-pressed={minutes === chosen}
              onClick={() => setSlot(minutes)}
              className={`${chip} px-2 tabular-nums ${minutes === chosen ? chipOn : chipOff}`}
            >
              {formatTime(minutes)}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
        <div role="group" aria-label="Party size" className="flex items-center gap-4">
          <span className={label}>Guests</span>
          <button
            type="button"
            aria-label="One guest fewer"
            disabled={party <= MIN_PARTY}
            onClick={() => setParty((n) => Math.max(MIN_PARTY, n - 1))}
            className={`${chip} ${chipOff} grid w-12 place-items-center`}
          >
            <Minus aria-hidden="true" className="h-4 w-4" />
          </button>
          <span className="f-display w-10 text-center text-4xl tabular-nums">
            <span aria-hidden="true">{party}</span>
            <span className="sr-only">{guests}</span>
          </span>
          <button
            type="button"
            aria-label="One guest more"
            disabled={party >= MAX_PARTY}
            onClick={() => setParty((n) => Math.min(MAX_PARTY, n + 1))}
            className={`${chip} ${chipOff} grid w-12 place-items-center`}
          >
            <Plus aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-[#A39683]">
          More than ten?{" "}
          <a href="#private-dining" className="py-3.5 text-[#F2E7D5] underline decoration-[#E4572E] underline-offset-4 transition-colors hover:text-[#E4572E]">
            See private dining
          </a>
        </p>
      </div>

      <div className="mt-8 border-t border-[#F2E7D5]/25 pt-6">
        <p aria-live={calendar ? "polite" : "off"} className="f-display text-[clamp(1.4rem,3.4vw,2rem)] italic leading-snug [text-wrap:balance]">
          {summary}
        </p>
        <a
          href="#enquire"
          onClick={carryToForm}
          className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 bg-[#E4572E] px-7 text-sm font-bold uppercase tracking-[0.16em] text-[#14110F] transition-colors hover:bg-[#F2E7D5] sm:w-auto"
        >
          Request this table
          <ArrowDown aria-hidden="true" className="h-4 w-4" />
        </a>
        <p className="mt-4 text-sm text-[#A39683]">
          Nothing is booked yet. This takes your choice to the enquiry form below.
        </p>
      </div>
    </div>
  )
}
