import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-charcoal">
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#c86d51_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_#c86d51_0%,_transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <p
            className="animate-fade-up text-brand-terracotta text-sm font-medium tracking-[0.25em] uppercase mb-4"
            style={{ animationDelay: "0ms" }}
          >
            Modest Activewear
          </p>
          <h1
            className="animate-fade-up text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-brand-cream leading-tight"
            style={{ animationDelay: "80ms" }}
          >
            Performance Uncompromised.{" "}
            <span className="text-brand-terracotta">Coverage Guaranteed.</span>
          </h1>
          <p
            className="animate-fade-up mt-6 text-brand-cream/70 text-base sm:text-lg leading-relaxed max-w-lg"
            style={{ animationDelay: "160ms" }}
          >
            Premium sports hijabs and modest athletic wear engineered for women
            who refuse to choose between faith, fitness, and fashion.
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-col sm:flex-row gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/shop/sports-hijabs"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-terracotta px-6 py-3.5 text-sm font-semibold text-brand-cream transition-all duration-300 hover:bg-brand-terracotta/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-terracotta/20"
            >
              Shop Sports Hijabs
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-cream/30 px-6 py-3.5 text-sm font-semibold text-brand-cream transition-all duration-300 hover:bg-brand-cream/10 hover:-translate-y-0.5"
            >
              Explore Activewear
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
