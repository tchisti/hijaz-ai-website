"use client"
import Link from "next/link"
import type { ElementType } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Plus, Bot, Code2, ShoppingBag, Printer, TrendingUp } from "lucide-react"
import { SERVICES } from "@/lib/constants"

const ICON_MAP: Record<string, ElementType> = { Bot, Code2, ShoppingBag, Printer, TrendingUp }

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-[#F8F9FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold font-medium text-sm uppercase tracking-widest">What We Do</span>
          <h2 className="font-display text-4xl font-bold text-midnight mt-2">Services That Drive Growth</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            From AI automation to full brand identity — everything your Toronto business needs to compete and win online.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {SERVICES.map((service) => {
            const Icon = ICON_MAP[service.icon] ?? Bot
            return (
              <motion.div key={service.id} variants={item}>
                <Link href={service.href}
                  className="group block h-full bg-white rounded-2xl p-7 border border-border hover:border-gold/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-midnight/5 flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors">
                    <Icon size={22} className="text-midnight group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-midnight mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.shortDesc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-gold group-hover:gap-2 transition-all">
                    Learn More <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            )
          })}
          {/* 6th CTA card */}
          <motion.div variants={item}>
            <Link href="/services"
              className="group flex flex-col items-center justify-center h-full bg-midnight rounded-2xl p-7 border border-midnight hover:bg-midnight/90 transition-colors min-h-[200px]">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <Plus size={22} className="text-gold" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white mb-2">View All Services</h3>
              <p className="text-white/60 text-sm text-center">See the full range of solutions we offer Toronto businesses.</p>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
