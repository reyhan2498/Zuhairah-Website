import { HeroSection } from "@/components/home/HeroSection";
import { ValuePropositionBar } from "@/components/home/ValuePropositionBar";
import { ModestyFitGuide } from "@/components/home/ModestyFitGuide";
import { BrandStory } from "@/components/home/BrandStory";
import { ProductPreview } from "@/components/products/ProductPreview";
import { getProductBySlug } from "@/lib/supabase/queries";

// The only 2 products Zuhairah sells. Each has its own dedicated page at
// /hijab and /tunic (which redirect to /products/[slug] — see
// next.config.ts). This homepage only shows a lightweight preview of each;
// the full variant selectors and ordering flow live on those pages.
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

      <section id="shop" className="scroll-mt-20 py-16 sm:py-20">
        <div className="px-6 sm:px-10 lg:px-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-charcoal/50">
              The Collection
            </p>
            <h2 className="font-serif text-3xl font-semibold text-brand-charcoal sm:text-4xl">
              Two pieces. Zero compromise.
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
            {hijab ? (
              <ProductPreview product={hijab} href="/hijab" />
            ) : (
              <ProductUnavailable name="Performance Workout Hijab" />
            )}
            {tunic ? (
              <ProductPreview product={tunic} href="/tunic" />
            ) : (
              <ProductUnavailable name="Modest Activewear Tunic" />
            )}
          </div>
        </div>
      </section>

      <ModestyFitGuide />
      <BrandStory />
    </>
  );
}

function ProductUnavailable({ name }: { name: string }) {
  return (
    <div className="py-16 text-center">
      <p className="text-sm text-brand-charcoal/60">
        {name} is temporarily unavailable. Please check back shortly.
      </p>
    </div>
  );
}
