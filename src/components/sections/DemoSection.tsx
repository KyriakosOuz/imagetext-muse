
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextPromptInput from "@/components/TextPromptInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import ImageCard from "@/components/ImageCard";
import { RunwareService } from "../../services/runware";
import { SamplePrompts, sampleImages } from "@/data/landingPageData";

interface GeneratedImage {
  imageURL: string;
  positivePrompt: string;
}

interface DemoSectionProps {
  isVisible: boolean;
}

const DemoSection = ({ isVisible }: DemoSectionProps) => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [activeTab, setActiveTab] = useState("demo");
  const [processingStage, setProcessingStage] = useState("");
  const [selectedSampleImage, setSelectedSampleImage] = useState<string | null>(null);
  
  // Handler for processing stage simulation
  const simulateProcessing = () => {
    setProcessingStage("Analyzing image...");
    setTimeout(() => setProcessingStage("Detecting text regions..."), 1000);
    setTimeout(() => setProcessingStage("Extracting text content..."), 2000);
    setTimeout(() => setProcessingStage("Applying AI enhancements..."), 3000);
    setTimeout(() => setProcessingStage("Finalizing results..."), 4000);
  };

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
      toast.success("Image processed! Text extracted successfully.");
      setIsGenerating(false);
      setProcessingStage("");
    }, 5000);
  };

  return (
    <section 
      id="demo" 
      className={`py-20 px-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
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
          <Tabs defaultValue="demo" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="w-full max-w-md mx-auto">
                <TabsTrigger value="demo">
                  <span className="relative z-10">Generate Image</span>
                </TabsTrigger>
                <TabsTrigger value="extract">
                  <span className="relative z-10">Extract Text</span>
                </TabsTrigger>
                <TabsTrigger value="gallery">
                  <span className="relative z-10">Gallery</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
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
  );
};

export default DemoSection;
