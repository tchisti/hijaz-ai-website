/**
 * The Juniper service menu. One source for the printed menu on the page and
 * for the booking stepper, so the two can never disagree on a price.
 */

export type Service = { id: string; name: string; note: string; minutes: number; price: number }
export type Group = { id: string; name: string; blurb: string; services: Service[] }

export const MENU: Group[] = [
  {
    id: "hair",
    name: "Hair",
    blurb: "Every cut starts seated, in front of the mirror, before the cape goes on.",
    services: [
      { id: "cut", name: "Cut & finish", note: "Consultation, wash, precision cut and blow-dry", minutes: 60, price: 78 },
      { id: "short", name: "Short & clipper cut", note: "Scissor or clipper work, wash and style", minutes: 40, price: 48 },
      { id: "blowdry", name: "Wash & blow-dry", note: "Smooth, bouncy or lived-in, your call", minutes: 45, price: 52 },
      { id: "ritual", name: "Deep conditioning ritual", note: "Scalp massage, steam and a bond-building mask", minutes: 30, price: 42 },
    ],
  },
  {
    id: "colour",
    name: "Colour",
    blurb: "Mixed to order at the colour bar. New colour guests need a patch test first.",
    services: [
      { id: "roots", name: "Root touch-up", note: "Regrowth up to 3 cm, with a blow-dry", minutes: 75, price: 92 },
      { id: "allover", name: "All-over colour", note: "One shade from roots to ends, with a blow-dry", minutes: 105, price: 128 },
      { id: "foils", name: "Half-head highlights", note: "Foils through the top and sides, toner and finish", minutes: 135, price: 168 },
      { id: "balayage", name: "Balayage & toner", note: "Hand-painted lightening, root melt and finish", minutes: 180, price: 245 },
    ],
  },
  {
    id: "skin",
    name: "Skin",
    blurb: "Quiet rooms, warm towels and products chosen for your skin on the day.",
    services: [
      { id: "signature", name: "Juniper signature facial", note: "Double cleanse, exfoliation, massage and mask", minutes: 60, price: 115 },
      { id: "express", name: "Express facial", note: "A lunch-hour cleanse, exfoliation and hydration", minutes: 30, price: 65 },
      { id: "enzyme", name: "Gentle enzyme peel", note: "Fruit-enzyme resurfacing for dull or congested skin", minutes: 45, price: 98 },
      { id: "back", name: "Back & shoulder treatment", note: "Deep cleanse, steam, extraction and massage", minutes: 45, price: 90 },
    ],
  },
  {
    id: "brows",
    name: "Brows & lashes",
    blurb: "Mapped to your face first, so nothing comes off that you wanted to keep.",
    services: [
      { id: "shape", name: "Brow shape", note: "Wax or tweeze, mapped and tidied", minutes: 20, price: 26 },
      { id: "shapetint", name: "Brow shape & tint", note: "Shape plus a tint matched to your hair", minutes: 30, price: 42 },
      { id: "lamination", name: "Brow lamination", note: "Brushed-up, fuller brows for six weeks or so", minutes: 45, price: 75 },
      { id: "lashlift", name: "Lash lift & tint", note: "A soft curl and darker lashes, no extensions", minutes: 60, price: 88 },
    ],
  },
]

export const LEVELS = [
  { id: "stylist", name: "Stylist", add: 0, note: "Fully trained, with three or more years behind the chair." },
  { id: "senior", name: "Senior stylist", add: 15, note: "Seven or more years, with advanced colour and cutting work." },
  { id: "director", name: "Director", add: 30, note: "Our most experienced hands, who also train the team." },
]

export function duration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h === 0 ? `${m} min` : m === 0 ? `${h} hr` : `${h} hr ${m} min`
}

/** Opening hours by weekday (0 is Sunday) as [open, close] on the 24-hour clock. Closed Sunday and Monday. */
export const HOURS: ([number, number] | null)[] = [null, null, [10, 18], [10, 20], [10, 20], [9, 18], [9, 17]]
export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

/** Minutes after midnight as a 12-hour clock time: 810 becomes "1:30 pm". */
export function clock(minutes: number): string {
  const h = Math.floor(minutes / 60)
  return `${h % 12 || 12}:${String(minutes % 60).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`
}
