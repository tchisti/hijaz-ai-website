import type { Metadata } from "next"

/**
 * Concept builds: demonstration websites for industries, each with an invented
 * business. They are kept out of search results and out of the sitemap, and
 * every page carries a bar that says what it is.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return <div className="demo flex min-h-screen flex-col">{children}</div>
}
