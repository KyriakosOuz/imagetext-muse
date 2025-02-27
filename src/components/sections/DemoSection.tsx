
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextPromptInput from "@/components/TextPromptInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import ImageCard from "@/components/ImageCard";
import { RunwareService } from "../../services/runware";
import { SamplePrompts, sampleImages } from "@/data/landingPageData";
import { Upload } from "lucide-react";

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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    setUploadedImage(null);
    setExtractedText(null);
    toast.info("Sample image selected! Click 'Process Image' to extract text.");
  };

  // Function to extract text from an image using OCR and AI processing
  const extractTextFromImage = async (imageSource: string) => {
    // In a real implementation, this would call an actual OCR/AI service
    // For demonstration purposes, we're simulating an AI text extraction
    try {
      // Convert image to base64 if it's not already
      const imageData = imageSource.startsWith('data:') 
        ? imageSource 
        : await fetch(imageSource).then(res => res.blob()).then(blob => {
            return new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(blob);
            });
          });
      
      // Simulated AI processing - in a real app, this would call a real OCR API
      // We're simulating different text extraction based on the image content
      // In production, replace this with actual AI text extraction API calls
      
      // Simple image characteristics check to provide different responses
      // This is just for simulation - a real implementation would use actual OCR
      const img = new Image();
      img.src = imageData;
      
      return new Promise<string>((resolve) => {
        img.onload = () => {
          // For demonstration, returning different text based on image dimensions
          // In reality, an OCR service would extract actual text from the image
          if (imageSource.includes('document') || imageSource.includes('text')) {
            resolve("This appears to be a document with text content. The text reads: 'Sample document with important information. Please review the contents carefully and respond accordingly.'");
          } else if (imageSource.includes('receipt') || imageSource.includes('invoice')) {
            resolve("Receipt #1234\nDate: 2023-05-15\nItems:\n- Product A: $24.99\n- Product B: $15.50\nSubtotal: $40.49\nTax: $3.24\nTotal: $43.73\nThank you for your purchase!");
          } else {
            // Generic response for other images
            const aspectRatio = img.width / img.height;
            const brightness = aspectRatio > 1 ? "bright" : "dim";
            resolve(`This image appears to be a ${brightness} ${aspectRatio > 1.5 ? 'landscape' : 'portrait'} photo. ${
              Math.random() > 0.5 
                ? "I can see what looks like text in the corner that says 'Sample text content'." 
                : "There appears to be minimal text content in this image."
            }`);
          }
        };
      });
    } catch (error) {
      console.error("Text extraction error:", error);
      return "Error processing image. Please try again with a clearer image containing text.";
    }
  };

  const handleProcessSampleImage = async () => {
    if (!selectedSampleImage && !uploadedImage) {
      toast.error("Please select or upload an image first");
      return;
    }
    
    setIsGenerating(true);
    simulateProcessing();
    
    try {
      // Process the selected image (either sample or uploaded)
      const imageToProcess = selectedSampleImage || uploadedImage;
      if (!imageToProcess) throw new Error("No image selected");
      
      // Extract text from the image using our simulated AI function
      const extractedContent = await extractTextFromImage(imageToProcess);
      setExtractedText(extractedContent);
      
      toast.success("Image processed! Text extracted successfully.");
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try again.");
      setExtractedText("Error processing image. Please try again with a different image.");
    } finally {
      setIsGenerating(false);
      setProcessingStage("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedImage(event.target.result.toString());
        setSelectedSampleImage(null);
        setExtractedText(null);
        toast.info("Image uploaded! Click 'Process Image' to extract text.");
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
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
                        className="bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
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
                <h3 className="text-xl font-medium mb-4">Extract Text from an Image</h3>
                <p className="text-slate-300 mb-4">Upload your own image or select a sample below</p>
                
                {/* Image Upload Section */}
                <div className="max-w-md mx-auto">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    onClick={triggerFileInput}
                    variant="outline"
                    className="w-full py-8 flex flex-col items-center justify-center space-y-3 bg-white/5 border-dashed border-2 border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <Upload size={40} className="text-indigo-400" />
                    <span className="text-slate-300">
                      Click to upload an image
                    </span>
                    <span className="text-slate-400 text-sm">
                      (Maximum file size: 5MB)
                    </span>
                  </Button>
                </div>

                {uploadedImage && (
                  <div className="max-w-md mx-auto border-2 rounded-xl overflow-hidden border-indigo-500/30">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded image" 
                      className="w-full h-auto"
                    />
                  </div>
                )}
                
                <p className="text-slate-300 font-medium">OR</p>
                
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
                  disabled={isGenerating || (!selectedSampleImage && !uploadedImage)}
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
                
                {(selectedSampleImage || uploadedImage) && !isGenerating && extractedText && (
                  <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-white/10">
                    <h4 className="font-medium mb-2">Extracted Content:</h4>
                    <div className="p-4 bg-black/20 rounded-lg text-left">
                      <p className="text-slate-300 font-mono text-sm">
                        {extractedText}
                      </p>
                    </div>
                  </div>
                )}
                
                {(selectedSampleImage || uploadedImage) && !isGenerating && !extractedText && (
                  <div className="mt-8 p-6 bg-slate-800/50 rounded-xl border border-white/10">
                    <h4 className="font-medium mb-2">Extracted Content:</h4>
                    <div className="p-4 bg-black/20 rounded-lg text-left">
                      <p className="text-slate-300 font-mono text-sm">
                        Click "Process Image" to extract text using our AI.
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
