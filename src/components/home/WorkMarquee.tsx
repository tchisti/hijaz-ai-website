import { PROJECTS } from "@/lib/projects"

/** A moving roll-call of the builds, set like the revision strip on a drawing */
export default function WorkMarquee() {
  const names = PROJECTS.map((p) => p.name)
  return (
    <section aria-label="Businesses and products we have built" className="border-b border-ink/15 bg-paper-deep">
      <p className="sr-only">Selected builds: {names.join(", ")}.</p>
      <div className="marquee overflow-hidden py-5" aria-hidden="true">
        <div className="marquee-track flex w-max animate-marquee items-center">
          {[...names, ...names].map((name, i) => (
            <span key={i} className="flex items-center">
              <span className="whitespace-nowrap px-6 font-display text-2xl font-extrabold tracking-tight text-ink [font-stretch:118%] sm:text-3xl">
                {name}
              </span>
              <span className="font-mono text-lg text-redline">⌖</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
