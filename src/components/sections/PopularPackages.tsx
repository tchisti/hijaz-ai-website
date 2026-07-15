"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BUNDLES } from "@/lib/constants"
import { cn } from "@/lib/utils"

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function PopularPackages() {
  return (
    <section id="packages" className="py-20 border-b border-border">
      <div className="text-center mb-12">
        <span className="text-gold font-medium text-sm uppercase tracking-widest">Popular Packages</span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
          AI services, bundled for growth
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Three ready-made packages combining our most-requested AI services — pick the level that fits where your business is today.
        </p>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {BUNDLES.map((bundle) => (
          <motion.div key={bundle.id} variants={item} className="h-full">
            <div
              className={cn(
                "relative flex flex-col h-full bg-card rounded-2xl p-7 border transition-all duration-300",
                bundle.popular
                  ? "border-gold/60 shadow-lg"
                  : "border-border hover:border-gold/40"
              )}
            >
              {bundle.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-midnight hover:bg-gold font-semibold uppercase tracking-wider text-[10px]">
                  Most popular
                </Badge>
              )}
              <h3 className="font-display font-bold text-xl text-foreground mb-1">{bundle.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{bundle.tagline}</p>
              <p className="font-semibold text-foreground text-sm mb-6">{bundle.pricingTeaser}</p>
              <ul className="space-y-3 mb-6 flex-1">
                {bundle.includes.map((inclusion) => (
                  <li key={inclusion} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center">
                      <Check size={12} className="text-gold" />
                    </span>
                    <span className="text-sm text-muted-foreground">{inclusion}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mb-4">Free 15-min consultation included</p>
              <Button
                asChild
                className={cn(
                  "w-full font-semibold",
                  bundle.popular
                    ? "bg-gold text-midnight hover:bg-gold/90"
                    : "bg-midnight text-white hover:bg-midnight/90"
                )}
              >
                <Link href={`/contact?intent=call&service=${bundle.id}`}>
                  Book a free call <ArrowRight size={14} className="ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
