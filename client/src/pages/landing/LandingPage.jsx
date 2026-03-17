import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import FeaturesGrid from "./components/sections/FeaturesGrid";
import TeachersSection from "./components/sections/TeachersSection";
import StudentsSection from "./components/sections/StudentsSection";
import CTASection from "./components/sections/CTASection";
import { useSmoothScroll } from "./hooks/useSmoothScroll";


const LandingPage = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-white dark:bg-primary-dark text-gray-900 dark:text-white transition-colors overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <FeaturesGrid />
      <TeachersSection />
      <StudentsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;