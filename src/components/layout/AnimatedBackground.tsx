"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "framer-motion"

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  color: string
  pulse: number
  pulseSpeed: number
}

/* ─── Constants ──────────────────────────────────────────────────────────── */
const PARTICLE_COUNT = 70
const CONNECTION_DISTANCE = 155

const DARK_PALETTE = {
  GOLD: "201,168,76",
  CYAN: "82,193,220",
  ACCENT: "80,60,200",
  base: "#03050F",
} as const

const LIGHT_PALETTE = {
  GOLD: "140,100,30",     // warm deep gold on light
  CYAN: "26,100,140",     // deep teal on light
  ACCENT: "90,70,190",    // indigo on light
  base: "#F8F7F3",
} as const

/* ─── useDarkMode hook ────────────────────────────────────────────────────── */
function useDarkMode() {
  const [isDark, setIsDark] = useState(true)
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"))
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])
  return isDark
}

/* ─── Aurora Bands ────────────────────────────────────────────────────────── */
function AuroraBands({ isDark }: { isDark: boolean }) {
  const d = isDark
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute"
        style={{
          width: "130%", height: "45%", left: "-15%", top: "-8%",
          background: d
            ? "radial-gradient(ellipse 55% 80% at 50% 50%, rgba(82,193,220,0.07) 0%, transparent 70%)"
            : "radial-gradient(ellipse 55% 80% at 50% 50%, rgba(26,122,154,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, 70, -50, 0], y: [0, 35, -20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute"
        style={{
          width: "85%", height: "65%", left: "-20%", top: "18%",
          background: d
            ? "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(201,168,76,0.055) 0%, transparent 70%)"
            : "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(184,146,42,0.07) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ x: [0, -55, 25, 0], y: [0, -45, 18, 0], scale: [1, 1.06, 1.1, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
      <motion.div
        className="absolute"
        style={{
          width: "75%", height: "75%", right: "-12%", top: "8%",
          background: d
            ? "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(40,30,130,0.13) 0%, transparent 70%)"
            : "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(100,80,210,0.05) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
        animate={{ x: [0, 45, -35, 0], y: [0, 55, -30, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute"
        style={{
          width: "100%", height: "55%", left: "0%", bottom: "-12%",
          background: d
            ? "radial-gradient(ellipse 75% 55% at 50% 85%, rgba(82,193,220,0.04) 0%, transparent 60%)"
            : "radial-gradient(ellipse 75% 55% at 50% 85%, rgba(26,122,154,0.04) 0%, transparent 60%)",
          filter: "blur(70px)",
        }}
        animate={{ y: [0, -25, 10, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 9 }}
      />
    </div>
  )
}

/* ─── Perspective Grid ────────────────────────────────────────────────────── */
function PerspectiveGrid() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ perspective: "700px" }}
    >
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          x: "-50%",
          width: "220%",
          height: "55vh",
          rotateX: "72deg",
          transformOrigin: "bottom center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 1.2 }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1400 550"
          preserveAspectRatio="none"
          style={{ opacity: 0.09 }}
        >
          <defs>
            <linearGradient id="gridFadeV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(201,168,76,0)" />
              <stop offset="35%" stopColor="rgba(201,168,76,0.5)" />
              <stop offset="100%" stopColor="rgba(201,168,76,1)" />
            </linearGradient>
            <linearGradient id="gridFadeH" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(82,193,220,0)" />
              <stop offset="50%" stopColor="rgba(82,193,220,0.4)" />
              <stop offset="100%" stopColor="rgba(82,193,220,0)" />
            </linearGradient>
          </defs>
          {/* Horizontal lines */}
          {Array.from({ length: 14 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 40}
              x2="1400"
              y2={i * 40}
              stroke={i < 4 ? "url(#gridFadeH)" : "url(#gridFadeV)"}
              strokeWidth="0.7"
            />
          ))}
          {/* Vanishing vertical lines */}
          {Array.from({ length: 29 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={i * 50}
              y1="550"
              x2="700"
              y2="0"
              stroke="url(#gridFadeV)"
              strokeWidth="0.6"
            />
          ))}
        </svg>
      </motion.div>
    </div>
  )
}

/* ─── Radial Pulse Rings ──────────────────────────────────────────────────── */
function PulseRings() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            border: `1px solid rgba(${i % 2 === 0 ? DARK_PALETTE.GOLD : DARK_PALETTE.CYAN},0.09)`,
            width: 220 + i * 200,
            height: 220 + i * 200,
          }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.09, 0.025, 0.09],
          }}
          transition={{
            duration: 7 + i * 1.8,
            delay: i * 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

/* ─── Geometric Shapes ────────────────────────────────────────────────────── */
function GeometricShapes({ isDark }: { isDark: boolean }) {
  const G = isDark ? DARK_PALETTE.GOLD : LIGHT_PALETTE.GOLD
  const C = isDark ? DARK_PALETTE.CYAN : LIGHT_PALETTE.CYAN
  const A = isDark ? DARK_PALETTE.ACCENT : LIGHT_PALETTE.ACCENT
  const shapes = useMemo(
    () => [
      { type: "hex", x: "7%", y: "16%", size: 58, delay: 0, duration: 16 },
      { type: "diamond", x: "88%", y: "11%", size: 42, delay: 2.2, duration: 19 },
      { type: "triangle", x: "91%", y: "54%", size: 48, delay: 1, duration: 13 },
      { type: "hex", x: "4%", y: "63%", size: 46, delay: 3.5, duration: 21 },
      { type: "diamond", x: "50%", y: "84%", size: 36, delay: 1.5, duration: 17 },
      { type: "triangle", x: "71%", y: "33%", size: 32, delay: 0.8, duration: 15 },
      { type: "hex", x: "35%", y: "5%", size: 28, delay: 4, duration: 18 },
    ],
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -22, 0],
            rotate: [0, 360],
            opacity: [0.045, 0.1, 0.045],
          }}
          transition={{
            y: { duration: shape.duration, repeat: Infinity, ease: "easeInOut", delay: shape.delay },
            rotate: { duration: shape.duration * 3.5, repeat: Infinity, ease: "linear" },
            opacity: { duration: shape.duration, repeat: Infinity, ease: "easeInOut", delay: shape.delay },
          }}
        >
          {shape.type === "hex" && (
            <svg width={shape.size} height={shape.size} viewBox="0 0 60 60">
              <polygon
                points="30,3 55,17.5 55,46.5 30,57 5,46.5 5,17.5"
                fill="none"
                stroke={`rgba(${G},0.65)`}
                strokeWidth="1.2"
              />
              <polygon
                points="30,12 46,21 46,39 30,48 14,39 14,21"
                fill="none"
                stroke={`rgba(${G},0.25)`}
                strokeWidth="0.6"
              />
            </svg>
          )}
          {shape.type === "diamond" && (
            <svg width={shape.size} height={shape.size} viewBox="0 0 40 40">
              <polygon
                points="20,2 38,20 20,38 2,20"
                fill="none"
                stroke={`rgba(${C},0.55)`}
                strokeWidth="1"
              />
              <polygon
                points="20,9 31,20 20,31 9,20"
                fill="none"
                stroke={`rgba(${C},0.2)`}
                strokeWidth="0.5"
              />
            </svg>
          )}
          {shape.type === "triangle" && (
            <svg width={shape.size} height={shape.size} viewBox="0 0 50 50">
              <polygon
                points="25,3 47,43 3,43"
                fill="none"
                stroke={`rgba(${A},0.5)`}
                strokeWidth="1"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Floating Accent Lines ───────────────────────────────────────────────── */
function FloatingLines() {
  const lines = [
    { x1: "0%", y1: "28%", x2: "38%", y2: "0%", delay: 0 },
    { x1: "62%", y1: "0%", x2: "100%", y2: "48%", delay: 2.2 },
    { x1: "100%", y1: "68%", x2: "53%", y2: "100%", delay: 1.1 },
    { x1: "47%", y1: "100%", x2: "0%", y2: "63%", delay: 3.3 },
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.055 }}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#52C1DC" />
        </linearGradient>
      </defs>
      {lines.map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="url(#lineGrad)"
          strokeWidth="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.5, delay: line.delay, ease: "easeInOut" }}
        />
      ))}
    </svg>
  )
}

