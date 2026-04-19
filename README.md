# Hijaz.ai Website

Official business website for [Hijaz.ai](https://hijaz.ai) — Toronto's AI & Digital Growth Partner.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod + EmailJS
- **Fonts**: Inter (body), Syne (headings) via next/font/google
- **Deployment**: Vercel

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, Stats, Services, Testimonials, FAQ, CTA |
| `/services` | Detailed service sections with sidebar |
| `/portfolio` | Filterable project grid with case study modals |
| `/about` | Story, values, team, GTA community |
| `/contact` | Split layout contact form with EmailJS |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post with related articles |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/hijaz-ai-website.git
cd hijaz-ai-website
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 measurement ID |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID |
| `NEXT_PUBLIC_SITE_URL` | Production URL (e.g., `https://hijaz.ai`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number with country code |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

## Deployment (Vercel)

1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.example` in Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── services/page.tsx
│   ├── portfolio/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── not-found.tsx       # 404 page
│   └── layout.tsx          # Root layout
├── components/
│   ├── layout/             # Header, Footer, WhatsApp FAB, Analytics
│   ├── sections/           # Page sections (HeroSection, ServicesGrid, etc.)
│   ├── seo/                # JsonLd, schema.org structured data
│   └── ui/                 # shadcn/ui base components
├── content/
│   └── blog/               # Blog post content (TypeScript)
└── lib/
    ├── constants.ts         # All site data
    ├── seo.ts               # buildMetadata helper
    └── utils.ts             # cn() utility
```

## SEO

- JSON-LD LocalBusiness + FAQPage + Service schemas
- `buildMetadata()` helper for per-page meta
- Auto-generated sitemap via `next-sitemap` (runs on `npm run build`)
- `robots.txt` at `/public/robots.txt`
- Canonical URLs on all pages

## Customisation

- **Brand colours**: Edit `tailwind.config.ts` → `midnight`, `gold`
- **Site data**: Edit `src/lib/constants.ts` (SITE_CONFIG, SERVICES, etc.)
- **Blog posts**: Add files to `src/content/blog/` and register in `index.ts`
- **Analytics**: Set `NEXT_PUBLIC_GA4_ID` and `NEXT_PUBLIC_CLARITY_ID` in `.env.local`
