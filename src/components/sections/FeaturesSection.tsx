
import FeatureCard from "@/components/FeatureCard";
import { featureData } from "@/data/landingPageData";

interface FeaturesSectionProps {
  isVisible: boolean;
}

const FeaturesSection = ({ isVisible }: FeaturesSectionProps) => {
  return (
    <section 
      id="features" 
      className={`py-20 px-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Premium Features
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            AI-Powered Text & Image Tools
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Our platform combines cutting-edge AI technology to extract, enhance, and generate text from images.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureData.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
              demoContent={feature.demoContent}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
