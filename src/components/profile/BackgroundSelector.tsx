
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { backgroundOptions, patternBackgrounds, solidColorBackgrounds } from '../onboarding/constants';
import BackgroundTabContent from './BackgroundTabContent';

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ selectedBackground, onBackgroundChange }) => {
  const [customHexColor, setCustomHexColor] = useState<string>('#333333');
  const [currentPattern, setCurrentPattern] = useState<string | null>(null);
  
  // Extract the current color and pattern on mount and when selectedBackground changes
  useEffect(() => {
    // Extract color if exists
    const colorMatch = selectedBackground.match(/bg-\[(#[0-9a-fA-F]+)\]/);
    if (colorMatch && colorMatch[1]) {
      setCustomHexColor(colorMatch[1]);
    }
    
    // Extract pattern if exists
    const patternMatch = selectedBackground.match(/bg-\[url\('([^']+)'\)\]/);
    if (patternMatch) {
      setCurrentPattern(`bg-[url('${patternMatch[1]}')]`);
    } else {
      setCurrentPattern(null);
    }
  }, [selectedBackground]);
  
  // Apply custom color to card background
  const applyCustomColor = () => {
    onBackgroundChange(`bg-[${customHexColor}]`);
  };
  
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Background</label>
      
      <Tabs defaultValue="colors" className="mt-2">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="gradients">Gradients</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors">
          <BackgroundTabContent 
            options={solidColorBackgrounds}
            selectedBackground={selectedBackground}
            onSelect={onBackgroundChange}
            customHexColor={customHexColor}
            setCustomHexColor={setCustomHexColor}
            applyCustomColor={applyCustomColor}
          />
        </TabsContent>
        
        <TabsContent value="gradients">
          <BackgroundTabContent 
            options={backgroundOptions}
            selectedBackground={selectedBackground}
            onSelect={onBackgroundChange}
            customHexColor={customHexColor}
            setCustomHexColor={setCustomHexColor}
            applyCustomColor={applyCustomColor}
          />
        </TabsContent>
        
        <TabsContent value="patterns">
          <BackgroundTabContent 
            options={patternBackgrounds}
            selectedBackground={selectedBackground}
            onSelect={onBackgroundChange}
            customHexColor={customHexColor}
            setCustomHexColor={setCustomHexColor}
            applyCustomColor={applyCustomColor}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundSelector;
