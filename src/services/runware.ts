
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
  private mockImageCategories = [
    'ai', 'digital-art', 'fantasy', 'concept-art',
    'illustration', '3d-rendering', 'abstract'
  ];

  constructor() {}

  async generateImage(params: GenerateImageParams): Promise<GeneratedImage> {
    // Simulate API delay (randomized between 1-3 seconds)
    const delay = 1000 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Generate a random seed
    const seed = Math.floor(Math.random() * 1000000);
    
    // Pick a random art category to better simulate AI-generated content
    const randomCategory = this.mockImageCategories[
      Math.floor(Math.random() * this.mockImageCategories.length)
    ];

    // Use a combination of the prompt and art category for more relevant results
    const searchQuery = `${params.positivePrompt},${randomCategory}`;
    
    // Add a random size parameter to get different images
    const size = "1024x1024";
    const timestamp = Date.now(); // Add timestamp to prevent caching

    return {
      imageURL: `https://source.unsplash.com/random/${size}/?${encodeURIComponent(searchQuery)}&t=${timestamp}`,
      positivePrompt: params.positivePrompt,
      seed: seed,
      NSFWContent: false
    };
  }
}
