"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "The Hijab", href: "/hijab" },
  { label: "The Tunic", href: "/tunic" },
  { label: "Our Promise", href: "/#story" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-charcoal/10 bg-white/95 backdrop-blur-sm">
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="grid h-20 grid-cols-3 items-center gap-4">
          {/* Mobile menu button */}
          <div className="flex items-center gap-8 justify-self-start lg:justify-self-end">
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-brand-charcoal hover:text-brand-rose transition-colors"
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
                  className="relative text-sm font-semibold uppercase text-brand-charcoal/80 tracking-[0.14em] transition-colors hover:text-brand-rose after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-brand-rose after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
            
          {/* Center: logo */}
          <Link
            href="/"
            className="justify-self-center font-serif text-2xl sm:text-3xl font-semibold tracking-[0.06em] text-brand-rose"
          >
            ZUHAIRAH
          </Link>

          {/* Contact — cart/checkout is disabled, customers enquire by email */}
          <a
            href="mailto:hello@zuhairah.com"
            className="justify-self-end text-brand-charcoal hover:text-brand-rose transition-colors"
            aria-label="Email us"
          >
            <Mail className="h-5 w-5" />
          </a>
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
