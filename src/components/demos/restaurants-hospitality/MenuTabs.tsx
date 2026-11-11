"use client"

import { useRef, useState } from "react"

type Marker = "V" | "VG" | "GF"

interface Dish {
  name: string
  note: string
  price: number
  tags?: Marker[]
}

interface Course {
  id: string
  label: string
  blurb: string
  dishes: Dish[]
}

const MARKERS: Record<Marker, string> = { V: "Vegetarian", VG: "Vegan", GF: "Gluten-free" }

const COURSES: Course[] = [
  {
    id: "snacks",
    label: "Snacks",
    blurb: "Small things for the table while the fire does its work.",
    dishes: [
      { name: "Hearth bread", note: "Sourdough flatbread off the oven floor, cultured butter, smoked salt.", price: 8, tags: ["V"] },
      { name: "Charred olives", note: "Warmed in the embers with orange peel, fennel seed and chili.", price: 9, tags: ["VG", "GF"] },
      { name: "Smoked labneh", note: "Hung yogurt, burnt honey, Aleppo pepper, seeded rye crackers.", price: 12, tags: ["V"] },
      { name: "Blistered shishitos", note: "Lemon, flaky salt, toasted sesame.", price: 11, tags: ["VG", "GF"] },
      { name: "Coal-roasted beets", note: "Buried in the ashes for an hour, whipped feta, dill, pickled mustard seed.", price: 13, tags: ["V", "GF"] },
      { name: "Beef suya skewers", note: "Peanut and chili rub, raw red onion, lime.", price: 15, tags: ["GF"] },
    ],
  },
  {
    id: "fire",
    label: "From the fire",
    blurb: "The long cooks. Most are big enough to share between two.",
    dishes: [
      { name: "Maple ember chicken", note: "Half bird brined overnight, turned over maple coals, charred lemon, garlic toum.", price: 32, tags: ["GF"] },
      { name: "Lamb shoulder for two", note: "Twelve hours beside the oak fire, flatbread, pickles, a heap of herbs.", price: 68 },
      { name: "Ontario ribeye, 14 oz", note: "Dry-aged 40 days, bone marrow butter, grilled onion.", price: 62, tags: ["GF"] },
      { name: "Whole rainbow trout", note: "Stuffed with lemon and dill, brown butter, fried capers.", price: 38, tags: ["GF"] },
      { name: "Smoked beef short rib", note: "Glazed with pomegranate molasses, pickled shallot, parsley.", price: 44, tags: ["GF"] },
      { name: "Hearth cauliflower", note: "Roasted whole, tahini, green chili zhoug, toasted almonds.", price: 26, tags: ["VG", "GF"] },
    ],
  },
  {
    id: "plates",
    label: "Plates",
    blurb: "Vegetables, grains and the things that go beside the fire.",
    dishes: [
      { name: "Ember-roast carrots", note: "Carrot-top chermoula, labneh, hazelnut dukkah.", price: 16, tags: ["V", "GF"] },
      { name: "Fire-roasted mushrooms", note: "Oyster and king mushrooms, garlic, thyme, soft polenta.", price: 21, tags: ["V", "GF"] },
      { name: "Charred cabbage", note: "Brown butter, toasted rye crumb, aged cheddar.", price: 15, tags: ["V"] },
      { name: "Lamb kofta", note: "Grilled over charcoal, sumac onions, blistered tomato, warm flatbread.", price: 24 },
      { name: "Brisket flatbread", note: "Smoked beef brisket, pickled chilies, mozzarella, charred scallion.", price: 22 },
      { name: "Smashed potatoes", note: "Crisped on the plancha, chives, smoked garlic aioli.", price: 12, tags: ["V", "GF"] },
      { name: "Bitter leaves", note: "Radicchio and endive, pear, walnut, cider vinegar dressing.", price: 14, tags: ["VG", "GF"] },
    ],
  },
  {
    id: "sweets",
    label: "Sweets",
    blurb: "Baked in the oven as it cools at the end of the night.",
    dishes: [
      { name: "Burnt cheesecake", note: "Basque style, sour cherry, cracked black pepper.", price: 13, tags: ["V"] },
      { name: "Maple tart", note: "Ontario maple custard, rye crust, salted cream.", price: 12, tags: ["V"] },
      { name: "Ember-baked apple", note: "Brown sugar, oat crumble, vanilla ice cream.", price: 12, tags: ["V"] },
      { name: "Dark chocolate pot", note: "Olive oil, smoked salt, sesame brittle.", price: 11, tags: ["V", "GF"] },
      { name: "Roasted pears", note: "Maple, cardamom, pistachio, coconut yogurt.", price: 11, tags: ["VG", "GF"] },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    blurb: "House sodas and shrubs made in the kitchen, tea by the pot, coffee to finish.",
    dishes: [
      { name: "Smoked maple cola", note: "House cola syrup, smoked maple, lime.", price: 7, tags: ["VG", "GF"] },
      { name: "Sour cherry shrub", note: "Ontario cherries, cider vinegar, soda, a sprig of thyme.", price: 8, tags: ["VG", "GF"] },
      { name: "Burnt lemon and ginger", note: "Charred lemon, fresh ginger, honey, soda.", price: 7, tags: ["V", "GF"] },
      { name: "Rhubarb and rose shrub", note: "Tart, pink, long over ice.", price: 8, tags: ["VG", "GF"] },
      { name: "Smoked black tea, iced", note: "Lapsang souchong, peach, lemon.", price: 6, tags: ["VG", "GF"] },
      { name: "Fresh mint tea", note: "A pot for the table, honey on the side.", price: 6, tags: ["V", "GF"] },
      { name: "Cardamom coffee", note: "Brewed dark and lightly spiced, served with a date.", price: 5, tags: ["VG", "GF"] },
    ],
  },
]

export default function MenuTabs() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = COURSES.length - 1
    let next: number
    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1
    else if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = last
    else return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Menu sections"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-x-7 border-b border-[#F2E7D5]/25 sm:gap-x-10"
      >
        {COURSES.map((course, i) => {
          const selected = i === active
          return (
            <button
              key={course.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`er-tab-${course.id}`}
              aria-selected={selected}
              aria-controls={`er-panel-${course.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`f-display -mb-px min-h-[52px] border-b-2 pb-2 pt-3 text-[1.35rem] italic transition-colors sm:text-[1.6rem] ${
                selected
                  ? "border-[#E4572E] text-[#F2E7D5]"
                  : "border-transparent text-[#A39683] hover:text-[#F2E7D5]"
              }`}
            >
              {course.label}
            </button>
          )
        })}
      </div>

      {COURSES.map((course, i) => (
        <div
          key={course.id}
          role="tabpanel"
          id={`er-panel-${course.id}`}
          aria-labelledby={`er-tab-${course.id}`}
          hidden={i !== active}
          tabIndex={0}
          className="er-panel pt-8"
        >
          <p className="max-w-xl text-[#A39683]">{course.blurb}</p>
          <ul className="mt-6 grid gap-x-16 lg:grid-cols-2">
            {course.dishes.map((dish) => (
              <li key={dish.name} className="border-b border-[#F2E7D5]/10 py-5">
                <div className="flex items-baseline gap-3">
                  <h3 className="f-display text-[clamp(1.3rem,2.3vw,1.75rem)] font-normal leading-tight">{dish.name}</h3>
                  <span aria-hidden="true" className="min-w-5 flex-1 border-b border-dotted border-[#F2E7D5]/40" />
                  <span className="text-lg font-medium tabular-nums">${dish.price}</span>
                </div>
                <p className="mt-1.5 max-w-[34rem] pr-10 leading-relaxed text-[#A39683]">
                  {dish.note}
                  {dish.tags?.map((tag) => (
                    <span key={tag} className="ml-2 text-[11px] font-bold tracking-[0.16em] text-[#C9A227]">
                      <span aria-hidden="true">{tag}</span>
                      <span className="sr-only">{MARKERS[tag]}</span>
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-8 flex flex-col gap-3 text-sm text-[#A39683] md:flex-row md:items-baseline md:justify-between">
        <ul aria-label="Dietary markers" className="flex flex-wrap gap-x-6 gap-y-1">
          {(Object.keys(MARKERS) as Marker[]).map((tag) => (
            <li key={tag}>
              <span className="mr-2 text-[11px] font-bold tracking-[0.16em] text-[#C9A227]">{tag}</span>
              {MARKERS[tag]}
            </li>
          ))}
        </ul>
        <p className="max-w-md md:text-right">
          Prices in Canadian dollars, before tax. The kitchen works with nuts, sesame, dairy and wheat, so tell us about
          allergies when you book.
        </p>
      </div>
    </div>
  )
}
