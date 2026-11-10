/**
 * Industries we build for.
 *
 * Each entry drives a card on the homepage and a full page at /industries/[slug].
 * Copy describes the problems owners in that sector raise and what we build for
 * them. It makes no claim of past client results; proof is limited to the live
 * builds listed in `projectSlugs`, which may be empty.
 */

export interface IndustryBuild {
  title: string
  outcome: string
  /** Service id from SERVICES; supplies the link and starting price */
  serviceId: string
}

export interface Industry {
  slug: string
  name: string
  /** Lucide icon name, mapped in components/industries/IndustryIcon */
  icon: string
  /** Two short promises shown on the card */
  tagline: string
  /** Page H1 */
  headline: string
  intro: string
  /** Who this page is for, as a plain list */
  audience: string
  pains: { title: string; body: string }[]
  builds: IndustryBuild[]
  /** The first project we would usually recommend */
  starter: {
    name: string
    summary: string
    includes: string[]
    priceLabel: string
  }
  projectSlugs: string[]
  faqs: { question: string; answer: string }[]
  keywords: string[]
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    icon: "ShoppingBag",
    tagline: "Easier buying. Fewer abandoned carts.",
    headline: "Online stores that turn browsers into orders",
    intro:
      "We build the store, connect payments and shipping, and automate the follow-up that brings customers back, on Shopify or custom-built.",
    audience: "Independent retailers, direct-to-consumer brands, specialty food, fashion and gift shops",
    pains: [
      {
        title: "Carts abandoned at shipping",
        body: "Shoppers leave when the shipping cost appears late or looks wrong. Rates have to be right for every province before the checkout page.",
      },
      {
        title: "A store nobody finds",
        body: "Thin product pages do not rank on Google and are not recommended by AI assistants, so traffic has to be bought.",
      },
      {
        title: "One-time buyers",
        body: "Without automatic follow-up, a first order rarely becomes a second.",
      },
      {
        title: "Stock in three places",
        body: "Inventory in a spreadsheet, orders in the store and the till in the shop drift apart, and you oversell.",
      },
    ],
    builds: [
      {
        title: "Shopify or custom storefront",
        outcome: "A fast store with clear product pages, a checkout people trust and shipping rules for Canada and the United States.",
        serviceId: "shopify",
      },
      {
        title: "Cart recovery and reorder emails",
        outcome: "Automatic reminders for abandoned carts and repeat purchases, written once and sent every time.",
        serviceId: "ai-workflows",
      },
      {
        title: "AI shopping assistant",
        outcome: "Answers product, shipping and returns questions at any hour and hands over to you when it should.",
        serviceId: "ai-automation",
      },
      {
        title: "Product search visibility",
        outcome: "Product and guide pages structured to rank in search and be quoted by AI assistants.",
        serviceId: "ai-marketing",
      },
      {
        title: "Sales dashboard",
        outcome: "Orders, margin and slow movers in one view, with a plain-English summary each week.",
        serviceId: "ai-dashboards",
      },
    ],
    starter: {
      name: "Store launch",
      summary: "A complete store, ready to take orders.",
      includes: [
        "Shopify or custom storefront in your brand",
        "Payments, taxes and shipping rules set up",
        "Product pages built for search",
        "30 days of post-launch support",
      ],
      priceLabel: "From $800 CAD",
    },
    projectSlugs: ["adam-leather", "himalayan-saffron"],
    faqs: [
      {
        question: "Shopify or a custom-built store: which should I choose?",
        answer:
          "Shopify is right for most stores. It launches quickly and handles payments, tax and inventory out of the box. A custom build makes sense when you need unusual pricing, complex shipping rules or a buying experience a theme cannot deliver. We build both and will tell you which fits before you spend anything.",
      },
      {
        question: "Can you move my existing store without losing sales or rankings?",
        answer:
          "Yes. We migrate products, customers and order history, map every old address to its new one with permanent redirects, and switch over outside your busy hours.",
      },
    ],
    keywords: ["Shopify developer Toronto", "e-commerce website Ontario", "online store development Canada"],
  },
  {
    slug: "healthcare-clinics",
    name: "Healthcare & Clinics",
    icon: "Stethoscope",
    tagline: "Fuller schedules. Fewer no-shows.",
    headline: "Websites, online booking and AI reception for clinics",
    intro:
      "We make it easy for patients to find you and book, and we take routine calls and reminders off the front desk.",
    audience: "Dental, physiotherapy, chiropractic, optometry, medical, veterinary and wellness clinics",
    pains: [
      {
        title: "The phone rings while the desk is busy",
        body: "A new patient who reaches voicemail usually calls the next clinic on the list.",
      },
      {
        title: "No-shows",
        body: "An empty chair costs the same as a full one, and reminders sent by hand get skipped on busy days.",
      },
      {
        title: "Hard to find for a specific treatment",
        body: "Patients search for a treatment and a town. One general services page ranks for neither.",
      },
      {
        title: "Intake on paper",
        body: "Forms filled in at the desk are retyped into the practice system, which takes time and introduces errors.",
      },
    ],
    builds: [
      {
        title: "Clinic website with online booking",
        outcome: "A page for each treatment and location, with booking one tap away on a phone.",
        serviceId: "web-development",
      },
      {
        title: "AI receptionist",
        outcome: "Answers questions about hours, location, services and booking. It gives no clinical advice and passes the conversation to your staff when it should.",
        serviceId: "ai-automation",
      },
      {
        title: "Reminders and recalls",
        outcome: "Appointment reminders, rescheduling links and recall messages that go out without anyone remembering to send them.",
        serviceId: "ai-workflows",
      },
      {
        title: "Local search and Google profile",
        outcome: "An accurate profile, treatment pages that rank locally and automatic review requests after each visit.",
        serviceId: "ai-marketing",
      },
    ],
    starter: {
      name: "Front desk relief",
      summary: "Take routine questions and bookings off your staff.",
      includes: [
        "Audit of your front-desk workflow",
        "AI receptionist on your website and messaging channels",
        "Appointment booking with calendar sync",
        "Hand-off to staff for anything clinical",
      ],
      priceLabel: "From $799 CAD setup + $299/mo",
    },
    projectSlugs: [],
    faqs: [
      {
        question: "How do you handle patient privacy?",
        answer:
          "We design the system so personal health information stays in your practice management software. The AI receptionist handles scheduling and general questions, not clinical details, and we document what each tool stores and where before anything goes live. You remain the custodian of patient records under Ontario's health privacy law.",
      },
      {
        question: "Will it work with our booking software?",
        answer:
          "In most cases, yes. We connect to booking and practice systems that offer an integration or calendar sync. Where one does not, we use a booking request that your staff confirm.",
      },
    ],
    keywords: ["dental website design Ontario", "clinic website design Toronto", "AI receptionist for clinics"],
  },
  {
    slug: "trades-home-services",
    name: "Trades & Home Services",
    icon: "Hammer",
    tagline: "Faster quotes. More booked jobs.",
    headline: "Win the job before the competitor calls back",
    intro:
      "We build the website that brings in enquiries and the automation that answers them, quotes them and follows up while you are on site.",
    audience: "Contractors, renovators, electricians, plumbers, HVAC, roofers, landscapers and cleaning companies",
    pains: [
      {
        title: "Missed calls on the job",
        body: "You cannot answer the phone on a roof. The caller books whoever picks up first.",
      },
      {
        title: "Quotes that take days",
        body: "Writing estimates at night means the customer has two other quotes before yours arrives.",
      },
      {
        title: "Good work, few reviews",
        body: "Happy customers rarely leave a review unless someone asks at the right moment.",
      },
      {
        title: "Feast and famine",
        body: "Referrals dry up in the slow season and there is nothing bringing in new enquiries.",
      },
    ],
    builds: [
      {
        title: "Lead-ready website",
        outcome: "A page for each service and each town you cover, with click-to-call and a quote request on every screen.",
        serviceId: "web-development",
      },
      {
        title: "AI assistant for enquiries",
        outcome: "Replies on your website, by text and on WhatsApp, collects the job details and books an estimate in your calendar.",
        serviceId: "ai-automation",
      },
      {
        title: "Quote and invoice automation",
        outcome: "Turns an enquiry into a draft quote for your approval, follows up, and pushes the accepted job to invoicing.",
        serviceId: "ai-workflows",
      },
      {
        title: "Reviews and local search",
        outcome: "A review request after every job and a Google profile that shows up for the towns you serve.",
        serviceId: "ai-marketing",
      },
    ],
    starter: {
      name: "Lead-ready website",
      summary: "A site built to make the phone ring.",
      includes: [
        "Service pages for each trade and town",
        "Click-to-call and quote request on every page",
        "Google Business Profile set-up",
        "30 days of post-launch support",
      ],
      priceLabel: "From $1,200 CAD",
    },
    projectSlugs: ["durham-drive-academy"],
    faqs: [
      {
        question: "I get most of my work by referral. Do I need a website?",
        answer:
          "Referrals look you up before they call. A clear site with real photos, reviews and a fast way to request a quote turns more of those referrals into booked jobs, and it brings in work during slow months.",
      },
      {
        question: "Can it deal with enquiries while I am on a job?",
        answer:
          "Yes. The assistant replies on your website, by text and on WhatsApp, collects the job details, books an estimate slot in your calendar and sends you a summary. Missed calls can be followed up by text automatically.",
      },
    ],
    keywords: ["contractor website design Ontario", "HVAC website design", "plumber website Durham Region"],
  },
  {
    slug: "real-estate",
    name: "Real Estate & Property",
    icon: "Building2",
    tagline: "Every lead answered. Every listing seen.",
    headline: "Lead capture and follow-up for agents and property managers",
    intro:
      "We build sites that capture buyers, sellers and tenants, and automation that replies in minutes and keeps following up.",
    audience: "Agents, teams, brokerages, property managers, builders and storage operators",
    pains: [
      {
        title: "Leads that go cold",
        body: "An enquiry answered the next morning has usually booked a showing with someone else.",
      },
      {
        title: "No system for follow-up",
        body: "Buyers who are six months out get forgotten because nobody is reminded to call them.",
      },
      {
        title: "A site that looks like every other agent's",
        body: "Template sites share the same listings feed and give a seller no reason to choose you.",
      },
      {
        title: "Tenant requests by phone",
        body: "Maintenance calls and rent questions interrupt the day and leave no record.",
      },
    ],
    builds: [
      {
        title: "Agent or brokerage website",
        outcome: "Neighbourhood and listing pages written for your market, with a valuation or viewing request on each.",
        serviceId: "web-development",
      },
      {
        title: "Instant lead response",
        outcome: "Every enquiry gets a reply within minutes, qualifying questions and a booking link, then a follow-up sequence.",
        serviceId: "ai-workflows",
      },
      {
        title: "AI assistant for buyers and tenants",
        outcome: "Answers listing and availability questions, books showings and logs maintenance requests.",
        serviceId: "ai-automation",
      },
      {
        title: "Pipeline dashboard",
        outcome: "Leads by source, stage and age, so you can see which marketing pays.",
        serviceId: "ai-dashboards",
      },
    ],
    starter: {
      name: "Lead response system",
      summary: "No enquiry waits more than a few minutes.",
      includes: [
        "Instant reply to every web and portal enquiry",
        "Qualifying questions and showing booking",
        "Follow-up sequence for long-term leads",
        "Leads written to your CRM",
      ],
      priceLabel: "From $999 CAD + $199/mo care",
    },
    projectSlugs: [],
    faqs: [
      {
        question: "Will this work with my CRM?",
        answer:
          "If your CRM offers an integration, an API or an email-to-lead address, yes. We write every lead and conversation into the system you already use.",
      },
      {
        question: "Can you build neighbourhood pages that rank?",
        answer:
          "Yes, provided they contain real local detail: streets, schools, price ranges and your own commentary. We structure them and help you write them. Pages that only swap the neighbourhood name do not rank.",
      },
    ],
    keywords: ["real estate website design Toronto", "realtor lead generation Ontario", "property management website"],
  },
  {
    slug: "restaurants-hospitality",
    name: "Restaurants & Hospitality",
    icon: "UtensilsCrossed",
    tagline: "More covers. Lower commission.",
    headline: "Direct ordering, reservations and reviews for restaurants and venues",
    intro:
      "We build your own ordering and booking, answer the routine questions, and keep regulars coming back without a marketplace taking a cut.",
    audience: "Restaurants, cafés, bakeries, caterers, event venues and boutique hotels",
    pains: [
      {
        title: "Commission on every order",
        body: "Delivery apps bring discovery but take a share of each order, including from customers who already know you.",
      },
      {
        title: "The phone during service",
        body: "Staff answer the same questions about hours, bookings and the menu at the busiest time of day.",
      },
      {
        title: "Reviews with no reply",
        body: "Unanswered reviews, good or bad, tell the next customer nobody is listening.",
      },
      {
        title: "Menus out of date",
        body: "The website, the Google profile and the printed menu all say different things.",
      },
    ],
    builds: [
      {
        title: "Website with ordering and reservations",
        outcome: "Your menu, direct online ordering for pickup and delivery, and table booking, all on your own site.",
        serviceId: "web-development",
      },
      {
        title: "AI assistant for guests",
        outcome: "Answers hours, booking and menu questions on your site and messaging channels, and takes reservation requests.",
        serviceId: "ai-automation",
      },
      {
        title: "Catering and event enquiries",
        outcome: "A structured enquiry form, an automatic first reply and reminders until the booking is confirmed.",
        serviceId: "ai-workflows",
      },
      {
        title: "Reviews and local search",
        outcome: "Review requests after a visit, replies drafted for your approval and an accurate Google profile.",
        serviceId: "ai-marketing",
      },
    ],
    starter: {
      name: "Direct ordering website",
      summary: "Take orders and bookings on your own site.",
      includes: [
        "Menu, hours and location pages",
        "Direct ordering for pickup and delivery",
        "Table booking or reservation requests",
        "30 days of post-launch support",
      ],
      priceLabel: "From $1,200 CAD",
    },
    projectSlugs: [],
    faqs: [
      {
        question: "Can I take orders on my own site instead of through delivery apps?",
        answer:
          "Yes. We set up direct online ordering for pickup and delivery on your own site, so regulars can order from you without a marketplace fee. Most restaurants keep the apps for discovery and move repeat customers to direct ordering.",
      },
      {
        question: "Can you connect to my point-of-sale system?",
        answer:
          "Often, yes. It depends on which system you use and what it lets other software do. We check before quoting and tell you plainly if a manual step is needed.",
      },
    ],
    keywords: ["restaurant website design Toronto", "online ordering website for restaurants", "restaurant website Durham Region"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    icon: "Briefcase",
    tagline: "Qualified enquiries. Less admin.",
    headline: "Client intake and automation for law, accounting and advisory firms",
    intro:
      "We build the site that brings in the right enquiries and the workflows that take intake, booking and routine documents off your fee-earners.",
    audience: "Law firms, accountants, bookkeepers, consultants, insurance and mortgage brokers, immigration consultants",
    pains: [
      {
        title: "Enquiries that are not a fit",
        body: "Time goes on calls with people you cannot help, because the website does not say who you act for.",
      },
      {
        title: "Intake by email",
        body: "Collecting documents and details takes a week of back-and-forth before any billable work starts.",
      },
      {
        title: "Every proposal from scratch",
        body: "Engagement letters and proposals are rewritten each time from an old copy.",
      },
      {
        title: "Knowledge locked in files",
        body: "Answers to questions the firm has solved before sit in documents nobody can search.",
      },
    ],
    builds: [
      {
        title: "Authority website",
        outcome: "A page for each practice area, written to answer the questions clients ask before they call.",
        serviceId: "web-development",
      },
      {
        title: "Intake and booking workflow",
        outcome: "Qualifying questions, document collection and a consultation booking, finished before the first meeting.",
        serviceId: "ai-workflows",
      },
      {
        title: "Client-facing AI assistant",
        outcome: "Handles general questions and booking, and passes anything needing professional judgment to a person.",
        serviceId: "ai-automation",
      },
      {
        title: "AI training for your team",
        outcome: "Hands-on sessions on using AI safely for drafting, research and summaries, built around your own work.",
        serviceId: "ai-training",
      },
    ],
    starter: {
      name: "AI Opportunity Audit",
      summary: "Find where the firm's hours are going.",
      includes: [
        "60 to 90 minute review of how work moves through the firm",
        "Top opportunities ranked by payback",
        "Written action plan within 48 hours",
        "Fee credited toward any project",
      ],
      priceLabel: "$499 CAD",
    },
    projectSlugs: ["subsurfaceai"],
    faqs: [
      {
        question: "How do you protect client confidentiality?",
        answer:
          "We keep client documents in systems you control, use AI services under terms that keep your data out of model training, and document where each piece of information is stored. Nothing confidential goes into a public AI tool.",
      },
      {
        question: "We are a regulated profession. Can an AI assistant advise clients?",
        answer:
          "No, and it should not. Client-facing assistants handle intake, booking and general questions, and pass anything that needs professional judgment to a person at the firm.",
      },
    ],
    keywords: ["law firm website design Toronto", "accounting firm website Ontario", "AI automation for professional services"],
  },
  {
    slug: "manufacturing-industrial",
    name: "Manufacturing & Industrial",
    icon: "Factory",
    tagline: "More quote requests. Less chasing.",
    headline: "Catalogue sites, quoting and dashboards for manufacturers and suppliers",
    intro:
      "We put your range and specifications where buyers research, turn enquiries into tracked quote requests, and give you one view of orders and output.",
    audience: "Manufacturers, fabricators, machinery suppliers, exporters and industrial distributors",
    pains: [
      {
        title: "Buyers cannot find your specifications",
        body: "Engineers and purchasers shortlist suppliers online. A brochure site with no detail does not make the list.",
      },
      {
        title: "Quote requests nobody tracks",
        body: "Enquiries arrive by phone, email and WhatsApp and there is no record of which were quoted or won.",
      },
      {
        title: "The same questions, every day",
        body: "Sales staff answer repeated questions about lead times, spares and compatibility.",
      },
      {
        title: "Production numbers in spreadsheets",
        body: "Orders, output and margin live in separate files, so the picture is always a week old.",
      },
    ],
    builds: [
      {
        title: "Product catalogue and quote site",
        outcome: "Your range organized the way a buyer specifies it, with a quote request on every product.",
        serviceId: "web-development",
      },
      {
        title: "Quote automation",
        outcome: "Each request is logged, acknowledged, routed to the right person and followed up until it closes.",
        serviceId: "ai-workflows",
      },
      {
        title: "AI assistant for products and spares",
        outcome: "Answers specification, compatibility and lead-time questions from your own product data.",
        serviceId: "ai-automation",
      },
      {
        title: "Operations dashboard",
        outcome: "Orders, output and margin in one live view, with a plain-English weekly summary.",
        serviceId: "ai-dashboards",
      },
    ],
    starter: {
      name: "Catalogue and quote site",
      summary: "Get onto the buyer's shortlist.",
      includes: [
        "Product catalogue structured by line or process stage",
        "Quote request routed to phone, email or WhatsApp",
        "Buyer's guide content for search",
        "30 days of post-launch support",
      ],
      priceLabel: "From $1,200 CAD",
    },
    projectSlugs: ["national-machinery-stores", "cosmic-bag-industries"],
    faqs: [
      {
        question: "Our buyers are other businesses. Does a website matter?",
        answer:
          "Yes. Industrial buyers research suppliers online before they make contact. A site that shows your range, specifications and capability gets you onto the shortlist, and a clear quote request turns that research into an enquiry.",
      },
      {
        question: "Can you handle a large product catalogue?",
        answer:
          "Yes. We structure the catalogue by product line or process stage and import the data from your existing spreadsheets or system, so it can be updated without a developer.",
      },
    ],
    keywords: ["manufacturing website design Ontario", "industrial website design Canada", "B2B catalogue website"],
  },
  {
    slug: "logistics-distribution",
    name: "Logistics & Distribution",
    icon: "Truck",
    tagline: "Visible shipments. Fewer status calls.",
    headline: "Quoting, tracking and dispatch automation for carriers and distributors",
    intro:
      "We give your customers a way to quote and track without calling, and take paperwork and status updates off your dispatch desk.",
    audience: "Carriers, freight brokers, couriers, warehouses, wholesalers and distributors",
    pains: [
      {
        title: "Where is my shipment?",
        body: "Dispatch spends hours a day answering status calls that a link could answer.",
      },
      {
        title: "Quotes by email",
        body: "Rate requests sit in an inbox, and the customer books the carrier who answered first.",
      },
      {
        title: "Paperwork typed twice",
        body: "Bills of lading and proofs of delivery are keyed in by hand from photos and PDFs.",
      },
      {
        title: "No view of margin",
        body: "Without lane or customer margin in one place, unprofitable work goes unnoticed.",
      },
    ],
    builds: [
      {
        title: "Customer portal",
        outcome: "Quote requests, bookings and shipment status in one place your customers can check themselves.",
        serviceId: "web-development",
      },
      {
        title: "Document automation",
        outcome: "Reads bills of lading and delivery proofs, files them against the load and flags exceptions.",
        serviceId: "ai-workflows",
      },
      {
        title: "AI assistant for status and rates",
        outcome: "Answers status and rate enquiries from your own data and passes exceptions to dispatch.",
        serviceId: "ai-automation",
      },
      {
        title: "Operations dashboard",
        outcome: "On-time performance, volume and margin by customer and lane, updated live.",
        serviceId: "ai-dashboards",
      },
    ],
    starter: {
      name: "AI Opportunity Audit",
      summary: "Find the hours your dispatch desk is losing.",
      includes: [
        "60 to 90 minute review of how loads and paperwork move",
        "Top opportunities ranked by payback",
        "Written action plan within 48 hours",
        "Fee credited toward any project",
      ],
      priceLabel: "$499 CAD",
    },
    projectSlugs: [],
    faqs: [
      {
        question: "Can you connect to our transport or warehouse management system?",
        answer:
          "If it offers an API, a scheduled export or email notifications, yes. We check what your system allows before quoting and build around it.",
      },
      {
        question: "We are a small fleet. Is this more than we need?",
        answer:
          "No. Small operators feel administration the most because the owner is often the dispatcher. We start with the single task that costs the most time, usually status updates or paperwork.",
      },
    ],
    keywords: ["logistics website design Ontario", "trucking company website", "freight automation Canada"],
  },
  {
    slug: "education-training",
    name: "Education & Training",
    icon: "GraduationCap",
    tagline: "Clear courses. Full classes.",
    headline: "Enrolment websites and booking for schools and training providers",
    intro:
      "We lay out your courses and prices clearly, let students book and pay online, and follow up every enquiry until the seat is filled.",
    audience: "Driving schools, tutoring centres, private schools, colleges, training companies and coaches",
    pains: [
      {
        title: "Prices and schedules by phone",
        body: "Parents and students call to ask what a clear course page would tell them.",
      },
      {
        title: "Enquiries that never enrol",
        body: "Without follow-up, most people who ask about a course do not come back.",
      },
      {
        title: "Missed lessons",
        body: "A no-show is an hour of an instructor's time that cannot be resold.",
      },
      {
        title: "Not found locally",
        body: "Families search for a course and a town, and choose from the first few results.",
      },
    ],
    builds: [
      {
        title: "Course and enrolment website",
        outcome: "Programs, packages and prices laid out by stage, with booking or enrolment on every page.",
        serviceId: "web-development",
      },
      {
        title: "Enquiry follow-up and reminders",
        outcome: "Every enquiry gets a reply and a sequence, and every lesson gets a reminder.",
        serviceId: "ai-workflows",
      },
      {
        title: "AI assistant for students and parents",
        outcome: "Answers course, schedule and price questions at any hour and books a call or a lesson.",
        serviceId: "ai-automation",
      },
      {
        title: "Local search",
        outcome: "Pages for each town you teach in and a Google profile that collects reviews from graduates.",
        serviceId: "ai-marketing",
      },
    ],
    starter: {
      name: "Enrolment website",
      summary: "Make the course and the next step obvious.",
      includes: [
        "Course and package pages with pricing",
        "Online booking or enrolment request",
        "Pages for each town you serve",
        "30 days of post-launch support",
      ],
      priceLabel: "From $1,200 CAD",
    },
    projectSlugs: ["durham-drive-academy"],
    faqs: [
      {
        question: "Can students book and pay online?",
        answer:
          "Yes. We add booking and payment to the site, connect it to your calendar and send confirmations and reminders automatically.",
      },
      {
        question: "We have several packages. Can the site make them easy to compare?",
        answer:
          "Yes. We lay packages side by side with what each includes and what it costs, and put the booking action next to each one.",
      },
    ],
    keywords: ["driving school website design", "tutoring website design Ontario", "school website design Toronto"],
  },
  {
    slug: "energy-engineering",
    name: "Energy & Engineering",
    icon: "Zap",
    tagline: "Knowledge out of PDFs. Into tools.",
    headline: "AI advisors, calculators and regulatory tools for technical firms",
    intro:
      "We turn reports, spreadsheets and regulatory processes into software your team and your clients can use in a browser.",
    audience: "Energy companies, engineering consultancies, environmental firms and regulatory teams",
    pains: [
      {
        title: "Expertise buried in reports",
        body: "Answers the firm has already worked out sit in documents that take hours to search.",
      },
      {
        title: "Spreadsheets doing a product's job",
        body: "Critical calculations live in files that are emailed around, copied and quietly changed.",
      },
      {
        title: "Applications assembled by hand",
        body: "Regulatory submissions are rebuilt from old examples each time, and gaps are found late.",
      },
      {
        title: "Results nobody can explore",
        body: "Model output is delivered as static charts, so every what-if question means another run.",
      },
    ],
    builds: [
      {
        title: "AI advisor on your documents",
        outcome: "Answers questions from your own standards, reports and regulations, and shows where each answer came from.",
        serviceId: "ai-workflows",
      },
      {
        title: "Calculators and simulators",
        outcome: "Engineering calculations and screening models rebuilt as browser tools with charts and report export.",
        serviceId: "web-development",
      },
      {
        title: "Guided application builders",
        outcome: "A regulatory process turned into a step-by-step tool with a checklist and generated documents.",
        serviceId: "ai-workflows",
      },
      {
        title: "Technical dashboards",
        outcome: "Project, regulatory or asset data in one interactive view instead of a slide deck.",
        serviceId: "ai-dashboards",
      },
    ],
    starter: {
      name: "AI Opportunity Audit",
      summary: "Pick the first tool worth building.",
      includes: [
        "60 to 90 minute review with your technical leads",
        "Candidate tools ranked by value and effort",
        "Written action plan within 48 hours",
        "Fee credited toward any project",
      ],
      priceLabel: "$499 CAD",
    },
    projectSlugs: ["ccus-compass", "d065-application-assistant", "nisku-co2-simulator"],
    faqs: [
      {
        question: "Can you work with confidential technical data?",
        answer:
          "Yes. Tools can be built to run entirely in the browser, so project data never leaves the user's machine, or deployed inside your own environment.",
      },
      {
        question: "How do you make sure the calculations are right?",
        answer:
          "Your subject-matter experts specify the method and the validation cases. We implement it, check the tool against those cases and document the equations and references inside the tool.",
      },
    ],
    keywords: ["engineering software development Canada", "AI for energy companies Alberta", "regulatory dashboard development"],
  },
  {
    slug: "beauty-fitness-wellness",
    name: "Beauty, Fitness & Wellness",
    icon: "Sparkles",
    tagline: "Booked chairs. Returning clients.",
    headline: "Booking and client retention for salons, studios and gyms",
    intro:
      "We turn messages into bookings, cut no-shows with reminders, and bring lapsed clients back without anyone chasing them.",
    audience: "Salons, barbers, spas, medical aesthetics, gyms, yoga and fitness studios",
    pains: [
      {
        title: "Bookings lost in messages",
        body: "Requests arrive by Instagram, WhatsApp and text, and some are answered too late to keep.",
      },
      {
        title: "No-shows and late cancellations",
        body: "An empty slot with no notice cannot be refilled.",
      },
      {
        title: "Clients who drift away",
        body: "Nobody notices a regular has not been in for three months until they have gone elsewhere.",
      },
      {
        title: "Invisible in local search",
        body: "New residents search for a service nearby and pick from the top of the map.",
      },
    ],
    builds: [
      {
        title: "Booking website",
        outcome: "Services, prices and staff on one clear site, with booking in two taps on a phone.",
        serviceId: "web-development",
      },
      {
        title: "AI assistant on your messaging channels",
        outcome: "Replies on Instagram, WhatsApp and your website, answers price and availability questions and books the appointment.",
        serviceId: "ai-automation",
      },
      {
        title: "Reminders and win-back messages",
        outcome: "Appointment reminders, rebooking prompts and a message to clients who have not returned.",
        serviceId: "ai-workflows",
      },
      {
        title: "Reviews and local search",
        outcome: "A review request after each visit and a Google profile that ranks in your neighbourhood.",
        serviceId: "ai-marketing",
      },
    ],
    starter: {
      name: "Front desk relief",
      summary: "Turn every message into a booking.",
      includes: [
        "Audit of how bookings reach you today",
        "AI assistant on your website and messaging channels",
        "Appointment booking with calendar sync",
        "Hand-off to staff when a person is needed",
      ],
      priceLabel: "From $799 CAD setup + $299/mo",
    },
    projectSlugs: [],
    faqs: [
      {
        question: "Most of my bookings come through Instagram. Can you work with that?",
        answer:
          "Yes. The assistant replies to Instagram and WhatsApp messages, answers price and availability questions and books straight into your calendar, so nothing waits until you are free.",
      },
      {
        question: "Does this replace my booking app?",
        answer:
          "It does not have to. We connect to the booking tool you use where it allows it. If you do not have one, we set one up as part of the build.",
      },
    ],
    keywords: ["salon website design Toronto", "gym website design Ontario", "booking website for salons"],
  },
  {
    slug: "automotive",
    name: "Automotive",
    icon: "Car",
    tagline: "Bays filled. Leads answered.",
    headline: "Service booking and lead follow-up for shops and dealers",
    intro:
      "We let customers book service online, answer quote requests in minutes, and send the reminders that bring vehicles back.",
    audience: "Repair shops, tire and detailing shops, body shops, independent dealers and fleet service providers",
    pains: [
      {
        title: "Phone tag for bookings",
        body: "Customers call for a slot while every technician and advisor is busy.",
      },
      {
        title: "The seasonal rush",
        body: "Tire changeover weeks overwhelm the phones, and bookings are lost to shops with online scheduling.",
      },
      {
        title: "Leads from listing sites",
        body: "Enquiries on a vehicle go unanswered for hours, and the buyer moves on.",
      },
      {
        title: "No reason to come back",
        body: "Without service reminders, customers return only when something breaks, and not always to you.",
      },
    ],
    builds: [
      {
        title: "Service booking website",
        outcome: "Services and prices set out clearly, with online booking that fills the calendar without a call.",
        serviceId: "web-development",
      },
      {
        title: "AI assistant for quotes and bookings",
        outcome: "Answers service, price and availability questions and books the appointment at any hour.",
        serviceId: "ai-automation",
      },
      {
        title: "Service reminders",
        outcome: "Maintenance, seasonal tire and follow-up reminders sent automatically from your customer list.",
        serviceId: "ai-workflows",
      },
      {
        title: "Reviews and local search",
        outcome: "A review request after each job and a Google profile that shows up when someone nearby needs a shop.",
        serviceId: "ai-marketing",
      },
    ],
    starter: {
      name: "Service booking website",
      summary: "Fill the bays without answering the phone.",
      includes: [
        "Service and pricing pages",
        "Online booking with calendar sync",
        "Google Business Profile set-up",
        "30 days of post-launch support",
      ],
      priceLabel: "From $1,200 CAD",
    },
    projectSlugs: [],
    faqs: [
      {
        question: "Can it handle the spring and fall tire rush?",
        answer:
          "Yes. Online booking spreads appointments across the available bays, and reminders go out to last season's customers before the rush starts, so the calendar fills in an orderly way.",
      },
      {
        question: "Can you answer enquiries on our vehicle listings?",
        answer:
          "Yes. Enquiries from your website and from listing sites that forward leads by email are answered within minutes, qualified and booked for a viewing or test drive.",
      },
    ],
    keywords: ["auto repair shop website design", "car dealership website Ontario", "automotive website design Toronto"],
  },
]

export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug)
}
