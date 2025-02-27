
import UseCaseCard from "@/components/UseCaseCard";
import { useCasesData } from "@/data/landingPageData";

interface UseCasesSectionProps {
  isVisible: boolean;
}

const UseCasesSection = ({ isVisible }: UseCasesSectionProps) => {
  return (
    <section 
      id="useCases" 
      className={`py-20 px-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Perfect For
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            Who Can Benefit?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Our AI-powered platform is designed for various professionals and use cases
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCasesData.map((useCase, index) => (
            <UseCaseCard
              key={index}
              title={useCase.title}
              description={useCase.description}
              image={useCase.image}
              delay={index * 0.1}
              ctaText={useCase.ctaText}
              onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
