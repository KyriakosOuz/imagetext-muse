
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import TextPromptInput from "@/components/TextPromptInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import ImageCard from "@/components/ImageCard";
import { RunwareService } from "../services/runware";

interface GeneratedImage {
  imageURL: string;
  positivePrompt: string;
}

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [runwareService, setRunwareService] = useState<RunwareService | null>(null);

  const initializeRunware = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter your Runware API key");
      return false;
    }
    if (!runwareService) {
      setRunwareService(new RunwareService(apiKey));
    }
    return true;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }

    if (!initializeRunware()) {
      return;
    }

    setIsGenerating(true);
    try {
      const result = await runwareService!.generateImage({
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
      setRunwareService(null); // Reset service on error
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            Text to Image Generator
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Transform your ideas into stunning visuals with AI-powered image generation
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
            <Input
              type="password"
              placeholder="Enter your Runware API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-white/10 border-white/10 text-white placeholder:text-white/50"
            />
            <div className="flex w-full gap-4">
              <TextPromptInput
                placeholder="Describe the image you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full"
              />
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-8 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-300"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>

          {isGenerating && <LoadingSpinner />}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedImages.map((image, index) => (
              <ImageCard
                key={index}
                src={image.imageURL}
                alt={image.positivePrompt}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
