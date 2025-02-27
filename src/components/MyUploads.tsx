
import React, { useState } from "react";
import { Clock, RotateCw, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface UploadedImage {
  id: string;
  url: string;
  name: string;
  date: string;
  processingType: string;
}

interface MyUploadsProps {
  onSelectImage?: (image: UploadedImage) => void;
}

const DEMO_UPLOADS: UploadedImage[] = [
  {
    id: "img1",
    url: "https://images.unsplash.com/photo-1527168027773-0cc890c4f42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    name: "Handwritten Note",
    date: "Just now",
    processingType: "Text Extraction"
  },
  {
    id: "img2",
    url: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    name: "Book Page",
    date: "5 minutes ago",
    processingType: "AI Caption"
  }
];

const MyUploads: React.FC<MyUploadsProps> = ({ onSelectImage }) => {
  const [uploads, setUploads] = useState<UploadedImage[]>(DEMO_UPLOADS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploads(uploads.filter(upload => upload.id !== id));
    toast.success("Image deleted successfully");
  };

  const handleReprocessImage = (image: UploadedImage, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info(`Reprocessing ${image.name} with AI...`);
    // In a real implementation, this would trigger the AI processing again
  };

  const handleSelectImage = (image: UploadedImage) => {
    setSelectedId(image.id);
    if (onSelectImage) {
      onSelectImage(image);
    }
  };

  if (uploads.length === 0) {
    return (
      <div className="text-center py-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
        <div className="mb-4 flex justify-center">
          <div className="p-3 bg-white/10 rounded-full">
            <Clock size={24} className="text-slate-400" />
          </div>
        </div>
        <h3 className="text-lg font-medium mb-2">No recent uploads</h3>
        <p className="text-slate-400 mb-4">Your recently processed images will appear here</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/5 hover:bg-white/10 border-white/10"
        >
          Upload an Image
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h3 className="font-medium">Recent Uploads</h3>
        <Button 
          variant="link" 
          size="sm" 
          className="text-indigo-400 hover:text-indigo-300"
        >
          View All
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
      
      <div className="divide-y divide-white/5">
        {uploads.map((image) => (
          <div 
            key={image.id}
            onClick={() => handleSelectImage(image)}
            className={cn(
              "p-4 flex items-center gap-4 hover:bg-white/5 cursor-pointer transition-colors",
              selectedId === image.id && "bg-indigo-900/20"
            )}
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
              <img 
                src={image.url} 
                alt={image.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="flex-grow min-w-0">
              <h4 className="font-medium text-white truncate">{image.name}</h4>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{image.date}</span>
                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                <span>{image.processingType}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={(e) => handleReprocessImage(image, e)} 
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                title="Reprocess with AI"
              >
                <RotateCw size={16} />
              </button>
              <button 
                onClick={(e) => handleDeleteImage(image.id, e)} 
                className="p-2 text-slate-400 hover:text-red-400 rounded-full hover:bg-white/10 transition-colors"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
        <div className="border-t border-dashed border-white/10 pt-4 text-center">
          <p className="text-sm text-indigo-400 mb-2">
            Upgrade to Pro to save unlimited uploads
          </p>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
          >
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyUploads;
