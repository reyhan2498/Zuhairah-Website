import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <Heart className="h-12 w-12 text-brand-sand mx-auto mb-4" />
      <h1 className="text-xl font-semibold text-brand-charcoal">Your Wishlist</h1>
      <p className="mt-2 text-sm text-brand-charcoal/60">
        Save your favorite pieces here. Wishlist functionality coming soon.
      </p>
      <Link
        href="/shop"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-green px-6 py-3 text-sm font-semibold text-brand-cream hover:bg-brand-green/90 transition-colors"
      >
        Browse Products
      </Link>
    </div>
  );
}
