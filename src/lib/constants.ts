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

export interface Service {
  id: string
  icon: string
  title: string
  shortDesc: string
  fullDesc: string
  benefits: string[]
  useCases: string[]
  slug: string
  pricingTeaser: string
  href: string
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
  phone: "+1 (416) 555-0123",
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

// Services data
export const SERVICES: Service[] = [
  {
    id: "ai-automation",
    icon: "Bot",
    title: "AI Receptionist & Chatbot",
    shortDesc: "Automate customer conversations 24/7 — never miss a lead again.",
    fullDesc: "Our AI receptionists and chatbots handle customer inquiries, appointment bookings, and lead capture around the clock. Powered by the latest large language models, they understand natural language and integrate directly with your existing systems.",
    benefits: [
      "24/7 automated customer support",
      "Appointment booking & calendar sync",
      "Lead capture & CRM integration",
      "Multilingual support",
      "Custom trained on your business data",
    ],
    useCases: ["Restaurants", "Clinics", "Real Estate", "Retail", "Law Firms"],
    slug: "ai-automation",
    pricingTeaser: "Starting from $299/mo",
    href: "/services#ai-automation",
  },
  {
    id: "web-development",
    icon: "Code2",
    title: "Website & App Development",
    shortDesc: "Custom, blazing-fast websites built with modern technology.",
    fullDesc: "We build custom Next.js and React websites optimized for performance, SEO, and conversions. From landing pages to complex web applications, every project is mobile-first and built to scale.",
    benefits: [
      "Mobile-first, responsive design",
      "SEO-optimized from day one",
      "Lightning-fast load times (<2s)",
      "CMS integration (Sanity, Contentful)",
      "E-commerce & booking functionality",
    ],
    useCases: ["Business Websites", "Landing Pages", "Web Apps", "Portals"],
    slug: "web-development",
    pricingTeaser: "Starting from $1,200",
    href: "/services#web-development",
  },
  {
    id: "shopify",
    icon: "ShoppingBag",
    title: "Shopify E-Commerce",
    shortDesc: "Launch and grow your online store with Shopify expertise.",
    fullDesc: "Full Shopify store setup, theme customization, product strategy, and payment integration. We turn your vision into a revenue-generating online store designed to convert browsers into buyers.",
    benefits: [
      "Full brand setup & theme customization",
      "Product listings & inventory management",
      "Payment gateway integration",
      "Shopify SEO optimization",
      "Post-launch support & training",
    ],
    useCases: ["Retail", "Fashion", "Food & Beverage", "Beauty", "Electronics"],
    slug: "shopify",
    pricingTeaser: "Starting from $800",
    href: "/services#shopify",
  },
  {
    id: "printing-branding",
    icon: "Printer",
    title: "Printing & Branding",
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
    pricingTeaser: "Starting from $199",
    href: "/services#printing-branding",
  },
  {
    id: "digital-marketing",
    icon: "TrendingUp",
    title: "Digital Marketing & SEO",
    shortDesc: "Get found on Google. Get chosen by customers.",
    fullDesc: "Local SEO, Google Ads, and social media management tailored for Toronto and Durham Region businesses. We drive targeted traffic that converts — not just vanity metrics.",
    benefits: [
      "Local SEO for Toronto & GTA",
      "Google Ads management",
      "Social media content & scheduling",
      "Monthly performance reporting",
      "Reputation management",
    ],
    useCases: ["Local Businesses", "Service Providers", "Healthcare", "Real Estate"],
    slug: "digital-marketing",
    pricingTeaser: "Starting from $499/mo",
    href: "/services#digital-marketing",
  },
]

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
