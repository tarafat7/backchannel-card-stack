
import React, { useState } from 'react';
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
    setSelectedBackground(`bg-[${bgValue}]`);
    setShowColorPicker(false);
  };

  // Handle selecting a preset background
  const selectPresetBackground = (bg: string) => {
    console.log("Setting background to:", bg);
    setSelectedBackground(bg);
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
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundSelector;
