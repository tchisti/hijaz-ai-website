import Link from "next/link"
import { buildMetadata } from "@/lib/seo"
import CTABanner from "@/components/sections/CTABanner"
import { Button } from "@/components/ui/button"
import { ChevronRight, Heart, Lightbulb, ShieldCheck, Users, ArrowRight } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export const metadata = buildMetadata({
  title: "About Hijaz.ai — Toronto's AI & Digital Agency",
  description:
    "Learn about Hijaz.ai — a Toronto-based AI automation and digital services agency serving SMBs across the GTA, North York, and Durham Region since 2022.",
  canonical: "/about",
})

// Values data
const VALUES = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We stay ahead of the technology curve so our clients don't have to. AI, automation, and modern web tech are in our DNA.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "No hidden fees, no vague timelines. We say what we'll do, and we do what we say — every single time.",
  },
  {
    icon: Heart,
    title: "Impact",
    desc: "We measure our success by the real-world results our clients see: more leads, more bookings, more revenue.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "We're proud to serve the GTA. As a local team, we have a genuine stake in helping Toronto businesses thrive.",
  },
]

// Team placeholder data
const TEAM = [
  { name: "Omar H.", role: "Founder & CEO", initials: "OH", bg: "bg-midnight" },
  { name: "Sara K.", role: "Lead Developer", initials: "SK", bg: "bg-blue-700" },
  { name: "James T.", role: "AI Engineer", initials: "JT", bg: "bg-gold" },
  { name: "Priya M.", role: "Design Lead", initials: "PM", bg: "bg-emerald-700" },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-midnight py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-1.5 text-sm text-white/40 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white/70">About</span>
          </nav>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            Born to Help Toronto{" "}
            <span className="text-gold">Businesses Thrive</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Every business deserves enterprise-level technology. We built Hijaz.ai to make that a reality — without the enterprise price tag.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-gold font-medium text-sm uppercase tracking-widest">Our Story</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-midnight mt-2 mb-6">
                We Started with a Simple Belief
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Hijaz.ai was founded in Toronto with one clear mission: to give small and medium-sized businesses the same digital tools and AI capabilities that large enterprises take for granted.
                </p>
                <p>
                  We watched too many great local businesses fall behind online — not because of a lack of quality, but because the technology gap was too wide. Clunky websites, no automation, zero digital presence. We knew we could change that.
                </p>
                <p>
                  Today, we&apos;ve helped <strong className="text-midnight">50+ businesses</strong> across Toronto, North York, Durham Region, and the broader GTA automate their operations, build stunning digital presences, and generate consistent leads online.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "50+", label: "Businesses Served" },
                { value: "GTA", label: "Local Expertise" },
                { value: "3-Day", label: "Avg. Turnaround" },
                { value: "4.9★", label: "Client Rating" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#F8F9FB] rounded-2xl p-6 text-center border border-border">
                  <p className="font-display text-3xl font-bold text-midnight">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold font-medium text-sm uppercase tracking-widest">What Drives Us</span>
            <h2 className="font-display text-4xl font-bold text-midnight mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 border border-border text-center hover:shadow-md hover:border-gold/30 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-midnight/5 flex items-center justify-center mx-auto mb-4">
                  <value.icon size={24} className="text-midnight" />
                </div>
                <h3 className="font-display font-semibold text-lg text-midnight mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-gold font-medium text-sm uppercase tracking-widest">The Team</span>
            <h2 className="font-display text-4xl font-bold text-midnight mt-2">People Behind the Work</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              A tight-knit team of AI engineers, designers, and digital strategists — all based in the Greater Toronto Area.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center group">
                <div className={`w-24 h-24 rounded-full ${member.bg} flex items-center justify-center mx-auto mb-4 text-white text-2xl font-display font-bold shadow-lg group-hover:scale-105 transition-transform`}>
                  {member.initials}
                </div>
                <p className="font-semibold text-midnight">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Serving the Community */}
      <section className="py-20 bg-midnight">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
            Proudly Serving{" "}
            <span className="text-gold">the Greater Toronto Area</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            We&apos;re a local agency with deep roots in the GTA. Whether you&apos;re in downtown Toronto, North York, Scarborough, or Durham Region — we&apos;re your neighbours.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {SITE_CONFIG.serviceAreas.map((area) => (
              <span key={area} className="px-3 py-1.5 rounded-full bg-white/10 text-white/70 text-sm border border-white/10">
                {area}
              </span>
            ))}
          </div>
          <Button asChild className="bg-gold text-midnight hover:bg-gold/90 font-semibold">
            <Link href="/contact">Work With a Team That Actually Cares <ArrowRight size={16} className="ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* Trust logos row (placeholder) */}
      <section className="py-12 bg-[#F8F9FB] border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground mb-8 uppercase tracking-widest font-medium">Trusted by businesses across the GTA</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Bloom Café", "GTA Realty", "Wellness Clinic", "North Print Co.", "Spice Bazaar", "Durham Dental"].map((name) => (
              <div key={name} className="px-6 py-3 bg-white border border-border rounded-xl text-muted-foreground text-sm font-medium hover:border-gold/30 transition-colors">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
