import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { Rule } from "@/components/motion/Redline"
import { SITE_CONFIG } from "@/lib/constants"
import { cn } from "@/lib/utils"

/**
 * Section header styled as a drawing-sheet title strip:
 * sheet number on the left, sheet title on the right, a rule that draws in.
 */
export function SheetHeader({
  number,
  title,
  tone = "paper",
  className,
}: {
  number: string
  title: string
  tone?: "paper" | "blueprint"
  className?: string
}) {
  return (
    <div className={cn(tone === "blueprint" ? "text-chalk/70" : "text-ink-soft", className)}>
      <div className="label flex items-baseline justify-between gap-4 pb-3">
        <span>
          <span className={tone === "blueprint" ? "text-highlight" : "text-redline-deep"}>Sheet {number}</span>
          <span className="mx-2 opacity-50">/</span>
          {title}
        </span>
        <span className="hidden sm:inline">Hijaz.ai · Rev {new Date().getFullYear()}</span>
      </div>
      <Rule className={tone === "blueprint" ? "text-chalk/40" : "text-ink/30"} />
    </div>
  )
}

/** Page shell used by inner pages: breadcrumb, sheet label, headline, intro */
export function PageHero({
  label,
  title,
  intro,
  breadcrumb,
  children,
}: {
  label: string
  title: ReactNode
  intro?: ReactNode
  breadcrumb: { name: string; href?: string }[]
  children?: ReactNode
}) {
  return (
    <section className="grid-paper border-b border-ink/15">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16">
        <nav aria-label="Breadcrumb" className="label mb-10 flex flex-wrap items-center gap-2 text-ink-soft">
          <Link href="/" className="hover:text-redline-deep">
            Home
          </Link>
          {breadcrumb.map((b) => (
            <span key={b.name} className="flex items-center gap-2">
              <span aria-hidden="true" className="opacity-50">
                /
              </span>
              {b.href ? (
                <Link href={b.href} className="hover:text-redline-deep">
                  {b.name}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {b.name}
                </span>
              )}
            </span>
          ))}
        </nav>
        <p className="label mb-5 text-redline-deep">{label}</p>
        <h1 className="headline max-w-5xl text-[clamp(2.25rem,6vw,4.75rem)] text-ink">{title}</h1>
        {intro && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  )
}

const buttonBase =
  "group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[0.95rem] font-semibold tracking-tight transition-colors"

/** Primary action: solid red, the one thing on the page we want clicked */
export function PrimaryButton({
  href,
  children,
  className,
  external,
}: {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}) {
  const cls = cn(buttonBase, "bg-redline text-white hover:bg-redline-deep", className)
  const inner = (
    <>
      {children}
      <ArrowUpRight
        size={17}
        aria-hidden="true"
        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </>
  )
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  )
}

export function SecondaryButton({
  href,
  children,
  className,
  tone = "paper",
}: {
  href: string
  children: ReactNode
  className?: string
  tone?: "paper" | "blueprint"
}) {
  return (
    <Link
      href={href}
      className={cn(
        buttonBase,
        "border",
        tone === "blueprint"
          ? "border-chalk/40 text-chalk hover:border-chalk hover:bg-chalk hover:text-blueprint-deep"
          : "border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-paper",
        className
      )}
    >
      {children}
    </Link>
  )
}

/** The booking call-to-action used across the site */
export function BookCallButton({ className, label = "Book a 15-minute call" }: { className?: string; label?: string }) {
  return (
    <PrimaryButton href={SITE_CONFIG.bookingUrl} external className={className}>
      {label}
    </PrimaryButton>
  )
}
