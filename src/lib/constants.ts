export interface SiteConfig {
  name: string
  tagline: string
  url: string
  email: string
  phone: string
  whatsappNumber: string
  address: string
  businessHours: string
  serviceAreas: string[]
  social: {
    instagram: string
    linkedin: string
    facebook: string
    whatsapp: string
  }
}

export interface NavLink {
  label: string
  href: string
}

export type ServiceCategory = "ai" | "foundation"

export interface Service {
  id: string
  icon: string
  title: string
  category: ServiceCategory
  shortDesc: string
  fullDesc: string
  benefits: string[]
  useCases: string[]
  slug: string
  pricingTeaser: string
  /** Starting price in CAD, used for schema.org offers */
  startingPrice: number
  href: string
  badge?: string
  /** Legacy anchor ids that must keep resolving to this section */
  aliasAnchors?: string[]
}

export interface Bundle {
  id: string
  name: string
  pricingTeaser: string
  tagline: string
  includes: string[]
  popular?: boolean
}

export interface Testimonial {
  name: string
  role: string
  company: string
  avatar: string
  rating: number
  text: string
}

export interface PortfolioProject {
  id: string
  title: string
  industry: string
  tags: string[]
  image: string
  outcome: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  tags: string[]
  readTime: string
  image: string
}

// Site configuration
export const SITE_CONFIG: SiteConfig = {
  name: "Hijaz.ai",
  tagline: "Smart Solutions. Powerful Presence.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hijaz.ai",
  email: "hello@hijaz.ai",
  phone: "+1 (437) 580-9680",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "14165550123",
  address: "Toronto, Ontario, Canada",
  businessHours: "Mon–Fri: 9am–6pm EST",
  serviceAreas: [
    "Toronto", "North York", "Scarborough", "Etobicoke",
    "Durham Region", "Pickering", "Ajax", "Whitby", "Oshawa", "GTA"
  ],
  social: {
    instagram: "https://instagram.com/hijaz.ai",
    linkedin: "https://linkedin.com/company/hijaz-ai",
    facebook: "https://facebook.com/hijaz.ai",
    whatsapp: "https://wa.me/14165550123",
  },
}

// Navigation links
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

