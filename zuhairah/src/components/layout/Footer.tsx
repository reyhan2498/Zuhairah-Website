import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-charcoal text-brand-sand/70 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-lg tracking-[0.15em] text-brand-offwhite mb-3">
              ZUHAIRAH
            </p>
            <p className="text-xs leading-relaxed">
              Premium modest activewear engineered for performance, coverage, and confidence.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-3">
              Shop
            </p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/shop/sports-hijabs" className="hover:text-brand-offwhite transition-colors">Sports Hijabs</Link></li>
              <li><Link href="/shop/active-tops" className="hover:text-brand-offwhite transition-colors">Active Tops</Link></li>
              <li><Link href="/shop/bottoms" className="hover:text-brand-offwhite transition-colors">Bottoms</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-offwhite mb-3">
              Support
            </p>
            <ul className="space-y-2 text-xs">
              <li><Link href="/mission" className="hover:text-brand-offwhite transition-colors">Our Mission</Link></li>
              <li><span>Shipping & Returns</span></li>
              <li><span>Size Guide</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-brand-sand/10 text-center text-[10px]">
          &copy; {new Date().getFullYear()} Zuhairah. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
