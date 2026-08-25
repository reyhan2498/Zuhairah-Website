import { HeroSection } from "@/components/home/HeroSection";
import { ValuePropositionBar } from "@/components/home/ValuePropositionBar";
import { ModestyFitGuide } from "@/components/home/ModestyFitGuide";
import { BrandStory } from "@/components/home/BrandStory";
import { ProductSpotlight } from "@/components/products/ProductSpotlight";
import { getProductBySlug } from "@/lib/supabase/queries";

// The only 2 products Zuhairah sells. Update these two slugs if the
// underlying Supabase rows ever change — everything else on this page
// (variant selectors, pricing, cart) reads live from those rows.
const HIJAB_SLUG = "pro-performance-fit-hijab";
const TUNIC_SLUG = "breathelite-longline-active-tunic";

export default async function HomePage() {
  const [hijab, tunic] = await Promise.all([
    getProductBySlug(HIJAB_SLUG),
    getProductBySlug(TUNIC_SLUG),
  ]);

  return (
    <>
      <HeroSection />
      <ValuePropositionBar />

      <div id="shop" className="scroll-mt-20 divide-y divide-brand-cream-deep/40">
        {hijab ? (
          <ProductSpotlight product={hijab} id="hijab" />
        ) : (
          <ProductUnavailable name="Performance Workout Hijab" />
        )}
        {tunic ? (
          <ProductSpotlight product={tunic} id="tunic" reverse />
        ) : (
          <ProductUnavailable name="Modest Activewear Tunic" />
        )}
      </div>

      <ModestyFitGuide />
      <BrandStory />
    </>
  );
}

function ProductUnavailable({ name }: { name: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-sm text-brand-charcoal/60">
        {name} is temporarily unavailable. Please check back shortly.
      </p>
    </div>
  );
}
