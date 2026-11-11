"use client"

/**
 * Appointment picker for the Oakline Dental Studio concept build.
 * Visit type, then one of the next five weekdays, then a time. Everything is
 * local state: the days are worked out in the browser after mount, and
 * "Request this time" only hands the choice to the enquiry form and scrolls
 * to it. No network.
 */

import { useEffect, useState } from "react"
import { ArrowRight, CalendarDays } from "lucide-react"

const REQUEST_EVENT = "oakline:request"
type Pick = { visit: string; when: string }

const VISITS = [
  { name: "New patient exam", detail: "60 min · $149" },
  { name: "Cleaning", detail: "45 min · from $165" },
  { name: "Emergency", detail: "30 min · $95" },
  { name: "Whitening consult", detail: "20 min · no charge" },
]

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

// Example times that follow the hours table: late on Tuesday to Thursday, short on Friday.
const LATE = ["8:00 am", "9:30 am", "11:30 am", "2:00 pm", "4:30 pm", "6:00 pm"]
const SLOTS: Record<number, string[]> = {
  1: ["8:00 am", "9:30 am", "11:00 am", "1:30 pm", "3:00 pm", "4:00 pm"],
  2: LATE,
  3: LATE,
  4: LATE,
  5: ["8:00 am", "9:30 am", "11:00 am", "12:30 pm", "2:00 pm", "3:00 pm"],
}

/** One or two slots a day read as already taken, decided by the date so it never flickers. */
const isTaken = (day: Date, slot: number) => slot % 5 === day.getDate() % 5

const chip =
  "flex cursor-pointer select-none items-center justify-center rounded-[18px] border border-[#9DBFAE] bg-white text-[#12332E] transition-colors hover:border-[#12332E] peer-checked:border-[#12332E] peer-checked:bg-[#12332E] peer-checked:text-[#EEF5F0] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#12332E] peer-disabled:cursor-not-allowed peer-disabled:border-dashed peer-disabled:bg-transparent peer-disabled:text-[#47625C] peer-disabled:line-through peer-disabled:hover:border-[#9DBFAE]"

function Step({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-6 min-w-0">
      <legend className="mb-3 p-0">
        <span className="inline-flex items-center gap-2.5 text-[14px] font-semibold">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#EEF5F0] text-[12px] ring-1 ring-[#9DBFAE]">
            {n}
          </span>
          {label}
        </span>
      </legend>
      {children}
    </fieldset>
  )
}

