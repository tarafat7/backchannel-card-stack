
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface SolidColorTabProps {
  colorOptions: string[];
  selectedBackground: string;
  setSelectedBackground: (bg: string) => void;
}

const SolidColorTab: React.FC<SolidColorTabProps> = ({ 
  colorOptions, 
  selectedBackground, 
  setSelectedBackground 
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-5 gap-2">
          {colorOptions.map((color, index) => (
            <button
              key={index}
              className={`w-full aspect-square rounded-md transition-all hover:scale-105`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedBackground(color)}
              aria-label={`Color ${color}`}
            >
              {selectedBackground === color && (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SolidColorTab;
