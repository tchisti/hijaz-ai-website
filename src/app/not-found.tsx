import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"
import { NAV_LINKS } from "@/lib/constants"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-lg text-center">
        {/* 404 number */}
        <p className="font-display text-[120px] sm:text-[160px] font-bold text-foreground/10 leading-none select-none">
          404
        </p>
        <div className="-mt-8 relative z-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild className="bg-midnight text-white hover:bg-midnight/90">
              <Link href="/"><Home size={16} className="mr-2" />Go Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-border text-foreground hover:bg-midnight hover:text-white">
              <Link href="/contact"><ArrowLeft size={16} className="mr-2" />Contact Us</Link>
            </Button>
          </div>
          {/* Helpful nav */}
          <div className="bg-card rounded-2xl p-6 border border-border text-left">
            <p className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Search size={14} className="text-gold" />
              Try one of these pages:
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-1">
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
