
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { backgroundOptions, patternBackgrounds, solidColorBackgrounds } from '../../onboarding/constants';
import BackgroundTabContent from './BackgroundTabContent';

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
}

const BackgroundSelector = ({ selectedBackground, onBackgroundChange }: BackgroundSelectorProps) => {
  const [customHexColor, setCustomHexColor] = useState<string>('#333333');
  const [currentPattern, setCurrentPattern] = useState<string | null>(null);
  const [currentColorOrGradient, setCurrentColorOrGradient] = useState<string | null>(null);
  
  // Extract the current color and pattern on mount and when selectedBackground changes
  useEffect(() => {
    // Extract color if exists
    const colorMatch = selectedBackground.match(/bg-\[(#[0-9a-fA-F]+)\]/);
    if (colorMatch && colorMatch[1]) {
      setCustomHexColor(colorMatch[1]);
      setCurrentColorOrGradient(`bg-[${colorMatch[1]}]`);
    } else {
      // Check if there's a gradient or solid color class
      const nonPatternParts = selectedBackground
        .split(' ')
        .filter(part => !part.includes('bg-[url') && part.startsWith('bg-'))
        .join(' ');
        
      if (nonPatternParts) {
        setCurrentColorOrGradient(nonPatternParts);
      } else {
        setCurrentColorOrGradient(null);
      }
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
    const colorClass = `bg-[${bgValue}]`;
    
    if (currentPattern) {
      onBackgroundChange(`${colorClass} ${currentPattern}`);
    } else {
      onBackgroundChange(colorClass);
    }
    
    setCurrentColorOrGradient(colorClass);
  };

  // Handle selecting a preset background (gradient, solid color or pattern)
  const selectPresetBackground = (bg: string) => {
    // Check if selecting a pattern
    const isPattern = bg.includes('bg-[url');
    
    if (isPattern) {
      // If the same pattern is already selected, remove it
      if (currentPattern === bg) {
        setCurrentPattern(null);
        if (currentColorOrGradient) {
          onBackgroundChange(currentColorOrGradient);
        } else {
          // Default background if no color/gradient is set
          onBackgroundChange('bg-gradient-to-br from-primary to-primary/60');
        }
      } else {
        // Set a new pattern
        setCurrentPattern(bg);
        
        // Combine with existing color/gradient if present
        if (currentColorOrGradient) {
          onBackgroundChange(`${currentColorOrGradient} ${bg}`);
        } else {
          onBackgroundChange(bg);
        }
      }
    } else if (bg.includes('gradient') || solidColors.includes(bg)) {
      // It's a gradient or solid color
      
      // If the same color/gradient is already selected, don't change
      if (currentColorOrGradient === bg) {
        return;
      }
      
      // Save the new color/gradient and REPLACE any existing color/gradient
      setCurrentColorOrGradient(bg);
      
      // For gradients, always remove patterns
      if (bg.includes('gradient')) {
        onBackgroundChange(bg);
        setCurrentPattern(null);
      } else if (currentPattern) {
        // For solid colors with existing pattern
        onBackgroundChange(`${bg} ${currentPattern}`);
      } else {
        // Solid color without pattern
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
