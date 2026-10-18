import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-blush overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-black focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <Navigation />
      <HeroSection />
      <Footer />
    </div>
  );
}
