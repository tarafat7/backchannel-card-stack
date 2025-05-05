
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface GradientTabProps {
  gradientOptions: string[];
  selectedGradient: string;
  applyGradient: (gradient: string) => void;
}

const GradientTab: React.FC<GradientTabProps> = ({ 
  gradientOptions, 
  selectedGradient, 
  applyGradient 
}) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {gradientOptions.map((gradient, index) => (
            <button
              key={index}
              className={`w-full aspect-video rounded-md transition-all hover:scale-105 ${selectedGradient === gradient ? 'ring-2 ring-brand-green' : ''}`}
              style={{ background: gradient }}
              onClick={() => applyGradient(gradient)}
              aria-label={`Gradient ${index + 1}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GradientTab;
