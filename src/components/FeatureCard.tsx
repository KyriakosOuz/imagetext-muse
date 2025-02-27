
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
  demo?: ReactNode;
}

const FeatureCard = ({ icon, title, description, delay = 0, demo }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:bg-white/10"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
      
      <div className="relative z-10 space-y-4">
        <div className="p-3 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl inline-block mb-2 transition-all duration-300 group-hover:from-indigo-500/20 group-hover:to-purple-500/20">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-slate-300">{description}</p>
        
        {demo && (
          <div className={cn(
            "mt-4 pt-4 border-t border-white/10 transition-all duration-500",
            isHovered ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"
          )}>
            {demo}
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-500"></div>
    </div>
  );
};

export default FeatureCard;