// Services data — AI services lead; web, Shopify & print are the digital foundations
export const SERVICES: Service[] = [
  {
    id: "ai-audit",
    icon: "ClipboardCheck",
    title: "AI Opportunity Audit",
    category: "ai",
    shortDesc: "Find out exactly where AI saves you time and money — before you spend a dollar on tools.",
    fullDesc: "A focused review of how your business runs today and where AI delivers the fastest payback. We sit down with you, map your operations, rank the opportunities by ROI, and hand you a written action plan — yours to keep whether or not you work with us. The full fee is credited toward any project.",
    benefits: [
      "60–90 minute operations review",
      "Top 3–5 AI opportunities ranked by ROI",
      "Written action plan within 48 hours",
      "Tool recommendations with monthly cost estimates",
      "No obligation — the plan is yours to keep",
    ],
    useCases: ["All Industries"],
    slug: "ai-audit",
    pricingTeaser: "Starting from $499 CAD — credited toward any project",
    startingPrice: 499,
    href: "/services#ai-audit",
    badge: "Start here",
  },
  {
    id: "ai-automation",
    icon: "Bot",
    title: "AI Receptionist & Chatbot",
    category: "ai",
    shortDesc: "Automate customer conversations 24/7 — never miss a lead again.",
    fullDesc: "Our AI receptionists and chatbots handle customer inquiries, appointment bookings, and lead capture around the clock. Powered by the latest large language models, they understand natural language and integrate directly with your existing systems.",
    benefits: [
      "24/7 automated customer support",
      "Appointment booking & calendar sync",
      "Lead capture & CRM integration",
      "Multilingual support",
      "Custom trained on your business data",
      "Works on your website, WhatsApp, Instagram DM & SMS",
    ],
    useCases: ["Restaurants", "Clinics", "Real Estate", "Retail", "Law Firms"],
    slug: "ai-automation",
    pricingTeaser: "Starting from $299 CAD/mo + $499 setup",
    startingPrice: 299,
    href: "/services#ai-automation",
  },
  {
    id: "ai-workflows",
    icon: "Workflow",
    title: "AI Workflow Automation",
    category: "ai",
    shortDesc: "Put your follow-ups, reminders, and paperwork on autopilot.",
    fullDesc: "We build automations around the repetitive work that eats your week — quoting, invoicing, follow-ups, reminders, and review requests — and connect them to the tools you already use. Each workflow is built, tested, and maintained for you.",
    benefits: [
      "Quote & invoice generation",
      "Lead follow-up sequences",
      "Review requests after each job",
      "Appointment reminders",
      "Win-back campaigns for lapsed customers",
      "Connects to your existing tools (Gmail, Calendar, QuickBooks, CRM)",
    ],
    useCases: ["Trades & Home Services", "Clinics", "Real Estate", "Restaurants"],
    slug: "ai-workflows",
    pricingTeaser: "Starting from $999 CAD per workflow + $199/mo care",
    startingPrice: 999,
    href: "/services#ai-workflows",
  },
  {
    id: "ai-training",
    icon: "GraduationCap",
    title: "AI Fluency Training",
    category: "ai",
    shortDesc: "Hands-on workshops that make your team confident with AI tools.",
    fullDesc: "Practical, jargon-free training for you and your staff — using ChatGPT, Claude, and the tools specific to your industry. Every session is built around your real workflows, and your team leaves with a playbook they'll actually use.",
    benefits: [
      "Hands-on with ChatGPT, Claude & industry tools",
      "Tailored to your business and workflows",
      "Staff playbook included",
      "30 days of Q&A support after the session",
      "Half-day ($899), full-day ($1,499), or monthly coaching ($299/mo) formats",
    ],
    useCases: ["All Industries", "Teams of 2–50"],
    slug: "ai-training",
    pricingTeaser: "Starting from $899 CAD per workshop",
    startingPrice: 899,
    href: "/services#ai-training",
  },
  {
    id: "ai-dashboards",
    icon: "BarChart3",
    title: "Business Intelligence Dashboards",
    category: "ai",
    shortDesc: "All your business numbers in one live dashboard — explained in plain English.",
    fullDesc: "We pull your sales, customer, and operations data into one live dashboard, then layer AI on top so you get a plain-English summary of what changed and what to do about it — every week, no spreadsheets required.",
    benefits: [
      "Sales, customer & operations data in one live dashboard",
      "Plain-English AI summaries every week",
      "Spot slow movers and missed revenue",
      "No spreadsheets required",
    ],
    useCases: ["Retail", "E-Commerce", "Clinics", "Multi-Location"],
    slug: "ai-dashboards",
    pricingTeaser: "Starting from $1,500 CAD setup + $99/mo",
    startingPrice: 1500,
    href: "/services#ai-dashboards",
  },
  {
    id: "ai-marketing",
    icon: "TrendingUp",
    title: "AI Marketing Engine",
    category: "ai",
    shortDesc: "Get found on Google and stay in front of customers — without writing a word.",
    fullDesc: "Local SEO, content, and email — powered by AI, reviewed by you. We draft your social posts and email campaigns for you to approve in minutes, optimize your Google Business Profile, and keep your Toronto & GTA business ranking where customers are searching.",
    benefits: [
      "AI-drafted social content & email campaigns you approve in minutes",
      "Local SEO for Toronto & GTA",
      "Google Business Profile optimization",
      "Monthly performance report in plain English",
    ],
    useCases: ["Local Businesses", "Service Providers", "Healthcare", "Real Estate"],
    slug: "ai-marketing",
    pricingTeaser: "Starting from $499 CAD/mo",
    startingPrice: 499,
    href: "/services#ai-marketing",
    aliasAnchors: ["digital-marketing"],
  },
  {
    id: "ai-care",
    icon: "ShieldCheck",
    title: "AI Care Plan",
    category: "ai",
    shortDesc: "Your AI tools, kept sharp — monitoring, updates, and steady improvements.",
    fullDesc: "AI models change fast; your tools should keep up. The Care Plan keeps everything you've built monitored, updated, and improving month over month — so your automations never quietly fall behind.",
    benefits: [
      "Keep your AI tools current as models change",
      "Monthly optimization review",
      "Priority support",
      "Quarterly strategy call",
      "$449 CAD/mo tier adds one new automation every month",
    ],
    useCases: ["Existing AI Clients", "All Industries"],
    slug: "ai-care",
    pricingTeaser: "Starting from $199 CAD/mo",
    startingPrice: 199,
    href: "/services#ai-care",
  },
  {
    id: "web-development",
    icon: "Code2",
    title: "AI-Powered Website & App Development",
    category: "foundation",
    shortDesc: "Custom, blazing-fast websites built with modern technology.",
    fullDesc: "We build custom Next.js and React websites optimized for performance, SEO, and conversions. From landing pages to complex web applications, every project is mobile-first and built to scale.",
    benefits: [
      "Mobile-first, responsive design",
      "SEO-optimized from day one",
      "Lightning-fast load times (<2s)",
      "CMS integration (Sanity, Contentful)",
      "E-commerce & booking functionality",
      "AI chat built in and trained on your business",
    ],
    useCases: ["Business Websites", "Landing Pages", "Web Apps", "Portals"],
    slug: "web-development",
    pricingTeaser: "Starting from $1,200 CAD",
    startingPrice: 1200,
    href: "/services#web-development",
  },
  {
    id: "shopify",
    icon: "ShoppingBag",
    title: "AI-Enhanced Shopify Store",
    category: "foundation",
    shortDesc: "Launch and grow your online store with Shopify expertise.",
    fullDesc: "Full Shopify store setup, theme customization, product strategy, and payment integration. We turn your vision into a revenue-generating online store designed to convert browsers into buyers.",
    benefits: [
      "Full brand setup & theme customization",
      "Product listings & inventory management",
      "Payment gateway integration",
      "Shopify SEO optimization",
      "Post-launch support & training",
      "AI product recommendations & automated cart recovery",
    ],
    useCases: ["Retail", "Fashion", "Food & Beverage", "Beauty", "Electronics"],
    slug: "shopify",
    pricingTeaser: "Starting from $800 CAD",
    startingPrice: 800,
    href: "/services#shopify",
  },
  {
    id: "printing-branding",
    icon: "Printer",
    title: "Printing & Branding",
    category: "foundation",
    shortDesc: "From logo to print — complete brand identity packages.",
    fullDesc: "Professional logo design, business cards, banners, flyers, vehicle wraps, and signage. We deliver cohesive brand identity packages that make a lasting impression — both online and offline.",
    benefits: [
      "Logo design & brand guidelines",
      "Business cards & stationery",
      "Banners, flyers & signage",
      "Vehicle wraps & outdoor displays",
      "Fast turnaround, local printing",
    ],
    useCases: ["All Industries", "Events", "Retail", "Real Estate", "Restaurants"],
    slug: "printing-branding",
    pricingTeaser: "Starting from $199 CAD",
    startingPrice: 199,
    href: "/services#printing-branding",
  },
]

