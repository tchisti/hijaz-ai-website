import type { Metadata, Viewport } from "next"
import { Archivo, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { defaultMetadata } from "@/lib/seo"
import Analytics from "@/components/layout/Analytics"

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const metadata: Metadata = defaultMetadata

export const viewport: Viewport = {
  themeColor: "#F3EFE6",
  width: "device-width",
  initialScale: 1,
}

/**
 * Root layout: document, fonts and analytics only. The Hijaz.ai header and
 * footer live in app/(site)/layout.tsx; concept builds under /demos bring
 * their own.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Analytics />
        {children}
      </body>
    </html>
  )
}
