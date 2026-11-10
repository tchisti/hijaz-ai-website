import type { Metadata, Viewport } from "next"
import { Archivo, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { defaultMetadata } from "@/lib/seo"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import WhatsAppFAB from "@/components/layout/WhatsAppFAB"
import Analytics from "@/components/layout/Analytics"
import { OrganizationJsonLd } from "@/components/seo/JsonLd"

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <OrganizationJsonLd />
        <Analytics />
        <Header />
        <main id="main" className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  )
}
