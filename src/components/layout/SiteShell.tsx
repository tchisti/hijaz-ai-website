import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import WhatsAppFAB from "@/components/layout/WhatsAppFAB"
import { OrganizationJsonLd } from "@/components/seo/JsonLd"

/**
 * The Hijaz.ai site chrome: skip link, header, footer, WhatsApp button and the
 * organization schema. Everything under app/(site) renders inside it. Concept
 * builds under /demos do not, so they can stand on their own.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <OrganizationJsonLd />
      <Header />
      <main id="main" className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  )
}
