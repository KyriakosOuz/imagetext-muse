
import React, { useState, useEffect } from "react";
import { Upload, RotateCw, Sparkles, Copy, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface HeroAIDemoProps {
  onSampleSelect?: (sample: string) => void;
}

const SAMPLE_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1527168027773-0cc890c4f42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    name: "Handwritten Note"
  },
  {
    url: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    name: "Book Page"
  },
  {
    url: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    name: "Product Label"
  }
];

const HeroAIDemo: React.FC<HeroAIDemoProps> = ({ onSampleSelect }) => {
  const [processingStage, setProcessingStage] = useState<string>("");
  const [processingProgress, setProcessingProgress] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // Simulate processing when an image is selected
  useEffect(() => {
    if (selectedImage && !isProcessing) {
      simulateProcessing();
    }
  }, [selectedImage]);

  const simulateProcessing = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setExtractedText("");
    
    // Simulate different processing stages with progress updates
    const stages = [
      { stage: "Analyzing image...", progress: 20 },
      { stage: "Detecting text regions...", progress: 40 },
      { stage: "Recognizing characters...", progress: 60 },
      { stage: "Enhancing text...", progress: 80 },
      { stage: "Finalizing results...", progress: 100 }
    ];
    
    // Simulate the progression through stages
    let stageIndex = 0;
    const interval = setInterval(() => {
      if (stageIndex < stages.length) {
        setProcessingStage(stages[stageIndex].stage);
        setProcessingProgress(stages[stageIndex].progress);
        stageIndex++;
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        generateDemoText();
      }
    }, 800);
    
    return () => clearInterval(interval);
  };

  const generateDemoText = () => {
    // Generate sample extracted text based on the selected image
    const demoTexts: Record<string, string> = {
      "Handwritten Note": "Dear Sarah,\n\nI wanted to thank you for the wonderful gift. It really made my day special. Looking forward to seeing you next weekend.\n\nBest wishes,\nEmily",
      "Book Page": "The ship lay in the bay at dusk, its silhouette a stark contrast against the fading light. Captain James surveyed the horizon, knowing the storm would arrive by morning. The crew worked silently, preparing for the long night ahead.",
      "Product Label": "ORGANIC HONEY\nPure Raw Unfiltered\nNet Wt. 16 oz (454g)\n\nIngredients: 100% Pure Organic Honey\nStore at room temperature\nProduced and packed in California\nBest before: See bottom of jar"
    };
    
    // Find which sample was selected
    const selectedSample = SAMPLE_IMAGES.find(sample => sample.url === selectedImage);
    if (selectedSample) {
      setExtractedText(demoTexts[selectedSample.name] || "Text extracted successfully from the image.");
    } else if (uploadedImage) {
      // For user uploaded images
      setExtractedText("This is the extracted text from your uploaded image. The AI has processed the content and converted it to editable format. You can now copy, edit, or download this text.");
    }
    
    toast.success("Text extracted successfully!");
  };

  const handleSampleClick = (sampleUrl: string) => {
    setSelectedImage(sampleUrl);
    setUploadedImage(null);
    if (onSampleSelect) {
      onSampleSelect(sampleUrl);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        setSelectedImage(null);
        simulateProcessing();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyText = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText);
      toast.success("Text copied to clipboard!");
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setUploadedImage(null);
    setExtractedText("");
    setProcessingProgress(0);
    setProcessingStage("");
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      <div className="bg-slate-800/60 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm text-slate-400 flex-1 text-center">AI Image-to-Text Demo</div>
      </div>
      
      <div className="p-6">
        {/* If no image is selected or processed yet */}
        {!selectedImage && !uploadedImage && !extractedText && (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500/50 transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <Upload size={48} className="text-slate-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload an image</h3>
                <p className="text-slate-400 mb-4">Drag & drop or click to browse</p>
                <Button variant="outline" size="sm" className="bg-white/5">
                  Select Image
                </Button>
              </label>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Or try with a sample</h3>
              <div className="grid grid-cols-3 gap-3">
                {SAMPLE_IMAGES.map((sample, index) => (
                  <div 
                    key={index} 
                    className="overflow-hidden rounded-lg border border-white/10 cursor-pointer hover:border-indigo-500/50 transition-all hover:shadow-md hover:shadow-indigo-500/20"
                    onClick={() => handleSampleClick(sample.url)}
                  >
                    <img 
                      src={sample.url} 
                      alt={sample.name} 
                      className="w-full h-32 object-cover" 
                    />
                    <div className="p-2 text-center text-sm text-slate-300 bg-black/30">
                      {sample.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Display uploaded or selected image with processing indicator */}
        {(selectedImage || uploadedImage) && (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={uploadedImage || selectedImage || ""}
                alt="Selected image"
                className="w-full h-64 object-contain rounded-lg border border-white/10"
              />
              
              {isProcessing && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-lg">
                  <Sparkles className="text-indigo-400 h-8 w-8 animate-pulse mb-4" />
                  <p className="text-white mb-3">{processingStage}</p>
                  <div className="w-3/4 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Display extracted text result */}
            {extractedText && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Extracted Text</h3>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/5 flex items-center gap-1"
                      onClick={handleCopyText}
                    >
                      <Copy size={14} />
                      Copy
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/5 flex items-center gap-1"
                    >
                      <Download size={14} />
                      Download
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-white/5 flex items-center gap-1"
                      onClick={handleReset}
                    >
                      <RotateCw size={14} />
                      New
                    </Button>
                  </div>
                </div>
                
                <div className="bg-slate-800/50 border border-white/10 rounded-lg p-4 whitespace-pre-line text-slate-200 font-mono text-sm">
                  {extractedText}
                </div>
                
                <div className="flex justify-center">
                  <Button variant="default" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
                    <FileText className="mr-2 h-4 w-4" />
                    Apply AI Enhancement
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroAIDemo;
