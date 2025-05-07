import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { backgroundOptions, patternBackgrounds, solidColorBackgrounds } from '../onboarding/constants';
import BackgroundTabContent from './BackgroundTabContent';

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
}

const BackgroundSelector = ({ selectedBackground, onBackgroundChange }: BackgroundSelectorProps) => {
  const [customHexColor, setCustomHexColor] = useState<string>('#333333');
  const [currentPattern, setCurrentPattern] = useState<string | null>(null);
  
  // Extract the current color and pattern on mount and when selectedBackground changes
  useEffect(() => {
    // Extract color if exists
    const colorMatch = selectedBackground.match(/bg-\[(.*?)\]/);
    if (colorMatch && colorMatch[1]) {
      setCustomHexColor(colorMatch[1]);
    }
    
    // Extract pattern if exists
    const patternClass = selectedBackground.split(' ').find(cls => cls.includes('pattern'));
    if (patternClass) {
      setCurrentPattern(patternClass);
    } else {
      setCurrentPattern(null);
    }
  }, [selectedBackground]);
  
  // Group background options
  const gradients = backgroundOptions.filter(bg => bg.includes('gradient'));
  const solidColors = solidColorBackgrounds;
  const patterns = patternBackgrounds;

  // Handle applying the custom color
  const applyCustomColor = () => {
    // Create the proper background value with both color and pattern if applicable
    const bgValue = customHexColor.startsWith('#') ? customHexColor : `#${customHexColor}`;
    
    if (currentPattern) {
      onBackgroundChange(`bg-[${bgValue}] ${currentPattern}`);
    } else {
      onBackgroundChange(`bg-[${bgValue}]`);
    }
  };

  // Handle selecting a preset background
  const selectPresetBackground = (bg: string) => {
    // If selecting a gradient or solid color, remove the pattern
    if (!bg.includes('pattern')) {
      onBackgroundChange(bg);
      setCurrentPattern(null);
      return;
    }
    
    // If selecting a pattern
    const patternClass = bg.split(' ').find(cls => cls.includes('pattern'));
    if (patternClass) {
      setCurrentPattern(patternClass);
      
      // Keep the current color if one exists
      const colorMatch = selectedBackground.match(/bg-\[(.*?)\]/);
      if (colorMatch && colorMatch[1]) {
        onBackgroundChange(`bg-[${colorMatch[1]}] ${patternClass}`);
      } else {
        onBackgroundChange(bg);
      }
    }
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
