
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

// Import section components
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import DemoSection from "@/components/sections/DemoSection";
import PricingSection from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    features: false,
    howItWorks: false,
    useCases: false,
    demo: false,
    testimonials: false,
    pricing: false,
    cta: false
  });
  const [trialEndsIn, setTrialEndsIn] = useState(24 * 60 * 60); // 24 hours in seconds

  // Set up intersection observer for section visibility
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setVisibleSections(prev => ({
            ...prev,
            [sectionId]: true
          }));
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      sectionObserver.observe(section);
    });

    return () => {
      document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

  // Trial countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTrialEndsIn(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
        <HeroSection isVisible={visibleSections.hero} />
        <FeaturesSection isVisible={visibleSections.features} />
        <HowItWorksSection isVisible={visibleSections.howItWorks} />
        <UseCasesSection isVisible={visibleSections.useCases} />
        <TestimonialsSection isVisible={visibleSections.testimonials} />
        <DemoSection isVisible={visibleSections.demo} />
        <PricingSection isVisible={visibleSections.pricing} trialEndsIn={trialEndsIn} />
        <CTASection isVisible={visibleSections.cta} trialEndsIn={trialEndsIn} />
        <FooterSection />
      </div>
    </AnimatePresence>
  );
};

export default Index;
