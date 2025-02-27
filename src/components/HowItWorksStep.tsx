
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

const HowItWorksStep = ({ number, title, description, icon, delay = 0 }: HowItWorksStepProps) => {
  return (
    <div 
      className="relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-300 hover:shadow-xl"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute top-4 right-4 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      
      <div className="space-y-4">
        <div className="p-3 bg-white/10 rounded-xl inline-block mb-2">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
      
      {number !== 3 && (
        <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default HowItWorksStep;
