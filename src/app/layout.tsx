import type { Metadata, Viewport } from "next"
import { Inter, Syne } from "next/font/google"
import "./globals.css"
import { defaultMetadata } from "@/lib/seo"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import WhatsAppFAB from "@/components/layout/WhatsAppFAB"
import Analytics from "@/components/layout/Analytics"
import AnimatedBackground from "@/components/layout/AnimatedBackground"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
})

export const metadata: Metadata = defaultMetadata

export const viewport: Viewport = {
  themeColor: "#03050F",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} dark`}
      style={{ background: "var(--bg-base)" }}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col relative" style={{ background: "transparent" }}>
        {/* Site-wide animated background — fixed, full-viewport, z-0 */}
        <AnimatedBackground />

        {/* All page content sits above the background */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Analytics />
          <Header />
          <div className="flex-1 pt-16">{children}</div>
          <Footer />
          <WhatsAppFAB />
        </div>
      </body>
    </html>
  )
}
