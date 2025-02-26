
import { toast } from "sonner";

export interface GenerateImageParams {
  positivePrompt: string;
  model?: string;
  numberResults?: number;
  outputFormat?: string;
  CFGScale?: number;
  scheduler?: string;
  strength?: number;
  promptWeighting?: "compel" | "sdEmbeds";
  seed?: number | null;
  lora?: string[];
}

export interface GeneratedImage {
  imageURL: string;
  positivePrompt: string;
  seed: number;
  NSFWContent: boolean;
}

export class RunwareService {
  constructor() {}

  async generateImage(params: GenerateImageParams): Promise<GeneratedImage> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return mock data
    return {
      imageURL: `https://source.unsplash.com/random/1024x1024/?${encodeURIComponent(params.positivePrompt)}`,
      positivePrompt: params.positivePrompt,
      seed: Math.floor(Math.random() * 1000000),
      NSFWContent: false
    };
  }
}
