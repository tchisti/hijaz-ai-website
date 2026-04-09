import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hijaz.ai",
    template: "%s | Hijaz.ai",
  },
  description: "Hijaz.ai — [tagline goes here]",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
