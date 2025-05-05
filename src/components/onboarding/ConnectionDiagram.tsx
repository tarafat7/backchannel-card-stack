
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
      <div className="flex items-center justify-center w-14 h-14">
        <img 
          src="/lovable-uploads/740d2d31-3a90-48aa-a97b-bd31e98435d4.png" 
          alt="Backchannel Logo" 
          className="w-full h-full object-contain" 
        />
      </div>
    </div>
  );
};

export default ConnectionDiagram;
