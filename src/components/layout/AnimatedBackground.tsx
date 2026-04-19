"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  hue: number
}

interface Orb {
  id: number
  x: string
  y: string
  size: number
  hue: number
  duration: number
  delay: number
  blur: number
}

/* ─── Constants ──────────────────────────────────────────────────────────── */
const PARTICLE_COUNT = 60
const CONNECTION_DISTANCE = 140
const ORB_COUNT = 6

function generateOrbs(): Orb[] {
  const positions = [
    { x: "10%", y: "15%" },
    { x: "75%", y: "8%" },
    { x: "45%", y: "60%" },
    { x: "85%", y: "70%" },
    { x: "20%", y: "80%" },
    { x: "60%", y: "30%" },
  ]
  return Array.from({ length: ORB_COUNT }, (_, i) => ({
    id: i,
    x: positions[i].x,
    y: positions[i].y,
    size: 300 + i * 80,
    hue: [201, 44, 220, 195, 35, 260][i],
    duration: 12 + i * 3,
    delay: i * 1.5,
    blur: 80 + i * 20,
  }))
}

/* ─── Particle Canvas ────────────────────────────────────────────────────── */
function ParticleCanvas({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: mouseX, y: mouseY })

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY }
  }, [mouseX, mouseY])

  const initParticles = useCallback((w: number, h: number) => {
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.6 ? 44 : 201, // gold or cyan
    }))
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
        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100) {
          const force = (100 - dist) / 100
          p.vx += (dx / dist) * force * 0.3
          p.vy += (dy / dist) * force * 0.3
        }

        // Speed damping
        p.vx *= 0.99
        p.vy *= 0.99

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle =
          p.hue === 44
            ? `rgba(201,168,76,${p.opacity})`
            : `rgba(82,193,220,${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i]
          const b = particlesRef.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.12
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(201,168,76,${alpha})`
            ctx.lineWidth = 0.5
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
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  )
}

/* ─── Dot Grid ───────────────────────────────────────────────────────────── */
function DotGrid() {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(201,168,76,0.12) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        maskImage: `radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)`,
      }}
      aria-hidden="true"
    />
  )
}

/* ─── Floating Lines ─────────────────────────────────────────────────────── */
function FloatingLines() {
  const lines = [
    { x1: "0%", y1: "30%", x2: "40%", y2: "0%", delay: 0 },
    { x1: "60%", y1: "0%", x2: "100%", y2: "50%", delay: 2 },
    { x1: "100%", y1: "70%", x2: "55%", y2: "100%", delay: 1 },
    { x1: "45%", y1: "100%", x2: "0%", y2: "65%", delay: 3 },
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.06 }}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {lines.map((line, i) => (
        <motion.line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="url(#lineGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: line.delay, ease: "easeInOut" }}
        />
      ))}
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#52C1DC" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ─── Scanning Line ──────────────────────────────────────────────────────── */
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), rgba(82,193,220,0.4), transparent)",
        boxShadow: "0 0 20px rgba(201,168,76,0.2)",
      }}
      initial={{ top: "-2%" }}
      animate={{ top: "102%" }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: 4,
      }}
      aria-hidden="true"
    />
  )
}

/* ─── Corner Decorators ──────────────────────────────────────────────────── */
function CornerBrackets() {
  const size = 40
  const stroke = "rgba(201,168,76,0.25)"
  const corners = [
    { top: 24, left: 24, rotate: 0 },
    { top: 24, right: 24, rotate: 90 },
    { bottom: 24, right: 24, rotate: 180 },
    { bottom: 24, left: 24, rotate: 270 },
  ]

  return (
    <>
      {corners.map((pos, i) => (
        <motion.svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 40 40"
          className="absolute"
          style={{ ...pos } as React.CSSProperties}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: "easeOut" }}
          aria-hidden="true"
        >
          <path
            d="M0 20 L0 0 L20 0"
            fill="none"
            stroke={stroke}
            strokeWidth="1.5"
            style={{ transform: `rotate(${pos.rotate}deg)`, transformOrigin: "50% 50%" }}
          />
        </motion.svg>
      ))}
    </>
  )
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Parallax for orbs on scroll
  const orbY1 = useTransform(scrollY, [0, 1000], [0, -120])
  const orbY2 = useTransform(scrollY, [0, 1000], [0, -60])
  const orbY3 = useTransform(scrollY, [0, 1000], [0, -180])
  const orbOpacity = useTransform(scrollY, [0, 600], [1, 0.4])

  // Smooth mouse values
  const rawMouseX = useMotionValue(0)
  const rawMouseY = useMotionValue(0)
  const smoothMouseX = useSpring(rawMouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(rawMouseY, { stiffness: 50, damping: 20 })

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

  const orbs = generateOrbs()

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-[#03050F]" />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.025,
          mixBlendMode: "overlay",
        }}
      />

      {/* Mesh gradient orbs */}
      <motion.div style={{ opacity: orbOpacity }} className="absolute inset-0">
        {/* Primary large orb — top left */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            left: "-15%",
            top: "-10%",
            background:
              "radial-gradient(circle at center, rgba(10,15,44,0.9) 0%, rgba(82,193,220,0.15) 40%, transparent 70%)",
            filter: "blur(60px)",
            y: orbY1,
          }}
        />

        {/* Gold orb — top right */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            right: "-8%",
            top: "-5%",
            background:
              "radial-gradient(circle at center, rgba(201,168,76,0.18) 0%, rgba(201,168,76,0.06) 50%, transparent 70%)",
            filter: "blur(80px)",
            y: orbY2,
          }}
        />

        {/* Cyan orb — center */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            left: "30%",
            top: "25%",
            background:
              "radial-gradient(circle at center, rgba(82,193,220,0.10) 0%, transparent 70%)",
            filter: "blur(100px)",
            y: orbY3,
          }}
        />

        {/* Deep blue orb — bottom left */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 800,
            height: 800,
            left: "-20%",
            bottom: "-20%",
            background:
              "radial-gradient(circle at center, rgba(10,15,44,0.95) 0%, rgba(82,193,220,0.08) 50%, transparent 70%)",
            filter: "blur(80px)",
            y: orbY1,
          }}
        />
      </motion.div>

      {/* Animated floating orbs with pulse */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size * 0.3,
            height: orb.size * 0.3,
            left: orb.x,
            top: orb.y,
            background:
              orb.hue === 44
                ? "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)"
                : orb.hue === 201
                ? "radial-gradient(circle, rgba(82,193,220,0.07) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(10,15,80,0.1) 0%, transparent 70%)",
            filter: `blur(${orb.blur * 0.3}px)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mouse-tracking highlight */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.06) 0%, rgba(82,193,220,0.04) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Dot grid pattern */}
      <DotGrid />

      {/* SVG floating accent lines */}
      <FloatingLines />

      {/* Particle network canvas */}
      <ParticleCanvas mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Scanning line effect */}
      <ScanLine />

      {/* Corner brackets */}
      <CornerBrackets />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(3,5,15,0.6) 100%)",
        }}
      />

      {/* Top gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to bottom, rgba(3,5,15,0.4), transparent)",
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, rgba(3,5,15,0.6), transparent)",
        }}
      />
    </div>
  )
}
