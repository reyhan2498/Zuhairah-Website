import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-cream-deep/70 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-lg tracking-[0.15em] text-brand-cream mb-3">
              ZUHAIRAH
            </p>
            <p className="text-xs leading-relaxed">
              Premium modest activewear engineered for performance, coverage, and confidence.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-cream mb-3">
              Shop
            </p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/#hijab" className="hover:text-brand-cream transition-colors">Performance Workout Hijab</Link></li>
              <li><Link href="/#tunic" className="hover:text-brand-cream transition-colors">Modest Activewear Tunic</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-cream mb-3">
              Support
            </p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/#story" className="hover:text-brand-cream transition-colors">Our Promise</Link></li>
              <li><span>Shipping & Returns</span></li>
              <li><span>Size Guide</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-brand-cream-deep/10 text-center text-[10px]">
          &copy; {new Date().getFullYear()} Zuhairah. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
