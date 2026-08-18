import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { SiteLayout } from "@/components/layout/SiteLayout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zuhairah — Modest Activewear & Sports Hijabs",
    template: "%s | Zuhairah",
  },
  description:
    "Premium modest activewear, sports hijabs, and squat-proof athletic wear engineered for performance and coverage.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-brand-offwhite text-brand-charcoal">
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
