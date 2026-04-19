"use client"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { TESTIMONIALS } from "@/lib/constants"

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold font-medium text-sm uppercase tracking-widest">Client Love</span>
          <h2 className="font-display text-4xl font-bold text-midnight mt-2">What Our Clients Say</h2>
          <p className="mt-4 text-muted-foreground">Real results from real Toronto businesses.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-[#F8F9FB] rounded-2xl p-8 border border-border flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} className="text-gold" fill="currentColor" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-midnight flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-midnight text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