/* ─── Particle Canvas ────────────────────────────────────────────────────── */
function ParticleCanvas({
  mouseX,
  mouseY,
  isDark,
}: {
  mouseX: number
  mouseY: number
  isDark: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: mouseX, y: mouseY })
  const isDarkRef = useRef(isDark)

  useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY }
  }, [mouseX, mouseY])

  const initParticles = useCallback((w: number, h: number) => {
    const p = isDarkRef.current ? DARK_PALETTE : LIGHT_PALETTE
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const rng = Math.random()
      return {
        id: i,
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        radius: Math.random() * 1.8 + 0.5,
        opacity: Math.random() * 0.42 + 0.1,
        color: rng > 0.55 ? p.GOLD : rng > 0.2 ? p.CYAN : p.ACCENT,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.006 + Math.random() * 0.009,
      }
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0
    let h = 0

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      initParticles(w, h)
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const { x: mx, y: my } = mouseRef.current

      particlesRef.current.forEach((p) => {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 130 && dist > 0) {
          const force = (130 - dist) / 130
          p.vx += (dx / dist) * force * 0.28
          p.vy += (dy / dist) * force * 0.28
        }

        p.vx *= 0.991
        p.vy *= 0.991
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        const pulsedOpacity = p.opacity * (0.65 + 0.35 * Math.sin(p.pulse))

        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Soft radial glow per particle
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5)
        g.addColorStop(0, `rgba(${p.color},${pulsedOpacity})`)
        g.addColorStop(1, `rgba(${p.color},0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      })

      // Connections
      const pal = isDarkRef.current ? DARK_PALETTE : LIGHT_PALETTE
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i]
          const b = particlesRef.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * (isDarkRef.current ? 0.11 : 0.14)
            const lineColor =
              a.color === pal.GOLD || b.color === pal.GOLD ? pal.GOLD : pal.CYAN
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${lineColor},${alpha})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    animFrameRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: isDark ? 0.82 : 0.65 }}
      aria-hidden="true"
    />
  )
}

/* ─── Mouse Glow ──────────────────────────────────────────────────────────── */
function MouseGlow({
  smoothMouseX,
  smoothMouseY,
}: {
  smoothMouseX: MotionValue<number>
  smoothMouseY: MotionValue<number>
}) {
  return (
    <>
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 640,
          height: 640,
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.045) 0%, rgba(82,193,220,0.02) 40%, transparent 70%)",
          filter: "blur(35px)",
        }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 100,
          height: 100,
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />
    </>
  )
}

/* ─── Dot Grid ───────────────────────────────────────────────────────────── */
function DotGrid({ isDark }: { isDark: boolean }) {
  const dotColor = isDark ? "rgba(201,168,76,0.11)" : "rgba(140,100,30,0.13)"
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
        backgroundSize: "44px 44px",
        maskImage: `radial-gradient(ellipse 85% 75% at 50% 50%, black 15%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(ellipse 85% 75% at 50% 50%, black 15%, transparent 100%)`,
      }}
      aria-hidden="true"
    />
  )
}

/* ─── Scan Line ──────────────────────────────────────────────────────────── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 pointer-events-none"
      style={{
        height: "2px",
        background:
          "linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.0) 8%, rgba(201,168,76,0.28) 38%, rgba(82,193,220,0.28) 62%, rgba(82,193,220,0.0) 92%, transparent 100%)",
        filter: "blur(1px)",
        boxShadow:
          "0 0 10px rgba(201,168,76,0.12), 0 0 20px rgba(82,193,220,0.08)",
      }}
      initial={{ top: "-2%" }}
      animate={{ top: "102%" }}
      transition={{
        duration: 11,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: 7,
      }}
      aria-hidden="true"
    />
  )
}

/* ─── Corner Brackets ────────────────────────────────────────────────────── */
function CornerBrackets() {
  const corners: Array<{ style: React.CSSProperties; rotate: number; dotCx: number; dotCy: number }> = [
    { style: { top: 22, left: 22 }, rotate: 0, dotCx: 0, dotCy: 0 },
    { style: { top: 22, right: 22 }, rotate: 90, dotCx: 48, dotCy: 0 },
    { style: { bottom: 22, right: 22 }, rotate: 180, dotCx: 48, dotCy: 48 },
    { style: { bottom: 22, left: 22 }, rotate: 270, dotCx: 0, dotCy: 48 },
  ]

  return (
    <>
      {corners.map((c, i) => (
        <motion.svg
          key={i}
          width={48}
          height={48}
          viewBox="0 0 48 48"
          className="absolute"
          style={c.style}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 + i * 0.13, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <motion.path
            d="M0 22 L0 0 L22 0"
            fill="none"
            stroke="rgba(201,168,76,0.32)"
            strokeWidth="1.5"
            style={{
              transform: `rotate(${c.rotate}deg)`,
              transformOrigin: "50% 50%",
            }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.9 + i * 0.13, duration: 1.3 }}
          />
          <motion.circle
            cx={c.dotCx}
            cy={c.dotCy}
            r="2.5"
            fill="rgba(201,168,76,0.55)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.2 + i * 0.13, type: "spring", stiffness: 200 }}
          />
        </motion.svg>
      ))}
    </>
  )
}

/* ─── Ambient Orbs ────────────────────────────────────────────────────────── */
function AmbientOrbs({
  orbY1, orbY2, orbY3, orbOpacity, isDark,
}: {
  orbY1: MotionValue<number>
  orbY2: MotionValue<number>
  orbY3: MotionValue<number>
  orbOpacity: MotionValue<number>
  isDark: boolean
}) {
  return (
    <motion.div style={{ opacity: orbOpacity }} className="absolute inset-0">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 820, height: 820, left: "-22%", top: "-18%",
          background: isDark
            ? "radial-gradient(circle at 40% 40%, rgba(82,193,220,0.13) 0%, rgba(10,15,80,0.18) 50%, transparent 70%)"
            : "radial-gradient(circle at 40% 40%, rgba(26,122,154,0.08) 0%, rgba(220,235,248,0.4) 50%, transparent 70%)",
          filter: "blur(65px)",
          y: orbY1,
        }}
        animate={{ scale: [1, 1.06, 1], rotate: [0, 6, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 620, height: 620, right: "-12%", top: "-10%",
          background: isDark
            ? "radial-gradient(circle at 60% 40%, rgba(201,168,76,0.15) 0%, transparent 65%)"
            : "radial-gradient(circle at 60% 40%, rgba(184,146,42,0.1) 0%, rgba(252,246,228,0.5) 50%, transparent 70%)",
          filter: "blur(85px)",
          y: orbY2,
        }}
        animate={{ scale: [1, 1.09, 1], rotate: [0, -9, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 720, height: 720, left: "22%", top: "18%",
          background: isDark
            ? "radial-gradient(circle at 50% 50%, rgba(82,193,220,0.07) 0%, transparent 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(26,122,154,0.05) 0%, transparent 70%)",
          filter: "blur(110px)",
          y: orbY3,
        }}
        animate={{ scale: [1, 1.13, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 950, height: 950, left: "-28%", bottom: "-28%",
          background: isDark
            ? "radial-gradient(circle at 40% 60%, rgba(10,15,80,0.75) 0%, rgba(82,193,220,0.055) 55%, transparent 70%)"
            : "radial-gradient(circle at 40% 60%, rgba(230,240,252,0.6) 0%, rgba(26,122,154,0.04) 55%, transparent 70%)",
          filter: "blur(90px)",
          y: orbY1,
        }}
      />
    </motion.div>
  )
}

/* ─── Main Component ──────────────────────────────────────────────────────── */
export default function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const isDark = useDarkMode()
  const { scrollY } = useScroll()

  const orbY1 = useTransform(scrollY, [0, 1000], [0, -130])
  const orbY2 = useTransform(scrollY, [0, 1000], [0, -65])
  const orbY3 = useTransform(scrollY, [0, 1000], [0, -200])
  const orbOpacity = useTransform(scrollY, [0, 700], [1, 0.35])

  const rawMouseX = useMotionValue(0)
  const rawMouseY = useMotionValue(0)
  const smoothMouseX = useSpring(rawMouseX, { stiffness: 40, damping: 18 })
  const smoothMouseY = useSpring(rawMouseY, { stiffness: 40, damping: 18 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      rawMouseX.set(e.clientX)
      rawMouseY.set(e.clientY)
      setMousePos({ x: e.clientX, y: e.clientY })
    },
    [rawMouseX, rawMouseY]
  )

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: isDark ? "#03050F" : "#F8F7F3" }}
        transition={{ duration: 0.5 }}
      />

      {/* Film grain noise */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: isDark ? 0.028 : 0.018,
          mixBlendMode: "overlay",
        }}
      />

      {/* Aurora light fields */}
      <AuroraBands isDark={isDark} />

      {/* Ambient depth orbs */}
      <AmbientOrbs
        orbY1={orbY1}
        orbY2={orbY2}
        orbY3={orbY3}
        orbOpacity={orbOpacity}
        isDark={isDark}
      />

      {/* Perspective grid floor */}
      <PerspectiveGrid />

      {/* Dot grid */}
      <DotGrid isDark={isDark} />

      {/* Radial breathing rings */}
      <PulseRings />

      {/* Floating geometric wireframes */}
      <GeometricShapes isDark={isDark} />

      {/* Diagonal accent lines */}
      <FloatingLines />

      {/* Particle network canvas */}
      <ParticleCanvas mouseX={mousePos.x} mouseY={mousePos.y} isDark={isDark} />

      {/* Mouse proximity glow */}
      <MouseGlow smoothMouseX={smoothMouseX} smoothMouseY={smoothMouseY} />

      {/* Horizontal scan line */}
      <ScanLine />

      {/* Corner bracket markers */}
      <CornerBrackets />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 42%, rgba(3,5,15,0.72) 100%)"
            : "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 42%, rgba(248,247,243,0.72) 100%)",
        }}
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-44"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(3,5,15,0.55), transparent)"
            : "linear-gradient(to bottom, rgba(248,247,243,0.55), transparent)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44"
        style={{
          background: isDark
            ? "linear-gradient(to top, rgba(3,5,15,0.72), transparent)"
            : "linear-gradient(to top, rgba(248,247,243,0.72), transparent)",
        }}
      />
    </div>
  )
}
