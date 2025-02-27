
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  delay: number;
}

const HowItWorksStep = ({ number, title, description, icon: Icon, delay }: HowItWorksStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/40 mr-4">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            {number}
          </span>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      <div className="mb-4 text-slate-300">{description}</div>
      
      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto">
        <Icon className="w-8 h-8 text-indigo-400" />
      </div>
    </motion.div>
  );
};

export default HowItWorksStep;
