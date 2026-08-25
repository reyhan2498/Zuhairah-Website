"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { useCart } from "@/context/CartContext";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductVariant, ProductWithVariants } from "@/types/database";

interface ProductSpotlightProps {
  product: ProductWithVariants;
  id?: string;
  reverse?: boolean;
}

const SIZES_ORDER = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "One-Size"];

export function ProductSpotlight({ product, id, reverse }: ProductSpotlightProps) {
  const { addItem } = useCart();
  const variants = product.product_variants ?? [];

  const colors = Array.from(
    new Map(variants.map((v) => [v.color_name, v])).values()
  );

  const sizes = Array.from(new Set(variants.map((v) => v.size))).sort(
    (a, b) => SIZES_ORDER.indexOf(a) - SIZES_ORDER.indexOf(b)
  );

  const [selectedColor, setSelectedColor] = useState(colors[0]?.color_name ?? "");
  const [selectedSize, setSelectedSize] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const availableSizesForColor = variants
    .filter((v) => v.color_name === selectedColor && v.stock_quantity > 0)
    .map((v) => v.size);

  const selectedVariant: ProductVariant | undefined = variants.find(
    (v) => v.color_name === selectedColor && v.size === selectedSize
  );

  function handleAddToCart() {
    if (!selectedVariant) return;

    addItem(
      {
        variantId: selectedVariant.id,
        productId: product.id,
        title: product.title,
        slug: product.slug,
        size: selectedVariant.size,
        colorName: selectedVariant.color_name,
        colorHex: selectedVariant.color_hex,
        price: Number(product.base_price),
        image: product.images[0] ?? "",
        sku: selectedVariant.sku,
      },
      1
    );

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <section id={id} className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16",
            reverse && "lg:[&>*:first-child]:order-2"
          )}
        >
          <ProductGallery images={product.images} title={product.title} />

          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/50">
              {product.categories?.name}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-charcoal sm:text-4xl">
              {product.title}
            </h2>
            <p className="mt-3 text-2xl font-semibold text-brand-purple">
              {formatPrice(Number(product.base_price))}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-charcoal/70">
              {product.description}
            </p>

            {/* Coverage / opacity specs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-lg bg-brand-purple/10 px-4 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-purple">
                  Opacity Rating
                </p>
                <p className="text-sm font-medium text-brand-charcoal">
                  {product.opacity_rating}
                </p>
              </div>
              <div className="rounded-lg bg-brand-cream-deep/40 px-4 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-charcoal/50">
                  Coverage
                </p>
                <p className="text-sm font-medium text-brand-charcoal">
                  {product.coverage_level}
                </p>
              </div>
            </div>

            {/* Color selector */}
            {colors.length > 0 && (
              <div className="mt-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
                  Color: <span className="font-normal normal-case">{selectedColor}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.color_name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(color.color_name);
                        setSelectedSize("");
                      }}
                      className={cn(
                        "h-8 w-8 rounded-full border-2 transition-all",
                        selectedColor === color.color_name
                          ? "border-brand-purple scale-110"
                          : "border-brand-cream-deep hover:border-brand-charcoal/30"
                      )}
                      style={{ backgroundColor: color.color_hex }}
                      title={color.color_name}
                      aria-label={color.color_name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => {
                    const isAvailable = availableSizesForColor.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[48px] rounded-md border px-3 py-2 text-xs font-medium transition-colors",
                          selectedSize === size
                            ? "border-brand-purple bg-brand-purple text-white"
                            : isAvailable
                              ? "border-brand-cream-deep text-brand-charcoal hover:border-brand-purple"
                              : "border-brand-cream-deep/40 text-brand-charcoal/30 cursor-not-allowed line-through"
                        )}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock_quantity <= 0}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-charcoal py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-charcoal/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag className="h-4 w-4" />
                {justAdded
                  ? "Added to Cart"
                  : !selectedVariant
                    ? "Select a Size"
                    : selectedVariant.stock_quantity <= 0
                      ? "Out of Stock"
                      : "Add to Cart"}
              </button>
              <Link
                href={`/products/${product.slug}`}
                className="flex items-center justify-center rounded-lg border border-brand-charcoal/20 px-6 py-3.5 text-sm font-semibold text-brand-charcoal transition-colors hover:border-brand-purple hover:text-brand-purple"
              >
                Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
