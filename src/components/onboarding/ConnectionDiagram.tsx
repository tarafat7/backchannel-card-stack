
import React from 'react';
import { Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

const ConnectionDiagram = () => {
  return (
    <div className="flex items-center justify-center mb-8 mt-2">
      {/* LinkedIn side */}
      <div className="flex items-center justify-center w-12 h-12 bg-[#0077B5] rounded-full">
        <Linkedin className="w-6 h-6 text-white" />
      </div>
      
      {/* Connection line */}
      <div className="w-24 h-0.5 bg-white/20 relative mx-3">
        <div className="absolute top-0 left-0 w-full h-full bg-primary origin-left animate-pulse-grow" />
      </div>
      
      {/* Backchannel logo - Using direct SVG instead of image for faster load */}
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-black/20 p-2">
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 256 256" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <path d="M128 32C74.98 32 32 74.98 32 128C32 181.02 74.98 224 128 224C181.02 224 224 181.02 224 128C224 74.98 181.02 32 128 32ZM128 56C168.35 56 200 87.65 200 128C200 168.35 168.35 200 128 200C87.65 200 56 168.35 56 128C56 87.65 87.65 56 128 56Z" fill="currentColor"/>
          <path d="M128 80C102.65 80 82 100.65 82 126C82 151.35 102.65 172 128 172C153.35 172 174 151.35 174 126C174 100.65 153.35 80 128 80Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

export default ConnectionDiagram;
