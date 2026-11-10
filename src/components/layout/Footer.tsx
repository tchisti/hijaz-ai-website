import Link from "next/link"
import { SITE_CONFIG, NAV_LINKS, FOOTER_SERVICE_LINKS } from "@/lib/constants"
import { LOCATIONS, LOCATION_GROUPS } from "@/lib/locations"
import { INDUSTRIES } from "@/lib/industries"

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label mb-4 text-highlight">{title}</h2>
      <ul className="space-y-2.5 text-sm text-chalk/75">{children}</ul>
    </div>
  )
}

const linkCls = "transition-colors hover:text-white"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="surface-blueprint">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display text-3xl font-extrabold tracking-tight text-white [font-stretch:118%]">
              Hijaz<span className="text-highlight">.ai</span>
            </Link>
            <p className="mt-4 max-w-sm font-display text-2xl font-bold leading-tight tracking-tight text-white">
              {SITE_CONFIG.tagline}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-chalk/70">
              A business technology partner in Toronto and Durham Region. Websites, online stores, AI and custom
              software for businesses across Canada.
            </p>
            <address className="mt-6 space-y-1.5 text-sm not-italic text-chalk/80">
              <p>
                <a href={`mailto:${SITE_CONFIG.email}`} className={linkCls}>
                  {SITE_CONFIG.email}
                </a>
              </p>
              <p>
                <a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} className={linkCls}>
                  {SITE_CONFIG.phone}
                </a>
              </p>
              <p>{SITE_CONFIG.address}</p>
              <p className="text-chalk/55">{SITE_CONFIG.businessHours}</p>
            </address>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <Column title="Services">
              {FOOTER_SERVICE_LINKS.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className={linkCls}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Industries">
              {INDUSTRIES.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}`} className={linkCls}>
                    {i.name}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title="Company">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkCls}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className={linkCls}>
                  Blog
                </Link>
              </li>
              <li>
                <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Instagram
                </a>
              </li>
            </Column>
          </div>
        </div>

        {/* Service areas: every location page linked from every page */}
        <nav aria-label="Service areas" className="mt-14 border-t border-chalk/20 pt-8">
          <h2 className="label mb-5 text-highlight">Where we work</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LOCATION_GROUPS.map((group) => (
              <div key={group.label}>
                <h3 className="mb-2 text-sm font-semibold tracking-normal text-white [font-stretch:100%]">
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-chalk/70">
                  {group.slugs.map((slug) => {
                    const loc = LOCATIONS.find((l) => l.slug === slug)
                    return loc ? (
                      <li key={slug}>
                        <Link href={`/locations/${slug}`} className={linkCls}>
                          {loc.name}
                        </Link>
                      </li>
                    ) : null
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Title block */}
        <div className="label mt-12 grid grid-cols-2 border border-chalk/30 text-chalk/70 sm:grid-cols-4">
          <div className="border-b border-r border-chalk/30 p-3 sm:border-b-0">
            <span className="block text-chalk/45">Drawn by</span>
            {SITE_CONFIG.legalName}
          </div>
          <div className="border-b border-chalk/30 p-3 sm:border-b-0 sm:border-r">
            <span className="block text-chalk/45">Location</span>Toronto · Durham, ON
          </div>
          <div className="border-r border-chalk/30 p-3">
            <span className="block text-chalk/45">Revision</span>
            {year}
          </div>
          <div className="p-3">
            <span className="block text-chalk/45">Status</span>
            <span className="text-highlight">In production</span>
          </div>
        </div>
        <p className="mt-5 text-xs text-chalk/50">
          &copy; {year} {SITE_CONFIG.legalName}. All rights reserved. Built and operated in Canada.
        </p>
      </div>
    </footer>
  )
}
