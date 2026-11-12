/**
 * Concept builds: demonstration websites for industries where we have no live
 * client build to show. Every business here is invented. They are kept apart
 * from PROJECTS on purpose, so they are never presented as client work, never
 * get a /work/[slug] page and never enter the logo strip or the sitemap.
 */

export interface ConceptBuild {
  /** Matches the industry slug and the route /demos/<slug> */
  slug: string
  /** The invented business */
  name: string
  town: string
  /** One-line descriptor shown on cards */
  descriptor: string
  /** What the demo shows off, in a sentence */
  summary: string
  /** Short annotation drawn over the screenshot */
  note: string
  image: string
}

export const CONCEPT_BUILDS: ConceptBuild[] = [
  {
    slug: "healthcare-clinics",
    name: "Oakline Dental Studio",
    town: "Whitby, Ontario",
    descriptor: "Family dental clinic with open fees and an appointment picker",
    summary:
      "A calm, rounded design for a family dental clinic. Patients pick a visit type, day and time from the first screen, and fees are shown openly.",
    note: "Appointment picker on the first screen",
    image: "/images/work/concept-healthcare-clinics.webp",
  },
  {
    slug: "real-estate",
    name: "Kestrel & Rowe Realty",
    town: "Whitby, Ontario",
    descriptor: "Boutique brokerage with illustrated listings and a mortgage calculator",
    summary:
      "An editorial design for a residential brokerage. Listings filter in place, every home is drawn as a line elevation, and a calculator works out the monthly payment.",
    note: "Filterable listings and a live mortgage calculator",
    image: "/images/work/concept-real-estate.webp",
  },
  {
    slug: "restaurants-hospitality",
    name: "Ember & Rye",
    town: "Oshawa, Ontario",
    descriptor: "Wood-fired kitchen with a tabbed menu and table requests",
    summary:
      "A dark, typographic design for a wood-fired kitchen. The full menu sits in tabs with prices and dietary markers, and guests pick a date, time and party size.",
    note: "Full menu in tabs, table request in three taps",
    image: "/images/work/concept-restaurants-hospitality.webp",
  },
  {
    slug: "logistics-distribution",
    name: "Corridor Freight Lines",
    town: "Oshawa, Ontario",
    descriptor: "Regional carrier with shipment tracking and a lane map",
    summary:
      "An industrial design for a regional carrier. Customers track a shipment from the first screen, see the lanes on a schematic map and request a quote.",
    note: "Shipment tracking without a phone call",
    image: "/images/work/concept-logistics-distribution.webp",
  },
  {
    slug: "beauty-fitness-wellness",
    name: "Juniper Hair & Skin Studio",
    town: "Pickering, Ontario",
    descriptor: "Boutique salon with a three-step booking flow",
    summary:
      "A warm, arched design for a boutique salon. Clients choose a service, a stylist level and a time in three steps and see the total before they ask to book.",
    note: "Service, stylist and time in three steps",
    image: "/images/work/concept-beauty-fitness-wellness.webp",
  },
  {
    slug: "automotive",
    name: "Gearbox Auto Service",
    town: "Ajax, Ontario",
    descriptor: "Repair and tire shop with an estimator and a warning-light guide",
    summary:
      "A bold, mechanical design for an independent repair shop. Drivers get a price range for common jobs and a plain explanation of each dashboard warning light.",
    note: "Price estimator and warning-light guide",
    image: "/images/work/concept-automotive.webp",
  },
  {
    slug: "trades-home-services",
    name: "Copperline Plumbing & Heating",
    town: "Ajax, Ontario",
    descriptor: "Plumbing and heating company with an instant estimate",
    summary:
      "A bright, direct design for a plumbing and heating company. Homeowners get a ballpark price for the job before they call, and the emergency number is never out of reach.",
    note: "Ballpark price before the call",
    image: "/images/work/concept-trades-home-services.webp",
  },
]

export function getConceptBuild(slug: string): ConceptBuild | undefined {
  return CONCEPT_BUILDS.find((c) => c.slug === slug)
}
