import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
  animation?: ReactNode;
  isActive?: boolean;
}

const HowItWorksStep = ({ 
  number, 
  title, 
  description, 
  icon, 
  delay = 0, 
  animation,
  isActive = false 
}: HowItWorksStepProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ delay: delay * 0.3, duration: 0.5 }}
        className={cn(
          "relative group overflow-hidden rounded-2xl backdrop-blur-sm border p-8 transition-all duration-300",
          isActive || isHovered 
            ? "bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/40 shadow-xl" 
            : "bg-white/5 border-white/10"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={cn(
          "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-300",
          isActive || isHovered ? "bg-indigo-500 text-white" : "bg-indigo-600/70 text-white/90"
        )}>
          {number}
        </div>
        
        <div className="space-y-4">
          <div className={cn(
            "p-3 rounded-xl inline-block mb-2 transition-all duration-300",
            isActive || isHovered ? "bg-indigo-500/20" : "bg-white/10"
          )}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-slate-300">{description}</p>
          
          {animation && (
            <div className={cn(
              "mt-6 rounded-lg overflow-hidden transition-all duration-500 border border-white/10",
              isActive || isHovered ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
            )}>
              {animation}
            </div>
          )}
        </div>
        
        {number !== 3 && (
          <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-slate-500 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default HowItWorksStep;
