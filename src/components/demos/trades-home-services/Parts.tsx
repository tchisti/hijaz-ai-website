import type { ReactNode } from "react"
import { C, type FittingKind } from "./data"

/**
 * The Copperline drawing style: every pipe is one thick copper stroke with an
 * ink outline and a thin highlight. The long run down the page and the small
 * fitting icons are all built from the same three strokes.
 */
function Tube({ d, w }: { d: string[]; w: number }) {
  return (
    <g fill="none" strokeLinejoin="round">
      {d.map((p, i) => (
        <path key={`o${i}`} d={p} stroke={C.ink} strokeWidth={w + 4} />
      ))}
      {d.map((p, i) => (
        <path key={`c${i}`} d={p} stroke={C.copper} strokeWidth={w} />
      ))}
      {d.map((p, i) => (
        <path key={`s${i}`} d={p} stroke={C.shine} strokeWidth={w * 0.22} />
      ))}
    </g>
  )
}

/** A joint: a short, darker band across the pipe. `flat` is for horizontal pipe. */
function Collar({ x, y, flat, w = 9 }: { x: number; y: number; flat?: boolean; w?: number }) {
  const [cw, ch] = flat ? [w * 0.7, w + 9] : [w + 9, w * 0.7]
  return <rect x={x - cw / 2} y={y - ch / 2} width={cw} height={ch} rx={2} fill={C.copperDeep} stroke={C.ink} strokeWidth={2} />
}

const SPOKES = "M-23 0H23M-11.5-19.9L11.5 19.9M11.5-19.9L-11.5 19.9"

/** One 1400px module of the run. It starts and ends at x=34, so copies stack into one continuous pipe. */
const RUN = "M34-2V300a22 22 0 0 0 22 22h8a22 22 0 0 1 22 22V930a22 22 0 0 1-22 22h-8a22 22 0 0 0-22 22V1402"

/** The signature visual: a copper pipe with elbows, joints, a valve wheel and a gauge, as tall as its container. */
export function PipeRun({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" width="120" height="100%" className={className}>
      <defs>
        <g id="cl-run">
          <Tube w={18} d={[RUN]} />
          {[110, 284, 992, 1300].map((y) => (
            <Collar key={y} x={34} y={y} w={18} />
          ))}
          {[360, 800, 914].map((y) => (
            <Collar key={y} x={86} y={y} w={18} />
          ))}
          {/* Valve body and hand wheel */}
          <rect x={70} y={594} width={32} height={52} rx={6} fill={C.copperDeep} stroke={C.ink} strokeWidth={2} />
          <g transform="translate(86 620)">
            <g className="cl-wheel" fill="none" strokeLinecap="round">
              <circle r={23} stroke={C.cream} strokeWidth={11} />
              <path d={SPOKES} stroke={C.cream} strokeWidth={9} />
              <circle r={23} stroke={C.forest} strokeWidth={7} />
              <path d={SPOKES} stroke={C.forest} strokeWidth={5} />
            </g>
            <circle r={7} fill={C.copper} stroke={C.ink} strokeWidth={2} />
          </g>
          {/* Pressure gauge on a short stub */}
          <path d="M44 1150H60" stroke={C.ink} strokeWidth={11} />
          <path d="M44 1150H60" stroke={C.copperDeep} strokeWidth={7} />
          <circle cx={78} cy={1150} r={19} fill={C.cream} stroke={C.ink} strokeWidth={3} />
          <path d="M66.5 1158.5A14.3 14.3 0 1 1 89.5 1158.5" fill="none" stroke={C.forest} strokeWidth={3} strokeLinecap="round" />
          <path d="M78 1150L86 1141" stroke={C.copperDeep} strokeWidth={3} strokeLinecap="round" />
          <circle cx={78} cy={1150} r={3} fill={C.ink} />
        </g>
      </defs>
      {Array.from({ length: 9 }, (_, i) => (
        <use key={i} href="#cl-run" y={i * 1400} />
      ))}
    </svg>
  )
}

