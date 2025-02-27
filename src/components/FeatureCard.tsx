
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
  demoContent: {
    heading: string;
    processingText: string;
    resultText: string;
    hasSpecialFormat?: boolean;
  };
}

const FeatureCard = ({ icon: Icon, title, description, delay, demoContent }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group"
    >
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">{title}</h3>
      </div>
      <p className="text-slate-300 mb-4 group-hover:text-sky-300 transition-colors">{description}</p>
      
      <div className="rounded-lg overflow-hidden bg-slate-800 p-3 text-xs">
        <div className="text-slate-400 mb-1">{demoContent.heading}</div>
        <div className="text-green-400">{demoContent.processingText}</div>
        
        {demoContent.hasSpecialFormat ? (
          <div className="mt-1 p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-center rounded">
            {demoContent.resultText}
          </div>
        ) : (
          <div className="text-white mt-1">{demoContent.resultText}</div>
        )}
      </div>
    </motion.div>
  );
};

export default FeatureCard;
