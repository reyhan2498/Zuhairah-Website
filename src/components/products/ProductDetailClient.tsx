"use client";

import { useState } from "react";
import { Check, ChevronDown, Mail, Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { cn, formatPrice, parseFabricSpecs } from "@/lib/utils";
import type { ProductVariant, ProductWithVariants } from "@/types/database";

interface ProductDetailClientProps {
  product: ProductWithVariants;
}

const SIZES_ORDER = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "One-Size"];

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const variants = product.product_variants ?? [];

  const colors = Array.from(
    new Map(variants.map((v) => [v.color_name, v])).values()
  );

  const sizes = Array.from(new Set(variants.map((v) => v.size))).sort(
    (a, b) => SIZES_ORDER.indexOf(a) - SIZES_ORDER.indexOf(b)
  );

  const [selectedColor, setSelectedColor] = useState(colors[0]?.color_name ?? "");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string>("fabric");

  const activeColorImage = colors.find((c) => c.color_name === selectedColor)?.image_url;
  const galleryImages = activeColorImage
    ? [activeColorImage, ...product.images.filter((img) => img !== activeColorImage)]
    : product.images;

  const availableSizesForColor = variants
    .filter((v) => v.color_name === selectedColor && v.stock_quantity > 0)
    .map((v) => v.size);

  const selectedVariant: ProductVariant | undefined = variants.find(
    (v) => v.color_name === selectedColor && v.size === selectedSize
  );

  const fabricSpecs = parseFabricSpecs(product.fabric_details);
  const isHijab = product.categories?.slug === "sports-hijabs";

  // Cart/checkout is disabled for now — customers enquire by email instead.
  // Swap this address for your real contact inbox.
  const CONTACT_EMAIL = "hello@zuhairah.com";

  const mailtoHref = selectedVariant
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `Order Enquiry — ${product.title}`
      )}&body=${encodeURIComponent(
        `Hi Zuhairah team,\n\nI'd like to order:\n\nProduct: ${product.title}\nColor: ${selectedVariant.color_name}\nSize: ${selectedVariant.size}\nQuantity: ${quantity}\nSKU: ${selectedVariant.sku}\n\nPlease let me know how to proceed with payment and delivery.\n\nThanks!`
      )}`
    : undefined;

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

          {/* Quick highlights */}
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

          {/* Size selector — dropdown */}
          {sizes.length > 0 && (
            <div className="mt-6">
              <label
                htmlFor="size-select"
                className="mb-3 block text-xs font-semibold uppercase tracking-wider text-brand-charcoal"
              >
                Size
              </label>
              <div className="relative">
                <select
                  id="size-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-brand-cream-deep bg-white px-4 py-3.5 pr-10 text-sm font-medium text-brand-charcoal outline-none transition-colors focus:border-brand-rose"
                >
                  <option value="" disabled>
                    Select a size
                  </option>
                  {sizes.map((size) => {
                    const isAvailable = availableSizesForColor.includes(size);
                    return (
                      <option key={size} value={size} disabled={!isAvailable}>
                        {size}
                        {!isAvailable ? " — Out of stock" : ""}
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

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-y border-brand-cream-deep/40 py-5">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ShieldCheck className="h-5 w-5 text-brand-rose" />
              <p className="text-[11px] leading-tight text-brand-charcoal/70">
                Secure Checkout
              </p>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Truck className="h-5 w-5 text-brand-rose" />
              <p className="text-[11px] leading-tight text-brand-charcoal/70">
                Free Shipping $75+
              </p>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <RotateCcw className="h-5 w-5 text-brand-rose" />
              <p className="text-[11px] leading-tight text-brand-charcoal/70">
                30-Day Returns
              </p>
            </div>
          </div>

          {/* Desktop email-to-order */}
          {selectedVariant ? (
            <a
              href={mailtoHref}
              className="hidden lg:flex mt-6 w-full items-center justify-center gap-2 rounded-lg bg-brand-rose py-4 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-rose/90"
            >
              <Mail className="h-4 w-4" />
              Email to Order
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="hidden lg:flex mt-6 w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-brand-rose py-4 text-sm font-semibold text-brand-cream opacity-50"
            >
              <Mail className="h-4 w-4" />
              Select a Size
            </button>
          )}

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

      {/* Sticky mobile email-to-order */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-brand-cream border-t border-brand-cream-deep/40 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        {selectedVariant ? (
          <a
            href={mailtoHref}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-rose py-3.5 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-rose/90"
          >
            <Mail className="h-4 w-4" />
            Email to Order — {formatPrice(Number(product.base_price))}
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-brand-rose py-3.5 text-sm font-semibold text-brand-cream opacity-50"
          >
            <Mail className="h-4 w-4" />
            Select a Size
          </button>
        )}
      </div>
    </>
  );
}
