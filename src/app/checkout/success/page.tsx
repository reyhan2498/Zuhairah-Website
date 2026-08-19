import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Package, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Thank you for your Zuhairah order.",
};

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      <div className="flex justify-center mb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-terracotta/10">
          <CheckCircle className="h-8 w-8 text-brand-terracotta" />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-brand-charcoal">
        Thank You for Your Order!
      </h1>
      <p className="mt-3 text-sm text-brand-charcoal/60 leading-relaxed max-w-md mx-auto">
        Your payment was successful. We&apos;re preparing your Zuhairah pieces
        with care and they&apos;ll be on their way soon.
      </p>

      {session_id && (
        <p className="mt-4 text-xs text-brand-charcoal/40 font-mono">
          Order ref: {session_id.slice(0, 20)}...
        </p>
      )}

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        <div className="rounded-xl border border-brand-cream-deep/40 bg-white p-5">
          <Package className="h-5 w-5 text-brand-terracotta mb-3" />
          <h2 className="text-sm font-semibold text-brand-charcoal">
            What&apos;s Next
          </h2>
          <p className="mt-1 text-xs text-brand-charcoal/60 leading-relaxed">
            You&apos;ll receive an email confirmation with your order details
            and tracking information once your items ship.
          </p>
        </div>
        <div className="rounded-xl border border-brand-cream-deep/40 bg-white p-5">
          <Truck className="h-5 w-5 text-brand-terracotta mb-3" />
          <h2 className="text-sm font-semibold text-brand-charcoal">
            Delivery
          </h2>
          <p className="mt-1 text-xs text-brand-charcoal/60 leading-relaxed">
            Standard shipping takes 5–7 business days. Free shipping applies
            on orders over $75.
          </p>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-lg bg-brand-terracotta px-6 py-3 text-sm font-semibold text-brand-cream hover:bg-brand-terracotta/90 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-brand-cream-deep px-6 py-3 text-sm font-semibold text-brand-charcoal hover:border-brand-terracotta hover:text-brand-terracotta transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
