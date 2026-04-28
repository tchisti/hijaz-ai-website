"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Bot, Code2, ShoppingBag, Printer, TrendingUp } from "lucide-react"
import type { ComponentType } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Service } from "@/lib/constants"
import { cn } from "@/lib/utils"

const ICON_MAP: Record<string, ComponentType<{ size?: number | string; className?: string }>> = { Bot, Code2, ShoppingBag, Printer, TrendingUp }

interface Props {
  service: Service
  index: number
}

export default function ServiceDetailSection({ service, index }: Props) {
  const Icon = ICON_MAP[service.icon] ?? Bot
  const isEven = index % 2 === 0

  return (
    <section
      id={service.slug}
      className={cn(
        "py-20 border-b border-border last:border-0",
        !isEven && "bg-muted/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
      )}
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(!isEven && "lg:order-2")}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center">
              <Icon size={20} className="text-foreground" />
            </div>
            <span className="text-gold font-medium text-sm uppercase tracking-widest">Service</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">{service.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{service.fullDesc}</p>

          {/* Benefits */}
          <ul className="space-y-3 mb-6">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center">
                  <Check size={12} className="text-gold" />
                </span>
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Use cases */}
          <div className="flex flex-wrap gap-2 mb-6">
            {service.useCases.map((useCase) => (
              <Badge key={useCase} variant="secondary" className="text-xs">{useCase}</Badge>
            ))}
          </div>

          {/* Pricing teaser */}
          <p className="text-sm text-muted-foreground mb-6">
            <span className="font-semibold text-foreground">{service.pricingTeaser}</span> · Free consultation included
          </p>

          <Button asChild className="bg-midnight text-white hover:bg-midnight/90">
            <Link href="/contact">Get Started <ArrowRight size={16} className="ml-2" /></Link>
          </Button>
        </motion.div>

        {/* Visual side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(!isEven && "lg:order-1")}
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-midnight to-blue-900 aspect-[4/3] flex items-center justify-center">
            <Icon size={80} className="text-white/10" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-midnight/40" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-display text-xl font-bold text-white">{service.title}</p>
              <p className="text-gold text-sm mt-1">{service.pricingTeaser}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
