import type { Metadata } from "next";
import { Heart, Leaf, Shield, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Mission",
  description:
    "Zuhairah exists to empower Muslim women with premium modest activewear that performs as hard as they do.",
};

const pillars = [
  {
    icon: Shield,
    title: "Coverage Without Compromise",
    description:
      "Every piece is designed with full modesty in mind — from squat-proof opacity ratings to high-neckline tunics and secure sports hijabs that stay in place.",
  },
  {
    icon: Sparkles,
    title: "Performance First",
    description:
      "We engineer our fabrics for breathability, moisture-wicking, and durability. Modesty should never mean settling for less in the gym.",
  },
  {
    icon: Leaf,
    title: "Ethical & Sustainable",
    description:
      "We partner with fair-wage manufacturers and prioritize recycled materials wherever possible. Looking good should feel good — ethically.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description:
      "Zuhairah was born from the needs of real athletes. We listen, iterate, and build products that serve the women who wear them.",
  },
];

export default function MissionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/50 mb-3">
          Why We Exist
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-brand-charcoal">
          Our Mission
        </h1>
        <p className="mt-6 text-base text-brand-charcoal/70 leading-relaxed">
          Zuhairah was founded on a simple belief: Muslim women deserve activewear
          that honors their values without sacrificing performance. We create
          high-coverage, high-performance pieces so you can train, compete, and
          move through the world with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-xl border border-brand-sand/40 bg-white p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 mb-4">
              <pillar.icon className="h-5 w-5 text-brand-green" />
            </div>
            <h2 className="text-lg font-semibold text-brand-charcoal mb-2">
              {pillar.title}
            </h2>
            <p className="text-sm text-brand-charcoal/70 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-2xl mx-auto text-center rounded-xl bg-brand-green p-8 sm:p-12">
        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-brand-offwhite">
          Join the Movement
        </h2>
        <p className="mt-3 text-sm text-brand-sand/80 leading-relaxed">
          Every purchase supports our mission to make modest activewear accessible,
          beautiful, and uncompromisingly high-performance.
        </p>
      </div>
    </div>
  );
}
