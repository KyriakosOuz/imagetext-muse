
import { cn } from "@/lib/utils";

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageCard = ({ src, alt, className }: ImageCardProps) => {
  return (
    <div className={cn(
      "relative group overflow-hidden rounded-2xl bg-black/5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl",
      className
    )}>
      <div className="relative aspect-square overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ImageCard;
