import Link from "next/link";
import { AtSign, Music2 } from "lucide-react";
import { Reveal } from "../ui/Reveal";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden rounded-t-[2.5rem] bg-brand-purple text-brand-cream-deep/80">
      {/* Depth overlay so the color isn't flat */}
      <Reveal delay={0.8}>
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,_rgba(255,255,255,0.15)_0%,_transparent_45%),radial-gradient(circle_at_85%_100%,_rgba(0,0,0,0.25)_0%,_transparent_55%)]"
          aria-hidden="true"
        />

        <div className="relative px-6 sm:px-10 lg:px-16">
          {/* Top: brand + newsletter */}
          <div className="flex flex-col items-start justify-between gap-8 border-b border-brand-cream/15 py-14 lg:flex-row lg:items-end">
            <div>
              <p className="font-serif text-4xl tracking-[0.1em] text-brand-cream">
                ZUHAIRAH
              </p>
              <p className="mt-3 max-w-xs text-sm leading-relaxed">
                Premium modest activewear engineered for performance, coverage,
                and confidence.
              </p>
            </div>

            <form className="w-full max-w-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-cream">
                Join the list
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full rounded-full border border-brand-cream/30 bg-white/10 px-4 py-2.5 text-sm text-brand-cream placeholder:text-brand-cream/50 outline-none focus:border-brand-cream/70"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-brand-charcoal px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-cream transition-colors hover:bg-brand-charcoal/80"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Middle: link columns + socials */}
          <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-cream">
                Shop
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/#hijab" className="transition-colors hover:text-brand-cream">
                    Performance Workout Hijab
                  </Link>
                </li>
                <li>
                  <Link href="/#tunic" className="transition-colors hover:text-brand-cream">
                    Modest Activewear Tunic
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-cream">
                Support
              </p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/#story" className="transition-colors hover:text-brand-cream">
                    Our Promise
                  </Link>
                </li>
                <li>Shipping & Returns</li>
                <li>Size Guide</li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-2">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-cream">
                Follow
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-cream/25 transition-colors hover:border-brand-cream hover:text-brand-cream"
                >
                  <AtSign className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-cream/25 transition-colors hover:border-brand-cream hover:text-brand-cream"
                >
                  <Music2 className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-2 border-t border-brand-cream/15 py-6 text-[11px] sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Zuhairah. All rights reserved.</p>
            <p>Designed for Modesty. Auckland, NZ</p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
