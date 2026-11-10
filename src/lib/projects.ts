/**
 * Selected work. Every entry is a real build that is live at `url`.
 * Copy describes what was built and what is observable on the live product;
 * it deliberately makes no revenue or conversion claims.
 */

export type ProjectCategory = "store" | "site" | "software"

export interface Project {
  slug: string
  name: string
  /** One-line descriptor shown on cards */
  descriptor: string
  category: ProjectCategory
  sector: string
  location: string
  /** Two-sentence summary used on the case page and in structured data */
  summary: string
  /** The business problem, in the owner's terms */
  brief: string
  /** What we built: concrete, checkable on the live site */
  built: string[]
  capabilities: string[]
  /** Short annotation drawn in red over the screenshot */
  note: string
  url: string
  domain: string
  image: string
  /** Brand mark, shown in the homepage logo strip; a monogram is drawn when absent */
  logo?: string
  /** Shown in the homepage logo strip */
  inLogoStrip?: boolean
  /** Shown on the homepage */
  featured?: boolean
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  store: "Online stores",
  site: "Business websites",
  software: "AI & software",
}

export const PROJECTS: Project[] = [
  {
    slug: "adam-leather",
    name: "Adam Leather",
    descriptor: "Leather goods brand with retail, gifting and wholesale",
    category: "store",
    sector: "Retail & e-commerce",
    location: "Toronto, Ontario",
    summary:
      "A direct-to-consumer brand site for full-grain leather duffles, laptop bags and portfolios. One storefront serves retail shoppers, corporate gifting buyers and wholesale accounts in Canada and the United States.",
    brief:
      "Launch a premium leather brand that sells to individuals and to companies ordering in bulk, without running two separate websites.",
    built: [
      "Editorial storefront organized by use: weekender, commute, boardroom",
      "Corporate gifting and quote-request flow for bulk and branded orders",
      "Founding-customer launch offer built into the buying path",
      "Journal section for search and brand storytelling",
    ],
    capabilities: ["Next.js", "E-commerce", "B2B quoting", "Brand design"],
    note: "Retail, corporate gifting and wholesale in one store",
    url: "https://adamleather.com",
    domain: "adamleather.com",
    image: "/images/work/adam-leather.webp",
    logo: "/images/logos/adam-leather.png",
    inLogoStrip: true,
    featured: true,
  },
  {
    slug: "national-machinery-stores",
    name: "National Machinery Stores",
    descriptor: "Oil mill machinery supplier, quoting over WhatsApp",
    category: "site",
    sector: "Manufacturing & export",
    location: "Kadi, Gujarat, India",
    summary:
      "A catalogue and lead-generation site for an oil mill machinery supplier operating from Kadi, Gujarat since 1998. Buyers browse the full production line, then request a quote by WhatsApp or phone in Hindi, Gujarati or English.",
    brief:
      "Move an industrial supplier with a long trading history from phone-and-referral sales to a site that explains a whole production line and captures quote requests from across India and Africa.",
    built: [
      "Product catalogue organized by stage of the oil mill line",
      "Quote requests routed to WhatsApp and click-to-call",
      "Buyer's guide content that answers pre-sales questions",
      "Spare-parts and service sections for existing customers",
    ],
    capabilities: ["Catalogue site", "WhatsApp lead capture", "Technical SEO", "Multilingual audience"],
    note: "WhatsApp quoting for buyers in three languages",
    url: "https://nationalmachinerystores.com",
    domain: "nationalmachinerystores.com",
    image: "/images/work/national-machinery.webp",
    logo: "/images/logos/national-machinery-stores.png",
    inLogoStrip: true,
    featured: true,
  },
  {
    slug: "durham-drive-academy",
    name: "Durham Drive Academy",
    descriptor: "Driving school website for Durham Region",
    category: "site",
    sector: "Local services",
    location: "Durham Region, Ontario",
    summary:
      "A lead-generation website for a driving school serving Oshawa, Whitby, Ajax and the rest of Durham Region. Course packages, instructors and lesson booking are laid out for learners at every licence stage.",
    brief:
      "Turn local searches for driving lessons into booked students, and make the price and the next step obvious on the first screen.",
    built: [
      "Programs laid out for each licence stage, starting with beginner driver education",
      "Transparent course packages with pricing",
      "Instructor profiles and a book-a-lesson path on every section",
      "Local SEO structure targeting Durham Region towns",
    ],
    capabilities: ["Next.js", "Local SEO", "Lead generation", "Booking flow"],
    note: "Course packages lead straight to lesson booking",
    url: "https://v0-driving-school-website-two-sigma.vercel.app",
    domain: "Durham Region build",
    image: "/images/work/durham-drive-academy.webp",
    inLogoStrip: true,
    featured: true,
  },
  {
    slug: "himalayan-saffron",
    name: "Himalayan Saffron",
    descriptor: "Lab-tested saffron store for Canada and the US",
    category: "store",
    sector: "Retail & e-commerce",
    location: "Toronto, Ontario",
    summary:
      "An online store for ISO 3632 Grade I Kashmiri saffron, shipping to Canada and the United States. The site is built around proof: sourcing, batch traceability and a published certificate of analysis.",
    brief:
      "Sell a product that is widely counterfeited. The site has to prove origin and purity to a sceptical buyer in the time it takes to scroll one page.",
    built: [
      "Storefront structured around sourcing, lab testing and batch traceability",
      "Publicly accessible certificate of analysis",
      "Shop-by-use and shop-by-occasion merchandising",
      "Email capture with a first-order offer and recipe guide",
    ],
    capabilities: ["Next.js", "E-commerce", "Conversion design", "Email capture"],
    note: "Batch traceability · public lab certificate",
    url: "https://himalayansaffron.com",
    domain: "himalayansaffron.com",
    image: "/images/work/himalayan-saffron.webp",
    logo: "/images/logos/himalayan-saffron.png",
    inLogoStrip: true,
    featured: true,
  },
  {
    slug: "cosmic-bag-industries",
    name: "Cosmic Bag Industries",
    descriptor: "Leather manufacturer and exporter, built for OEM buyers",
    category: "site",
    sector: "Manufacturing & export",
    location: "Kanpur, India",
    summary:
      "An export website for a leather goods manufacturer in Kanpur. It presents the product lines, the factory and the OEM, private-label and wholesale programmes to brand buyers in North America, Europe, Australia and the Middle East.",
    brief:
      "Help a factory that sells to brands, not consumers, look credible to an overseas buyer and collect a qualified quote request.",
    built: [
      "Collection pages for each product line with material and hardware specifications",
      "Separate paths for OEM, private-label and wholesale buyers",
      "Manufacturing and export pages that document capability and markets",
      "Quote-request funnel and a journal for search visibility",
    ],
    capabilities: ["Next.js", "B2B lead generation", "Export marketing", "Content strategy"],
    note: "OEM and private-label inquiry funnel",
    url: "https://cosmic-bag-industries.vercel.app",
    domain: "cosmic-bag-industries.vercel.app",
    image: "/images/work/cosmic-bag.webp",
    inLogoStrip: true,
    featured: true,
  },
  {
    slug: "ccus-compass",
    name: "CCUS Compass",
    descriptor: "AI advisor and tool suite for carbon storage",
    category: "software",
    sector: "Energy & regulation",
    location: "Canada & United States",
    summary:
      "An AI-powered knowledge platform for carbon capture and storage. It combines an AI advisor with interactive tools for regulation, project finance and subsurface work, organized into workspaces for engineers, regulators and investors.",
    brief:
      "Put scattered regulatory and technical knowledge for a specialist industry into one product that answers questions and runs calculations.",
    built: [
      "AI advisor with free and signed-in usage tiers",
      "Fourteen interactive tools across three role-based workspaces",
      "Regulatory tracker and mapped storage geology",
      "Account sign-in and session history",
    ],
    capabilities: ["AI assistant", "Web application", "Data visualization", "User accounts"],
    note: "AI advisor plus 14 interactive tools",
    url: "https://ccus-space.vercel.app",
    domain: "ccus-space.vercel.app",
    image: "/images/work/ccus-compass.webp",
    logo: "/images/logos/ccus-compass.png",
    inLogoStrip: true,
    featured: true,
  },
  {
    slug: "nisku-co2-simulator",
    name: "Nisku CO₂ Storage Simulator",
    descriptor: "A reservoir simulator that runs in the browser",
    category: "software",
    sector: "Energy & regulation",
    location: "Alberta, Canada",
    summary:
      "A live carbon dioxide storage simulator that runs entirely in the browser. Users set up a model, run it, and review map views, cross-sections, time series and sensitivities before exporting a report.",
    brief:
      "Deliver numerical simulation, normally run in desktop software, as a web tool that needs no installation.",
    built: [
      "Simulation engine with model setup and run control, delivered as a web page",
      "Map, cross-section and time-series visualizations",
      "Sensitivity analysis and a regulatory summary view",
      "Report export, with theory and references documented in the tool",
    ],
    capabilities: ["Scientific computing", "Data visualization", "Report export"],
    note: "Numerical simulation in a browser tab, no install",
    url: "https://nisku-co-2-simulator.vercel.app",
    domain: "nisku-co-2-simulator.vercel.app",
    image: "/images/work/nisku-simulator.webp",
    featured: true,
  },
  {
    slug: "zamzam-shop",
    name: "ZamZam Shop Co.",
    descriptor: "Specialty food store shipping to every province",
    category: "store",
    sector: "Retail & e-commerce",
    location: "Toronto, Ontario",
    summary:
      "A custom online store selling sealed Zamzam water, Madinah dates and Kashmiri saffron across Canada. Built on Next.js with Stripe checkout and province-based shipping.",
    brief:
      "Sell a regulated, heavy, high-trust product nationwide from Toronto, and answer the buyer's first question, whether it is authentic, before they reach the cart.",
    built: [
      "Custom storefront with Stripe checkout and province-based shipping rules",
      "Authenticity guide that walks buyers through checking the factory seal",
      "Wholesale inquiry channel alongside retail",
      "Search-optimized product and guide pages for Canada-wide queries",
    ],
    capabilities: ["Next.js", "Stripe", "Firebase", "Technical SEO"],
    note: "Stripe checkout · ships to every province",
    url: "https://www.zamzamshop.ca",
    domain: "zamzamshop.ca",
    image: "/images/work/zamzam-shop.webp",
  },
  {
    slug: "subsurfaceai",
    name: "SubsurfaceAI",
    descriptor: "Product website for an AI platform in energy",
    category: "site",
    sector: "Energy & regulation",
    location: "Toronto, Ontario",
    summary:
      "The marketing site for SubsurfaceAI, an AI intelligence platform for carbon storage and low-carbon energy projects. It presents the product suite, consulting services and pricing, and routes visitors into the live tools.",
    brief:
      "Explain a technical AI product to a specialist buyer and move them into a live tool or a consultation.",
    built: [
      "Product pages for each AI tool, with live and upcoming status",
      "Consulting, case study and pricing sections",
      "Site search and sign-in entry points",
      "Blog for technical thought leadership",
    ],
    capabilities: ["Product marketing site", "Site search", "Content structure"],
    note: "Product site that routes into live AI tools",
    url: "https://subsurfaceai-website.vercel.app",
    domain: "subsurfaceai-website.vercel.app",
    image: "/images/work/subsurfaceai.webp",
    logo: "/images/logos/subsurfaceai.png",
    inLogoStrip: true,
  },
  {
    slug: "d065-application-assistant",
    name: "D065 Application Assistant",
    descriptor: "Guided builder for a regulatory application",
    category: "software",
    sector: "Energy & regulation",
    location: "Alberta, Canada",
    summary:
      "A guided application builder for Alberta's Directive 065 carbon storage scheme applications. It turns a long regulatory directive into a section-by-section template, a compliance checklist and downloadable documents.",
    brief:
      "Take a regulatory process that normally lives in PDFs and turn it into a tool that tells an applicant what to write, in what order, and what is still missing.",
    built: [
      "Section-by-section application template mapped to the directive",
      "Interactive compliance checklist that flags incomplete sections",
      "Word and PDF document generation",
      "Submission guide and companion calculators",
    ],
    capabilities: ["Guided workflow", "Document generation", "Compliance checklist"],
    note: "A regulatory directive turned into a guided workflow",
    url: "https://aer-d065-assistant.vercel.app",
    domain: "aer-d065-assistant.vercel.app",
    image: "/images/work/d065-assistant.webp",
  },
  {
    slug: "ccs-regulatory-guide",
    name: "North American CCS Regulatory Guide",
    descriptor: "Ten jurisdictions of regulation in one dashboard",
    category: "software",
    sector: "Energy & regulation",
    location: "Canada & United States",
    summary:
      "An interactive reference for carbon capture and storage regulation across Canada and the United States. Ten jurisdictions are presented side by side, covering capture, pipeline transport and storage rules.",
    brief:
      "Replace a stack of government documents with one page a project team can navigate by jurisdiction and topic.",
    built: [
      "Jurisdiction switcher covering four provinces and six states",
      "Structured summaries of regulators, tenure, liability and key projects",
      "Federal and provincial or state requirements shown together",
      "Fast static delivery with no login",
    ],
    capabilities: ["Interactive dashboard", "Information design", "Static delivery"],
    note: "Ten jurisdictions, one dashboard",
    url: "https://north-america-ccs-regulatory-dashbo.vercel.app",
    domain: "north-america-ccs-regulatory-dashbo.vercel.app",
    image: "/images/work/ccs-regulatory.webp",
  },
  {
    slug: "co2-pipeline-analyzer",
    name: "CO₂ Pipeline Analyzer",
    descriptor: "Phase, flow and integrity calculations, client-side",
    category: "software",
    sector: "Energy & regulation",
    location: "Canada",
    summary:
      "A calculation tool for carbon dioxide pipelines that analyzes phase behaviour, steady-state hydraulics and fracture risk. All calculations run in the user's browser, so no project data leaves their machine.",
    brief:
      "Give an engineer a calculation that usually needs licensed software, in a tool that opens in a browser tab and keeps their data local.",
    built: [
      "Stream composition inputs with capture-source presets",
      "Phase diagram, density and operating-point checks",
      "Hydraulics, two-phase scenarios and integrity screening tabs",
      "Report output generated in the browser",
    ],
    capabilities: ["Scientific computing", "Interactive charts", "Client-side privacy"],
    note: "Runs in the browser · project data stays local",
    url: "https://tchisti.github.io/CO2-_phase_envelope_V7/",
    domain: "CO₂ pipeline tool",
    image: "/images/work/phase-envelope.webp",
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured)

export const LOGO_STRIP_PROJECTS = PROJECTS.filter((p) => p.inLogoStrip)

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
