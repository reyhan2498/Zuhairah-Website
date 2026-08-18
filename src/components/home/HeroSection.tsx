import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-green">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#e2d7c5_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_#e2d7c5_0%,_transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <p className="text-brand-sand text-sm font-medium tracking-[0.25em] uppercase mb-4">
            Modest Activewear
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-brand-offwhite leading-tight">
            Performance Uncompromised.{" "}
            <span className="text-brand-sand">Coverage Guaranteed.</span>
          </h1>
          <p className="mt-6 text-brand-sand/80 text-base sm:text-lg leading-relaxed max-w-lg">
            Premium sports hijabs and modest athletic wear engineered for women
            who refuse to choose between faith, fitness, and fashion.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/shop/sports-hijabs"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-offwhite px-6 py-3.5 text-sm font-semibold text-brand-green hover:bg-brand-cream transition-colors"
            >
              Shop Sports Hijabs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-sand/40 px-6 py-3.5 text-sm font-semibold text-brand-offwhite hover:bg-brand-offwhite/10 transition-colors"
            >
              Explore Activewear
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
