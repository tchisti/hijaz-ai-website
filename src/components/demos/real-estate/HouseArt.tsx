import type { ReactNode } from "react"

/**
 * "Illustrated listings": the signature visual of the Kestrel & Rowe concept.
 * There are no photographs. Every home is a front elevation drawn in thin ink
 * lines for a stone panel, with exactly one brass detail.
 */

const INK = "#161412"
const BRASS = "#9A7B3F"

export type HouseKind = "bungalow" | "detached" | "townhouses" | "lakeside" | "condo" | "farmhouse"

const line = { fill: "none", stroke: INK, strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round" } as const
const brass = { fill: BRASS, stroke: BRASS } as const
const GROUND = "M16 168H304"
const FLOORS = Array.from({ length: 8 }, (_, i) => `M124 ${40 + i * 12}H196`).join("")

const DRAWINGS: Record<HouseKind, ReactNode> = {
  // Low brick bungalow: hip roof, entry gablet, brass front door
  bungalow: (
    <>
      <path d={`${GROUND}M58 118L96 90H224L262 118ZM70 118V168M250 118V168M190 90V76H206V90M136 118L160 99L184 118`} />
      <path d="M86 130H132V154H86ZM109 130V154M188 130H232V154H188ZM210 130V154M83 158H135M185 158H235" />
      <rect x="151" y="130" width="18" height="38" {...brass} />
      <path d="M36 168V139M264 168a9 9 0 0 1 18 0M279 168a7 7 0 0 1 14 0" />
      <circle cx="36" cy="124" r="15" />
    </>
  ),
  // Two-storey detached: front gable, garage wing, brass-lit bay window
  detached: (
    <>
      <path d={`${GROUND}M100 86L165 40L230 86M110 79V168M220 79V168M192 59V44H204V68`} />
      <circle cx="165" cy="64" r="6" />
      <path d="M124 96H146V118H124ZM135 96V118M184 96H206V118H184ZM195 96V118M180 128H198V168H180ZM174 124H204" />
      <path d="M122 130H158V160H122ZM134 130V160M146 130V160" fill={BRASS} fillOpacity={0.3} stroke={BRASS} />
      <path d="M220 106H278L292 120H220M286 120V168M232 168V132H274V168M232 144H274M232 156H274" />
      <path d="M62 168V136M26 168a8 8 0 0 1 16 0" />
      <circle cx="62" cy="114" r="22" />
    </>
  ),
  // Row of three townhouses: repeating gables, the middle door in brass
  townhouses: (
    <>
      <path d={`${GROUND}M58 80L92 54L126 80L160 54L194 80L228 54L262 80M58 80V168M126 80V168M194 80V168M262 80V168`} />
      {[58, 126, 194].map((x, i) => (
        <g key={x} transform={`translate(${x})`}>
          <circle cx="34" cy="71" r="3.5" />
          <path d="M12 92H28V116H12ZM40 92H56V116H40ZM36 130H58V152H36ZM47 130V152M9 127H31" />
          <rect x="12" y="132" width="16" height="36" {...(i === 1 ? brass : {})} />
        </g>
      ))}
      <path d="M34 168V118M288 168V143" />
      <circle cx="34" cy="113" r="4.5" />
      <circle cx="288" cy="130" r="13" />
    </>
  ),
  // Lakeside modern: flat roofs, a cantilevered glass storey, brass water
  lakeside: (
    <>
      <path d="M112 74H290V80H112ZM124 80V112H278V80M136 112V86H266V112M179 86V112M222 86V112" />
      <path d="M48 106H124V112H48ZM60 112V150M200 112V150M72 150V120H140V150M95 120V150M118 120V150M158 150V120H174V150M266 112V150" />
      <path d="M40 150H298V155H40ZM64 155V166M124 155V166M184 155V166M244 155V166M292 155V166" />
      <path d="M4 160H40M22 150V160M8 150L22 108L36 150Z" />
      <path
        d="M52 176q7 -5 14 0t14 0t14 0M124 176q7 -5 14 0t14 0t14 0t14 0t14 0M226 176q7 -5 14 0t14 0t14 0t14 0M20 187q7 -5 14 0t14 0t14 0t14 0M108 187q7 -5 14 0t14 0t14 0M190 187q7 -5 14 0t14 0t14 0t14 0t14 0"
        stroke={BRASS}
      />
    </>
  ),
  // Condo tower: stacked floors and balconies, one suite lit in brass
  condo: (
    <>
      <path d={`${GROUND}M124 28H196V140H124ZM148 28V140M172 28V140${FLOORS}M146 28V18H174V28M160 18V6`} />
      <rect x="148" y="64" width="24" height="12" {...brass} />
      <path d="M196 52h9v-7M196 76h9v-7M196 100h9v-7M196 124h9v-7M124 64h-9v-7M124 88h-9v-7M124 112h-9v-7" />
      <path d="M96 168V140H224V168M146 150H174M152 150V168M160 150V168M168 150V168M106 150H136V162H106ZM184 150H214V162H184Z" />
      <path d="M44 168V126H82V168M52 136H74M52 146H74M52 156H74M250 168V148M280 168V152" />
      <circle cx="250" cy="138" r="10" />
      <circle cx="280" cy="144" r="8" />
    </>
  ),
  // Ontario farmhouse: centre gable with a pointed window, veranda, barn with a brass weathervane
  farmhouse: (
    <>
      <path d={`${GROUND}M134 104H88L100 74H149M163 74H212L224 104H178M134 104L156 60L178 104M96 104V122M216 104V122`} />
      <path d="M106 74V62H116V74M196 74V62H206V74M150 96V82Q156 70 162 82V96Z" />
      <path d="M86 130L94 122H218L226 130ZM98 130V168M128 130V168M184 130V168M214 130V168M148 168V136H164V168M106 138H122V160H106ZM190 138H206V160H190Z" />
      <path d="M240 168V132L247 116L268 104L289 116L296 132V168M240 132H296M258 168V142H278V168M258 142L278 168M278 142L258 168" />
      <path d="M268 104V88M260 93H276M272 89L276 93L272 97" stroke={BRASS} />
      <path d="M20 168V152M38 168V152M56 168V152M74 168V152M16 156H80M16 162H80" />
    </>
  ),
}

export default function HouseArt({ kind, className = "" }: { kind: HouseKind; className?: string }) {
  return (
    <svg viewBox="0 0 320 200" {...line} className={`kr-art ${className}`} aria-hidden="true">
      {DRAWINGS[kind]}
    </svg>
  )
}

/** The large hero plate: a brick four-square with a columned porch, a brass door and a kestrel overhead. */
export function HeroHouse({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 34 560 366" {...line} className={`kr-art kr-draw ${className}`} aria-hidden="true">
      <path d="M36 352H238M322 352H524M264 352L250 392M296 352L310 392" />
      <path d="M112 150L170 84H390L448 150ZM130 150V352M430 150V352M130 226H430M130 340H244M316 340H430" />
      <path d="M196 84V58H220V84M192 58H224M340 84V58H364V84M336 58H368M256 130V106L280 90L304 106V130ZM268 108H292V130M280 108V130M268 108V130" />
      {[152, 209, 266, 323, 380].map((x) => (
        <path key={x} d={`M${x} 170h28v44h-28ZM${x + 14} 170v44M${x} 192h28M${x - 3} 218h34`} />
      ))}
      {[152, 209, 323, 380].map((x) => (
        <path key={x} d={`M${x} 254h28v50h-28ZM${x + 14} 254v50M${x} 279h28M${x - 3} 308h34`} />
      ))}
      <path d="M240 252L280 230L320 252ZM244 252V258H316V252M250 258V340M256 258V340M304 258V340M310 258V340" />
      <path d="M244 346V340H316V346M238 352V346H322V352" />
      <path className="kr-fill" d="M266 340V276A14 14 0 0 1 294 276V340Z" {...brass} />
      <path d="M72 352V264M72 302L55 281M72 290L91 269M488 352V318M150 352a10 10 0 0 1 20 0M174 352a8 8 0 0 1 16 0M370 352a9 9 0 0 1 18 0M392 352a11 11 0 0 1 22 0" />
      <circle cx="72" cy="214" r="50" />
      <ellipse cx="488" cy="252" rx="22" ry="66" />
      <path d="M436 64q10 -11 21 -2q11 -9 21 2" stroke={BRASS} />
    </svg>
  )
}

const TOWNS: [name: string, x: number, y: number][] = [
  ["Pickering", 46, 146],
  ["Ajax", 102, 146],
  ["Whitby", 176, 146],
  ["Oshawa", 240, 146],
  ["Bowmanville", 308, 146],
  ["Port Perry", 206, 62],
]

/** A schematic of Durham Region, roughly: five towns along the lake, one to the north. Not a map. */
export function DurhamSketch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 210" {...line} className={`kr-art ${className}`} aria-hidden="true">
      <path d="M8 172C52 160 96 182 150 170S262 160 352 176M30 46V18M30 18L25 27M30 18L35 27" />
      <path d="M28 146H334M176 146L206 62" strokeDasharray="2 5" />
      <ellipse cx="230" cy="44" rx="13" ry="22" transform="rotate(18 230 44)" />
      <path d="M20 190q8 -5 16 0t16 0M296 194q8 -5 16 0t16 0" stroke={BRASS} />
      <g stroke="none" fill={INK} fontSize="9" letterSpacing="1.2" textAnchor="middle">
        {TOWNS.map(([name, x, y]) => (
          <text key={name} x={x} y={y} dx={name === "Port Perry" ? -46 : name === "Whitby" ? -26 : 0} dy={name === "Port Perry" ? 3 : -13}>
            {name.toUpperCase()}
          </text>
        ))}
        <text x="30" y="60">N</text>
        <text className="f-display" x="180" y="200" fontSize="14" fontStyle="italic" letterSpacing="0.3">
          Lake Ontario
        </text>
      </g>
      {TOWNS.map(([name, x, y]) => (
        <circle key={name} cx={x} cy={y} r={name === "Whitby" ? 5 : 3} fill={name === "Whitby" ? BRASS : INK} stroke={name === "Whitby" ? BRASS : INK} />
      ))}
    </svg>
  )
}
