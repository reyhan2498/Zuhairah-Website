import { createClient } from "@/lib/supabase/server";
import type { Category, Product, ProductWithVariants } from "@/types/database";

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*)")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching featured products:", error.message);
    return [];
  }

  return (data ?? []) as Product[];
}

export async function getProductsByCategory(
  categorySlug?: string
): Promise<Product[]> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select("*, categories(*)")
    .order("created_at", { ascending: false });

  if (categorySlug) {
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .single();

    if (!category) return [];
    query = query.eq("category_id", category.id);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return (data ?? []) as Product[];
}

export async function getProductBySlug(
  slug: string
): Promise<ProductWithVariants | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(*), product_variants(*)")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error fetching product:", error?.message);
    return null;
  }

  return data as ProductWithVariants;
}

export async function getAllProducts(): Promise<Product[]> {
  return getProductsByCategory();
}
