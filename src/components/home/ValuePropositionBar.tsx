import { Droplets, Eye, Heart, Shield } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const values = [
  {
    icon: Droplets,
    title: "Sweat-Wicking Fabrics",
    description: "Advanced moisture management keeps you dry through every rep.",
  },
  {
    icon: Shield,
    title: "Stay-in-Place Fit",
    description: "Non-slip designs that move with you, never against you.",
  },
  {
    icon: Eye,
    title: "100% Opaque",
    description: "Squat-proof, bend-proof coverage you can trust.",
  },
  {
    icon: Heart,
    title: "Ethical Manufacturing",
    description: "Responsibly sourced materials and fair-wage production.",
  },
];

export function ValuePropositionBar() {
  return (
    <section className="border-y border-brand-charcoal/10 bg-white">
      <div className="px-6 sm:px-10 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.1}>
              <div
                className="animate-fade-up flex flex-col items-center text-center lg:items-start lg:text-left"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-purple/15">
                  <value.icon className="h-5 w-5 text-brand-purple" />
                </div>
                <h3 className="text-sm font-semibold text-brand-purple">
                  {value.title}
                </h3>
                <p className="mt-1 text-xs text-brand-charcoal/60 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </Reveal>          
            ))}
        </div>
      </div>
    </section>
  );
}
