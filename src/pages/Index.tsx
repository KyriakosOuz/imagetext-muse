import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import TextPromptInput from "@/components/TextPromptInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import ImageCard from "@/components/ImageCard";
import { RunwareService } from "../services/runware";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Image, Text, Sparkles, Upload, Zap, Star, ArrowRight, Camera, FileText, Brain, Trophy, Users, Clock } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import HowItWorksStep from "@/components/HowItWorksStep";
import UseCaseCard from "@/components/UseCaseCard";
import { AnimatePresence } from "framer-motion";

interface GeneratedImage {
  imageURL: string;
  positivePrompt: string;
}

// Sample Features Data with richer content
const featureData = [
  {
    icon: <Image className="text-indigo-500" size={24} />,
    title: "AI Image-to-Text Extraction",
    description: "Convert any image into editable, searchable text with our advanced AI recognition technology.",
    demo: <div className="rounded-lg overflow-hidden bg-slate-800 p-3 text-xs">
      <div className="text-slate-400 mb-1">// AI Text Extraction Demo</div>
      <div className="text-green-400">AI analyzing image...</div>
      <div className="text-white mt-1">Extracted text: "The quick brown fox jumps over the lazy dog."</div>
    </div>
  },
  {
    icon: <Text className="text-rose-500" size={24} />,
    title: "AI-Powered Captions",
    description: "Generate creative descriptions and captions for your images automatically with just one click.",
    demo: <div className="rounded-lg overflow-hidden bg-slate-800 p-3 text-xs">
      <div className="text-slate-400 mb-1">// AI Caption Generator</div>
      <div className="text-green-400">Generating creative caption...</div>
      <div className="text-white mt-1">"Sunset views that paint the sky with dreams and possibilities. #NatureInspires"</div>
    </div>
  },
  {
    icon: <Sparkles className="text-amber-500" size={24} />,
    title: "Auto-Stylized Text",
    description: "Transform extracted text into artistic typography and designs perfect for social media and marketing.",
    demo: <div className="rounded-lg overflow-hidden bg-slate-800 p-3 text-xs">
      <div className="text-slate-400 mb-1">// Typography Enhancement</div>
      <div className="text-green-400">Applying style templates...</div>
      <div className="mt-1 p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-center rounded">ADVENTURE AWAITS</div>
    </div>
  },
  {
    icon: <Zap className="text-emerald-500" size={24} />,
    title: "AI Scene Recognition",
    description: "Identify objects, people, and places in images with high accuracy to generate context-aware text.",
    demo: <div className="rounded-lg overflow-hidden bg-slate-800 p-3 text-xs">
      <div className="text-slate-400 mb-1">// AI Scene Analysis</div>
      <div className="text-green-400">Analyzing image elements...</div>
      <div className="text-white mt-1">Detected: Mountain (98%), Sunset (94%), Hikers (87%), Forest (82%)</div>
    </div>
  }
];

