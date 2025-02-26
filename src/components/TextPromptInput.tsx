
import React from 'react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TextPromptInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const TextPromptInput = React.forwardRef<HTMLInputElement, TextPromptInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full max-w-2xl">
        <Input
          ref={ref}
          className={cn(
            "h-14 px-6 bg-white/5 backdrop-blur-xl border border-slate-200/10 rounded-2xl shadow-lg transition-all duration-300 focus:ring-2 focus:ring-slate-200/20 focus:border-slate-200/20 placeholder:text-slate-400",
            className
          )}
          {...props}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-rose-100/20 via-sky-100/20 to-violet-100/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl blur-xl" />
      </div>
    );
  }
);

TextPromptInput.displayName = "TextPromptInput";

export default TextPromptInput;
