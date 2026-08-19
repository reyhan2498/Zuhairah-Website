import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/supabase/queries";

export async function FeaturedCollection() {
  const products = await getFeaturedProducts();

  return (
    <section className="bg-brand-cream py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-terracotta">
              A little something for every move
            </p>
            <h2 className="font-serif text-3xl font-normal text-brand-charcoal sm:text-4xl">
              Meet your new favorites
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-charcoal hover:text-brand-terracotta sm:inline-flex"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
