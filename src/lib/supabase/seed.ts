/**
 * Zuhairah Seed Script
 * Run: npm run seed (requires SUPABASE_SERVICE_ROLE_KEY in .env.local)
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const categories = [
  { name: "Sports Hijabs", slug: "sports-hijabs" },
  { name: "Active Tops", slug: "active-tops" },
];

const products = [
  {
    title: "Pro-Performance Fit Hijab",
    slug: "pro-performance-fit-hijab",
    categorySlug: "sports-hijabs",
    description:
      "Engineered for high-intensity training, our Pro-Performance Fit Hijab combines a pinless tie-back design with breathable mesh ear panels for headphone access. Stay covered, stay focused—no adjustments mid-workout.",
    features: [
      "Pinless tie-back design for secure, customizable fit",
      "Mesh ear panels for headphone and airflow access",
      "Moisture-wicking performance fabric",
      "Lightweight construction for all-day comfort",
      "Non-slip inner grip band",
    ],
    opacity_rating: "100% Opaque — Zero Show-Through",
    coverage_level: "Full Head & Neck Coverage",
    fabric_details:
      "Breathability Index: 9/10 | Moisture-Wicking: Advanced Dry-Fit | Slip-Resistance: 5/5 | Fabric: 88% Polyester, 12% Spandex",
    base_price: 34.99,
    images: [
      "/products/hijab-onyx-black.jpg",
      "/products/hijab-deep-rose.jpg",
      "/products/hijab-sage-green.jpg",
      "/products/hijab-sand-dune.jpg",
    ],
    is_featured: true,
    variants: [
      { sku: "PPFH-OS-OB", size: "One-Size", color_name: "Onyx Black", color_hex: "#1c1c1c", image_url: "/products/hijab-onyx-black.jpg", stock_quantity: 45 },
      { sku: "PPFH-OS-SG", size: "One-Size", color_name: "Sage Green", color_hex: "#1b3b36", image_url: "/products/hijab-sage-green.jpg", stock_quantity: 38 },
      { sku: "PPFH-OS-ND", size: "One-Size", color_name: "Sand Dune", color_hex: "#e2d7c5", image_url: "/products/hijab-sand-dune.jpg", stock_quantity: 32 },
      { sku: "PPFH-OS-DR", size: "One-Size", color_name: "Deep Rose", color_hex: "#C86D51", image_url: "/products/hijab-deep-rose.jpg", stock_quantity: 28 },
    ],
  },
  {
    title: "BreatheLite Longline Active Tunic",
    slug: "breathelite-longline-active-tunic",
    categorySlug: "active-tops",
    description:
      "Move freely in our BreatheLite Longline Active Tunic. Featuring a high neckline, integrated thumbholes, and side slits for unrestricted movement, this tunic delivers full chest coverage without compromising performance.",
    features: [
      "High neckline for full modest coverage",
      "Integrated thumbholes keep sleeves in place",
      "Side slits for enhanced range of motion",
      "Longline cut extends past hips",
      "Flatlock seams prevent chafing",
    ],
    opacity_rating: "100% Squat-Proof & Opaque",
    coverage_level: "Full Chest Coverage — High Neckline — Longline Tunic",
    fabric_details:
      "Breathability Index: 10/10 | Moisture-Wicking: Pro-Grade | Fabric: 75% Recycled Polyester, 25% Elastane | UPF 50+ Sun Protection",
    base_price: 58.99,
    images: [
      "/products/tunic-onyx-black.jpg",
      "/products/tunic-deep-rose.jpg",
      "/products/tunic-sand-dune.jpg",
    ],
    is_featured: true,
    variants: [
      { sku: "BLAT-XS-OB", size: "XS", color_name: "Onyx Black", color_hex: "#1c1c1c", image_url: "/products/tunic-onyx-black.jpg", stock_quantity: 20 },
      { sku: "BLAT-S-OB", size: "S", color_name: "Onyx Black", color_hex: "#1c1c1c", image_url: "/products/tunic-onyx-black.jpg", stock_quantity: 35 },
      { sku: "BLAT-M-OB", size: "M", color_name: "Onyx Black", color_hex: "#1c1c1c", image_url: "/products/tunic-onyx-black.jpg", stock_quantity: 42 },
      { sku: "BLAT-L-OB", size: "L", color_name: "Onyx Black", color_hex: "#1c1c1c", image_url: "/products/tunic-onyx-black.jpg", stock_quantity: 38 },
      { sku: "BLAT-XL-OB", size: "XL", color_name: "Onyx Black", color_hex: "#1c1c1c", image_url: "/products/tunic-onyx-black.jpg", stock_quantity: 25 },
      { sku: "BLAT-M-SG", size: "M", color_name: "Sage Green", color_hex: "#1b3b36", image_url: "/products/tunic-sage-green.jpg", stock_quantity: 30 },
      { sku: "BLAT-L-SG", size: "L", color_name: "Sage Green", color_hex: "#1b3b36", image_url: "/products/tunic-sage-green.jpg", stock_quantity: 28 },
      { sku: "BLAT-M-SD", size: "M", color_name: "Sand Dune", color_hex: "#e2d7c5", image_url: "/products/tunic-sand-dune.jpg", stock_quantity: 22 },
      { sku: "BLAT-M-DR", size: "M", color_name: "Deep Rose", color_hex: "#C86D51", image_url: "/products/tunic-deep-rose.jpg", stock_quantity: 20 },
    ],
  },
];

async function seed() {
  console.log("🌱 Seeding Zuhairah database...\n");

  const categoryMap = new Map<string, string>();

  for (const cat of categories) {
    const { data, error } = await supabase
      .from("categories")
      .upsert(cat, { onConflict: "slug" })
      .select("id, slug")
      .single();

    if (error) {
      console.error(`Failed to seed category ${cat.name}:`, error.message);
      continue;
    }

    categoryMap.set(data.slug, data.id);
    console.log(`✓ Category: ${cat.name}`);
  }

  for (const product of products) {
    const categoryId = categoryMap.get(product.categorySlug);
    if (!categoryId) {
      console.error(`Category not found for ${product.title}`);
      continue;
    }

    const { variants, categorySlug: _, ...productData } = product;

    const { data: insertedProduct, error: productError } = await supabase
      .from("products")
      .upsert(
        { ...productData, category_id: categoryId },
        { onConflict: "slug" }
      )
      .select("id")
      .single();

    if (productError || !insertedProduct) {
      console.error(`Failed to seed product ${product.title}:`, productError?.message);
      continue;
    }

    await supabase
      .from("product_variants")
      .delete()
      .eq("product_id", insertedProduct.id);

    const variantRows = variants.map((v) => ({
      ...v,
      product_id: insertedProduct.id,
    }));

    const { error: variantError } = await supabase
      .from("product_variants")
      .insert(variantRows);

    if (variantError) {
      console.error(`Failed to seed variants for ${product.title}:`, variantError.message);
      continue;
    }

    console.log(`✓ Product: ${product.title} (${variants.length} variants)`);
  }

  console.log("\n✅ Seed complete!");
}

seed().catch(console.error);
