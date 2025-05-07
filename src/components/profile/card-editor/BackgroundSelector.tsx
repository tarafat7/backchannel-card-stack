
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
    const bgValue = customHexColor.startsWith('#') ? customHexColor : `#${customHexColor}`;
    onBackgroundChange(`bg-[${bgValue}]`);
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
