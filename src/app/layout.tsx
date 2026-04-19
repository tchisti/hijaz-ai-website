import type { Metadata } from "next"
import { Inter, Syne } from "next/font/google"
import "./globals.css"
import { defaultMetadata } from "@/lib/seo"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import WhatsAppFAB from "@/components/layout/WhatsAppFAB"
import Analytics from "@/components/layout/Analytics"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap" })

export const metadata: Metadata = defaultMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Analytics />
        <Header />
        <div className="flex-1 pt-16">{children}</div>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  )
}