export const AI_SERVICES = SERVICES.filter((s) => s.category === "ai")
export const FOUNDATION_SERVICES = SERVICES.filter((s) => s.category === "foundation")

// Popular packages — bundles of the AI services above
export const BUNDLES: Bundle[] = [
  {
    id: "bundle-starter",
    name: "Starter",
    pricingTeaser: "Starting from $799 CAD setup + $299/mo",
    tagline: "Never miss another customer inquiry.",
    includes: ["AI Opportunity Audit", "AI Receptionist & Chatbot"],
  },
  {
    id: "bundle-growth",
    name: "Growth",
    pricingTeaser: "Starting from $2,499 CAD setup + $649/mo",
    tagline: "Your front desk, follow-ups, and marketing on autopilot.",
    includes: [
      "AI Opportunity Audit",
      "AI Receptionist & Chatbot",
      "2 custom AI workflows",
      "AI Marketing Engine",
    ],
    popular: true,
  },
  {
    id: "bundle-autopilot",
    name: "Autopilot",
    pricingTeaser: "Starting from $4,999 CAD setup + $999/mo",
    tagline: "A full AI operations layer for your business.",
    includes: [
      "Everything in Growth",
      "Business Intelligence Dashboard",
      "AI Care Plan (2 automations/mo)",
      "Quarterly team training",
    ],
  },
]

