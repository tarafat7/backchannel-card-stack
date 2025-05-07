
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { backgroundOptions, patternBackgrounds, solidColorBackgrounds } from '../../onboarding/constants';
import BackgroundTabContent from './BackgroundTabContent';

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
}

const BackgroundSelector = ({ selectedBackground, onBackgroundChange }: BackgroundSelectorProps) => {
  const [customHexColor, setCustomHexColor] = useState<string>('#333333');
  
  // Group background options
  const gradients = backgroundOptions.filter(bg => bg.includes('gradient'));
  const solidColors = solidColorBackgrounds;
  const patterns = patternBackgrounds;

  // Handle applying the custom color
  const applyCustomColor = () => {
    // Create the proper background value - either just the color or color with pattern
    const bgValue = customHexColor.startsWith('#') ? customHexColor : `#${customHexColor}`;
    
    // Check if we're in the patterns tab and currently have a pattern selected
    const currentPattern = patterns.find(pattern => selectedBackground === pattern);
    
    if (currentPattern) {
      // If a pattern is selected, we need to preserve the pattern class but update the color
      // Format should be: "bg-[#color] pattern-class"
      const patternClass = currentPattern.split(' ')[1]; // Get the pattern class (e.g., bg-dots-pattern)
      onBackgroundChange(`bg-[${bgValue}] ${patternClass}`);
    } else {
      // Just apply the color without any pattern
      onBackgroundChange(`bg-[${bgValue}]`);
    }
  };

  // Handle selecting a preset background
  const selectPresetBackground = (bg: string) => {
    onBackgroundChange(bg);
  };

  return (
    <Tabs defaultValue="gradients" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="gradients">Gradients</TabsTrigger>
        <TabsTrigger value="colors">Colors</TabsTrigger>
        <TabsTrigger value="patterns">Patterns</TabsTrigger>
      </TabsList>
      
      <TabsContent value="gradients">
        <BackgroundTabContent
          options={gradients}
          selectedBackground={selectedBackground}
          onSelect={selectPresetBackground}
          customHexColor={customHexColor}
          setCustomHexColor={setCustomHexColor}
          applyCustomColor={applyCustomColor}
        />
      </TabsContent>
      
      <TabsContent value="colors">
        <BackgroundTabContent
          options={solidColors}
          selectedBackground={selectedBackground}
          onSelect={selectPresetBackground}
          customHexColor={customHexColor}
          setCustomHexColor={setCustomHexColor}
          applyCustomColor={applyCustomColor}
        />
      </TabsContent>
      
      <TabsContent value="patterns">
        <BackgroundTabContent
          options={patterns}
          selectedBackground={selectedBackground}
          onSelect={selectPresetBackground}
          customHexColor={customHexColor}
          setCustomHexColor={setCustomHexColor}
          applyCustomColor={applyCustomColor}
        />
      </TabsContent>
    </Tabs>
  );
};

export default BackgroundSelector;
