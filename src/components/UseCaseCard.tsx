
import { cn } from "@/lib/utils";
import { useState } from "react";

interface UseCaseCardProps {
  title: string;
  description: string;
  image: string;
  delay?: number;
  ctaText?: string;
  onClick?: () => void;
}

const UseCaseCard = ({ title, description, image, delay = 0, ctaText, onClick }: UseCaseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className={cn(
            "object-cover w-full h-full transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-90"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-slate-300 mb-4">{description}</p>
        
        {ctaText && onClick && (
          <button 
            onClick={onClick}
            className={cn(
              "text-sm font-medium px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300",
              "flex items-center gap-2 backdrop-blur-sm border border-white/10 transform",
              isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
          >
            {ctaText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </button>
        )}
      </div>
      
      <div className={cn(
        "absolute inset-0 border-2 border-indigo-500/0 rounded-2xl transition-all duration-500",
        isHovered ? "border-indigo-500/50" : "border-indigo-500/0"
      )}></div>
    </div>
  );
};

export default UseCaseCard;
