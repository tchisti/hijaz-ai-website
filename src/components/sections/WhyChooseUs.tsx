"use client"
import { motion } from "framer-motion"
import { MapPin, Cpu, Zap, Headphones } from "lucide-react"

const reasons = [
  { icon: MapPin, title: "Local Toronto Experts", desc: "We know the GTA market inside out. Our team lives and works here — giving you an agency that truly understands your customers." },
  { icon: Cpu, title: "AI-Powered Solutions", desc: "We don't just build websites. We integrate intelligent automation that saves you time and captures more leads, 24/7." },
  { icon: Zap, title: "3-Day Turnaround", desc: "Most websites delivered in 3 business days. No months-long projects — you get results fast so you can start growing immediately." },
  { icon: Headphones, title: "Full Ongoing Support", desc: "We don't disappear after launch. Every client gets dedicated support, monthly check-ins, and a team that's always one message away." },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold font-medium text-sm uppercase tracking-widest">Why Hijaz.ai</span>
          <h2 className="font-display text-4xl font-bold text-foreground mt-2">Built for Toronto Businesses</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Enterprise-level technology with the personal touch of a local partner who actually picks up the phone.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reasons.map((r) => (
            <motion.div key={r.title} variants={item}
              className="text-center p-6 rounded-2xl border border-border hover:border-gold/30 hover:shadow-md transition-all">
              <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center mx-auto mb-4">
                <r.icon size={26} className="text-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
