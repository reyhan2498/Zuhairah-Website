export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Product {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  opacity_rating: string;
  coverage_level: string;
  fabric_details: string;
  base_price: number;
  images: string[];
  is_featured: boolean;
  created_at: string;
  categories?: Category;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  size: string;
  color_name: string;
  color_hex: string;
  image_url?: string | null;
  stock_quantity: number;
  created_at?: string;
}

export interface ProductWithVariants extends Product {
  product_variants: ProductVariant[];
}

export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  slug: string;
  size: string;
  colorName: string;
  colorHex: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

export interface CheckoutItem {
  variantId: string;
  quantity: number;
}
