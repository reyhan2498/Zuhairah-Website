import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-pink">
      <div className="grid min-h-[540px] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative z-10 flex items-center px-6 py-16 sm:px-12 lg:px-16 xl:px-24">
          <div className="max-w-xl">
            <p
              className="animate-fade-up mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-brand-charcoal/70"
              style={{ animationDelay: "0ms" }}
            >
              The joyful modest activewear edit
            </p>
            <h1
              className="animate-fade-up font-serif text-5xl font-normal leading-[0.95] text-brand-charcoal sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              Move freely. <span className="text-brand-terracotta">Cover beautifully.</span>
            </h1>
            <p
              className="animate-fade-up mt-6 max-w-md text-base leading-relaxed text-brand-charcoal/75 sm:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              Performance-first pieces for active days, designed with the coverage
              and color you have been looking for.
            </p>
            <div
              className="animate-fade-up mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-charcoal px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-charcoal/90"
              >
                Shop the edit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/mission"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-charcoal/30 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/30"
              >
                Our promise
              </Link>
            </div>
          </div>
        </div>
        <div className="relative min-h-[330px] overflow-hidden bg-brand-lilac lg:min-h-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=85')] bg-cover bg-center transition-transform duration-700 hover:scale-105" />
          <div className="absolute inset-0 bg-brand-lilac/15 mix-blend-color" />
          <span className="absolute bottom-5 right-6 rounded-full bg-white/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-charcoal">
            Feel good. Go far.
          </span>
        </div>
      </div>
    </section>
  );
}