const ICONS: Record<FittingKind, ReactNode> = {
  elbow: (
    <>
      <Tube w={9} d={["M13 47V25a12 12 0 0 1 12-12h22"]} />
      <Collar x={13} y={38} />
      <Collar x={38} y={13} flat />
    </>
  ),
  coupling: (
    <>
      <Tube w={9} d={["M1 16H47"]} />
      <Collar x={14} y={16} flat />
      <Collar x={34} y={16} flat />
      <path d="M24 28c-4.5 5.5-6 8-6 10.5a6 6 0 0 0 12 0c0-2.5-1.5-5-6-10.5z" fill="#DDE8DF" stroke={C.ink} strokeWidth={2} strokeLinejoin="round" />
    </>
  ),
  trap: (
    <>
      <Tube w={9} d={["M12 1V30a8 8 0 0 0 16 0v-4a6 6 0 0 1 6-6h13"]} />
      <Collar x={12} y={11} />
      <Collar x={40} y={20} flat />
    </>
  ),
  tank: (
    <>
      <Tube w={5} d={["M19 12V2", "M29 12V2"]} />
      <rect x={11} y={10} width={26} height={35} rx={7} fill={C.copper} stroke={C.ink} strokeWidth={2.5} />
      <path d="M17 18V32" stroke={C.shine} strokeWidth={3} strokeLinecap="round" />
      <rect x={20} y={34} width={8} height={6} rx={1.5} fill={C.ink} />
    </>
  ),
  flame: (
    <>
      <path d="M24 3c7 8 12 14 12 22a12 12 0 0 1-24 0c0-5 2-8 5-11c0 3 1 5 3 6c0-7 1-12 4-17z" fill={C.copper} stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M24 20c4 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2-6 6-10z" fill={C.shine} />
      <Tube w={7} d={["M3 40H45"]} />
    </>
  ),
  valve: (
    <>
      <Tube w={9} d={["M1 37H47"]} />
      <Tube w={4} d={["M24 31V16"]} />
      <rect x={16} y={29.5} width={16} height={15} rx={3} fill={C.copperDeep} stroke={C.ink} strokeWidth={2} />
      <g transform="translate(24 13) scale(0.43)" fill="none" strokeLinecap="round">
        <circle r={23} stroke={C.forest} strokeWidth={10} />
        <path d={SPOKES} stroke={C.forest} strokeWidth={7} />
      </g>
      <circle cx={24} cy={13} r={3} fill={C.copper} stroke={C.ink} strokeWidth={1.5} />
    </>
  ),
  tee: (
    <>
      <Tube w={9} d={["M1 15H47", "M24 15V47"]} />
      <Collar x={10} y={15} flat />
      <Collar x={38} y={15} flat />
      <Collar x={24} y={36} />
    </>
  ),
}

/** Small pipe-fitting icon in the same style as the run. Decorative. */
export function Fitting({ kind, className }: { kind: FittingKind; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className}>
      {ICONS[kind]}
    </svg>
  )
}

const VAN_BODY = "M22 150V50a14 14 0 0 1 14-14H296q10 0 17 9l39 51 40 8a14 14 0 0 1 12 14V150Z"

/** The clean white van, with the pipe as its livery and a length of copper on the roof rack. Decorative. */
export function Van({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 182" aria-hidden="true" focusable="false" className={className}>
      <path d="M52 30v8M250 30v8" stroke={C.ink} strokeWidth={5} />
      <Tube w={7} d={["M34 24H270"]} />
      <path d={VAN_BODY} fill="#fff" />
      <rect x={22} y={124} width={382} height={26} fill={C.forest} />
      <path d="M300 50h11l34 44h-45z" fill="#DDE8DF" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <path d="M288 46V124M272 104h8" fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
      <Tube w={8} d={["M22 111H236a12 12 0 0 0 12-12V60"]} />
      <Collar x={248} y={66} w={8} />
      <path d={VAN_BODY} fill="none" stroke={C.ink} strokeWidth={3.5} strokeLinejoin="round" />
      <rect x={392} y={110} width={11} height={13} rx={3} fill={C.shine} stroke={C.ink} strokeWidth={2.5} />
      <rect x={394} y={138} width={18} height={11} rx={3} fill={C.ink} />
      <text x={40} y={88} className="f-display" fontSize={35} fontWeight={800} letterSpacing={-1} fill={C.forest}>
        Copperline
      </text>
      <text x={154} y={143} className="f-display" fontSize={15} fontWeight={700} fill={C.cream}>
        (905) 555-0188
      </text>
      {[104, 330].map((x) => (
        <g key={x} transform={`translate(${x} 150)`}>
          <path d="M-31 0a31 31 0 0 1 62 0z" fill="#fff" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
          <circle r={24} fill={C.ink} />
          <circle r={10} fill="#DDE8DF" />
          <circle r={3} fill={C.ink} />
        </g>
      ))}
      <path d="M4 175.5H436" stroke={C.ink} strokeWidth={3} strokeLinecap="round" />
    </svg>
  )
}

/** A copper price tag with a punched hole. Text inside must stay large and bold. */
export function PriceTag({ children, className = "text-[24px]" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`f-display inline-flex -rotate-2 items-center gap-2 whitespace-nowrap rounded-[9px] border-2 border-[#1B1F1D] bg-[#C8642A] px-2.5 py-1.5 font-extrabold leading-none text-[#1B1F1D] shadow-[3px_3px_0_#1B1F1D] ${className}`}
    >
      <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#1B1F1D] bg-[#FAF6EE]" />
      {children}
    </span>
  )
}
