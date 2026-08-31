import { Gauge, Layers, Wind } from "lucide-react";

const ratings = [
  {
    icon: Wind,
    label: "Breathability",
    levels: [
      { name: "Standard", desc: "Light activity, everyday wear", score: "10/10" },
      { name: "Performance", desc: "Gym, running, HIIT workouts", score: "8-9/10" },
      { name: "Pro", desc: "Competition & endurance training", score: "10/10" },
    ],
  },
  {
    icon: Layers,
    label: "Head Coverage",
    levels: [
      { name: "Secure Wrap", desc: "Standard wrap with tie-back", score: "Medium" },
      { name: "Full Coverage", desc: "Complete head & neck coverage", score: "High" },
      { name: "Competition", desc: "Pinless, non-slip competition fit", score: "Maximum" },
    ],
  },
  {
    icon: Gauge,
    label: "Opacity Rating",
    levels: [
      { name: "Semi-Sheer", desc: "Layering pieces, light coverage", score: "Layering" },
      { name: "Opaque", desc: "Daily wear, moderate activity", score: "100%" },
      { name: "Squat-Proof", desc: "High-intensity, zero show-through", score: "100%+" },
    ],
  },
];

export function ModestyFitGuide() {
  return (
    <section className="bg-brand-cream-deep/40 py-16 sm:py-20">
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-charcoal/50 mb-2">
            Know Before You Buy
          </p>
          <h2 className="font-serif text-3xl font-normal text-brand-charcoal sm:text-4xl">
            Made for your kind of movement
          </h2>
          <p className="mt-3 text-sm text-brand-charcoal/60 leading-relaxed">
            Every Zuhairah piece is rated for breathability, coverage, and opacity
            so you can shop with confidence.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {ratings.map((category, index) => (
            <div
              key={category.label}
              className="animate-fade-up rounded-xl border border-brand-cream-deep/40 bg-brand-cream p-6 transition-all duration-300 hover:border-brand-rose/30 hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-rose/10">
                  <category.icon className="h-5 w-5 text-brand-rose" />
                </div>
                <h3 className="text-base font-semibold text-brand-charcoal">
                  {category.label}
                </h3>
              </div>
              <ul className="space-y-4">
                {category.levels.map((level) => (
                  <li
                    key={level.name}
                    className="flex items-start justify-between gap-2 text-sm"
                  >
                    <div>
                      <p className="font-medium text-brand-charcoal">{level.name}</p>
                      <p className="text-brand-charcoal/50 mt-0.5">{level.desc}</p>
                    </div>
                    <span className="shrink-0 rounded bg-brand-rose/10 px-2.5 py-1 text-xs font-semibold text-brand-rose">
                      {level.score}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
