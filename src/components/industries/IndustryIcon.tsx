import {
  Briefcase,
  Building2,
  Car,
  Factory,
  GraduationCap,
  Hammer,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Truck,
  UtensilsCrossed,
  Zap,
  type LucideIcon,
} from "lucide-react"

const ICONS: Record<string, LucideIcon> = {
  Briefcase,
  Building2,
  Car,
  Factory,
  GraduationCap,
  Hammer,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Truck,
  UtensilsCrossed,
  Zap,
}

export default function IndustryIcon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const Icon = ICONS[name] ?? Briefcase
  return <Icon aria-hidden="true" size={size} strokeWidth={1.6} className={className} />
}
