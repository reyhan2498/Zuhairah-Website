import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/database";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images[0] ?? "/placeholder-product.svg";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white border border-brand-cream-deep/40 transition-all duration-300 hover:-translate-y-1 hover:border-brand-terracotta/30 hover:shadow-xl hover:shadow-brand-charcoal/5"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-cream-deep/20">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.is_featured && (
          <span className="absolute top-3 left-3 rounded-full bg-brand-terracotta px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-cream">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[10px] uppercase tracking-widest text-brand-charcoal/50 mb-1">
          {product.categories?.name ?? "Zuhairah"}
        </p>
        <h3 className="text-sm font-medium text-brand-charcoal group-hover:text-brand-terracotta transition-colors line-clamp-2">
          {product.title}
        </h3>
        <p className="text-xs text-brand-charcoal/60 mt-1 line-clamp-1">
          {product.coverage_level}
        </p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-base font-semibold text-brand-terracotta">
            {formatPrice(Number(product.base_price))}
          </span>
          <span className="text-[10px] text-brand-charcoal/50 bg-brand-cream-deep/30 px-2 py-0.5 rounded">
            {product.opacity_rating.split("—")[0]?.trim() ?? product.opacity_rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
