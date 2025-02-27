
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ProcessAnimationProps {
  type: "upload" | "process" | "download";
  isActive: boolean;
}

const ProcessAnimation: React.FC<ProcessAnimationProps> = ({ type, isActive }) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive]);
  
  // Animations for file upload
  if (type === "upload") {
    return (
      <div className="h-36 bg-slate-800/50 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center">
            <motion.div
              animate={{
                y: animate ? [0, -40] : 0,
                opacity: animate ? [1, 0] : 1
              }}
              transition={{ duration: 1, repeat: animate ? 1 : 0, repeatType: "reverse" }}
              className="w-12 h-12 bg-indigo-500 rounded"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-white p-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
              </svg>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500"
          animate={{
            scaleX: animate ? [0, 1] : 0,
            opacity: animate ? [0, 1] : 0
          }}
          transition={{ duration: 1.5 }}
        />
      </div>
    );
  }
  
  // Animations for AI Processing
  if (type === "process") {
    return (
      <div className="h-36 bg-slate-800/50 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-indigo-500/20"
              animate={{
                scale: animate ? [1, 1.5, 2, 2.5] : 1,
                opacity: animate ? [1, 0.8, 0.6, 0] : 0
              }}
              transition={{ duration: 2, repeat: animate ? Infinity : 0 }}
            />
            <motion.div
              className="relative w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
              animate={{
                rotate: animate ? [0, 360] : 0
              }}
              transition={{ duration: 3, repeat: animate ? Infinity : 0, ease: "linear" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
          </div>
        </div>
        {animate && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-indigo-500"
                animate={{
                  scaleX: [0, 0.3, 0.6, 0.8, 1]
                }}
                transition={{ duration: 2, times: [0, 0.2, 0.5, 0.8, 1] }}
              />
            </div>
            <motion.div
              className="text-xs text-slate-400 text-center mt-1"
              animate={{
                opacity: [0, 1]
              }}
              transition={{ delay: 0.5 }}
            >
              Processing...
            </motion.div>
          </div>
        )}
      </div>
    );
  }
  
  // Animations for Download/Edit
  if (type === "download") {
    return (
      <div className="h-36 bg-slate-800/50 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-2 text-center">
            <motion.div
              className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded flex items-center justify-center"
              animate={{
                y: animate ? [0, -10, 0] : 0,
                scale: animate ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 1, repeat: animate ? 1 : 0 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </motion.div>
            
            {animate && (
              <motion.div
                className="flex justify-center space-x-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs">
                  Copy
                </div>
                <div className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                  Download
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};

export default ProcessAnimation;
