"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, MapPin, ShieldCheck } from "lucide-react"

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(10,15,44,0.06)_0%,_transparent_60%)]" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-6">
              <Star size={14} fill="currentColor" />
              GTA&apos;s #1 AI &amp; Digital Agency
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-midnight leading-tight tracking-tight"
          >
            Toronto&apos;s AI &amp;{" "}
            <span className="text-gold">Digital Growth</span>{" "}
            Partner
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Stop losing customers to competitors. Hijaz.ai automates your workflows,
            builds your digital presence, and drives real growth —{" "}
            <span className="text-midnight font-medium">all from one trusted Toronto team.</span>
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="w-full sm:w-auto bg-midnight text-white hover:bg-midnight/90 shadow-lg shadow-midnight/20 text-base px-8">
              <Link href="/contact">Book Free Consultation <ArrowRight size={16} className="ml-2" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-midnight/20 text-midnight hover:bg-midnight/5 text-base px-8">
              <Link href="/services">See Our Services</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-1.5"><Star size={14} className="text-gold" fill="currentColor" /> 4.9/5 · 30+ Reviews</span>
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gold" /> Toronto-Based</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-gold" /> 100% Satisfaction Guarantee</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
