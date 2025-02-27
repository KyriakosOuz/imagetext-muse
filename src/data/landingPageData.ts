
import { LucideIcon } from "lucide-react";

// Importing all icons that we need
import { 
  Image, 
  Text, 
  Sparkles, 
  Upload, 
  Zap, 
  Check, 
  Camera, 
  FileText, 
  Brain, 
  Trophy, 
  Users, 
  Clock 
} from "lucide-react";

// Define feature data types
export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
  demoContent: {
    heading: string;
    processingText: string;
    resultText: string;
    hasSpecialFormat?: boolean;
  };
}

// Define how it works data types
export interface HowItWorksItem {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

// Sample Features Data with richer content
export const featureData: FeatureItem[] = [
  {
    icon: Image,
    title: "AI Image-to-Text Extraction",
    description: "Convert any image into editable, searchable text with our advanced AI recognition technology.",
    demoContent: {
      heading: "// AI Text Extraction Demo",
      processingText: "AI analyzing image...",
      resultText: "Extracted text: \"The quick brown fox jumps over the lazy dog.\"",
      hasSpecialFormat: false
    }
  },
  {
    icon: Text,
    title: "AI-Powered Captions",
    description: "Generate creative descriptions and captions for your images automatically with just one click.",
    demoContent: {
      heading: "// AI Caption Generator",
      processingText: "Generating creative caption...",
      resultText: "\"Sunset views that paint the sky with dreams and possibilities. #NatureInspires\"",
      hasSpecialFormat: false
    }
  },
  {
    icon: Sparkles,
    title: "Auto-Stylized Text",
    description: "Transform extracted text into artistic typography and designs perfect for social media and marketing.",
    demoContent: {
      heading: "// Typography Enhancement",
      processingText: "Applying style templates...",
      resultText: "ADVENTURE AWAITS",
      hasSpecialFormat: true
    }
  },
  {
    icon: Zap,
    title: "AI Scene Recognition",
    description: "Identify objects, people, and places in images with high accuracy to generate context-aware text.",
    demoContent: {
      heading: "// AI Scene Analysis",
      processingText: "Analyzing image elements...",
      resultText: "Detected: Mountain (98%), Sunset (94%), Hikers (87%), Forest (82%)",
      hasSpecialFormat: false
    }
  }
];

export const howItWorksData: HowItWorksItem[] = [
  {
    number: 1,
    title: "Upload Your Image",
    description: "Drag and drop or choose any image file from your device.",
    icon: Upload
  },
  {
    number: 2,
    title: "AI Analysis",
    description: "Our advanced AI extracts and enhances text from your image.",
    icon: Sparkles
  },
  {
    number: 3,
    title: "Receive Results",
    description: "Download or customize the generated text and images.",
    icon: Check
  }
];

// Enhanced user case studies with more specific use cases
export const useCasesData = [
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
export const testimonials = [
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

export const SamplePrompts = [
  "A futuristic cityscape with flying cars and neon lights",
  "A serene mountain landscape at sunset with a lake reflection",
  "An astronaut riding a horse on Mars, digital art",
  "A magical forest with glowing mushrooms and fairies"
];

// Sample images for demo
export const sampleImages = [
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
