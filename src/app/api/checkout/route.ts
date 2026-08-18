import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import type { CheckoutItem } from "@/types/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const items: CheckoutItem[] = body.items;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const variantIds = items.map((item) => item.variantId);

    const { data: variants, error } = await supabase
      .from("product_variants")
      .select("*, products(*)")
      .in("id", variantIds);

    if (error || !variants || variants.length === 0) {
      return NextResponse.json(
        { error: "Unable to validate cart items" },
        { status: 400 }
      );
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    for (const cartItem of items) {
      const variant = variants.find((v) => v.id === cartItem.variantId);

      if (!variant) {
        return NextResponse.json(
          { error: `Variant ${cartItem.variantId} not found` },
          { status: 400 }
        );
      }

      if (variant.stock_quantity < cartItem.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${variant.products.title}` },
          { status: 400 }
        );
      }

      const unitAmount = Math.round(Number(variant.products.base_price) * 100);

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: variant.products.title,
            description: `${variant.color_name} / ${variant.size}`,
            images: variant.products.images?.slice(0, 1) ?? [],
          },
          unit_amount: unitAmount,
        },
        quantity: cartItem.quantity,
      });
    }

    const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "NZ"],
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop`,
      metadata: {
        variant_ids: variantIds.join(","),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
