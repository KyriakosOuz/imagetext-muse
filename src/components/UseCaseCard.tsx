
import { cn } from "@/lib/utils";

interface UseCaseCardProps {
  title: string;
  description: string;
  image: string;
  delay?: number;
}

const UseCaseCard = ({ title, description, image, delay = 0 }: UseCaseCardProps) => {
  return (
    <div 
      className="relative group overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-80"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-slate-300">{description}</p>
      </div>
    </div>
  );
};

export default UseCaseCard;
