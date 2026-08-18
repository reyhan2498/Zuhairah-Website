import { HeroSection } from "@/components/home/HeroSection";
import { ValuePropositionBar } from "@/components/home/ValuePropositionBar";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { ModestyFitGuide } from "@/components/home/ModestyFitGuide";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ValuePropositionBar />
      <FeaturedCollection />
      <ModestyFitGuide />
    </>
  );
}
