"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  async function handleCheckout() {
    if (items.length === 0) return;
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Unable to proceed to checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            className="fixed inset-0 z-50 bg-brand-charcoal/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer — unmounted while closed so it can never trap focus offscreen */}
          <motion.div
            key="cart-panel"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-brand-cream shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-cream-deep/40 px-6 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-brand-rose" />
                <h2 className="text-lg font-semibold text-brand-charcoal">
                  Your Cart ({itemCount})
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="p-2 -mr-2 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free shipping progress */}
            {items.length > 0 && (
              <div className="px-6 py-4 bg-brand-cream-deep/20 border-b border-brand-cream-deep/40">
                {amountToFreeShipping > 0 ? (
                  <p className="text-xs text-brand-charcoal/70 mb-2">
                    Add {formatPrice(amountToFreeShipping)} more for free shipping
                  </p>
                ) : (
                  <p className="text-xs text-brand-rose font-medium mb-2">
                    You qualify for free shipping!
                  </p>
                )}
                <div className="h-1.5 rounded-full bg-brand-cream-deep/60 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-brand-rose"
                    initial={false}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="h-12 w-12 text-brand-cream-deep mb-4" />
                  <p className="text-brand-charcoal/60 text-sm">Your cart is empty</p>
                  <Link
                    href="/#shop"
                    onClick={closeCart}
                    className="mt-4 text-sm font-medium text-brand-rose hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.variantId}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 border-b border-brand-cream-deep/30 pb-4 overflow-hidden"
                      >
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-brand-cream-deep/30">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={closeCart}
                            className="text-sm font-medium text-brand-charcoal hover:text-brand-rose line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          <p className="text-xs text-brand-charcoal/60 mt-0.5">
                            {item.colorName} / {item.size}
                          </p>
                          <p className="text-sm font-semibold text-brand-rose mt-1">
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-brand-cream-deep/60 rounded-md">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.variantId, item.quantity - 1)
                                }
                                className="p-1.5 hover:bg-brand-cream-deep/30 transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2 text-xs font-medium min-w-[24px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.variantId, item.quantity + 1)
                                }
                                className="p-1.5 hover:bg-brand-cream-deep/30 transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.variantId)}
                              className="p-1.5 text-brand-charcoal/40 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-brand-cream-deep/40 px-6 py-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-charcoal/70">Subtotal</span>
                  <span className="text-lg font-semibold text-brand-charcoal">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-xs text-brand-charcoal/50 text-center">
                  Shipping & taxes calculated at checkout
                </p>
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full rounded-lg bg-brand-rose py-3.5 text-sm font-semibold text-brand-cream transition-all duration-300 hover:bg-brand-rose/90 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
