
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
      className="flex flex-col md:flex-row gap-8 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full md:w-1/2 aspect-video overflow-hidden relative rounded-2xl">
        <img
          src={image}
          alt={title}
          className={cn(
            "object-cover w-full h-full transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-70"></div>
      </div>
      
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
        <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">{title}</h3>
        <p className="text-slate-300 mb-6 text-lg">{description}</p>
        
        {ctaText && onClick && (
          <button 
            onClick={onClick}
            className={cn(
              "text-base font-medium px-6 py-3 rounded-full transition-all duration-300 self-start",
              "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30"
            )}
          >
            {ctaText}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 inline">
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
