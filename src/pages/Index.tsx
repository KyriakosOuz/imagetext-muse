
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import TextPromptInput from "@/components/TextPromptInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import ImageCard from "@/components/ImageCard";
import { RunwareService } from "../services/runware";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Image, Text, Sparkles, Upload, Zap } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import HowItWorksStep from "@/components/HowItWorksStep";
import UseCaseCard from "@/components/UseCaseCard";

interface GeneratedImage {
  imageURL: string;
  positivePrompt: string;
}

const featureData = [
  {
    icon: <Image className="text-indigo-500" />,
    title: "AI Image-to-Text Extraction",
    description: "Convert any image into editable, searchable text with our advanced AI."
  },
  {
    icon: <Text className="text-rose-500" />,
    title: "AI-Powered Captions",
    description: "Generate creative descriptions and captions for your images automatically."
  },
  {
    icon: <Sparkles className="text-amber-500" />,
    title: "Auto-Stylized Text",
    description: "Transform extracted text into artistic typography and designs."
  },
  {
    icon: <Zap className="text-emerald-500" />,
    title: "AI Scene Recognition",
    description: "Identify objects, people, and places in images with high accuracy."
  }
];

const howItWorksData = [
  {
    number: 1,
    title: "Upload Your Image",
    description: "Drag and drop or choose a file from your device.",
    icon: <Upload />
  },
  {
    number: 2,
    title: "AI Analysis",
    description: "Our advanced AI extracts and enhances text from your image.",
    icon: <Sparkles />
  },
  {
    number: 3,
    title: "Receive Results",
    description: "Download or customize the generated text and images.",
    icon: <Check />
  }
];

