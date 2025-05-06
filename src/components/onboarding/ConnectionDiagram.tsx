
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
      
      {/* Backchannel logo */}
      <div className="flex items-center justify-center w-8 h-8">
        <img 
          src="/lovable-uploads/07d994b2-fb5b-4579-ad95-97303ba44ebc.png" 
          alt="Backchannel Logo" 
          className="w-full h-full object-contain" 
        />
      </div>
    </div>
  );
};

export default ConnectionDiagram;
