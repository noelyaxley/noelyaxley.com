import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-blush overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <Footer />
    </div>
  );
}