const useCasesData = [
  {
    title: "Content Creators",
    description: "Generate text-based designs from images for your creative projects.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Marketers",
    description: "Create engaging captions for social media posts from product images.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Students & Researchers",
    description: "Extract text from images for research notes and academic work.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const SamplePrompts = [
  "A futuristic cityscape with flying cars and neon lights",
  "A serene mountain landscape at sunset with a lake reflection",
  "An astronaut riding a horse on Mars, digital art",
  "A magical forest with glowing mushrooms and fairies"
];

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [activeTab, setActiveTab] = useState("demo");
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    features: false,
    howItWorks: false,
    useCases: false,
    demo: false,
    pricing: false,
    cta: false
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setVisibleSections(prev => ({
            ...prev,
            [sectionId]: true
          }));
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      sectionObserver.observe(section);
    });

    return () => {
      document.querySelectorAll('section[id]').forEach(section => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

  const initializeRunware = (key: string) => {
    try {
      return new RunwareService(key);
    } catch (error) {
      console.error("Failed to initialize Runware service:", error);
      toast.error("Failed to initialize service. Please check your API key.");
      return null;
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }

    if (!apiKey.trim()) {
      toast.error("Please enter your Runware API key");
      return;
    }

    setIsGenerating(true);
    try {
      const service = initializeRunware(apiKey);
      if (!service) {
        throw new Error("Failed to initialize service");
      }

      const result = await service.generateImage({
        positivePrompt: prompt,
      });

      setGeneratedImages((prev) => [{
        imageURL: result.imageURL,
        positivePrompt: prompt
      }, ...prev]);
      
      toast.success("Image generated successfully!");
    } catch (error) {
      toast.error("Failed to generate image. Please check your API key and try again.");
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSamplePromptClick = (samplePrompt: string) => {
    setPrompt(samplePrompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section 
        id="hero" 
        className={`min-h-[90vh] flex flex-col justify-center relative overflow-hidden py-20 px-8 transition-opacity duration-1000 ${visibleSections.hero ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-rose-900/20 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
        
        <div className="max-w-7xl mx-auto z-10 space-y-8 text-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200 leading-tight">
              Extract, Enhance, and Generate<br />Text from Images in Seconds
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Transform your ideas into stunning visuals with AI-powered image generation and text extraction.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
            <Button 
              onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-lg font-medium"
            >
              Try It Now
            </Button>
            <Button 
              onClick={() => document.getElementById('howItWorks')?.scrollIntoView({behavior: 'smooth'})}
              variant="outline" 
              size="lg"
              className="rounded-full px-8 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-lg font-medium"
            >
              How It Works
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
            className="text-white/70 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className={`py-20 px-8 transition-all duration-1000 ${visibleSections.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              Powerful AI Features
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section 
        id="howItWorks" 
        className={`py-20 px-8 bg-gradient-to-b from-slate-900 to-slate-800 transition-all duration-1000 ${visibleSections.howItWorks ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
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

      {/* Use Cases Section */}
      <section 
        id="useCases" 
        className={`py-20 px-8 transition-all duration-1000 ${visibleSections.useCases ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section 
        id="demo" 
        className={`py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-900 transition-all duration-1000 ${visibleSections.demo ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              Try It Yourself
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Generate amazing images with AI or see our showcase examples
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 p-8">
            <Tabs defaultValue="demo" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="demo" className="data-[state=active]:bg-indigo-600 rounded-full">Generate</TabsTrigger>
                <TabsTrigger value="gallery" className="data-[state=active]:bg-indigo-600 rounded-full">Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="demo" className="space-y-8">
                <div className="space-y-6">
                  <Input
                    type="password"
                    placeholder="Enter your Runware API key..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-white/10 border-white/10 text-white placeholder:text-white/50 h-14 rounded-xl"
                  />
                  
                  <div className="space-y-4">
                    <TextPromptInput
                      placeholder="Describe the image you want to generate..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="w-full"
                    />
                    
                    <div className="flex flex-wrap gap-2">
                      {SamplePrompts.map((samplePrompt, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSamplePromptClick(samplePrompt)}
                          className="bg-white/5 border-white/10 hover:bg-white/10"
                        >
                          {samplePrompt}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl transition-all duration-300"
                  >
                    {isGenerating ? "Generating..." : "Generate Image"}
                  </Button>
                </div>
                
                {isGenerating && <LoadingSpinner />}
                
                {generatedImages.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-medium mb-4">Your Generated Image</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <ImageCard
                        src={generatedImages[0].imageURL}
                        alt={generatedImages[0].positivePrompt}
                        className="aspect-square w-full max-w-md mx-auto"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="gallery">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedImages.map((image, index) => (
                    <ImageCard
                      key={index}
                      src={image.imageURL}
                      alt={image.positivePrompt}
                    />
                  ))}
                  
                  {generatedImages.length === 0 && (
                    <div className="col-span-3 text-center py-12 text-slate-400">
                      <p>No images generated yet. Try the generator!</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section 
        id="pricing" 
        className={`py-20 px-8 transition-all duration-1000 ${visibleSections.pricing ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Flexible pricing options to meet your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 flex flex-col h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
                <div className="text-4xl font-bold text-white mb-4">$0<span className="text-lg font-normal text-slate-400">/month</span></div>
                <p className="text-slate-300">Perfect for trying out our features</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>5 images per day</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>Basic text extraction</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>Standard image quality</span>
                </li>
              </ul>
              
              <Button 
                className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl"
                onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
              >
                Get Started
              </Button>
            </div>
            
            {/* Pro Plan */}
            <div className="rounded-2xl bg-gradient-to-b from-indigo-900/40 to-purple-900/40 backdrop-blur-md border border-indigo-500/20 p-8 flex flex-col h-full relative transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                Most Popular
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
                <div className="text-4xl font-bold text-white mb-4">$19<span className="text-lg font-normal text-slate-400">/month</span></div>
                <p className="text-slate-300">For professionals and content creators</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>100 images per day</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>Advanced text extraction</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>HD image quality</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>Priority processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>Custom styling options</span>
                </li>
              </ul>
              
              <Button 
                className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl"
                onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
              >
                Start Pro Trial
              </Button>
            </div>
            
            {/* Enterprise Plan */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 flex flex-col h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-white mb-4">$99<span className="text-lg font-normal text-slate-400">/month</span></div>
                <p className="text-slate-300">For teams and organizations</p>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>Unlimited images</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>Premium text extraction</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>Ultra HD image quality</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>API access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={18} className="text-green-400" />
                  <span>Team collaboration tools</span>
                </li>
              </ul>
              
              <Button 
                className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl"
                onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        id="cta" 
        className={`py-20 px-8 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-rose-900/20 backdrop-blur-md relative transition-all duration-1000 ${visibleSections.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200">
              Ready to Transform Your Images with AI?
            </h2>
            <p className="text-xl text-slate-300">
              Join thousands of content creators, marketers, and designers who are already using our platform.
            </p>
            
            <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-lg font-medium"
              >
                Get Started Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full px-8 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-lg font-medium"
                onClick={() => window.open('https://docs.runware.ai', '_blank')}
              >
                View Documentation
              </Button>
            </div>
            
            <div className="flex justify-center space-x-6 pt-6">
              <div className="flex items-center">
                <Check className="text-green-400 mr-2" size={16} />
                <span className="text-sm text-slate-300">No Credit Card Required</span>
              </div>
              <div className="flex items-center">
                <Check className="text-green-400 mr-2" size={16} />
                <span className="text-sm text-slate-300">GDPR Compliant</span>
              </div>
              <div className="flex items-center">
                <Check className="text-green-400 mr-2" size={16} />
                <span className="text-sm text-slate-300">Trusted by 10,000+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-8 bg-slate-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">© {new Date().getFullYear()} ImageText Muse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
