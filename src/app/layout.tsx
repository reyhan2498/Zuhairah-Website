import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Manrope } from "next/font/google";
import { SiteLayout } from "@/components/layout/SiteLayout";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zuhairah.vercel.app"),
  title: {
    default: "Zuhairah — Modest Activewear & Sports Hijabs",
    template: "%s | Zuhairah",
  },
  description:
    "Premium modest activewear, sports hijabs, and squat-proof athletic wear engineered for performance and coverage.",
  openGraph: {
    type: "website",
    siteName: "Zuhairah",
    title: "Zuhairah — Modest Activewear & Sports Hijabs",
    description:
      "Premium modest activewear, sports hijabs, and squat-proof athletic wear engineered for performance and coverage.",
    images: [{ url: "/hero-banner.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuhairah — Modest Activewear & Sports Hijabs",
    description:
      "Premium modest activewear, sports hijabs, and squat-proof athletic wear engineered for performance and coverage.",
    images: ["/hero-banner.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-brand-cream text-brand-charcoal">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}