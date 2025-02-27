
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Clock } from "lucide-react";

interface PricingSectionProps {
  isVisible: boolean;
  trialEndsIn: number;
}

const PricingSection = ({ isVisible, trialEndsIn }: PricingSectionProps) => {
  const [yearlySub, setYearlySub] = useState(false);
  
  // Format the countdown timer
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section 
      id="pricing" 
      className={`py-20 px-8 bg-gradient-to-b from-slate-900 to-slate-800 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Pricing Plans
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Flexible pricing options to meet your needs
          </p>
          
          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 text-sm font-medium ${!yearlySub ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
            <button 
              onClick={() => setYearlySub(!yearlySub)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${yearlySub ? 'bg-indigo-600' : 'bg-slate-600'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${yearlySub ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`ml-3 text-sm font-medium ${yearlySub ? 'text-white' : 'text-slate-400'}`}>
              Yearly <span className="text-xs text-indigo-400">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Trial ends countdown */}
        <div className="max-w-md mx-auto mb-10 bg-indigo-600/20 border border-indigo-500/30 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <Clock className="text-indigo-400" size={20} />
            <p className="text-white font-medium">
              Special Launch Offer Ends In: <span className="font-mono">{formatTime(trialEndsIn)}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 flex flex-col h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
              <div className="text-4xl font-bold text-white mb-4">$0<span className="text-lg font-normal text-slate-400">/month</span></div>
              <p className="text-slate-300">Perfect for trying out our features</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>5 images per day</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>Basic text extraction</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>Standard image quality</span>
              </li>
            </ul>
            
            <Button 
              className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl"
              onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
            >
              Get Started
            </Button>
          </div>
          
          {/* Pro Plan - Highlighted as most popular */}
          <div className="rounded-2xl bg-gradient-to-b from-indigo-900/40 to-purple-900/40 backdrop-blur-md border border-indigo-500/20 p-8 flex flex-col h-full relative transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
              Most Popular
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white mb-4">
                ${yearlySub ? '15' : '19'}<span className="text-lg font-normal text-slate-400">/{yearlySub ? 'month' : 'month'}</span>
                {yearlySub && <span className="text-xs text-indigo-300 ml-2">Billed annually</span>}
              </div>
              <p className="text-slate-300">For professionals and content creators</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>100 images per day</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>Advanced text extraction</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>HD image quality</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>Priority processing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>Custom styling options</span>
              </li>
            </ul>
            
            <Button 
              className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl"
              onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
            >
              Start Pro Trial
            </Button>
          </div>
          
          {/* Enterprise Plan */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 flex flex-col h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-4">
                ${yearlySub ? '79' : '99'}<span className="text-lg font-normal text-slate-400">/{yearlySub ? 'month' : 'month'}</span>
                {yearlySub && <span className="text-xs text-indigo-300 ml-2">Billed annually</span>}
              </div>
              <p className="text-slate-300">For teams and organizations</p>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>Unlimited images</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>Premium text extraction</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>Ultra HD image quality</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>Dedicated support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>API access</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-400" />
                <span>Team collaboration tools</span>
              </li>
            </ul>
            
            <Button 
              className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl"
              onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
            >
              Contact Sales
            </Button>
          </div>
        </div>
        
        {/* Pricing FAQ */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-lg font-medium mb-2">Can I cancel my subscription anytime?</h4>
              <p className="text-slate-300">Yes, you can cancel your subscription at any time with no penalty. Your access will continue until the end of your billing period.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-lg font-medium mb-2">Is there a free trial for Pro plans?</h4>
              <p className="text-slate-300">Yes, we offer a 7-day free trial for Pro plans. No credit card required to start your trial.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-lg font-medium mb-2">What happens if I exceed my usage limits?</h4>
              <p className="text-slate-300">You'll receive a notification when you're approaching your limits. You can upgrade your plan or wait for the next billing cycle for limit refresh.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