// Footer "Services" column — curated AI-first subset with short labels
const FOOTER_SERVICE_IDS: { id: string; label: string }[] = [
  { id: "ai-audit", label: "AI Opportunity Audit" },
  { id: "ai-automation", label: "AI Receptionist & Chatbot" },
  { id: "ai-workflows", label: "AI Workflow Automation" },
  { id: "ai-training", label: "AI Fluency Training" },
  { id: "web-development", label: "Website & App Development" },
  { id: "shopify", label: "Shopify E-Commerce" },
  { id: "printing-branding", label: "Printing & Branding" },
]

export const FOOTER_SERVICE_LINKS: NavLink[] = FOOTER_SERVICE_IDS.map(({ id, label }) => ({
  label,
  href: SERVICES.find((s) => s.id === id)?.href ?? "/services",
}))

// Testimonials data
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sara M.",
    role: "Owner",
    company: "Bloom Café, Toronto",
    avatar: "/images/testimonials/sara.jpg",
    rating: 5,
    text: "Hijaz.ai built our website in under a week and set up an AI chatbot that handles our reservation inquiries automatically. We've saved at least 15 hours a week on phone calls.",
  },
  {
    name: "James O.",
    role: "Founder",
    company: "GTA Real Estate Group",
    avatar: "/images/testimonials/james.jpg",
    rating: 5,
    text: "The AI receptionist they built for us has captured 3x more leads than our old contact form. The team is incredibly responsive and really understands the GTA market.",
  },
  {
    name: "Priya K.",
    role: "Director",
    company: "Wellness Clinic North York",
    avatar: "/images/testimonials/priya.jpg",
    rating: 5,
    text: "Our Shopify store went live in 5 days and the branding package they delivered was outstanding. Professional team, fast delivery, and they actually listen to what you need.",
  },
]

// Portfolio projects
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "bloom-cafe",
    title: "Bloom Café",
    industry: "Food & Beverage",
    tags: ["Web", "AI"],
    image: "/images/portfolio/bloom-cafe.jpg",
    outcome: "↑ 3x online reservations in 60 days",
    description: "Custom website + AI receptionist for a Toronto café chain.",
  },
  {
    id: "gta-realty",
    title: "GTA Realty Group",
    industry: "Real Estate",
    tags: ["Web", "AI"],
    image: "/images/portfolio/gta-realty.jpg",
    outcome: "↑ 200% lead capture rate",
    description: "Lead generation website with AI chatbot integration.",
  },
  {
    id: "wellness-clinic",
    title: "Wellness Clinic",
    industry: "Healthcare",
    tags: ["Web", "E-Commerce"],
    image: "/images/portfolio/wellness-clinic.jpg",
    outcome: "Launched in 5 business days",
    description: "Booking-enabled website and product e-commerce store.",
  },
  {
    id: "north-print",
    title: "North Print Co.",
    industry: "Printing",
    tags: ["Print", "Branding"],
    image: "/images/portfolio/north-print.jpg",
    outcome: "Complete rebrand in 2 weeks",
    description: "Full brand identity: logo, cards, signage, and vehicle wrap.",
  },
  {
    id: "spice-bazaar",
    title: "Spice Bazaar",
    industry: "Retail",
    tags: ["E-Commerce"],
    image: "/images/portfolio/spice-bazaar.jpg",
    outcome: "↑ $40K revenue in first 3 months",
    description: "Shopify store launch with SEO and Google Ads campaign.",
  },
  {
    id: "durham-dental",
    title: "Durham Dental",
    industry: "Healthcare",
    tags: ["Web", "AI"],
    image: "/images/portfolio/durham-dental.jpg",
    outcome: "↑ 80% fewer missed appointments",
    description: "Appointment-booking website with SMS reminder automation.",
  },
]

