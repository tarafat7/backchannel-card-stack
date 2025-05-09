
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { backgroundOptions, patternBackgrounds, solidColorBackgrounds } from '../constants';
import BackgroundTabPanel from './BackgroundTabPanel';

interface BackgroundSelectorProps {
  selectedBackground: string;
  setSelectedBackground: (bg: string) => void;
  backgroundOptions: string[];
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({
  selectedBackground,
  setSelectedBackground,
  backgroundOptions,
}) => {
  const [customHexColor, setCustomHexColor] = useState<string>('#333333');
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [currentPattern, setCurrentPattern] = useState<string | null>(null);
  const [currentColorOrGradient, setCurrentColorOrGradient] = useState<string | null>(null);
  
  // Extract the current color/gradient and pattern on component mount and when selectedBackground changes
  useEffect(() => {
    // Extract color if it's a custom hex
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

  // Handle custom hex color input
  const handleHexColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomHexColor(value);
  };

  // Handle color picker change
  const handleColorPickerChange = (color: string) => {
    setCustomHexColor(color);
  };

  // Handle applying the custom color
  const applyCustomColor = () => {
    const bgValue = customHexColor.startsWith('#') ? customHexColor : `#${customHexColor}`;
    const colorClass = `bg-[${bgValue}]`;
    
    // Combine with pattern if one exists
    if (currentPattern) {
      setSelectedBackground(`${colorClass} ${currentPattern}`);
    } else {
      setSelectedBackground(colorClass);
    }
    
    setCurrentColorOrGradient(colorClass);
    setShowColorPicker(false);
  };

  // Handle selecting a preset background (gradient, solid color or pattern)
  const selectPresetBackground = (bg: string) => {
    console.log("Setting background to:", bg);
    
    // Check if selecting a pattern
    const isPattern = bg.includes('bg-[url');
    
    if (isPattern) {
      // Save the pattern
      setCurrentPattern(bg);
      
      // Combine with existing color/gradient if present
      if (currentColorOrGradient) {
        setSelectedBackground(`${currentColorOrGradient} ${bg}`);
      } else {
        setSelectedBackground(bg);
      }
    } else {
      // It's a gradient or solid color
      // Save it
      setCurrentColorOrGradient(bg);
      
      // Combine with existing pattern if present
      if (currentPattern) {
        setSelectedBackground(`${bg} ${currentPattern}`);
      } else {
        setSelectedBackground(bg);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Background Style</h3>
      
      <Tabs defaultValue="gradients" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="gradients">Gradients</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gradients">
          <BackgroundTabPanel
            options={gradients}
            selectedBackground={selectedBackground}
            selectPresetBackground={selectPresetBackground}
            customHexColor={customHexColor}
            handleHexColorChange={handleHexColorChange}
            handleColorPickerChange={handleColorPickerChange}
            applyCustomColor={applyCustomColor}
            showColorPicker={showColorPicker}
            setShowColorPicker={setShowColorPicker}
            isPatternTab={false}
          />
        </TabsContent>
        
        <TabsContent value="colors">
          <BackgroundTabPanel
            options={solidColors}
            selectedBackground={selectedBackground}
            selectPresetBackground={selectPresetBackground}
            customHexColor={customHexColor}
            handleHexColorChange={handleHexColorChange}
            handleColorPickerChange={handleColorPickerChange}
            applyCustomColor={applyCustomColor}
            showColorPicker={showColorPicker}
            setShowColorPicker={setShowColorPicker}
            isPatternTab={false}
          />
        </TabsContent>
        
        <TabsContent value="patterns">
          <BackgroundTabPanel
            options={patterns}
            selectedBackground={selectedBackground}
            selectPresetBackground={selectPresetBackground}
            customHexColor={customHexColor}
            handleHexColorChange={handleHexColorChange}
            handleColorPickerChange={handleColorPickerChange}
            applyCustomColor={applyCustomColor}
            showColorPicker={showColorPicker}
            setShowColorPicker={setShowColorPicker}
            isPatternTab={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundSelector;
