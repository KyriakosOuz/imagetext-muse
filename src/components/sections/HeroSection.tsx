
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Star, Check } from "lucide-react";

interface HeroSectionProps {
  isVisible: boolean;
}

const HeroSection = ({ isVisible }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Hero animation effect
  useEffect(() => {
    if (heroRef.current) {
      const moveGradient = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = Math.round((clientX / window.innerWidth) * 100);
        const y = Math.round((clientY / window.innerHeight) * 100);
        
        heroRef.current!.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(129, 107, 255, 0.2), rgba(76, 0, 255, 0.05), transparent)`;
      };
      
      window.addEventListener('mousemove', moveGradient);
      return () => window.removeEventListener('mousemove', moveGradient);
    }
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className={`min-h-[90vh] flex flex-col justify-center relative overflow-hidden py-20 px-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-rose-900/20 z-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto z-10 space-y-8 text-center">
        <div className="space-y-6 animate-fade-in">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              AI-Powered Text Extraction & Generation
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200 leading-tight">
            Turn Any Image into<br />Editable Text – Instantly
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Extract text from images, generate captions, and transform content with our AI-powered platform. No technical skills required.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
          <Button 
            onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
            size="lg"
            className="rounded-full px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-lg font-medium group transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
          >
            <span>Try AI Image-to-Text Free</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            onClick={() => document.getElementById('howItWorks')?.scrollIntoView({behavior: 'smooth'})}
            variant="outline" 
            size="lg"
            className="rounded-full px-8 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-lg font-medium"
          >
            See Live Demo
          </Button>
        </div>
        
        {/* Trust badges */}
        <div className="flex items-center justify-center flex-wrap gap-6 pt-12 text-slate-400 animate-fade-in" style={{animationDelay: "0.3s"}}>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>Trusted by 10,000+ users</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            <span>4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            <span>No credit card required</span>
          </div>
        </div>
        
        {/* Demo animation preview */}
        <div className="max-w-xl mx-auto mt-12 rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/20 backdrop-blur-sm animate-fade-in" style={{animationDelay: "0.4s"}}>
          <div className="bg-slate-800/60 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-sm text-slate-400 flex-1 text-center">AI Demo Preview</div>
          </div>
          <div className="p-4 space-y-3">
            <div className="h-3 bg-slate-700/60 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-slate-700/60 rounded w-1/2 animate-pulse" style={{animationDelay: "0.2s"}}></div>
            <div className="h-3 bg-slate-700/60 rounded w-5/6 animate-pulse" style={{animationDelay: "0.4s"}}></div>
            <div className="h-3 bg-slate-700/60 rounded w-2/3 animate-pulse" style={{animationDelay: "0.6s"}}></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
          className="text-white/70 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
