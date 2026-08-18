import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { getProductsByCategory, getCategories } from "@/lib/supabase/queries";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const categoryLabels: Record<string, string> = {
  "sports-hijabs": "Sports Hijabs",
  "active-tops": "Active Tops",
  bottoms: "Bottoms",
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const label = categoryLabels[category];

  return {
    title: label ?? "Shop",
    description: `Shop Zuhairah ${label ?? "products"}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const label = categoryLabels[category];

  if (!label) {
    notFound();
  }

  const [products, categories] = await Promise.all([
    getProductsByCategory(category),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/50 mb-2">
          Category
        </p>
        <h1 className="text-3xl font-serif font-semibold text-brand-charcoal">
          {label}
        </h1>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <a
          href="/shop"
          className="rounded-full border border-brand-sand px-4 py-1.5 text-xs font-medium text-brand-charcoal/70 hover:border-brand-green hover:text-brand-green transition-colors"
        >
          All
        </a>
        {categories.map((cat) => (
          <a
            key={cat.slug}
            href={`/shop/${cat.slug}`}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              cat.slug === category
                ? "border-brand-green bg-brand-green text-brand-cream"
                : "border-brand-sand text-brand-charcoal/70 hover:border-brand-green hover:text-brand-green"
            }`}
          >
            {cat.name}
          </a>
        ))}
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-brand-charcoal/50">
          <p className="text-sm">No products in this category yet.</p>
        </div>
      )}
    </div>
  );
}
