import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion/Redline"
import { SheetHeader } from "@/components/layout/Sheet"

const CAPABILITIES = [
  {
    name: "Websites & web apps",
    job: "Gets you found, explains what you do, and turns a visitor into an enquiry or a booking.",
    price: "from $1,200",
    href: "/services#web-development",
  },
  {
    name: "Online stores",
    job: "Takes the order, takes the payment and works out the shipping, on Shopify or custom-built.",
    price: "from $800",
    href: "/services#shopify",
  },
  {
    name: "AI assistants",
    job: "Answers customers, books appointments and captures leads at 2 a.m. on your site, WhatsApp and SMS.",
    price: "from $299/mo",
    href: "/services#ai-automation",
  },
  {
    name: "Workflow automation",
    job: "Sends the quote, the reminder, the invoice and the review request, so nobody has to remember.",
    price: "from $999",
    href: "/services#ai-workflows",
  },
  {
    name: "Dashboards & custom software",
    job: "Turns the spreadsheet, the PDF process or the calculation into a tool your team opens every day.",
    price: "from $1,500",
    href: "/services#ai-dashboards",
  },
  {
    name: "Search & AI visibility",
    job: "Puts you in Google's local results and in the answers ChatGPT, Gemini and Perplexity give.",
    price: "from $499/mo",
    href: "/services#ai-marketing",
  },
]

export default function Capabilities() {
  return (
    <section className="border-b border-ink/15">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <SheetHeader number="03" title="What we build" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal>
            <h2 className="headline text-[clamp(2.2rem,5.6vw,4.4rem)]">One partner for the whole system.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft lg:justify-self-end">
              Each piece is judged on one question: what does it do for the business on a Tuesday afternoon. Prices are
              in Canadian dollars and quoted as a fixed number.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 border-t border-ink">
          {CAPABILITIES.map((c, i) => (
            <li key={c.name} className="border-b border-ink/25">
              <Link
                href={c.href}
                className="group grid items-baseline gap-x-6 gap-y-2 px-1 py-6 transition-colors duration-200 hover:bg-ink hover:text-paper sm:px-4 md:grid-cols-[3.5rem_1.1fr_1.6fr_9.5rem]"
              >
                <span className="label text-redline-deep group-hover:text-highlight">0{i + 1}</span>
                <h3 className="text-2xl font-extrabold leading-tight sm:text-3xl">{c.name}</h3>
                <p className="text-[1.02rem] leading-snug text-ink-soft group-hover:text-paper/80">{c.job}</p>
                <span className="flex items-center gap-2 font-mono text-sm tabular-nums md:justify-end">
                  {c.price}
                  <ArrowUpRight
                    aria-hidden="true"
                    size={18}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
