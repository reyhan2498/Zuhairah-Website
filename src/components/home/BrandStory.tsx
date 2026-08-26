import { Heart, Leaf, Shield, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  {
    icon: Shield,
    title: "Coverage Without Compromise",
    description:
      "Squat-proof opacity ratings and a secure sports hijab that stays in place, no adjustments mid-workout.",
  },
  {
    icon: Sparkles,
    title: "Performance First",
    description:
      "Breathable, moisture-wicking fabrics engineered for real training, not just the gym selfie.",
  },
  {
    icon: Leaf,
    title: "Ethical & Sustainable",
    description:
      "Fair-wage manufacturing and recycled materials wherever possible.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description:
      "Born from the needs of real athletes. We listen, iterate, and build for the women who wear it.",
  },
];

export function BrandStory() {
  return (
    <section id="story" className="scroll-mt-20 bg-brand-cream-deep/30 py-16 sm:py-20">
      <div className="px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-brand-charcoal/50">
            Our Promise
          </p>
          <h2 className="font-serif text-3xl font-semibold text-brand-charcoal sm:text-4xl">
            Why Zuhairah exists
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-charcoal/70">
            Muslim women deserve activewear that honors their values without
            sacrificing performance. We build high-coverage, high-performance
            pieces so you can train, compete, and move with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.1}>
              <div
                key={pillar.title}
                className="rounded-xl border border-brand-cream-deep bg-white p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple/10">
                  <pillar.icon className="h-5 w-5 text-brand-purple" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-brand-charcoal">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-brand-charcoal/70">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
