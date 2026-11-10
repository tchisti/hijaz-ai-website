/**
 * Service-area pages.
 *
 * Each city carries its own market context, service emphasis and FAQ so the
 * pages are useful on their own rather than one template with the name swapped.
 * `tier` states honestly how we work with that market:
 *   onsite  - we meet in person
 *   hybrid  - in person by arrangement, otherwise remote
 *   remote  - delivered remotely, anywhere in Canada
 */

export type LocationTier = "onsite" | "hybrid" | "remote"

export interface Location {
  slug: string
  name: string
  region: string
  province: string
  provinceCode: string
  tier: LocationTier
  /** Position on the homepage corridor strip, west (0) to east; omitted for cities off the corridor */
  corridor?: number
  /** Page H1 */
  headline: string
  /** Opening paragraph: who we are for this market, stated plainly */
  intro: string
  /** What the local market looks like and what that means for a business owner */
  market: string
  /** Sectors we expect to matter most here */
  sectors: string[]
  /** Service ids from SERVICES, in the order that fits this market */
  serviceIds: string[]
  /** Project slugs that are relevant proof for this market */
  projectSlugs: string[]
  nearby: string[]
  faqs: { question: string; answer: string }[]
}

export const TIER_LABELS: Record<LocationTier, string> = {
  onsite: "On-site",
  hybrid: "On-site by arrangement",
  remote: "Remote delivery",
}

