"use client"
import { useRef, useEffect } from "react"
import { motion, useInView, useMotionValue, animate } from "framer-motion"
import { STATS } from "@/lib/constants"

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionVal = useMotionValue(0)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionVal, value, { duration: 1.8, ease: "easeOut" })
    const unsubscribe = motionVal.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = (value % 1 === 0 ? Math.floor(v) : v.toFixed(1)) + suffix
      }
    })
    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [inView, motionVal, value, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export default function StatsBar() {
  return (
    <section className="bg-midnight py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl font-bold text-gold">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
