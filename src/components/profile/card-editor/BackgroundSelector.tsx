
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { backgroundOptions, patternBackgrounds, solidColorBackgrounds } from '../../onboarding/constants';
import BackgroundTabPanel from '../../onboarding/card-designer/BackgroundTabPanel';

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ 
  selectedBackground, 
  onBackgroundChange 
}) => {
  const [customHexColor, setCustomHexColor] = useState<string>('#333333');
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  
  // Extract the current color on mount and when selectedBackground changes
  useEffect(() => {
    const colorMatch = selectedBackground.match(/bg-\[(#[0-9a-fA-F]+)\]/);
    if (colorMatch && colorMatch[1]) {
      setCustomHexColor(colorMatch[1]);
    }
  }, [selectedBackground]);
  
  // Handle custom hex color input
  const handleHexColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomHexColor(e.target.value);
  };
  
  // Handle color picker change
  const handleColorPickerChange = (color: string) => {
    setCustomHexColor(color);
  };
  
  // Apply custom color to card background
  const applyCustomColor = () => {
    onBackgroundChange(`bg-[${customHexColor}]`);
  };
  
  // Handle background selection
  const selectPresetBackground = (bg: string) => {
    onBackgroundChange(bg);
  };
  
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Card Background</label>
      
      <Tabs defaultValue="colors" className="mt-2">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="gradients">Gradients</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="colors">
          <BackgroundTabPanel 
            options={solidColorBackgrounds}
            selectedBackground={selectedBackground}
            selectPresetBackground={selectPresetBackground}
            customHexColor={customHexColor}
            handleHexColorChange={handleHexColorChange}
            handleColorPickerChange={handleColorPickerChange}
            applyCustomColor={applyCustomColor}
            showColorPicker={showColorPicker}
            setShowColorPicker={setShowColorPicker}
          />
        </TabsContent>
        
        <TabsContent value="gradients">
          <BackgroundTabPanel 
            options={backgroundOptions}
            selectedBackground={selectedBackground}
            selectPresetBackground={selectPresetBackground}
            customHexColor={customHexColor}
            handleHexColorChange={handleHexColorChange}
            handleColorPickerChange={handleColorPickerChange}
            applyCustomColor={applyCustomColor}
            showColorPicker={showColorPicker}
            setShowColorPicker={setShowColorPicker}
          />
        </TabsContent>
        
        <TabsContent value="patterns">
          <BackgroundTabPanel 
            options={patternBackgrounds}
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
