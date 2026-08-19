import type { Metadata } from "next";
import { ProductCard } from "@/components/products/ProductCard";
import { getAllProducts } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse our full collection of modest activewear and sports hijabs.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/50 mb-2">
          Collection
        </p>
        <h1 className="text-3xl font-serif font-semibold text-brand-charcoal">
          Shop All
        </h1>
        <p className="mt-2 text-sm text-brand-charcoal/60">
          Performance modest activewear for every workout.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-brand-charcoal/50">
          <p className="text-sm">No products available yet.</p>
          <p className="text-xs mt-2">
            Set up Supabase and run <code className="text-brand-terracotta">npm run seed</code> to populate the catalog.
          </p>
        </div>
      )}
    </div>
  );
}
