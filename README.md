# Hijaz.ai Website

Business website for [Hijaz.ai](https://hijaz.ai).

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout & metadata
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── layout/           # Header, Footer, Navigation
│   ├── sections/         # Page sections (Hero, About, Services, Contact)
│   └── ui/               # Reusable UI primitives
├── lib/
│   └── utils.ts          # Utility functions (cn helper)
└── types/
    └── index.ts          # Shared TypeScript types
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
