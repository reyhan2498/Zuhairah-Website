"use client";

import { useState } from "react";
import { Check, ChevronDown, Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { useCart } from "@/context/CartContext";
import { cn, formatPrice, parseFabricSpecs } from "@/lib/utils";
import type { ProductVariant, ProductWithVariants } from "@/types/database";

interface ProductDetailClientProps {
  product: ProductWithVariants;
}

const SIZES_ORDER = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "One-Size"];

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();
  const variants = product.product_variants ?? [];

  const colors = Array.from(
    new Map(variants.map((v) => [v.color_name, v])).values()
  );

  const sizes = Array.from(new Set(variants.map((v) => v.size))).sort(
    (a, b) => SIZES_ORDER.indexOf(a) - SIZES_ORDER.indexOf(b)
  );

  const [selectedColor, setSelectedColor] = useState(colors[0]?.color_name ?? "");
  const activeColorImage = colors.find((c) => c.color_name === selectedColor)?.image_url;
  const galleryImages = activeColorImage
    ? [activeColorImage, ...product.images.filter((img) => img !== activeColorImage)]
    : product.images;
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string>("fabric");

  const availableSizesForColor = variants
    .filter((v) => v.color_name === selectedColor && v.stock_quantity > 0)
    .map((v) => v.size);

  const selectedVariant: ProductVariant | undefined = variants.find(
    (v) => v.color_name === selectedColor && v.size === selectedSize
  );

  const fabricSpecs = parseFabricSpecs(product.fabric_details);
  const isHijab = product.categories?.slug === "sports-hijabs";

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
        image: activeColorImage ?? product.images[0] ?? "",
        sku: selectedVariant.sku,
      },
      quantity
    );
  }

  const accordions = [
    {
      id: "fabric",
      title: "Fabric & Care Specs",
      content: (
        <div className="space-y-3 text-sm text-brand-charcoal/70">
          <p>{product.fabric_details.split("|").slice(-1)[0]?.trim()}</p>
          <dl className="grid grid-cols-1 gap-2">
            {Object.entries(fabricSpecs).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-brand-cream-deep/30 pb-2">
                <dt className="font-medium text-brand-charcoal">{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs pt-2">
            Care: Machine wash cold, hang dry. Do not bleach or iron directly on prints.
          </p>
        </div>
      ),
    },
    {
      id: "modesty",
      title: "Modesty & Opacity Rating",
      content: (
        <div className="space-y-3 text-sm text-brand-charcoal/70">
          <div className="rounded-lg bg-brand-rose/5 p-3">
            <p className="text-xs uppercase tracking-wider text-brand-rose font-semibold mb-1">
              Opacity Rating
            </p>
            <p className="font-medium text-brand-charcoal">{product.opacity_rating}</p>
          </div>
          <div className="rounded-lg bg-brand-cream-deep/20 p-3">
            <p className="text-xs uppercase tracking-wider text-brand-charcoal/50 font-semibold mb-1">
              Coverage Level
            </p>
            <p className="font-medium text-brand-charcoal">{product.coverage_level}</p>
          </div>
          {isHijab && fabricSpecs["Slip-Resistance"] && (
            <div className="rounded-lg bg-brand-cream-deep/20 p-3">
              <p className="text-xs uppercase tracking-wider text-brand-charcoal/50 font-semibold mb-1">
                Non-Slip Fit Rating
              </p>
              <p className="font-medium text-brand-charcoal">
                {fabricSpecs["Slip-Resistance"]} — Stay-in-place during high-intensity movement
              </p>
            </div>
          )}
          <ul className="list-disc list-inside space-y-1 pt-2">
            {(product.features as string[]).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "shipping",
      title: "Shipping & Returns",
      content: (
        <div className="space-y-3 text-sm text-brand-charcoal/70">
          <p>
            <strong className="text-brand-charcoal">Free Shipping</strong> on orders over $75.
            Standard delivery 5–7 business days.
          </p>
          <p>
            <strong className="text-brand-charcoal">Express Shipping</strong> available at checkout
            (2–3 business days).
          </p>
          <p>
            <strong className="text-brand-charcoal">Returns</strong> accepted within 30 days for
            unworn items with tags attached. Hijabs must be unworn and in original packaging.
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 pb-24 lg:pb-0">
        <ProductGallery key={selectedColor} images={galleryImages} title={`${product.title} — ${selectedColor}`} />

        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/50">
            {product.categories?.name}
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-serif font-semibold text-brand-charcoal">
            {product.title}
          </h1>
          <p className="mt-3 text-2xl font-semibold text-brand-rose">
            {formatPrice(Number(product.base_price))}
          </p>
          <p className="mt-4 text-sm text-brand-charcoal/70 leading-relaxed">
            {product.description}
          </p>
          <ul className="mt-5 space-y-2">
            {(product.features as string[]).slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-brand-charcoal/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-rose" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Color selector */}
          {colors.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-3">
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
                        ? "border-brand-rose scale-110"
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
              <label htmlFor="size-select" className="mb-3 block text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
                Size
              </label>
              <div className="relative">
                <select
                  id="size-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-brand-cream-deep bg-white px-4 py-3.5 pr-10 text-sm font-medium text-brand-charcoal outline-none transition-colors focus:border-brand-rose"
                >
                  <option value="" disabled>Select a size</option>
                  {sizes.map((size) => {
                    const isAvailable = availableSizesForColor.includes(size);
                    return (
                      <option key={size} value={size} disabled={!isAvailable}>
                        {size}{!isAvailable ? " — Out of stock" : ""}
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-charcoal/40" />
              </div>
                
              {selectedVariant && selectedVariant.stock_quantity > 0 && (
                <p className="mt-2 text-xs text-brand-charcoal/40">
                  SKU: {selectedVariant.sku}
                  {selectedVariant.stock_quantity <= 8 && (
                    <span className="ml-2 font-medium text-brand-rose">
                      Only {selectedVariant.stock_quantity} left
                    </span>
                  )}
                </p>
              )}
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal mb-3">
              Quantity
            </p>
            <div className="inline-flex items-center border border-brand-cream-deep/60 rounded-md">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 hover:bg-brand-cream-deep/30 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 text-sm font-medium min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 hover:bg-brand-cream-deep/30 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Desktop add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stock_quantity <= 0}
            className="hidden lg:flex mt-8 w-full items-center justify-center gap-2 rounded-lg bg-brand-rose py-4 text-sm font-semibold text-brand-cream hover:bg-brand-rose/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="h-4 w-4" />
            {!selectedVariant
              ? "Select a Size"
              : selectedVariant.stock_quantity <= 0
                ? "Out of Stock"
                : "Add to Zuhairah Cart"}
          </button>

          {/* Accordions */}
          <div className="mt-8 divide-y divide-brand-cream-deep/40 border-t border-brand-cream-deep/40">
            {accordions.map((accordion) => (
              <div key={accordion.id}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenAccordion(
                      openAccordion === accordion.id ? "" : accordion.id
                    )
                  }
                  className="flex w-full items-center justify-between py-4 text-sm font-semibold text-brand-charcoal"
                >
                  {accordion.title}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      openAccordion === accordion.id && "rotate-180"
                    )}
                  />
                </button>
                {openAccordion === accordion.id && (
                  <div className="pb-4">{accordion.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky mobile add to cart */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-brand-cream border-t border-brand-cream-deep/40 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!selectedVariant || selectedVariant.stock_quantity <= 0}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-rose py-3.5 text-sm font-semibold text-brand-cream hover:bg-brand-rose/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingBag className="h-4 w-4" />
          {!selectedVariant
            ? "Select a Size"
            : selectedVariant.stock_quantity <= 0
              ? "Out of Stock"
              : `Add to Cart — ${formatPrice(Number(product.base_price))}`}
        </button>
      </div>
    </>
  );
}
