
import React from 'react';
import { ChevronUp } from 'lucide-react';

const ExpandIndicator: React.FC = () => {
  return (
    <div className="absolute -bottom-4 left-0 right-0 flex justify-center">
      <div className="bg-primary/20 backdrop-blur-sm p-1 rounded-full">
        <ChevronUp className="w-4 h-4 text-primary" />
      </div>
    </div>
  );
};

export default ExpandIndicator;
