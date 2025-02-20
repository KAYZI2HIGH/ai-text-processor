import { CTASection } from "@/components/CTASection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { GuideSection } from "@/components/GuideSection";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";

 const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <GuideSection />
        <CTASection />
      </main>
    </div>
  );
}

export default HomePage;