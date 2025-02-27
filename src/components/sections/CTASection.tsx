
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface CTASectionProps {
  isVisible: boolean;
  trialEndsIn: number;
}

const CTASection = ({ isVisible, trialEndsIn }: CTASectionProps) => {
  // Format the countdown timer
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section 
      id="cta" 
      className={`py-20 px-8 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-rose-900/20 backdrop-blur-md relative transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Limited Time Offer
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200">
            Ready to Transform Your Images with AI?
          </h2>
          <p className="text-xl text-slate-300">
            Join thousands of content creators, marketers, and designers who are already using our platform.
          </p>
          
          {/* Countdown timer */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg py-3 px-6 inline-block">
            <p className="text-sm text-slate-300 mb-1">Special Launch Pricing Ends In:</p>
            <div className="font-mono text-2xl text-white">{formatTime(trialEndsIn)}</div>
          </div>
          
          <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-lg font-medium"
            >
              Try AI Image-to-Text Free
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full px-8 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-lg font-medium"
              onClick={() => window.open('https://docs.runware.ai', '_blank')}
            >
              Try a Live Demo First
            </Button>
          </div>
          
          <div className="flex justify-center flex-wrap space-x-6 pt-6">
            <div className="flex items-center">
              <Check className="text-green-400 mr-2" size={16} />
              <span className="text-sm text-slate-300">No Credit Card Required</span>
            </div>
            <div className="flex items-center">
              <Check className="text-green-400 mr-2" size={16} />
              <span className="text-sm text-slate-300">GDPR Compliant</span>
            </div>
            <div className="flex items-center">
              <Check className="text-green-400 mr-2" size={16} />
              <span className="text-sm text-slate-300">Trusted by 10,000+ Users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
