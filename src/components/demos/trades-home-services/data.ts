/** Shared copy, prices and class names for the Copperline Plumbing & Heating concept build. */

export const C = {
  ink: "#1B1F1D",
  forest: "#153F2E",
  copper: "#C8642A",
  copperDeep: "#A3491A",
  shine: "#EBA87A",
  cream: "#FAF6EE",
} as const

export const PHONE = "(905) 555-0188"
export const TEL = "tel:+19055550188"
export const EMAIL = "help@copperline.example"

const BTN =
  "inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-[12px] border-2 border-[#1B1F1D] px-6 py-2 text-center text-[19px] font-bold leading-tight text-[#1B1F1D] shadow-[4px_4px_0_#1B1F1D] transition-[transform,box-shadow] duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1B1F1D] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
export const BTN_COPPER = `${BTN} bg-[#C8642A]`
export const BTN_WHITE = `${BTN} bg-white`

export const money = (n: number) => "$" + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export type FittingKind = "elbow" | "coupling" | "trap" | "tank" | "flame" | "valve" | "tee"

export interface Service {
  /** Full name. Also the option shown in the quote form. */
  name: string
  /** Shorter label for the estimate card. */
  short: string
  icon: FittingKind
  blurb: string
  low: number
  high: number
  time: string
  includes: string[]
  /** Replaces the usual same-day arrival and after-hours note for work that is not an emergency. */
  today?: { arrival: string; note: string }
}

export const SERVICES: Service[] = [
  {
    name: "Leak repair",
    short: "Leak repair",
    icon: "coupling",
    blurb: "Burst pipe, pinhole or a joint that will not stop dripping. We find it, shut it off, repair it and pressure test.",
    low: 180,
    high: 420,
    time: "1 to 2 hours",
    includes: ["Leak traced and the water isolated", "Failed pipe or fitting replaced", "Pressure test before we leave"],
  },
  {
    name: "Drain clearing",
    short: "Drain clearing",
    icon: "trap",
    blurb: "Kitchen, tub, floor and main drains cleared with a cable machine, plus a camera check on main lines.",
    low: 160,
    high: 340,
    time: "About 1 hour",
    includes: ["Cable machine through the blocked line", "Camera check on main drains", "Flow test at every fixture on the line"],
  },
  {
    name: "Water heater replacement",
    short: "Water heater",
    icon: "tank",
    blurb: "Old tank out and a new 40 or 50 gallon tank in, the same day in most homes. Removal is part of the price.",
    low: 1650,
    high: 2900,
    time: "3 to 4 hours",
    includes: ["New 40 or 50 gallon tank, supplied", "Old tank drained and taken away", "Connections, venting and start-up checked"],
  },
  {
    name: "Furnace repair",
    short: "Furnace repair",
    icon: "flame",
    blurb: "No heat, short cycling or a blower that howls. A proper diagnosis, the repair, and a safety check before we go.",
    low: 190,
    high: 650,
    time: "1 to 3 hours",
    includes: ["Full diagnosis, explained in plain words", "Common parts carried on the van", "Combustion and safety check"],
  },
  {
    name: "Boiler service",
    short: "Boiler service",
    icon: "valve",
    blurb: "Yearly clean and combustion test. Pressure, expansion tank and relief valve checked, radiators bled.",
    low: 220,
    high: 380,
    time: "About 90 minutes",
    includes: ["Burner cleaned and combustion tested", "Pressure, expansion tank and relief valve checked", "Radiators bled, with a written report"],
    today: {
      arrival: "Routine servicing is booked for regular hours",
      note: "If the boiler has stopped heating, call us instead. That is a no-heat emergency and we come out tonight, with the flat $95 after-hours fee after 6 pm.",
    },
  },
  {
    name: "Bathroom rough-in",
    short: "Bathroom rough-in",
    icon: "tee",
    blurb: "Supply and drain lines for a new or moved bathroom, left tested and ready for inspection and your tile setter.",
    low: 2400,
    high: 4800,
    time: "2 to 3 days",
    includes: ["Supply and drain lines for three fixtures", "Vent tie-in and pressure test", "Left ready for inspection"],
    today: {
      arrival: "A site visit this week to measure and price",
      note: "Rough-ins are planned work, so nothing starts today. If a pipe has burst in the middle of a renovation, choose Leak repair.",
    },
  },
]

export const URGENCIES = [
  { id: "today", label: "Today", arrival: "Call before noon and we are usually there today" },
  { id: "week", label: "This week", arrival: "A two-hour arrival window, Monday to Saturday" },
  { id: "ahead", label: "Planning ahead", arrival: "A date that suits you. Your quote is held for 30 days" },
] as const

export const AFTER_HOURS =
  "After 6 pm, on weekends and on holidays there is one flat $95 after-hours fee. The repair price itself does not change."
