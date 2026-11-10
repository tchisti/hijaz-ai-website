# Hijaz.ai SEO and GEO playbook

What the site now does for search and AI visibility, and the off-site work that code cannot do for you.

## 1. What is built into the site

| Asset | Where | Why it matters |
|---|---|---|
| One business entity in structured data (`ProfessionalService` + `WebSite`), with `areaServed` for every city, an offer catalogue with CAD prices, opening hours and contact | `src/components/seo/JsonLd.tsx`, rendered on every page | Tells Google and AI assistants who the business is, where it works and what it sells, once, consistently |
| 22 city pages with their own market context, service order, relevant builds and FAQ | `/locations/[slug]`, data in `src/lib/locations.ts` | Ranks for "web design Ajax", "AI automation Toronto" and similar. Each page says honestly whether we work on-site or remotely |
| 12 project pages, each a `CreativeWork` linked to the live build | `/work/[slug]`, data in `src/lib/projects.ts` | Proof pages that rank for long-tail queries and give other sites something specific to link to |
| 12 industry pages with the sector's problems, what we build, a priced first project, FAQ and an enquiry form | `/industries/[slug]`, data in `src/lib/industries.ts` | Ranks for sector searches such as "dental website design Ontario" and converts the visit into an enquiry on the same page |
| FAQ in native `<details>` with `FAQPage` schema | Home, city and industry pages | Answers are in the HTML that crawlers read, written answer-first so they can be quoted |
| `/llms.txt` generated from the same data as the pages | `src/app/llms.txt/route.ts` | A plain-language summary for AI assistants. Adoption is still uneven, so treat it as cheap insurance, not a ranking lever |
| `robots.txt` naming GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others as allowed | `src/app/robots.ts` | Makes the intent to be cited explicit |
| `sitemap.xml` generated at build | `src/app/sitemap.ts` | Every page, project and city is discoverable |
| Breadcrumb, `Service`, `BlogPosting` and `CollectionPage` schema | Inner pages | Rich results and clearer site structure |
| Share image, favicon, canonical URLs, `en-CA` language tag | `src/app/opengraph-image.tsx`, `src/lib/seo.ts` | Clean previews and no duplicate-URL dilution |
| Every city linked from the footer of every page | `src/components/layout/Footer.tsx` | Internal links pass authority to the pages that need to rank |

## 2. Keyword map

Phrases come from Google autocomplete for Canada (real searches people type). Search volumes were not available from the free tool, so validate priority in Google Search Console after four weeks of data rather than trusting any volume estimate.

| Page | Primary phrase | Supporting phrases |
|---|---|---|
| `/` | business technology partner Toronto | web design Durham Region, AI automation Toronto, AI automation agency Canada |
| `/locations/ajax` | web design Ajax | website design Ajax, web designer Ajax, website designer in Ajax, web design near Ajax ON |
| `/locations/pickering` | web design Pickering | web designer Pickering, web designer near Pickering ON |
| `/locations/whitby` | web design Whitby | web developer Whitby, AI automation Whitby |
| `/locations/oshawa` | Oshawa web design | Oshawa website design, web designer in Oshawa, web design near Oshawa ON |
| `/locations/clarington` | web design Bowmanville | website design Courtice, Newcastle |
| `/locations/toronto` | AI automation agency Toronto | AI automation Toronto, Shopify developer Toronto, Shopify development agency Toronto, web design North York |
| `/locations/vaughan`, `/markham`, `/mississauga`, `/brampton` | web design + city | web development + city |
| `/locations/ottawa`, `/montreal`, `/vancouver`, `/calgary`, `/edmonton` | AI automation agency + city | AI companies in + city |
| `/services` | AI automation agency Canada | Shopify developer Canada, AI receptionist for small business, workflow automation for small business |
| `/industries/*` | sector + "website design" + region | clinic, contractor, restaurant, law firm, manufacturing, logistics, salon and auto shop phrases listed per industry in `src/lib/industries.ts` |
| `/work/*` | brand name + "website" | sector phrases, such as "oil mill machinery website" |

Blog topics worth writing next, one per month, each linking to the matching city and service page:

1. How much does a website cost in Durham Region in 2026 (real price ranges)
2. Shopify or custom store: how to choose, with real cost ranges
3. How to get a local business cited by ChatGPT and Google AI Overviews
4. AI receptionist for a clinic or trade: what it handles and what it should hand off
5. Shipping across Canada from Ontario: rate rules that protect margin

