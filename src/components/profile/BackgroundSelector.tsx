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
  
  // Group background options
  const gradients = backgroundOptions.filter(bg => bg.includes('gradient'));
  const solidColors = solidColorBackgrounds;
  const patterns = patternBackgrounds;

  // Handle applying the custom color
  const applyCustomColor = () => {
    // Create background value with both color and pattern if applicable
    const bgValue = customHexColor.startsWith('#') ? customHexColor : `#${customHexColor}`;
    
    if (currentPattern) {
      onBackgroundChange(`bg-[${bgValue}] ${currentPattern}`);
    } else {
      onBackgroundChange(`bg-[${bgValue}]`);
    }
  };

  // Handle selecting a preset background (gradient, solid color or pattern)
  const selectPresetBackground = (bg: string) => {
    console.log("Setting background to:", bg);
    
    // Check if selecting a pattern
    const isPattern = bg.includes('bg-[url');
    
    if (isPattern) {
      // Setting a pattern - preserve existing color if present
      setCurrentPattern(bg);
      
      // Check if there's already a color in the selection
      const colorMatch = selectedBackground.match(/bg-\[(#[0-9a-fA-F]+)\]/);
      if (colorMatch && colorMatch[1]) {
        onBackgroundChange(`bg-[${colorMatch[1]}] ${bg}`);
      } else {
        // If there's a gradient or solid color that's not a custom hex
        const isGradientOrSolid = !selectedBackground.includes('bg-[url') && 
                                 !selectedBackground.includes('bg-[#');
        
        if (isGradientOrSolid) {
          // Keep the existing background style for gradient/solid and add pattern
          onBackgroundChange(`${selectedBackground} ${bg}`);
        } else {
          onBackgroundChange(bg);
        }
      }
    } else if (bg.includes('gradient') || solidColors.includes(bg)) {
      // Setting a gradient or solid color - replace existing gradient/color but keep pattern
      
      // If there's already a pattern, combine with it
      if (currentPattern) {
        onBackgroundChange(`${bg} ${currentPattern}`);
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
