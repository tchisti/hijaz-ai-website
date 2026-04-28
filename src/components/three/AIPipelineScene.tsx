"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Line, OrbitControls, Sparkles } from "@react-three/drei"
import { useMemo, useRef } from "react"
import * as THREE from "three"

/* ─────────────────────────────────────────────────────────────────────────────
 *  Hijaz.ai — AI Automation Pipeline 3D Hero
 *  Three nodes laid out left-to-right:
 *    1. Data Input  (faceted crystal cube, cyan particles)
 *    2. Intelligent Processing (gold wireframe icosahedron, pulse glow)
 *    3. Automated Actions (three floating action panels, cyan)
 *  Connected by curved particle streams that flow continuously.
 * ────────────────────────────────────────────────────────────────────────── */

const GOLD = "#C9A84C"
const GOLD_WARM = "#E8C46A"
const CYAN = "#52C1DC"

/* ─── Node 1: Data Input — Crystal Cube ─────────────────────────────────── */
function DataNode({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)
  const cubeRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.3
    if (cubeRef.current) cubeRef.current.rotation.x += delta * 0.2
  })

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <group ref={groupRef}>
          {/* Solid inner cube */}
          <mesh ref={cubeRef}>
            <boxGeometry args={[1.1, 1.1, 1.1]} />
            <meshStandardMaterial
              color={CYAN}
              emissive={CYAN}
              emissiveIntensity={0.4}
              metalness={0.8}
              roughness={0.15}
            />
          </mesh>
          {/* Wireframe shell */}
          <mesh>
            <boxGeometry args={[1.45, 1.45, 1.45]} />
            <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.35} />
          </mesh>
        </group>
      </Float>
      <Sparkles count={40} scale={2.2} size={2} speed={0.4} color={CYAN} />
    </group>
  )
}

/* ─── Node 2: Processing — Icosahedron Nucleus ──────────────────────────── */
function ProcessingNode({ position }: { position: [number, number, number] }) {
  const innerRef = useRef<THREE.Mesh>(null!)
  const outerRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }, delta) => {
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.5
      innerRef.current.rotation.y += delta * 0.4
      const pulse = 1 + Math.sin(clock.elapsedTime * 2) * 0.06
      innerRef.current.scale.setScalar(pulse)
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.25
      outerRef.current.rotation.z += delta * 0.15
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.6
    }
  })

  return (
    <group position={position}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        {/* Glow core */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial
            color={GOLD_WARM}
            emissive={GOLD}
            emissiveIntensity={0.9}
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>
        {/* Wireframe shell */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.55} />
        </mesh>
        {/* Equatorial ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.85, 0.025, 12, 96]} />
          <meshBasicMaterial color={GOLD_WARM} transparent opacity={0.7} />
        </mesh>
      </Float>
      <Sparkles count={70} scale={3.4} size={2.4} speed={0.5} color={GOLD} />
      <pointLight color={GOLD} intensity={1.4} distance={6} />
    </group>
  )
}

/* ─── Node 3: Automated Actions — Floating Panels ───────────────────────── */
function ActionPanel({
  position,
  delay,
  color,
}: {
  position: [number, number, number]
  delay: number
  color: string
}) {
  const ref = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.6 + delay) * 0.25
    ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.2 + delay) * 0.1
  })
  return (
    <group ref={ref} position={position}>
      <mesh>
        <planeGeometry args={[0.95, 0.55]} />
        <meshStandardMaterial
          color="#0A1828"
          emissive={color}
          emissiveIntensity={0.25}
          metalness={0.4}
          roughness={0.4}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* Border */}
      <mesh position={[0, 0, 0.001]}>
        <planeGeometry args={[0.97, 0.57]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} wireframe />
      </mesh>
      {/* Inner indicator bar */}
      <mesh position={[-0.18, 0, 0.01]}>
        <planeGeometry args={[0.5, 0.06]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[-0.25, -0.13, 0.01]}>
        <planeGeometry args={[0.36, 0.04]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

function ActionsNode({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
        <ActionPanel position={[0, 0.85, 0]} delay={0} color={CYAN} />
        <ActionPanel position={[0.15, 0, 0]} delay={1.5} color={GOLD_WARM} />
        <ActionPanel position={[0, -0.85, 0]} delay={3} color={CYAN} />
      </Float>
      <Sparkles count={35} scale={2.4} size={2} speed={0.4} color={CYAN} />
    </group>
  )
}

/* ─── Flowing connection between nodes ──────────────────────────────────── */
function ConnectionStream({
  from,
  to,
  color,
  count = 14,
}: {
  from: [number, number, number]
  to: [number, number, number]
  color: string
  count?: number
}) {
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...from)
    const end = new THREE.Vector3(...to)
    const mid = start.clone().lerp(end, 0.5)
    mid.y += 0.6
    return new THREE.QuadraticBezierCurve3(start, mid, end)
  }, [from, to])

  const points = useMemo(() => curve.getPoints(64), [curve])
  const particlesRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    if (!particlesRef.current) return
    particlesRef.current.children.forEach((child, i) => {
      const t = ((clock.elapsedTime * 0.25 + i / count) % 1)
      const p = curve.getPointAt(t)
      child.position.copy(p)
      const mesh = child as THREE.Mesh
      const mat = mesh.material as THREE.MeshBasicMaterial
      // Fade in/out at endpoints
      const fade = Math.sin(t * Math.PI)
      mat.opacity = fade * 0.95
    })
  })

  return (
    <group>
      <Line
        points={points}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.25}
      />
      <group ref={particlesRef}>
        {Array.from({ length: count }).map((_, i) => (
          <mesh key={i}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.9} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ─── Pipeline composition ──────────────────────────────────────────────── */
function Pipeline() {
  const groupRef = useRef<THREE.Group>(null!)

  // Subtle global drift for parallax feel
  useFrame(({ mouse, clock }) => {
    if (!groupRef.current) return
    const targetY = mouse.x * 0.15
    const targetX = -mouse.y * 0.08
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.4) * 0.05
  })

  const left: [number, number, number] = [-3.6, 0, 0]
  const center: [number, number, number] = [0, 0, 0]
  const right: [number, number, number] = [3.6, 0, 0]

  return (
    <group ref={groupRef}>
      <DataNode position={left} />
      <ProcessingNode position={center} />
      <ActionsNode position={right} />

      <ConnectionStream from={left} to={center} color={CYAN} />
      <ConnectionStream from={center} to={right} color={GOLD_WARM} />
    </group>
  )
}

/* ─── Public Canvas component ───────────────────────────────────────────── */
export default function AIPipelineScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 8.5], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color={GOLD_WARM} />
      <directionalLight position={[-5, -2, 3]} intensity={0.35} color={CYAN} />

      <Pipeline />

      {/* Optional gentle interaction; disabled rotate to keep layout intact */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  )
}
