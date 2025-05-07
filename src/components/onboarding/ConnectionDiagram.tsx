
import React from 'react';
import { Linkedin } from 'lucide-react';

const ConnectionDiagram = () => {
  return (
    <div className="flex items-center justify-center mb-8 mt-2">
      {/* LinkedIn side */}
      <div className="flex items-center justify-center w-10 h-10 bg-[#0077B5] rounded-full">
        <Linkedin className="w-5 h-5 text-white" />
      </div>
      
      {/* Connection line */}
      <div className="w-20 h-0.5 bg-white/20 relative mx-3">
        <div className="absolute top-0 left-0 w-full h-full bg-primary origin-left animate-pulse-grow" />
      </div>
      
      {/* Backchannel logo */}
      <div className="flex items-center justify-center w-11 h-11 rounded-full bg-black/20 p-2">
        <img 
          src="/lovable-uploads/b2b642ce-8191-4ca4-b680-140d710f2fe1.png" 
          alt="Backchannel Logo"
          className="w-7 h-7"
        />
      </div>
    </div>
  );
};

export default ConnectionDiagram;
