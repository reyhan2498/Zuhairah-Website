import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/supabase/queries";

export async function FeaturedCollection() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-16 sm:py-20 bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/50 mb-2">
              Curated For You
            </p>
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-brand-charcoal">
              Featured Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-brand-terracotta hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${Math.min(index, 4) * 80}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-brand-charcoal/50">
            <p className="text-sm">Featured products coming soon.</p>
            <p className="text-xs mt-2">
              Run the seed script after setting up Supabase to populate products.
            </p>
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-terracotta hover:underline"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
