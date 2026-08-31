import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { getProductBySlug } from "@/lib/supabase/queries";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-8 sm:py-12">
      <nav className="mb-6 flex items-center gap-2 text-xs text-brand-charcoal/50">
        <Link href="/" className="transition-colors hover:text-brand-rose">
          Home
        </Link>
        <span>/</span>
        <span className="text-brand-charcoal">{product.title}</span>
      </nav>
      <ProductDetailClient product={product} />
    </div>
  );
}
