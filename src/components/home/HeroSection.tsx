import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[520px] w-full overflow-hidden sm:min-h-[600px] lg:min-h-[80vh]">
      {/* Background image, covers the entire hero */}
      <Image
        src="/hero-banner.jpg"
        alt="Zuhairah sports hijab and activewear tunic displayed on wooden pedestals in a sunlit studio"
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
      />

      {/* Legibility gradient so the text reads cleanly over the photo */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-cream/50 via-brand-cream/20 to-transparent"
        aria-hidden="true"
      />

      {/* Text content */}
      <div className="relative z-10 flex h-full min-h-[520px] items-center sm:min-h-[600px] lg:min-h-[80vh]">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-16 xl:px-24">
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
              Move freely. <span className="text-brand-gold">Cover beautifully.</span>
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
                href="#shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-charcoal/90"
              >
                Shop the edit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#story"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-charcoal/30 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/40"
              >
                Our promise
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}