export default function AppointmentPicker() {
  const [visit, setVisit] = useState(0)
  const [days, setDays] = useState<Date[] | null>(null)
  const [dayIndex, setDayIndex] = useState<number | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [nudge, setNudge] = useState(false)

  // The next five weekdays, starting tomorrow. Browser only, so the server render never disagrees.
  useEffect(() => {
    const next: Date[] = []
    const cursor = new Date()
    cursor.setHours(12, 0, 0, 0)
    while (next.length < 5) {
      cursor.setDate(cursor.getDate() + 1)
      if (cursor.getDay() !== 0 && cursor.getDay() !== 6) next.push(new Date(cursor))
    }
    setDays(next)
  }, [])

  const day = days && dayIndex !== null ? days[dayIndex] : null
  const slots = day ? SLOTS[day.getDay()] : []
  const ready = Boolean(day && time)
  const when = day && time ? `${WEEKDAYS[day.getDay()]}, ${MONTHS[day.getMonth()]} ${day.getDate()} at ${time}` : ""

  function chooseDay(index: number) {
    if (!days) return
    const nextSlots = SLOTS[days[index].getDay()]
    const slot = time ? nextSlots.indexOf(time) : -1
    if (slot === -1 || isTaken(days[index], slot)) setTime(null)
    setDayIndex(index)
  }

  function request() {
    if (!ready) {
      setNudge(true)
      return
    }
    const target = document.getElementById("enquire")
    const select = target?.querySelector<HTMLSelectElement>('select[name="choice"]')
    if (select) select.value = VISITS[visit].name
    const message = target?.querySelector<HTMLTextAreaElement>('textarea[name="message"]')
    const line = `Requested time: ${when}.`
    // Only write into the message box if it is empty or still holds our own earlier line.
    if (message && (message.value.trim() === "" || message.value === message.dataset.oakline)) {
      message.value = line
      message.dataset.oakline = line
    }
    window.dispatchEvent(new CustomEvent<Pick>(REQUEST_EVENT, { detail: { visit: VISITS[visit].name, when } }))
    target?.scrollIntoView()
  }

  return (
    <div className="rounded-[36px] bg-white p-5 shadow-[0_40px_80px_-48px_rgba(18,51,46,0.55)] ring-1 ring-[#9DBFAE]/50 sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="f-display text-[28px] font-medium leading-[1.1]">Find a time</h2>
          <p className="mt-1.5 text-[15px] text-[#47625C]">Three taps. No account, no card.</p>
        </div>
        <span className="shrink-0 rounded-full bg-[#F6E7B4] px-3 py-1.5 text-[12px] font-semibold">Example times</span>
      </div>

      <Step n={1} label="What is the visit for?">
        <div className="grid grid-cols-2 gap-2">
          {VISITS.map((v, i) => (
            <label key={v.name} className="relative">
              <input
                type="radio"
                name="oakline-visit"
                className="peer sr-only"
                checked={visit === i}
                onChange={() => setVisit(i)}
              />
              <span className={`${chip} min-h-[62px] flex-col !items-start px-3.5 py-2.5`}>
                <span className="text-[14.5px] font-semibold leading-tight">{v.name}</span>
                <span className="mt-1 text-[12.5px] leading-tight opacity-80">{v.detail}</span>
              </span>
            </label>
          ))}
        </div>
      </Step>

      <Step n={2} label="Which day?">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {days
            ? days.map((d, i) => (
                <label key={d.toDateString()} className="relative">
                  <input
                    type="radio"
                    name="oakline-day"
                    className="peer sr-only"
                    aria-label={`${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`}
                    checked={dayIndex === i}
                    onChange={() => chooseDay(i)}
                  />
                  <span className={`${chip} min-h-[72px] flex-col py-2`} aria-hidden="true">
                    <span className="text-[11.5px] font-semibold uppercase tracking-[0.08em] opacity-80">
                      {WEEKDAYS[d.getDay()].slice(0, 3)}
                    </span>
                    <span className="f-display text-[23px] font-medium leading-[1.15]">{d.getDate()}</span>
                    <span className="text-[11.5px] opacity-80">{MONTHS[d.getMonth()].slice(0, 3)}</span>
                  </span>
                </label>
              ))
            : [0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="min-h-[72px] rounded-[18px] bg-[#EEF5F0]" aria-hidden="true" />
              ))}
        </div>
      </Step>

      <Step n={3} label="What time?">
        {day ? (
          <div className="grid grid-cols-3 gap-2">
            {slots.map((slot, i) => {
              const taken = isTaken(day, i)
              return (
                <label key={slot} className="relative">
                  <input
                    type="radio"
                    name="oakline-time"
                    className="peer sr-only"
                    aria-label={taken ? `${slot}, taken` : slot}
                    disabled={taken}
                    checked={time === slot}
                    onChange={() => setTime(slot)}
                  />
                  <span className={`${chip} min-h-[46px] px-1 text-[14px] font-medium`} aria-hidden="true">
                    {slot}
                  </span>
                </label>
              )
            })}
          </div>
        ) : (
          <p className="grid min-h-[100px] place-items-center rounded-[18px] border border-dashed border-[#9DBFAE] px-4 text-center text-[14.5px] text-[#47625C]">
            Choose a day and the open times appear here.
          </p>
        )}
      </Step>

      <div className="mt-6 flex items-start gap-3 rounded-[22px] bg-[#EEF5F0] px-4 py-3.5" role="status">
        <CalendarDays size={20} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p className="text-[15px] leading-snug">
          {ready ? (
            <>
              <strong className="font-semibold">{VISITS[visit].name}</strong> on {when}.
              <span className="block text-[13.5px] text-[#47625C]">{VISITS[visit].detail}, as an example fee.</span>
            </>
          ) : nudge ? (
            <strong className="font-semibold">Pick a day and a time first, then request it.</strong>
          ) : (
            <span className="text-[#47625C]">
              <strong className="font-semibold text-[#12332E]">{VISITS[visit].name}.</strong> Add a day and a time to
              see your request.
            </span>
          )}
        </p>
      </div>
      {visit === 2 && (
        <p className="mt-2 rounded-[22px] bg-[#F6E7B4] px-4 py-3 text-[14px] leading-snug">
          In pain today? Call the emergency line on{" "}
          <a href="tel:+19055550143" className="whitespace-nowrap font-semibold underline underline-offset-2">
            (905) 555-0143
          </a>
          . We keep same-day spots.
        </p>
      )}

      <button
        type="button"
        onClick={request}
        aria-disabled={!ready}
        className={`mt-4 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full px-6 text-[16px] font-semibold text-[#12332E] transition-colors ${
          ready ? "bg-[#EF6F5C] hover:bg-[#F2836F]" : "bg-[#9DBFAE]/45 hover:bg-[#9DBFAE]/60"
        }`}
      >
        Request this time
        <ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className="mt-3 text-center text-[13px] text-[#47625C]">Nothing is booked until the front desk confirms.</p>
    </div>
  )
}

/** Shown beside the enquiry form: repeats the slot chosen in the picker, if there is one. */
export function RequestedSlot() {
  const [pick, setPick] = useState<Pick | null>(null)

  useEffect(() => {
    const onRequest = (event: Event) => setPick((event as CustomEvent<Pick>).detail)
    window.addEventListener(REQUEST_EVENT, onRequest)
    return () => window.removeEventListener(REQUEST_EVENT, onRequest)
  }, [])

  return (
    <p role="status" className="mt-7 rounded-[24px] bg-[#F6E7B4] px-5 py-4 text-[15px] leading-relaxed">
      {pick ? (
        <>
          <strong className="font-semibold">Your pick: {pick.visit.toLowerCase()}</strong> on {pick.when}. It is already
          in the form, so add your name and send.
        </>
      ) : (
        <>
          <strong className="font-semibold">No time picked yet.</strong> Use the{" "}
          <a href="#picker" className="font-semibold underline underline-offset-2">
            appointment picker
          </a>{" "}
          at the top, or tell us what suits you in the message.
        </>
      )}
    </p>
  )
}
