import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hijaz.ai — Toronto AI & Digital Services",
    template: "%s | Hijaz.ai",
  },
  description:
    "Hijaz.ai provides AI automation, web development, Shopify e-commerce, and printing services in Toronto and the GTA.",
  openGraph: {
    type: "website",
    siteName: "Hijaz.ai",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
