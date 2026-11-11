/**
 * Juniper sprig line art, the studio's signature mark. Every sprig is generated
 * from a few curves so the same hand shows in each arch and divider: a stem,
 * paired needles that shorten toward the tip, and a handful of berries.
 */

type Pt = [number, number]
type Twig = { a: Pt; c: Pt; b: Pt; nodes: number; len: number; from?: number }
type Shape = { box: string; twigs: Twig[]; berries: [number, number, number][] }

const n1 = (n: number) => Math.round(n * 10) / 10

/** A stem from a to b (bent through c) with needle pairs along it and a three-needle tip. */
function twigPath({ a, c, b, nodes, len, from = 0.2 }: Twig): string {
  let d = `M${a[0]} ${a[1]}Q${c[0]} ${c[1]} ${b[0]} ${b[1]}`
  for (let i = 0; i <= nodes; i++) {
    const t = from + ((1 - from) * i) / nodes
    const u = 1 - t
    const x = u * u * a[0] + 2 * u * t * c[0] + t * t * b[0]
    const y = u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]
    const angle = Math.atan2(u * (c[1] - a[1]) + t * (b[1] - c[1]), u * (c[0] - a[0]) + t * (b[0] - c[0]))
    const l = len * (1 - 0.45 * t) * (0.84 + 0.16 * Math.sin(i * 1.9))
    const spread = i === nodes ? [-0.5, 0, 0.5] : [-0.8 - 0.1 * Math.sin(i * 2.7), 0.8 + 0.1 * Math.cos(i * 2.1)]
    for (const s of spread) d += `M${n1(x)} ${n1(y)}L${n1(x + Math.cos(angle + s) * l)} ${n1(y + Math.sin(angle + s) * l)}`
  }
  return d
}

const SHAPES: Record<"tall" | "lean" | "cluster" | "spray", Shape> = {
  // Upright, three side shoots: the centre arch
  tall: {
    box: "0 0 120 210",
    twigs: [
      { a: [60, 210], c: [68, 118], b: [57, 22], nodes: 20, len: 16, from: 0.14 },
      { a: [63, 158], c: [88, 146], b: [101, 108], nodes: 8, len: 12 },
      { a: [64, 126], c: [36, 116], b: [22, 80], nodes: 8, len: 12 },
      { a: [62, 92], c: [82, 84], b: [92, 56], nodes: 7, len: 10 },
    ],
    berries: [[73, 166, 5.5], [81, 174, 4], [51, 132, 5], [44, 140, 3.6]],
  },
  // Leaning to the right with two shoots: the left arch
  lean: {
    box: "0 0 120 180",
    twigs: [
      { a: [40, 180], c: [42, 96], b: [78, 26], nodes: 18, len: 15, from: 0.16 },
      { a: [44, 122], c: [24, 104], b: [20, 68], nodes: 8, len: 11 },
      { a: [53, 86], c: [80, 86], b: [98, 66], nodes: 7, len: 10 },
    ],
    berries: [[34, 126, 5], [29, 136, 3.8], [62, 96, 4.4]],
  },
  // A short twig heavy with berries: the right arch
  cluster: {
    box: "0 0 120 150",
    twigs: [
      { a: [64, 150], c: [58, 96], b: [70, 30], nodes: 14, len: 14, from: 0.22 },
      { a: [62, 108], c: [40, 100], b: [24, 70], nodes: 7, len: 11 },
      { a: [64, 84], c: [84, 80], b: [100, 54], nodes: 7, len: 10 },
    ],
    berries: [[50, 116, 7], [40, 127, 5.5], [54, 131, 4.5], [76, 94, 6], [86, 103, 4.5]],
  },
  // Two shoots from a knot of berries: section dividers and small marks
  spray: {
    box: "0 0 120 44",
    twigs: [
      { a: [58, 28], c: [34, 34], b: [6, 16], nodes: 10, len: 10, from: 0.18 },
      { a: [62, 28], c: [86, 34], b: [114, 16], nodes: 10, len: 10, from: 0.18 },
    ],
    berries: [[60, 24, 5], [52, 32, 3.4], [68, 32, 3.8]],
  },
}

export function Sprig({
  shape = "tall",
  className,
  berry = "#7A7B52",
  weight = 1.3,
}: {
  shape?: keyof typeof SHAPES
  className?: string
  /** Berry fill. The needles and berry outlines take the current text colour. */
  berry?: string
  weight?: number
}) {
  const { box, twigs, berries } = SHAPES[shape]
  return (
    <svg
      viewBox={box}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d={twigs.map(twigPath).join("")} />
      {berries.map(([x, y, r]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r={r} fill={berry} />
          <path
            d={`M${n1(x - r * 0.52)} ${n1(y - r * 0.08)}A${n1(r * 0.56)} ${n1(r * 0.56)} 0 0 1 ${n1(x - r * 0.06)} ${n1(y - r * 0.54)}`}
            stroke="#fff"
            strokeOpacity={0.7}
            strokeWidth={weight * 0.8}
          />
        </g>
      ))}
    </svg>
  )
}

/** Section divider: a sprig between two thin clay rules. */
export function SprigRule({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto flex max-w-md items-center gap-4 px-6 text-[#B5543A] ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-[#B5543A]/45" />
      <Sprig shape="spray" className="h-9 w-24 shrink-0" />
      <span className="h-px flex-1 bg-[#B5543A]/45" />
    </div>
  )
}
