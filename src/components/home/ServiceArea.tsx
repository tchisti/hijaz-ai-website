import Link from "next/link"
import { Reveal, Rule } from "@/components/motion/Redline"
import { SheetHeader } from "@/components/layout/Sheet"
import { CORRIDOR, LOCATIONS, LOCATION_GROUPS, TIER_LABELS } from "@/lib/locations"
import { cn } from "@/lib/utils"

/**
 * Service area drawn as a strip map of the Windsor to Ottawa corridor,
 * the way a route is drawn on an alignment sheet. Filled stops are on-site.
 */
export default function ServiceArea() {
  return (
    <section className="surface-blueprint">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SheetHeader number="06" title="Where we work" tone="blueprint" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <h2 className="headline text-[clamp(2.2rem,5.6vw,4.4rem)] text-white">
              On-site in Toronto and Durham. Online across Canada.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-chalk/75 lg:justify-self-end">
              We meet in person from Toronto through Pickering, Ajax, Whitby and Oshawa, and deliver remotely
              everywhere else, at the same fixed prices.
            </p>
          </Reveal>
        </div>

        {/* Strip map */}
        <div className="mt-16">
          <p className="label mb-6 flex flex-wrap gap-x-6 gap-y-2 text-chalk/60">
            <span>Ontario corridor · West → East · Not to scale</span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-highlight" /> On-site
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-chalk bg-blueprint" /> Remote or by arrangement
            </span>
          </p>

          <div className="relative">
            <Rule className="absolute left-[5px] top-0 hidden h-[2px] text-chalk/50 lg:block lg:left-0 lg:top-[5px]" />
            <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-[2px] bg-chalk/40 lg:hidden" />
            <ol className="relative grid gap-y-1 lg:auto-cols-fr lg:grid-flow-col">
              {CORRIDOR.map((loc, i) => (
                <li key={loc.slug}>
                  <Reveal delay={0.04 * i} y={10}>
                    <Link
                      href={`/locations/${loc.slug}`}
                      className="group flex items-center gap-4 py-2 lg:flex-col lg:items-start lg:gap-0 lg:py-0"
                    >
                      <span
                        className={cn(
                          "relative z-10 h-3 w-3 shrink-0 rounded-full border-2 transition-transform duration-200 group-hover:scale-150",
                          loc.tier === "onsite" ? "border-highlight bg-highlight" : "border-chalk bg-blueprint"
                        )}
                      />
                      <span
                        className={cn(
                          "text-[0.95rem] font-semibold leading-tight transition-colors group-hover:text-highlight lg:mt-4 lg:pr-2 lg:text-sm xl:text-[0.95rem]",
                          loc.tier === "onsite" ? "text-white" : "text-chalk/75"
                        )}
                      >
                        {loc.name}
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Every location, grouped */}
        <div className="mt-16 grid gap-10 border-t border-chalk/25 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {LOCATION_GROUPS.map((group) => (
            <div key={group.label}>
              <h3 className="text-xl font-extrabold text-white">{group.label}</h3>
              <p className="label mt-1 text-highlight">{group.note}</p>
              <ul className="mt-4 space-y-2">
                {group.slugs.map((slug) => {
                  const loc = LOCATIONS.find((l) => l.slug === slug)
                  if (!loc) return null
                  return (
                    <li key={slug}>
                      <Link
                        href={`/locations/${slug}`}
                        title={`${TIER_LABELS[loc.tier]}: web design and AI automation in ${loc.name}`}
                        className="text-chalk/80 underline decoration-chalk/25 underline-offset-4 transition-colors hover:text-white hover:decoration-highlight"
                      >
                        {loc.name}, {loc.provinceCode}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
