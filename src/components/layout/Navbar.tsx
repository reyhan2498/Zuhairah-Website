"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "The Hijab", href: "#hijab" },
  { label: "The Tunic", href: "#tunic" },
  { label: "Our Promise", href: "#story" },
];

export function Navbar() {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-charcoal/10 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 -ml-2 text-brand-charcoal hover:text-brand-rose transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.06em] text-brand-charcoal shrink-0"
          >
            ZUHAIRAH
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-semibold uppercase text-brand-charcoal/80 hover:text-brand-rose transition-colors tracking-[0.14em]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart */}
          <button
            type="button"
            onClick={openCart}
            className="relative p-2 text-brand-charcoal hover:text-brand-rose transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-rose text-[10px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 border-t border-brand-cream-deep/40",
          mobileOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="flex flex-col px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-sm font-medium text-brand-charcoal hover:text-brand-rose transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
