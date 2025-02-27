
import UseCaseCard from "@/components/UseCaseCard";
import { useCasesData } from "@/data/landingPageData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-10">
          <Tabs defaultValue={useCasesData[0].title.toLowerCase().replace(/\s+/g, '-')} className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="w-full max-w-2xl mx-auto">
                {useCasesData.map((useCase, index) => (
                  <TabsTrigger 
                    key={index} 
                    value={useCase.title.toLowerCase().replace(/\s+/g, '-')}
                  >
                    <span className="relative z-10">{useCase.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {useCasesData.map((useCase, index) => (
              <TabsContent 
                key={index} 
                value={useCase.title.toLowerCase().replace(/\s+/g, '-')}
                className="animate-fade-in"
              >
                <UseCaseCard
                  title={useCase.title}
                  description={useCase.description}
                  image={useCase.image}
                  delay={index * 0.1}
                  ctaText={useCase.ctaText}
                  onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {useCasesData.map((useCase, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:bg-white/10 flex flex-col text-center items-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mb-4">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title} 
                    className="w-10 h-10 object-contain" 
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                <p className="text-slate-300 mb-4 line-clamp-2">{useCase.description}</p>
                <button 
                  onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
                  className="text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity duration-300 mt-auto"
                >
                  {useCase.ctaText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
