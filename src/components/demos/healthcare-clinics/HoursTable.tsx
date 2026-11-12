"use client"

import { useEffect, useState } from "react"

const HOURS = [
  { index: 1, day: "Monday", hours: "8:00 am to 5:00 pm", tag: "" },
  { index: 2, day: "Tuesday", hours: "8:00 am to 7:00 pm", tag: "Evening" },
  { index: 3, day: "Wednesday", hours: "8:00 am to 7:00 pm", tag: "Evening" },
  { index: 4, day: "Thursday", hours: "8:00 am to 7:00 pm", tag: "Evening" },
  { index: 5, day: "Friday", hours: "8:00 am to 4:00 pm", tag: "" },
  { index: 6, day: "Saturday", hours: "9:00 am to 2:00 pm", tag: "Weekend" },
  { index: 0, day: "Sunday", hours: "Closed", tag: "" },
]

/** Opening hours as pill rows. Today is picked out in butter once the browser knows what day it is. */
export default function HoursTable() {
  const [today, setToday] = useState<number | null>(null)
  useEffect(() => setToday(new Date().getDay()), [])

  return (
    <table className="w-full border-separate border-spacing-x-0 border-spacing-y-1.5 text-left text-[16px]">
      <caption className="sr-only">Opening hours at Oakline Dental Studio</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Hours</th>
          <th scope="col">Note</th>
        </tr>
      </thead>
      <tbody>
        {HOURS.map((row) => {
          const isToday = today === row.index
          const fill = isToday ? "bg-[#F6E7B4]" : "bg-[#EEF5F0]"
          return (
            <tr key={row.day}>
              <th scope="row" className={`${fill} rounded-l-full py-3.5 pl-5 pr-2 font-semibold sm:pl-6`}>
                {row.day}
                {isToday && <span className="sr-only"> (today)</span>}
              </th>
              <td className={`${fill} rounded-r-full py-3.5 pr-5 sm:rounded-none sm:pr-2`}>
                <span className={row.hours === "Closed" ? "text-[#47625C]" : ""}>{row.hours}</span>
              </td>
              <td className={`${fill} hidden rounded-r-full py-2 pr-3 text-right sm:table-cell`}>
                {(isToday || row.tag) && (
                  <span className="inline-block rounded-full bg-white px-3 py-1 text-[12.5px] font-semibold">
                    {isToday ? "Today" : row.tag}
                  </span>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