## 3. Google Business Profile (highest-return task for local ranking)

1. Claim or create the profile as a service-area business. Hide the street address if clients do not visit, and list Toronto, Ajax, Pickering, Whitby, Oshawa and Clarington as service areas.
2. Primary category: Website designer. Secondary: Software company, E-commerce service, Marketing agency.
3. Use exactly the same name, phone and website as the site footer. Consistency across listings is what makes the entity trustworthy.
4. Add services with the same names and starting prices as `/services`.
5. Upload the project screenshots from `public/images/work`.
6. Ask every real client for a review and reply to each one. Do not publish reviews or ratings on the site until they exist on the profile.
7. Post one update a month linking to a project or blog page.

## 4. Citations: same name, address area and phone everywhere

Canadian listings, in order of value:

- Google Business Profile, Bing Places, Apple Business Connect
- Yelp Canada, YellowPages.ca, Canada411, 411.ca, Cylex Canada, Hotfrog Canada
- Better Business Bureau (accreditation is paid; the free listing still counts)
- Clutch, GoodFirms, DesignRush, Sortlist (agency directories that AI assistants read when asked for "best agencies in...")
- Shopify Partner directory, once a partner account is active
- LinkedIn company page, Facebook page, Instagram, with the website and phone filled in

Local memberships that carry a real link and real referrals:

- Ajax-Pickering Board of Trade
- Whitby Chamber of Commerce
- Greater Oshawa Chamber of Commerce
- Clarington Board of Trade
- Toronto Region Board of Trade
- Business Advisory Centre Durham and Spark Centre (directories and events)

## 5. Backlinks you can earn without buying any

Paid or exchanged links are a penalty risk and are not worth it. These are the ones available now:

1. **Your own properties.** You control more than a dozen live sites. A footer credit on each, "Site by Hijaz.ai" linking to the matching `/work/<slug>` page, is a legitimate, relevant link. Start with zamzamshop.ca, adamleather.com, himalayansaffron.com and nationalmachinerystores.com, which are on their own domains.
2. **Client sites.** Make the footer credit a standard line in every project agreement.
3. **The engineering tools.** The carbon storage tools are the kind of free resource that industry bodies, universities and newsletters link to. Add a "Built by Hijaz.ai" link in each tool's footer and submit them to relevant resource lists.
4. **Schools, charities and associations.** Sites you build for them will often list supporters or vendors.
5. **Local press and newsletters.** Durham Region and Toronto business outlets run "local founder" stories. Fixed prices in writing and published starting prices are the angle.
6. **Guest answers.** Write one useful, specific answer a month on a Canadian small-business forum or publication, with a link to the relevant guide.

## 6. Getting cited by AI assistants

AI assistants cite sources that state facts plainly, agree with each other and are easy to quote.

- Keep the first sentence of every page a complete statement of who, what and where. The pages are written that way; keep it when editing.
- Put real numbers on the page: prices, timelines, counts. Vague pages are not quoted.
- Make the same facts appear off-site: directories, LinkedIn, Clutch and client footers should describe the business in the same words as the home page.
- Publish comparisons and answers to the questions a buyer asks an assistant, such as "best web design company in Ajax" or "how much does an AI receptionist cost in Canada".
- Once a month, ask ChatGPT, Gemini, Perplexity and Claude the ten questions you want to win, and log whether Hijaz.ai is named. That log is the scorecard.

## 7. Technical checks after deploy

- Set the apex domain to redirect to `www` with a permanent (308) redirect in the hosting dashboard. It currently returns a temporary (307) redirect.
- Confirm `NEXT_PUBLIC_SITE_URL` is `https://www.hijaz.ai` in production so canonicals and the sitemap match.
- Submit `https://www.hijaz.ai/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Test the home page, one city page and one project page in Google's Rich Results Test.
- Confirm the LinkedIn, Instagram and Facebook URLs in `src/lib/constants.ts` point at real, active profiles. They are published in structured data as `sameAs`.
- Point the builds that are still on preview addresses at their own domains before promoting them.

## 8. What not to do

- Do not add more city pages by copying one and changing the name. Google treats that as doorway spam and can remove the whole set. Add a city only with its own market notes, proof and FAQ.
- Do not add testimonials, star ratings or client counts that cannot be verified. Review schema without real reviews is a manual-action risk, and unverifiable testimonials are a legal risk under Canada's Competition Act.
- Do not list a build as client work unless the client agreed to be named.
