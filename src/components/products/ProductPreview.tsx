import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { ProductWithVariants } from "@/types/database";

interface ProductPreviewProps {
  product: ProductWithVariants;
  href: string;
}

export function ProductPreview({ product, href }: ProductPreviewProps) {
  const colorCount = new Set(
    (product.product_variants ?? []).map((v) => v.color_name)
  ).size;

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-cream-deep/30">
        <Image
          src={product.images[0] ?? "/placeholder-product.svg"}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/50">
          {product.categories?.name}
        </p>
        <h3 className="mt-1 font-serif text-2xl font-semibold text-brand-charcoal">
          {product.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/70 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-brand-rose">
            {formatPrice(Number(product.base_price))}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-charcoal transition-colors group-hover:text-brand-rose">
            Shop Now
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>

        {colorCount > 1 && (
          <p className="mt-2 text-xs text-brand-charcoal/50">
            {colorCount} colors available
          </p>
        )}
      </div>
    </Link>
  );
}
