import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesTicker } from "@/components/sections/features-ticker";
import { PopularCourses } from "@/components/sections/popular-courses";
import { CategoriesSection } from "@/components/sections/categories-section";
import { GrowthSection } from "@/components/sections/growth-section";
import { CommunitySection } from "@/components/sections/community-section";
import { CtaBanner } from "@/components/sections/cta-banner";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar variant="hero" />
      <main className="flex-1">
        <HeroSection />
        <FeaturesTicker />
        <PopularCourses />
        <CategoriesSection />
        <GrowthSection />
        <CommunitySection />
        <CtaBanner />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
