
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface SegmentOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SegmentedControl = ({ options, value, onChange, className }: SegmentedControlProps) => {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);

  // Find active index
  const activeIndex = options.findIndex(option => option.value === value);
  
  return (
    <div 
      className={cn(
        "relative p-1 grid gap-1 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-white/10",
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`
      }}
    >
      {/* Animated active background */}
      {activeIndex > -1 && (
        <motion.div
          className="absolute inset-y-1 rounded-lg bg-gradient-to-r from-indigo-600/80 to-purple-600/80 shadow-lg z-0"
          initial={false}
          animate={{
            left: `calc(${activeIndex * (100 / options.length)}% + 4px)`,
            right: `calc(${100 - ((activeIndex + 1) * (100 / options.length))}% + 4px)`
          }}
          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        />
      )}
      
      {/* Options */}
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          onMouseEnter={() => setHoveredValue(option.value)}
          onMouseLeave={() => setHoveredValue(null)}
          className={cn(
            "relative px-4 py-2 text-sm font-medium rounded-lg transition-all z-10",
            "flex items-center justify-center gap-2",
            option.value === value 
              ? "text-white" 
              : "text-slate-400 hover:text-white"
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;