// FAQ data
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How long does it take to build a website?",
    answer: "Most business websites are delivered within 3–7 business days. Complex web applications or e-commerce stores may take 2–4 weeks depending on scope.",
  },
  {
    question: "Do you serve businesses outside Toronto?",
    answer: "Yes! While we specialize in the Greater Toronto Area — including North York, Scarborough, Durham Region, Pickering, Ajax, and Oshawa — we work with clients across Ontario and beyond remotely.",
  },
  {
    question: "What makes your AI chatbot different from other solutions?",
    answer: "Our AI assistants are custom-trained on your specific business data, FAQs, and workflows — not generic bots. They integrate with your calendar, CRM, and communication tools to actually automate tasks, not just answer questions.",
  },
  {
    question: "Do you offer ongoing support and maintenance?",
    answer: "Absolutely. All our websites come with 30 days of free post-launch support. We also offer monthly maintenance packages that include updates, security monitoring, backups, and performance optimization.",
  },
  {
    question: "What is your pricing model?",
    answer: "We offer transparent, project-based pricing with no hidden fees. Most projects start with a free consultation to scope your needs. AI automation and digital marketing services are available as monthly subscriptions.",
  },
]

// Stats
export const STATS: Stat[] = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: "-Day", label: "Website Turnaround" },
  { value: 100, suffix: "%", label: "Satisfaction Guarantee" },
  { value: 4.9, suffix: "/5", label: "Average Rating" },
]

// Blog posts metadata
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ai-receptionists-saving-toronto-businesses-time",
    title: "How AI Receptionists Are Saving Toronto Businesses 20 Hours/Week",
    excerpt: "Discover how local businesses in Toronto and the GTA are cutting costs and boosting efficiency with AI-powered reception automation.",
    date: "2025-03-15",
    author: "Hijaz.ai Team",
    tags: ["AI Automation", "Toronto", "Business Tips"],
    readTime: "5 min read",
    image: "/images/blog/ai-receptionist.jpg",
  },
  {
    slug: "every-gta-business-needs-shopify-2025",
    title: "Why Every GTA Business Needs a Shopify Store in 2025",
    excerpt: "E-commerce isn't just for large retailers. Here's why Shopify is the smartest growth move for small businesses in the Greater Toronto Area.",
    date: "2025-02-28",
    author: "Hijaz.ai Team",
    tags: ["E-Commerce", "Shopify", "GTA"],
    readTime: "6 min read",
    image: "/images/blog/shopify-gta.jpg",
  },
  {
    slug: "top-5-logo-design-mistakes",
    title: "Top 5 Logo Design Mistakes and How to Avoid Them",
    excerpt: "Your logo is often the first impression customers have of your brand. Avoid these common pitfalls to make sure it says the right thing.",
    date: "2025-02-10",
    author: "Hijaz.ai Team",
    tags: ["Branding", "Design", "Logo"],
    readTime: "4 min read",
    image: "/images/blog/logo-design.jpg",
  },
]
