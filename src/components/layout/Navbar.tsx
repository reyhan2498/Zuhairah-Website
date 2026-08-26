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
    <header className="sticky top-0 z-40 border-b border-brand-purple/10 bg-white/95 backdrop-blur-sm">
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="grid h-20 grid-cols-3 items-center gap-4">
          {/* Left: mobile menu button (mobile) / product links (desktop) */}
          <div className="flex items-center gap-8 justify-self-start">
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-brand-purple hover:text-brand-purple/80 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-semibold uppercase text-brand-purple hover:text-brand-purple/80 transition-colors tracking-[0.14em]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
            
          {/* Center: logo */}
          <Link
            href="/"
            className="justify-self-center font-serif text-3xl sm:text-4xl font-semibold tracking-[0.06em] text-brand-purple"
          >
            ZUHAIRAH
          </Link>
            
          {/* Right: cart */}
          <button
            type="button"
            onClick={openCart}
            className="relative justify-self-end p-2 text-brand-purple hover:text-brand-purple/80 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-6 w-6" />
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
              className="py-2.5 text-base font-medium text-brand-purple hover:text-brand-purple/80 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
