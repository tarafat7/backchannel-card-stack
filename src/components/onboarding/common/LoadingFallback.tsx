
import React from 'react';
import { Loader } from 'lucide-react';

const LoadingFallback: React.FC = () => (
  <div className="flex justify-center items-center py-8">
    <Loader className="w-6 h-6 text-primary animate-spin" />
  </div>
);

export default LoadingFallback;
