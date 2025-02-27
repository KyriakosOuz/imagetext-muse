
import HowItWorksStep from "@/components/HowItWorksStep";
import { howItWorksData } from "@/data/landingPageData";

interface HowItWorksSectionProps {
  isVisible: boolean;
}

const HowItWorksSection = ({ isVisible }: HowItWorksSectionProps) => {
  return (
    <section 
      id="howItWorks" 
      className={`py-20 px-8 bg-gradient-to-b from-slate-900 to-slate-800 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            How It Works
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A simple three-step process to transform your images with AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorksData.map((step, index) => (
            <HowItWorksStep
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
