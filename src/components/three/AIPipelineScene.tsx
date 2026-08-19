"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Line, Sparkles } from "@react-three/drei"
import { useMemo, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import * as THREE from "three"

const GOLD = "#C9A84C"
const GOLD_LIGHT = "#E8C46A"
const CYAN = "#52C1DC"
const NAVY = "#07111F"

const orbitNodes: Array<{
  position: [number, number, number]
  color: string
  scale: number
}> = [
  { position: [-2.55, 1.25, 0.15], color: CYAN, scale: 0.42 },
  { position: [2.5, 1.15, -0.1], color: GOLD_LIGHT, scale: 0.5 },
  { position: [2.25, -1.55, 0.3], color: CYAN, scale: 0.38 },
  { position: [-2.4, -1.4, -0.2], color: GOLD, scale: 0.46 },
]

function GrowthCore({ reduced }: { reduced: boolean }) {
  const core = useRef<THREE.Mesh>(null!)
  const shell = useRef<THREE.Mesh>(null!)
  const ringOne = useRef<THREE.Mesh>(null!)
  const ringTwo = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }, delta) => {
    if (reduced) return
    core.current.rotation.y += delta * 0.25
    core.current.rotation.x += delta * 0.16
    shell.current.rotation.y -= delta * 0.18
    ringOne.current.rotation.z += delta * 0.18
    ringTwo.current.rotation.z -= delta * 0.12
    const pulse = 1 + Math.sin(clock.elapsedTime * 1.6) * 0.035
    core.current.scale.setScalar(pulse)
  })

  return (
    <group>
      <Float speed={reduced ? 0 : 1.1} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.05, 2]} />
          <meshStandardMaterial color={GOLD_LIGHT} emissive={GOLD} emissiveIntensity={1.1} metalness={0.72} roughness={0.18} />
        </mesh>
        <mesh ref={shell}>
          <icosahedronGeometry args={[1.48, 1]} />
          <meshBasicMaterial color={GOLD_LIGHT} wireframe transparent opacity={0.38} />
        </mesh>
        <mesh ref={ringOne} rotation={[Math.PI / 2.3, 0.15, 0]}>
          <torusGeometry args={[1.95, 0.018, 8, 96]} />
          <meshBasicMaterial color={GOLD} transparent opacity={0.65} />
        </mesh>
        <mesh ref={ringTwo} rotation={[Math.PI / 2.7, Math.PI / 2, 0.3]}>
          <torusGeometry args={[2.2, 0.012, 8, 96]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.42} />
        </mesh>
      </Float>
      <pointLight color={GOLD} intensity={2.2} distance={7} />
      <Sparkles count={48} scale={4.2} size={2.2} speed={reduced ? 0 : 0.25} color={GOLD_LIGHT} />
    </group>
  )
}

function OutcomeNode({ position, color, scale, reduced, index }: {
  position: [number, number, number]
  color: string
  scale: number
  reduced: boolean
  index: number
}) {
  const group = useRef<THREE.Group>(null!)
  useFrame(({ clock }) => {
    if (reduced || !group.current) return
    group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.9 + index * 1.4) * 0.1
    group.current.rotation.y = clock.elapsedTime * 0.18 + index
  })

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} metalness={0.65} roughness={0.2} />
      </mesh>
      <mesh scale={1.38}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.45} />
      </mesh>
      <pointLight color={color} intensity={0.65} distance={2.5} />
    </group>
  )
}

function FlowPath({ position, color, reduced, offset }: {
  position: [number, number, number]
  color: string
  reduced: boolean
  offset: number
}) {
  const curve = useMemo(() => {
    const start = new THREE.Vector3(0, 0, 0)
    const end = new THREE.Vector3(...position)
    const control = start.clone().lerp(end, 0.5)
    control.z += 0.7
    control.y += position[1] > 0 ? 0.35 : -0.35
    return new THREE.QuadraticBezierCurve3(start, control, end)
  }, [position])
  const points = useMemo(() => curve.getPoints(40), [curve])
  const particle = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (reduced || !particle.current) return
    const t = (clock.elapsedTime * 0.15 + offset) % 1
    particle.current.position.copy(curve.getPointAt(t))
  })

  return (
    <group>
      <Line points={points} color={color} lineWidth={1} transparent opacity={0.28} />
      <mesh ref={particle}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

function GrowthEngine({ reduced }: { reduced: boolean }) {
  const root = useRef<THREE.Group>(null!)

  useFrame(({ mouse, clock }) => {
    if (!root.current) return
    if (reduced) {
      root.current.rotation.set(-0.03, 0, 0)
      return
    }
    const targetX = -mouse.y * 0.11
    const targetY = mouse.x * 0.18
    root.current.rotation.x += (targetX - root.current.rotation.x) * 0.035
    root.current.rotation.y += (targetY - root.current.rotation.y) * 0.035
    root.current.position.y = Math.sin(clock.elapsedTime * 0.35) * 0.04
  })

  return (
    <group ref={root} rotation={[-0.03, 0, 0]}>
      <GrowthCore reduced={reduced} />
      {orbitNodes.map((node, index) => (
        <group key={`${node.position.join("-")}-${index}`}>
          <FlowPath position={node.position} color={node.color} reduced={reduced} offset={index / orbitNodes.length} />
          <OutcomeNode {...node} reduced={reduced} index={index} />
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.25, 0.008, 6, 120]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.14} />
      </mesh>
    </group>
  )
}

export default function AIPipelineScene() {
  const reduced = useReducedMotion() ?? false

  return (
    <Canvas
      camera={{ position: [0, 0.15, 7.6], fov: 43 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} color={NAVY} />
      <directionalLight position={[4, 5, 5]} intensity={0.9} color={GOLD_LIGHT} />
      <directionalLight position={[-4, -2, 3]} intensity={0.55} color={CYAN} />
      <GrowthEngine reduced={reduced} />
    </Canvas>
  )
}