const howItWorksData = [
  {
    number: 1,
    title: "Upload Your Image",
    description: "Drag and drop or choose any image file from your device.",
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

// Enhanced user case studies with more specific use cases
const useCasesData = [
  {
    title: "Content Creators",
    description: "Convert sketches into digital content and extract text from inspiration images for your creative projects.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ctaText: "See Creator Examples"
  },
  {
    title: "Marketers",
    description: "Generate engaging captions for social media posts from product images and create text overlays for ads.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ctaText: "View Marketing Use Cases"
  },
  {
    title: "Students & Researchers",
    description: "Extract text from images of documents, whiteboards, and slides for academic work and research notes.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    ctaText: "Explore Academic Uses"
  }
];

// Sample testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Social Media Manager",
    quote: "ImageText Muse has saved me hours of work each week. I can now extract text from client images and generate captions in seconds.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  },
  {
    name: "David Chen",
    title: "Content Creator",
    quote: "The AI-powered caption generator is a game-changer. It produces creative content that would've taken me hours to write myself.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  },
  {
    name: "Alexandra Rivera",
    title: "Marketing Director",
    quote: "We've integrated this tool across our entire marketing department. The text extraction accuracy is impressive.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  }
];

const SamplePrompts = [
  "A futuristic cityscape with flying cars and neon lights",
  "A serene mountain landscape at sunset with a lake reflection",
  "An astronaut riding a horse on Mars, digital art",
  "A magical forest with glowing mushrooms and fairies"
];

// Sample images for demo
const sampleImages = [
  {
    url: "https://images.unsplash.com/photo-1579608750588-75d01dd7f494?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "City skyline with text overlay"
  },
  {
    url: "https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Document with printed text"
  },
  {
    url: "https://images.unsplash.com/photo-1586941279647-14726600344e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Handwritten note"
  }
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
    testimonials: false,
    pricing: false,
    cta: false
  });
  const [yearlySub, setYearlySub] = useState(false);
  const [trialEndsIn, setTrialEndsIn] = useState(24 * 60 * 60); // 24 hours in seconds
  const [processingStage, setProcessingStage] = useState("");
  const [selectedSampleImage, setSelectedSampleImage] = useState<string | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaTimerIntervalRef = useRef<number | null>(null);

  // Handler for processing stage simulation
  const simulateProcessing = () => {
    setProcessingStage("Analyzing image...");
    setTimeout(() => setProcessingStage("Detecting text regions..."), 1000);
    setTimeout(() => setProcessingStage("Extracting text content..."), 2000);
    setTimeout(() => setProcessingStage("Applying AI enhancements..."), 3000);
    setTimeout(() => setProcessingStage("Finalizing results..."), 4000);
  };

  // Trial countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTrialEndsIn(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format the countdown timer
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Hero animation effect
  useEffect(() => {
    if (heroRef.current) {
      const moveGradient = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = Math.round((clientX / window.innerWidth) * 100);
        const y = Math.round((clientY / window.innerHeight) * 100);
        
        heroRef.current!.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(129, 107, 255, 0.2), rgba(76, 0, 255, 0.05), transparent)`;
      };
      
      window.addEventListener('mousemove', moveGradient);
      return () => window.removeEventListener('mousemove', moveGradient);
    }
  }, []);

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
    simulateProcessing(); // Start the simulated processing stages
    
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
      setProcessingStage(""); // Clear processing stage
    }
  };

  const handleSamplePromptClick = (samplePrompt: string) => {
    setPrompt(samplePrompt);
  };

  const handleSampleImageClick = (imageUrl: string) => {
    setSelectedSampleImage(imageUrl);
    toast.info("Sample image selected! Click 'Process Image' to extract text.");
  };

  const handleProcessSampleImage = () => {
    if (!selectedSampleImage) {
      toast.error("Please select a sample image first");
      return;
    }
    
    setIsGenerating(true);
    simulateProcessing();
    
    // Simulate processing with a delay
    setTimeout(() => {
      const demoExtractedText = "Extracted text will appear here after processing. This is simulated text extraction.";
      toast.success("Image processed! Text extracted successfully.");
      setIsGenerating(false);
      setProcessingStage("");
    }, 5000);
  };

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Hero Section - Enhanced with animations and clearer value prop */}
        <section 
          id="hero" 
          ref={heroRef}
          className={`min-h-[90vh] flex flex-col justify-center relative overflow-hidden py-20 px-8 transition-opacity duration-1000 ${visibleSections.hero ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-rose-900/20 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
          
          {/* Animated background elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto z-10 space-y-8 text-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  AI-Powered Text Extraction & Generation
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200 leading-tight">
                Turn Any Image into<br />Editable Text – Instantly
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Extract text from images, generate captions, and transform content with our AI-powered platform. No technical skills required.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
              <Button 
                onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-lg font-medium group transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
              >
                <span>Try AI Image-to-Text Free</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                onClick={() => document.getElementById('howItWorks')?.scrollIntoView({behavior: 'smooth'})}
                variant="outline" 
                size="lg"
                className="rounded-full px-8 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-lg font-medium"
              >
                See Live Demo
              </Button>
            </div>
            
            {/* Trust badges */}
            <div className="flex items-center justify-center flex-wrap gap-6 pt-12 text-slate-400 animate-fade-in" style={{animationDelay: "0.3s"}}>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Trusted by 10,000+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                <span>No credit card required</span>
              </div>
            </div>
            
            {/* Demo animation preview */}
            <div className="max-w-xl mx-auto mt-12 rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/20 backdrop-blur-sm animate-fade-in" style={{animationDelay: "0.4s"}}>
              <div className="bg-slate-800/60 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-slate-400 flex-1 text-center">AI Demo Preview</div>
              </div>
              <div className="p-4 space-y-3">
                <div className="h-3 bg-slate-700/60 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-slate-700/60 rounded w-1/2 animate-pulse" style={{animationDelay: "0.2s"}}></div>
                <div className="h-3 bg-slate-700/60 rounded w-5/6 animate-pulse" style={{animationDelay: "0.4s"}}></div>
                <div className="h-3 bg-slate-700/60 rounded w-2/3 animate-pulse" style={{animationDelay: "0.6s"}}></div>
              </div>
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

        {/* Features Section - Enhanced with interactive demos */}
        <section 
          id="features" 
          className={`py-20 px-8 transition-all duration-1000 ${visibleSections.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
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
                  demo={feature.demo}
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

        {/* Use Cases Section - Enhanced with interactive cards */}
        <section 
          id="useCases" 
          className={`py-20 px-8 transition-all duration-1000 ${visibleSections.useCases ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
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

        {/* Testimonials Section - New section */}
        <section 
          id="testimonials" 
          className={`py-20 px-8 bg-gradient-to-b from-slate-800 to-slate-900 transition-all duration-1000 ${visibleSections.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  Testimonials
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                What Our Users Say
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Join thousands of satisfied users who've transformed their workflow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:bg-white/10 flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 mr-4">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                      <p className="text-slate-400 text-sm">{testimonial.title}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-300 italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Trust indicators */}
            <div className="mt-16 flex justify-center">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl py-6 px-10 inline-flex flex-wrap items-center justify-center gap-12">
                <div className="flex flex-col items-center">
                  <h4 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">10,000+</h4>
                  <p className="text-sm text-slate-400">Active Users</p>
                </div>
                <div className="flex flex-col items-center">
                  <h4 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">4.9/5</h4>
                  <p className="text-sm text-slate-400">User Rating</p>
                </div>
                <div className="flex flex-col items-center">
                  <h4 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">1M+</h4>
                  <p className="text-sm text-slate-400">Images Processed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section - Enhanced with sample images */}
        <section 
          id="demo" 
          className={`py-20 px-8 transition-all duration-1000 ${visibleSections.demo ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  Interactive Demo
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                Try It Yourself
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Generate amazing images with AI or extract text from sample images
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 p-8">
              <Tabs defaultValue="demo" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                  <TabsTrigger value="demo" className="data-[state=active]:bg-indigo-600 rounded-full">Generate Image</TabsTrigger>
                  <TabsTrigger value="extract" className="data-[state=active]:bg-indigo-600 rounded-full">Extract Text</TabsTrigger>
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
                  
                  {isGenerating && (
                    <div className="text-center">
                      <LoadingSpinner />
                      <p className="text-slate-300 mt-4">{processingStage}</p>
                    </div>
                  )}
                  
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
                
                <TabsContent value="extract" className="space-y-8">
                  <div className="text-center space-y-6">
                    <h3 className="text-xl font-medium mb-4">Select a Sample Image to Extract Text</h3>
                    <p className="text-slate-300 mb-4">Click on an image below to test our AI text extraction</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {sampleImages.map((image, index) => (
                        <div
                          key={index}
                          className={`cursor-pointer border-2 rounded-xl overflow-hidden transition-all duration-300 ${selectedSampleImage === image.url ? 'border-indigo-500 shadow-lg shadow-indigo-500/20' : 'border-transparent'}`}
                          onClick={() => handleSampleImageClick(image.url)}
                        >
                          <img 
                            src={image.url} 
                            alt={image.description} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-3 bg-black/30">
                            <p className="text-sm">{image.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      onClick={handleProcessSampleImage}
                      disabled={isGenerating || !selectedSampleImage}
                      className="mt-6 h-14 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl transition-all duration-300"
                    >
                      {isGenerating ? "Processing..." : "Process Image"}
                    </Button>
                    
                    {isGenerating && (
                      <div className="text-center mt-6">
                        <LoadingSpinner />
                        <p className="text-slate-300 mt-4">{processingStage}</p>
                      </div>
                    )}
                    
                    {selectedSampleImage && !isGenerating && (
                      <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-white/10">
                        <h4 className="font-medium mb-2">Extracted Content:</h4>
                        <div className="p-4 bg-black/20 rounded-lg text-left">
                          <p className="text-slate-300 font-mono text-sm">
                            Select an image and click "Process Image" to extract text using our AI.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
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
        
        {/* Pricing Section - Enhanced with toggle and most popular plan */}
        <section 
          id="pricing" 
          className={`py-20 px-8 bg-gradient-to-b from-slate-900 to-slate-800 transition-all duration-1000 ${visibleSections.pricing ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  Pricing Plans
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                Choose Your Plan
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Flexible pricing options to meet your needs
              </p>
              
              {/* Monthly/Yearly Toggle */}
              <div className="flex items-center justify-center mt-8">
                <span className={`mr-3 text-sm font-medium ${!yearlySub ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
                <button 
                  onClick={() => setYearlySub(!yearlySub)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${yearlySub ? 'bg-indigo-600' : 'bg-slate-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${yearlySub ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
                <span className={`ml-3 text-sm font-medium ${yearlySub ? 'text-white' : 'text-slate-400'}`}>
                  Yearly <span className="text-xs text-indigo-400">Save 20%</span>
                </span>
              </div>
            </div>

            {/* Trial ends countdown */}
            <div className="max-w-md mx-auto mb-10 bg-indigo-600/20 border border-indigo-500/30 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Clock className="text-indigo-400" size={20} />
                <p className="text-white font-medium">
                  Special Launch Offer Ends In: <span className="font-mono">{formatTime(trialEndsIn)}</span>
                </p>
              </div>
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
              
              {/* Pro Plan - Highlighted as most popular */}
              <div className="rounded-2xl bg-gradient-to-b from-indigo-900/40 to-purple-900/40 backdrop-blur-md border border-indigo-500/20 p-8 flex flex-col h-full relative transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  Most Popular
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
                  <div className="text-4xl font-bold text-white mb-4">
                    ${yearlySub ? '15' : '19'}<span className="text-lg font-normal text-slate-400">/{yearlySub ? 'month' : 'month'}</span>
                    {yearlySub && <span className="text-xs text-indigo-300 ml-2">Billed annually</span>}
                  </div>
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
                  <div className="text-4xl font-bold text-white mb-4">
                    ${yearlySub ? '79' : '99'}<span className="text-lg font-normal text-slate-400">/{yearlySub ? 'month' : 'month'}</span>
                    {yearlySub && <span className="text-xs text-indigo-300 ml-2">Billed annually</span>}
                  </div>
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
            
            {/* Pricing FAQ */}
            <div className="mt-16 max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-medium mb-2">Can I cancel my subscription anytime?</h4>
                  <p className="text-slate-300">Yes, you can cancel your subscription at any time with no penalty. Your access will continue until the end of your billing period.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-medium mb-2">Is there a free trial for Pro plans?</h4>
                  <p className="text-slate-300">Yes, we offer a 7-day free trial for Pro plans. No credit card required to start your trial.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h4 className="text-lg font-medium mb-2">What happens if I exceed my usage limits?</h4>
                  <p className="text-slate-300">You'll receive a notification when you're approaching your limits. You can upgrade your plan or wait for the next billing cycle for limit refresh.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section - Enhanced with urgency and stronger call to action */}
        <section 
          id="cta" 
          className={`py-20 px-8 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-rose-900/20 backdrop-blur-md relative transition-all duration-1000 ${visibleSections.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center space-y-8 max-w-3xl mx-auto">
              <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium border border-white/10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                  Limited Time Offer
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-indigo-200">
                Ready to Transform Your Images with AI?
              </h2>
              <p className="text-xl text-slate-300">
                Join thousands of content creators, marketers, and designers who are already using our platform.
              </p>
              
              {/* Countdown timer */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg py-3 px-6 inline-block">
                <p className="text-sm text-slate-300 mb-1">Special Launch Pricing Ends In:</p>
                <div className="font-mono text-2xl text-white">{formatTime(trialEndsIn)}</div>
              </div>
              
              <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})}
                  size="lg"
                  className="rounded-full px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-lg font-medium"
                >
                  Try AI Image-to-Text Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="rounded-full px-8 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-lg font-medium"
                  onClick={() => window.open('https://docs.runware.ai', '_blank')}
                >
                  Try a Live Demo First
                </Button>
              </div>
              
              <div className="flex justify-center flex-wrap space-x-6 pt-6">
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
        
        {/* Footer - Enhanced with more links and social media */}
        <footer className="py-12 px-8 bg-slate-900 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">ImageText Muse</h3>
                <p className="text-slate-400 text-sm">Transform your images into editable text and captions with our AI-powered platform.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">© {new Date().getFullYear()} ImageText Muse. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AnimatePresence>
  );
};

export default Index;