export const LOCATIONS: Location[] = [
  // ── Durham Region ─────────────────────────────────────────────────────────
  {
    slug: "ajax",
    name: "Ajax",
    region: "Durham Region",
    province: "Ontario",
    provinceCode: "ON",
    tier: "onsite",
    corridor: 9,
    headline: "Web design, online stores and AI automation in Ajax, Ontario",
    intro:
      "Hijaz.ai is a business technology partner working on-site with Ajax businesses. We build websites, Shopify and custom online stores, AI assistants and the automation behind them, and we will sit down with you in person to scope it.",
    market:
      "Ajax sits between Pickering and Whitby on the Highway 401 corridor, and most of its businesses compete for customers who also shop in both. A business here is usually found through a map search on a phone, so the work that pays back first is a fast site, an accurate Google Business Profile and a way to answer enquiries after hours.",
    sectors: ["Trades and home services", "Storage and logistics", "Clinics and wellness", "Restaurants and retail"],
    serviceIds: ["web-development", "ai-automation", "ai-marketing", "shopify"],
    projectSlugs: ["durham-drive-academy", "adam-leather"],
    nearby: ["pickering", "whitby", "oshawa", "toronto"],
    faqs: [
      {
        question: "Do you meet Ajax businesses in person?",
        answer:
          "Yes. Ajax is part of our home service area. We meet at your premises or a location that suits you, and handle the build and support remotely between visits.",
      },
      {
        question: "How do I get my Ajax business to show up on Google Maps?",
        answer:
          "Three things move a local map ranking: a complete and verified Google Business Profile, a website that names your services and the town on dedicated pages, and a steady flow of genuine customer reviews. We set up all three and automate the review requests.",
      },
    ],
  },
  {
    slug: "pickering",
    name: "Pickering",
    region: "Durham Region",
    province: "Ontario",
    provinceCode: "ON",
    tier: "onsite",
    corridor: 8,
    headline: "Websites, e-commerce and AI automation for Pickering businesses",
    intro:
      "Hijaz.ai builds websites, online stores and AI automation for businesses in Pickering, with in-person meetings and fixed-price quotes.",
    market:
      "Pickering is the western gateway to Durham Region, bordering Scarborough, so its businesses draw customers from both Durham and Toronto. Energy and utilities are major employers and the city continues to add housing and commercial space. For a local business that means new residents searching for services for the first time, and whoever is easiest to find and book online gets the call.",
    sectors: ["Professional services", "Home services", "Health and dental clinics", "Retail and hospitality"],
    serviceIds: ["web-development", "ai-automation", "ai-workflows", "ai-marketing"],
    projectSlugs: ["durham-drive-academy", "adam-leather"],
    nearby: ["ajax", "whitby", "toronto", "markham"],
    faqs: [
      {
        question: "Can you rebuild an existing Pickering business website without losing our Google rankings?",
        answer:
          "Yes. Before a rebuild we map every existing URL, carry over the pages that earn traffic, and set permanent redirects for anything that moves, so the rankings transfer to the new site.",
      },
      {
        question: "Do you serve businesses on both sides of the Pickering and Scarborough border?",
        answer:
          "Yes. We work across Durham Region and Toronto, and we structure service-area pages so one business can rank in both without duplicating content.",
      },
    ],
  },
  {
    slug: "whitby",
    name: "Whitby",
    region: "Durham Region",
    province: "Ontario",
    provinceCode: "ON",
    tier: "onsite",
    corridor: 10,
    headline: "Web development and AI automation in Whitby, Ontario",
    intro:
      "Hijaz.ai works on-site with Whitby businesses to build websites, online stores, AI receptionists and workflow automation.",
    market:
      "Whitby is the seat of Durham Region's government and has a strong base of professional offices, health services and established family businesses, with historic downtowns in Whitby and Brooklin. Many firms here have a loyal customer base and a website that has not changed in years. The opportunity is usually less about being found and more about converting: online booking, faster quoting and follow-ups that happen automatically.",
    sectors: ["Legal and accounting firms", "Health services", "Home renovation", "Independent retail"],
    serviceIds: ["ai-workflows", "web-development", "ai-automation", "ai-dashboards"],
    projectSlugs: ["durham-drive-academy", "adam-leather"],
    nearby: ["ajax", "oshawa", "pickering", "clarington"],
    faqs: [
      {
        question: "We already have a website. Is it worth adding AI to it?",
        answer:
          "Often, yes. An AI assistant that answers common questions and books appointments can be added to an existing site without a rebuild. We start with a $499 audit that tells you whether it will pay back before you commit.",
      },
      {
        question: "Can you automate quoting and follow-up for a Whitby service business?",
        answer:
          "Yes. We connect your enquiry form, email, calendar and accounting tool so a quote goes out, a reminder follows, and a review request is sent after the job, without anyone retyping details.",
      },
    ],
  },
  {
    slug: "oshawa",
    name: "Oshawa",
    region: "Durham Region",
    province: "Ontario",
    provinceCode: "ON",
    tier: "onsite",
    corridor: 11,
    headline: "Website design, Shopify and AI automation in Oshawa",
    intro:
      "Hijaz.ai builds websites, online stores and AI automation for businesses in Oshawa, the largest city in Durham Region, with on-site meetings.",
    market:
      "Oshawa has a long manufacturing history in the automotive sector and a growing education and health economy around Ontario Tech University, Durham College and its hospital. That mix produces industrial suppliers who sell to other businesses, and a large student and young-family population who buy on their phones. We build for both: catalogue and quote-request sites for suppliers, and mobile-first stores and booking for consumer businesses.",
    sectors: ["Manufacturing and suppliers", "Automotive services", "Education and training", "Restaurants and retail"],
    serviceIds: ["web-development", "shopify", "ai-automation", "ai-marketing"],
    projectSlugs: ["durham-drive-academy", "national-machinery-stores"],
    nearby: ["whitby", "clarington", "ajax", "pickering"],
    faqs: [
      {
        question: "Do you build websites for industrial and manufacturing businesses in Oshawa?",
        answer:
          "Yes. We have built catalogue and quote-request websites for machinery suppliers and manufacturers. These sites are organized around how a buyer specifies a product, and they route enquiries to phone, email or WhatsApp.",
      },
      {
        question: "How quickly can an Oshawa business get a new website live?",
        answer:
          "Most business websites are delivered within 3 to 7 business days once your content is ready. Online stores and web applications usually take 2 to 4 weeks.",
      },
    ],
  },
  {
    slug: "clarington",
    name: "Clarington",
    region: "Durham Region",
    province: "Ontario",
    provinceCode: "ON",
    tier: "onsite",
    headline: "Websites and AI automation for Bowmanville, Courtice and Newcastle",
    intro:
      "Hijaz.ai serves Clarington businesses in Bowmanville, Courtice, Newcastle and Orono with websites, online stores and AI automation.",
    market:
      "Clarington is the eastern edge of Durham Region: several distinct communities, a large rural and agricultural area and a major energy employer. Businesses here often serve a wide catchment, so customers travel or the business does. Clear service-area pages, online ordering and booking, and automated reminders matter more here than in a dense urban market.",
    sectors: ["Agriculture and farm retail", "Trades and contractors", "Tourism and hospitality", "Local retail"],
    serviceIds: ["web-development", "ai-marketing", "shopify", "ai-workflows"],
    projectSlugs: ["durham-drive-academy", "himalayan-saffron"],
    nearby: ["oshawa", "whitby", "ajax"],
    faqs: [
      {
        question: "Can a farm or rural business in Clarington sell online?",
        answer:
          "Yes. We build online stores with local pickup, delivery zones and Canada-wide shipping rules. We have built specialty food stores that ship nationally, so the shipping and packaging questions are familiar ground.",
      },
      {
        question: "Do you cover Bowmanville, Courtice and Newcastle?",
        answer:
          "Yes. All of Clarington is within our on-site service area, along with the rest of Durham Region.",
      },
    ],
  },

  // ── Toronto & GTA ─────────────────────────────────────────────────────────
  {
    slug: "toronto",
    name: "Toronto",
    region: "City of Toronto",
    province: "Ontario",
    provinceCode: "ON",
    tier: "onsite",
    corridor: 6,
    headline: "Business technology partner in Toronto: web, e-commerce and AI",
    intro:
      "Hijaz.ai is a Toronto-based business technology partner. We build websites, online stores, AI assistants and custom software for businesses across the city, including Scarborough, North York, Etobicoke and downtown.",
    market:
      "Toronto is Canada's largest city and its most crowded market: whatever you sell, several competitors are a search away. Ranking for a broad term like a service plus Toronto is slow and expensive. The faster route is to win a neighbourhood and a specific service first, then convert better than the competition with instant answers, online booking and follow-up. That is the order we build in.",
    sectors: ["Retail and e-commerce", "Professional services", "Clinics and wellness", "Restaurants and hospitality"],
    serviceIds: ["ai-audit", "web-development", "shopify", "ai-automation"],
    projectSlugs: ["adam-leather", "himalayan-saffron", "subsurfaceai"],
    nearby: ["pickering", "markham", "vaughan", "mississauga"],
    faqs: [
      {
        question: "Is Hijaz.ai based in Toronto?",
        answer:
          "Yes. Hijaz.ai is based in the Toronto area and works on-site across Toronto and Durham Region.",
      },
      {
        question: "How can a small Toronto business compete with larger companies in search?",
        answer:
          "By being specific. A page that answers one service in one neighbourhood thoroughly will outrank a large company's general page for that search. We build those pages, keep the Google Business Profile accurate, and make sure AI assistants can read and cite your business information.",
      },
      {
        question: "Do you work with Scarborough, North York and Etobicoke businesses?",
        answer:
          "Yes. We work in person across all of Toronto's districts, including Scarborough, North York, Etobicoke and downtown.",
      },
    ],
  },
  {
    slug: "markham",
    name: "Markham",
    region: "York Region",
    province: "Ontario",
    provinceCode: "ON",
    tier: "hybrid",
    headline: "Web development, e-commerce and AI automation in Markham",
    intro:
      "Hijaz.ai builds websites, online stores, AI assistants and custom software for Markham businesses, working remotely with in-person meetings by arrangement.",
    market:
      "Markham has one of the highest concentrations of technology employers in Canada and a large, multilingual consumer market. Buyers here are comfortable online and compare options carefully, so a site that is slow, vague on price or English-only loses them. We build fast, clear sites and AI assistants that can answer in more than one language.",
    sectors: ["Technology and professional services", "Retail and restaurants", "Health and dental clinics", "Education and tutoring"],
    serviceIds: ["ai-automation", "web-development", "shopify", "ai-dashboards"],
    projectSlugs: ["ccus-compass", "adam-leather"],
    nearby: ["toronto", "vaughan", "pickering"],
    faqs: [
      {
        question: "Can your AI assistants answer customers in more than one language?",
        answer:
          "Yes. The AI receptionists and chatbots we build support multiple languages and are trained on your own services, prices and policies.",
      },
      {
        question: "Do you build custom software, not just websites?",
        answer:
          "Yes. We have built AI knowledge platforms, guided application tools, simulators and dashboards. If your process currently lives in spreadsheets or PDFs, we can turn it into a tool.",
      },
    ],
  },
  {
    slug: "vaughan",
    name: "Vaughan",
    region: "York Region",
    province: "Ontario",
    provinceCode: "ON",
    tier: "hybrid",
    headline: "Websites and workflow automation for Vaughan businesses",
    intro:
      "Hijaz.ai builds websites, online stores and AI workflow automation for businesses in Vaughan, including Woodbridge, Concord and Maple.",
    market:
      "Vaughan is one of the GTA's largest industrial and construction hubs, with a dense base of contractors, building-supply firms, manufacturers and distributors. These businesses run on quotes, schedules and invoices. The highest-return work is usually behind the scenes: automating quoting and follow-up, and giving the owner one dashboard for jobs and cash.",
    sectors: ["Construction and trades", "Manufacturing and distribution", "Building supply", "Hospitality and events"],
    serviceIds: ["ai-workflows", "ai-dashboards", "web-development", "ai-automation"],
    projectSlugs: ["national-machinery-stores", "cosmic-bag-industries"],
    nearby: ["toronto", "markham", "brampton", "mississauga"],
    faqs: [
      {
        question: "Can you automate quoting for a contractor or supplier?",
        answer:
          "Yes. We build workflows that turn an enquiry into a draft quote, send it for your approval, follow up automatically and push the accepted job into your invoicing tool.",
      },
      {
        question: "Do you build catalogue websites for distributors?",
        answer:
          "Yes. We have built product catalogue and quote-request sites for industrial suppliers and export manufacturers.",
      },
    ],
  },
  {
    slug: "mississauga",
    name: "Mississauga",
    region: "Peel Region",
    province: "Ontario",
    provinceCode: "ON",
    tier: "hybrid",
    corridor: 5,
    headline: "Web design, e-commerce and AI automation in Mississauga",
    intro:
      "Hijaz.ai builds websites, online stores and AI automation for Mississauga businesses, delivered remotely with in-person meetings by arrangement.",
    market:
      "Mississauga is home to Canada's busiest airport and a large concentration of corporate head offices, logistics operators and life-sciences companies. Many small businesses here sell to other businesses, where the buyer wants a specification and a fast answer, not a brochure. We build sites that make it easy to request a quote and automation that answers within minutes.",
    sectors: ["Logistics and distribution", "Business-to-business services", "Health and life sciences", "Retail and food"],
    serviceIds: ["web-development", "ai-workflows", "ai-automation", "shopify"],
    projectSlugs: ["cosmic-bag-industries", "adam-leather"],
    nearby: ["brampton", "toronto", "hamilton", "vaughan"],
    faqs: [
      {
        question: "Do you build websites for business-to-business companies?",
        answer:
          "Yes. Several of our builds are for manufacturers, exporters and suppliers whose customers are other companies. Those sites are structured around specifications, capability and a quote request.",
      },
      {
        question: "Can you work with our existing IT provider?",
        answer:
          "Yes. We regularly build on top of systems a business already has and coordinate with whoever manages them.",
      },
    ],
  },
  {
    slug: "brampton",
    name: "Brampton",
    region: "Peel Region",
    province: "Ontario",
    provinceCode: "ON",
    tier: "hybrid",
    headline: "Websites, online stores and AI assistants in Brampton",
    intro:
      "Hijaz.ai builds websites, online stores and AI assistants for Brampton businesses, with remote delivery and in-person meetings by arrangement.",
    market:
      "Brampton is one of Canada's fastest-growing and youngest large cities, with a strong base in transportation, logistics and food processing and thousands of family-run businesses. Much of the customer conversation here already happens on WhatsApp and by phone. We build AI assistants that answer on those channels, in the languages your customers use, and pass the lead to you.",
    sectors: ["Trucking and logistics", "Food and grocery", "Immigration and professional services", "Retail"],
    serviceIds: ["ai-automation", "web-development", "shopify", "ai-marketing"],
    projectSlugs: ["national-machinery-stores", "himalayan-saffron"],
    nearby: ["mississauga", "vaughan", "toronto"],
    faqs: [
      {
        question: "Can an AI assistant answer our customers on WhatsApp?",
        answer:
          "Yes. We deploy AI assistants on your website, WhatsApp, Instagram messages and SMS, trained on your own business information.",
      },
      {
        question: "Do you build online stores for food and grocery businesses?",
        answer:
          "Yes. We have built specialty food stores, so we plan for shipping weight, shelf life and local delivery from the start.",
      },
    ],
  },

  // ── Ontario ───────────────────────────────────────────────────────────────
  {
    slug: "hamilton",
    name: "Hamilton",
    region: "Golden Horseshoe",
    province: "Ontario",
    provinceCode: "ON",
    tier: "remote",
    corridor: 4,
    headline: "Web development and AI automation for Hamilton businesses",
    intro:
      "Hijaz.ai builds websites, online stores and AI automation for Hamilton businesses, delivered remotely from the Toronto area.",
    market:
      "Hamilton has moved from a steel economy to a broader mix of advanced manufacturing, health sciences around McMaster University, and a busy independent food and arts scene. That gives the city two kinds of buyer: industrial firms that need credible, specification-led sites, and independent businesses that need to be found and booked locally.",
    sectors: ["Manufacturing", "Health sciences", "Independent food and retail", "Trades"],
    serviceIds: ["web-development", "ai-workflows", "shopify", "ai-marketing"],
    projectSlugs: ["national-machinery-stores", "adam-leather"],
    nearby: ["mississauga", "kitchener-waterloo", "london", "toronto"],
    faqs: [
      {
        question: "Do you work with Hamilton businesses remotely?",
        answer:
          "Yes. Scoping, design reviews and training happen by video call, and the site or system is delivered and supported online. Pricing is the same as for our on-site area.",
      },
    ],
  },
  {
    slug: "kitchener-waterloo",
    name: "Kitchener-Waterloo",
    region: "Waterloo Region",
    province: "Ontario",
    provinceCode: "ON",
    tier: "remote",
    corridor: 3,
    headline: "AI automation and custom software in Kitchener-Waterloo",
    intro:
      "Hijaz.ai builds AI assistants, workflow automation, websites and custom software for businesses in Kitchener, Waterloo and Cambridge.",
    market:
      "Waterloo Region is one of Canada's best-known technology clusters, anchored by the University of Waterloo, alongside long-established manufacturing and insurance employers. Local businesses tend to be technically confident and want a partner who can build, not just advise. Most of our work here is AI integration and custom tools rather than brochure sites.",
    sectors: ["Technology companies", "Advanced manufacturing", "Insurance and finance", "Student-facing retail"],
    serviceIds: ["ai-workflows", "ai-dashboards", "ai-automation", "web-development"],
    projectSlugs: ["ccus-compass", "d065-application-assistant", "nisku-co2-simulator"],
    nearby: ["hamilton", "london", "mississauga"],
    faqs: [
      {
        question: "Can you build a custom AI tool trained on our own documents?",
        answer:
          "Yes. We have built AI advisors and guided workflow tools on top of large regulatory and technical document sets. The same approach applies to policies, manuals, contracts or product data.",
      },
    ],
  },
  {
    slug: "london",
    name: "London",
    region: "Southwestern Ontario",
    province: "Ontario",
    provinceCode: "ON",
    tier: "remote",
    corridor: 2,
    headline: "Websites, e-commerce and AI automation in London, Ontario",
    intro:
      "Hijaz.ai builds websites, online stores and AI automation for businesses in London, Ontario, delivered remotely.",
    market:
      "London is the regional centre for southwestern Ontario, with a large health-care and education economy around Western University and Fanshawe College, plus insurance, food processing and manufacturing. Businesses here serve a wide surrounding area, so service-area pages and online booking do real work.",
    sectors: ["Health care and clinics", "Education", "Food processing", "Professional services"],
    serviceIds: ["web-development", "ai-automation", "ai-marketing", "shopify"],
    projectSlugs: ["durham-drive-academy", "himalayan-saffron"],
    nearby: ["kitchener-waterloo", "windsor", "hamilton"],
    faqs: [
      {
        question: "Will my site rank in London if your team is in Toronto?",
        answer:
          "Yes. Local ranking depends on where your business is and how well your site and Google Business Profile describe it, not on where the developer sits.",
      },
    ],
  },
  {
    slug: "windsor",
    name: "Windsor",
    region: "Southwestern Ontario",
    province: "Ontario",
    provinceCode: "ON",
    tier: "remote",
    corridor: 1,
    headline: "Web development and automation for Windsor-Essex businesses",
    intro:
      "Hijaz.ai builds websites, online stores and workflow automation for businesses in Windsor and Essex County, delivered remotely.",
    market:
      "Windsor is Canada's automotive manufacturing centre and its busiest land border crossing, with a deep supply chain of tooling and parts firms and a strong agri-food sector in Essex County. Many businesses sell across the border, which raises practical questions about currency, shipping and tax that the website has to handle correctly.",
    sectors: ["Automotive supply", "Tooling and manufacturing", "Agri-food", "Cross-border retail"],
    serviceIds: ["web-development", "shopify", "ai-workflows", "ai-dashboards"],
    projectSlugs: ["cosmic-bag-industries", "himalayan-saffron"],
    nearby: ["london", "kitchener-waterloo"],
    faqs: [
      {
        question: "Can you build an online store that sells to both Canada and the United States?",
        answer:
          "Yes. Stores we have built ship to both countries, so cross-border shipping rates, currency display and customer expectations are already worked through.",
      },
    ],
  },
  {
    slug: "kingston",
    name: "Kingston",
    region: "Eastern Ontario",
    province: "Ontario",
    provinceCode: "ON",
    tier: "remote",
    corridor: 12,
    headline: "Websites and AI automation for Kingston businesses",
    intro:
      "Hijaz.ai builds websites, booking systems and AI automation for businesses in Kingston, Ontario, delivered remotely.",
    market:
      "Kingston's economy is shaped by Queen's University, health care, the military and public sector, and a strong tourism season on the waterfront. Demand swings with the academic year and the summer. Businesses here get the most from online booking, seasonal campaigns and automated follow-up that brings one-time visitors back.",
    sectors: ["Tourism and hospitality", "Health care", "Student services", "Independent retail"],
    serviceIds: ["web-development", "ai-automation", "ai-marketing", "ai-workflows"],
    projectSlugs: ["durham-drive-academy", "himalayan-saffron"],
    nearby: ["ottawa", "oshawa"],
    faqs: [
      {
        question: "Can you set up online booking for a seasonal business?",
        answer:
          "Yes. We build booking into the website, connect it to your calendar and send automated confirmations and reminders, with seasonal hours handled in one place.",
      },
    ],
  },
  {
    slug: "ottawa",
    name: "Ottawa",
    region: "National Capital Region",
    province: "Ontario",
    provinceCode: "ON",
    tier: "remote",
    corridor: 13,
    headline: "Web development, AI automation and custom software in Ottawa",
    intro:
      "Hijaz.ai builds websites, AI assistants, dashboards and custom software for businesses and organizations in Ottawa, delivered remotely.",
    market:
      "Ottawa is the national capital, so the federal government shapes the market: a large professional-services sector, a technology cluster in Kanata, and many associations and non-profits. Buyers here care about accessibility, bilingual content and documentation. We build to those expectations and are comfortable turning regulation-heavy processes into usable tools.",
    sectors: ["Professional services", "Associations and non-profits", "Technology", "Regulated industries"],
    serviceIds: ["ai-dashboards", "web-development", "ai-workflows", "ai-automation"],
    projectSlugs: ["ccs-regulatory-guide", "d065-application-assistant", "ccus-compass"],
    nearby: ["kingston", "montreal"],
    faqs: [
      {
        question: "Have you built software for regulated industries?",
        answer:
          "Yes. We have built an interactive guide to carbon storage regulation across ten Canadian and American jurisdictions, and a guided builder for a provincial regulatory application.",
      },
      {
        question: "Can you deliver a bilingual website?",
        answer:
          "Yes. We build English and French versions with correct language tags so search engines serve the right version to each visitor.",
      },
    ],
  },

  // ── Canada ────────────────────────────────────────────────────────────────
  {
    slug: "montreal",
    name: "Montreal",
    region: "Greater Montreal",
    province: "Quebec",
    provinceCode: "QC",
    tier: "remote",
    headline: "E-commerce and AI automation for Montreal businesses",
    intro:
      "Hijaz.ai builds online stores, websites and AI automation for businesses in Montreal, delivered remotely from Ontario.",
    market:
      "Montreal is Canada's second-largest city and a recognized centre for artificial intelligence research, aerospace and creative industries. Selling here means selling in French first. We build bilingual sites and stores and help Ontario brands that want to reach Quebec customers do it properly.",
    sectors: ["E-commerce brands", "Creative and media", "Aerospace supply", "Food and hospitality"],
    serviceIds: ["shopify", "web-development", "ai-automation", "ai-workflows"],
    projectSlugs: ["adam-leather", "himalayan-saffron"],
    nearby: ["ottawa"],
    faqs: [
      {
        question: "Do you ship-enable online stores for Quebec?",
        answer:
          "Yes. Stores we have built ship to every province, including Quebec, and we set up French-language storefronts for brands selling there.",
      },
    ],
  },
  {
    slug: "calgary",
    name: "Calgary",
    region: "Southern Alberta",
    province: "Alberta",
    provinceCode: "AB",
    tier: "remote",
    headline: "AI tools, dashboards and web development for Calgary businesses",
    intro:
      "Hijaz.ai builds AI tools, dashboards, websites and custom software for Calgary businesses, with particular depth in energy.",
    market:
      "Calgary is the head-office city for Canada's energy industry, with a fast-growing technology and logistics sector alongside it. Technical firms here hold their knowledge in reports, spreadsheets and regulatory filings. Our energy tools show what happens when that knowledge is turned into software: an AI advisor, a simulator and a guided application builder, all running in a browser.",
    sectors: ["Energy and carbon management", "Engineering consultancies", "Logistics", "Professional services"],
    serviceIds: ["ai-dashboards", "ai-workflows", "ai-automation", "web-development"],
    projectSlugs: ["ccus-compass", "d065-application-assistant", "nisku-co2-simulator", "co2-pipeline-analyzer"],
    nearby: ["edmonton", "vancouver"],
    faqs: [
      {
        question: "Have you built software for the energy sector?",
        answer:
          "Yes. Our in-house products include an AI knowledge platform for carbon capture and storage, a guided builder for Alberta Directive 065 applications, a carbon dioxide storage simulator and a pipeline phase and flow analyzer.",
      },
    ],
  },
  {
    slug: "edmonton",
    name: "Edmonton",
    region: "Central Alberta",
    province: "Alberta",
    provinceCode: "AB",
    tier: "remote",
    headline: "Custom software, AI and web development in Edmonton",
    intro:
      "Hijaz.ai builds custom software, AI tools and websites for Edmonton businesses, delivered remotely.",
    market:
      "Edmonton is Alberta's capital and the service centre for the province's industrial north, with a major petrochemical and processing cluster nearby and a respected artificial intelligence research community at the University of Alberta. Industrial service companies here win work on capability and compliance, and their websites and internal tools should show both.",
    sectors: ["Industrial services", "Energy and processing", "Public sector suppliers", "Construction"],
    serviceIds: ["ai-dashboards", "web-development", "ai-workflows", "ai-automation"],
    projectSlugs: ["ccs-regulatory-guide", "nisku-co2-simulator", "national-machinery-stores"],
    nearby: ["calgary"],
    faqs: [
      {
        question: "Can you turn our technical spreadsheets into a web tool?",
        answer:
          "Yes. We have converted engineering calculations and screening models into browser-based tools with charts and report export, which makes them easier to share and to control.",
      },
    ],
  },
  {
    slug: "vancouver",
    name: "Vancouver",
    region: "Metro Vancouver",
    province: "British Columbia",
    provinceCode: "BC",
    tier: "remote",
    headline: "E-commerce, web development and AI automation in Vancouver",
    intro:
      "Hijaz.ai builds online stores, websites and AI automation for Vancouver businesses, delivered remotely.",
    market:
      "Vancouver is Canada's Pacific gateway, with the country's largest port, a strong film and technology sector and a consumer market that favours independent and sustainable brands. Direct-to-consumer brands here compete on story and trust. We build stores where sourcing, proof and product are part of the same page.",
    sectors: ["Direct-to-consumer brands", "Import and export", "Technology", "Hospitality"],
    serviceIds: ["shopify", "web-development", "ai-marketing", "ai-automation"],
    projectSlugs: ["himalayan-saffron", "adam-leather"],
    nearby: ["calgary"],
    faqs: [
      {
        question: "Do you build for brands that sell premium or specialty products?",
        answer:
          "Yes. We have built stores for premium leather and specialty food brands. They are structured around origin, testing and traceability, which is what a premium buyer looks for before paying more.",
      },
    ],
  },
  {
    slug: "winnipeg",
    name: "Winnipeg",
    region: "Manitoba",
    province: "Manitoba",
    provinceCode: "MB",
    tier: "remote",
    headline: "Websites, online stores and automation for Winnipeg businesses",
    intro:
      "Hijaz.ai builds websites, online stores and workflow automation for Winnipeg businesses, delivered remotely.",
    market:
      "Winnipeg sits at the centre of the country and has one of Canada's most diversified economies: agri-business, transportation, aerospace, insurance and manufacturing. Many firms are mid-sized, long-established and run on processes that grew by hand. Automating those processes usually returns more than a new website does.",
    sectors: ["Agri-business", "Transportation", "Manufacturing", "Insurance and finance"],
    serviceIds: ["ai-workflows", "web-development", "ai-dashboards", "shopify"],
    projectSlugs: ["national-machinery-stores", "cosmic-bag-industries"],
    nearby: ["calgary", "toronto"],
    faqs: [
      {
        question: "Where should an established business start with automation?",
        answer:
          "With an audit. We map how work moves through your business, rank the opportunities by payback and give you a written plan within 48 hours. The $499 fee is credited toward any project.",
      },
    ],
  },
  {
    slug: "halifax",
    name: "Halifax",
    region: "Nova Scotia",
    province: "Nova Scotia",
    provinceCode: "NS",
    tier: "remote",
    headline: "Web development and AI automation for Halifax businesses",
    intro:
      "Hijaz.ai builds websites, online stores and AI automation for businesses in Halifax and across Atlantic Canada, delivered remotely.",
    market:
      "Halifax is the economic centre of Atlantic Canada, with a major port, a naval and defence presence, several universities and a growing ocean-technology sector. Local businesses often serve the whole region from one location, and many sell seasonal or specialty products that travel well online.",
    sectors: ["Ocean and marine", "Tourism and hospitality", "Specialty food", "Professional services"],
    serviceIds: ["web-development", "shopify", "ai-automation", "ai-marketing"],
    projectSlugs: ["himalayan-saffron", "adam-leather"],
    nearby: ["montreal", "ottawa"],
    faqs: [
      {
        question: "Can you help an Atlantic business sell across Canada?",
        answer:
          "Yes. We have built stores that ship to every province and territory, and we set up shipping rules, taxes and search-optimized pages for national reach.",
      },
    ],
  },
]

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug)
}

/** Cities on the Windsor to Ottawa corridor, ordered west to east */
export const CORRIDOR = LOCATIONS.filter((l) => l.corridor !== undefined).sort(
  (a, b) => (a.corridor ?? 0) - (b.corridor ?? 0)
)

export const LOCATION_GROUPS: { label: string; note: string; slugs: string[] }[] = [
  {
    label: "Durham Region",
    note: "On-site",
    slugs: ["ajax", "pickering", "whitby", "oshawa", "clarington"],
  },
  {
    label: "Toronto & GTA",
    note: "On-site and by arrangement",
    slugs: ["toronto", "markham", "vaughan", "mississauga", "brampton"],
  },
  {
    label: "Ontario",
    note: "Remote delivery",
    slugs: ["hamilton", "kitchener-waterloo", "london", "windsor", "kingston", "ottawa"],
  },
  {
    label: "Across Canada",
    note: "Remote delivery",
    slugs: ["montreal", "calgary", "edmonton", "vancouver", "winnipeg", "halifax"],
  },
]
