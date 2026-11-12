/**
 * Signature visual for the Corridor Freight Lines concept build: the corridor
 * drawn as a transit-style road schematic. Terminals are nodes, and the yellow
 * centre-line dashes travel east (they sit still under reduced motion).
 * Two drawings: a horizontal one from md up, a vertical strip map on phones.
 */

interface Stop {
  name: string
  /** Approximate road kilometres from the Oshawa terminal */
  km: number
  /** Position in the horizontal drawing */
  x: number
  y: number
  /** Position in the vertical drawing */
  vx: number
  vy: number
  above?: boolean
  home?: boolean
}

const STOPS: Stop[] = [
  { name: "Windsor", km: 425, x: 70, y: 300, vx: 40, vy: 44 },
  { name: "London", km: 250, x: 215, y: 300, vx: 40, vy: 100 },
  { name: "Kitchener", km: 165, x: 400, y: 220, vx: 40, vy: 156 },
  { name: "Toronto", km: 60, x: 545, y: 220, vx: 40, vy: 212 },
  { name: "Oshawa", km: 0, x: 672, y: 220, vx: 40, vy: 268, home: true },
  { name: "Kingston", km: 205, x: 850, y: 140, vx: 40, vy: 334 },
  { name: "Ottawa", km: 350, x: 1030, y: 70, vx: 85, vy: 425, above: true },
  { name: "Montreal", km: 480, x: 1130, y: 140, vx: 40, vy: 500 },
]

const ROAD = "#39404A"
const YELLOW = "#FFD60A"
const GREY = "#8A9099"

/** The road (wide grey stroke) with its moving yellow centre line, for each path */
function Road({ paths }: { paths: string[] }) {
  return (
    <>
      {paths.map((d) => (
        <path key={d} d={d} fill="none" stroke={ROAD} strokeWidth="18" />
      ))}
      {paths.map((d) => (
        <path key={d} d={d} fill="none" stroke={YELLOW} strokeWidth="3" className="cfl-dash" />
      ))}
    </>
  )
}

/** A terminal: a square node, or a yellow diamond for the home terminal */
function Node({ x, y, home }: { x: number; y: number; home?: boolean }) {
  return home ? (
    <rect x="-13" y="-13" width="26" height="26" transform={`translate(${x} ${y}) rotate(45)`} fill={YELLOW} stroke="#0F1113" strokeWidth="3" />
  ) : (
    <rect x={x - 9} y={y - 9} width="18" height="18" fill="#0F1113" stroke="#FFFFFF" strokeWidth="4" />
  )
}

export default function LaneMap() {
  return (
    <figure className="border border-[#2C3138] bg-[#181B1F]">
      <style>{`
        .cfl-dash { stroke-dasharray: 18 16; }
        @media (prefers-reduced-motion: no-preference) {
          .cfl-dash { animation: cfl-dash 1.1s linear infinite; }
          @keyframes cfl-dash { to { stroke-dashoffset: -34; } }
        }
      `}</style>

      <div className="f-mono flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-[#2C3138] px-4 py-3 text-[11px] uppercase tracking-[0.14em] text-[#8A9099] sm:px-6">
        <p className="font-bold text-white">Lane schematic</p>
        <p>Windsor to Montreal, not to scale</p>
      </div>

      <p className="sr-only">
        The corridor runs west to east: Windsor, London, Kitchener, Toronto, the home terminal at Oshawa, then Kingston.
        East of Kingston it splits, one road direct to Montreal and one through Ottawa.
      </p>

      {/* Horizontal drawing, md and up */}
      <svg viewBox="0 0 1200 390" aria-hidden="true" className="hidden h-auto w-full md:block">
        <path d="M70 300 H18" fill="none" stroke={GREY} strokeWidth="3" strokeDasharray="4 6" />
        <text x="18" y="278" className="f-mono" fontSize="13" letterSpacing="1.4" fill={GREY}>
          TO MICHIGAN
        </text>
        <Road paths={["M70 300 H260 L340 220 H700 L780 140 H1130", "M930 140 L1000 70 H1060 L1130 140"]} />

        {STOPS.map((s) => (
          <g key={s.name}>
            <Node x={s.x} y={s.y} home={s.home} />
            <text x={s.x} y={s.above ? s.y - 44 : s.y + 50} textAnchor="middle" className="f-display" fontSize="30" fontWeight="700" letterSpacing="1" fill="#FFFFFF">
              {s.name.toUpperCase()}
            </text>
            {s.home && <rect x={s.x - 75} y={s.y + 58} width="150" height="26" fill={YELLOW} />}
            <text
              x={s.x}
              y={s.home ? s.y + 76 : s.above ? s.y - 22 : s.y + 73}
              textAnchor="middle"
              className="f-mono"
              fontSize={s.home ? 15 : 17}
              fontWeight={s.home ? 700 : 400}
              letterSpacing="1"
              fill={s.home ? "#0F1113" : GREY}
            >
              {s.home ? "HOME TERMINAL" : `${s.km} KM`}
            </text>
          </g>
        ))}
      </svg>

      {/* Vertical strip map, phones */}
      <svg viewBox="0 0 320 530" aria-hidden="true" className="h-auto w-full max-w-[420px] md:hidden">
        <path d="M40 44 V10" fill="none" stroke={GREY} strokeWidth="3" strokeDasharray="4 6" />
        <text x="58" y="18" className="f-mono" fontSize="10" letterSpacing="1.2" fill={GREY}>
          TO MICHIGAN
        </text>
        <Road paths={["M40 44 V500", "M40 368 L85 413 V437 L40 482"]} />

        {STOPS.map((s) => (
          <g key={s.name}>
            <Node x={s.vx} y={s.vy} home={s.home} />
            <text x={s.vx + 30} y={s.vy + 8} className="f-display" fontSize="23" fontWeight="700" letterSpacing="0.8" fill="#FFFFFF">
              {s.name.toUpperCase()}
            </text>
            <text x="308" y={s.vy + 5} textAnchor="end" className="f-mono" fontSize="11" letterSpacing="1" fill={s.home ? YELLOW : GREY}>
              {s.home ? "HOME TERMINAL" : `${s.km} KM`}
            </text>
          </g>
        ))}
      </svg>

      <figcaption className="f-mono flex flex-wrap gap-x-6 gap-y-2 border-t border-[#2C3138] px-4 py-3 text-[11px] uppercase tracking-[0.12em] text-[#8A9099] sm:px-6">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 border-2 border-white" />
          Service point
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-2.5 rotate-45 bg-[#FFD60A]" />
          Home terminal
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0 w-6 border-t-2 border-dashed border-[#FFD60A]" />
          Nightly linehaul
        </span>
        <span>Distances are approximate road km from Oshawa</span>
      </figcaption>
    </figure>
  )
}
