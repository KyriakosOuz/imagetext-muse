
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <div 
      className="relative group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-white/10"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
      
      <div className="relative z-10 space-y-4">
        <div className="p-3 bg-white/10 rounded-xl inline-block mb-2">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
