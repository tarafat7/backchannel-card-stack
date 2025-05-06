
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [isUsingCustomColor, setIsUsingCustomColor] = useState<boolean>(false);

  // Handle custom hex color input
  const handleHexColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomHexColor(value);
    
    // Only update background if using custom color
    if (isUsingCustomColor) {
      setSelectedBackground(`bg-[${value}]`);
    }
  };

  // Handle applying the custom color
  const applyCustomColor = () => {
    setIsUsingCustomColor(true);
    setSelectedBackground(`bg-[${customHexColor}]`);
  };

  // Handle selecting a preset background
  const selectPresetBackground = (bg: string) => {
    setIsUsingCustomColor(false);
    setSelectedBackground(bg);
  };

  // Group background options
  const gradients = backgroundOptions.filter(bg => bg.includes('gradient'));
  const solidColors = backgroundOptions.filter(bg => bg.includes('bg-[') && !bg.includes('pattern'));
  const patterns = backgroundOptions.filter(bg => bg.includes('pattern'));

  return (
    <Tabs defaultValue="gradients" className="w-full">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="gradients">Gradients</TabsTrigger>
        <TabsTrigger value="colors">Colors</TabsTrigger>
        <TabsTrigger value="patterns">Patterns</TabsTrigger>
        <TabsTrigger value="custom">Custom</TabsTrigger>
      </TabsList>
      
      <TabsContent value="gradients" className="space-y-4">
        <div className="grid grid-cols-4 gap-2">
          {gradients.map((bg, index) => (
            <button
              key={index}
              className={`w-full aspect-square rounded-md ${bg} ${selectedBackground === bg ? 'ring-2 ring-primary' : ''}`}
              onClick={() => selectPresetBackground(bg)}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="colors" className="space-y-4">
        <div className="grid grid-cols-4 gap-2">
          {solidColors.map((bg, index) => (
            <button
              key={index}
              className={`w-full aspect-square rounded-md ${bg} ${selectedBackground === bg ? 'ring-2 ring-primary' : ''}`}
              onClick={() => selectPresetBackground(bg)}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="patterns" className="space-y-4">
        <div className="grid grid-cols-4 gap-2">
          {patterns.map((bg, index) => (
            <button
              key={index}
              className={`w-full aspect-square rounded-md ${bg} ${selectedBackground === bg ? 'ring-2 ring-primary' : ''}`}
              onClick={() => selectPresetBackground(bg)}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="custom" className="space-y-4">
        <div className="flex gap-2 items-center">
          <Input 
            type="text"
            value={customHexColor}
            onChange={handleHexColorChange}
            placeholder="#000000"
            className="bg-secondary/50 backdrop-blur-sm border border-white/10"
          />
          <div 
            className="w-10 h-10 rounded-md" 
            style={{ backgroundColor: customHexColor }}
          />
          <Button 
            onClick={applyCustomColor}
            variant="secondary"
            size="sm"
          >
            Apply
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Enter a hex color code (e.g., #FF5733)</p>
      </TabsContent>
    </Tabs>
  );
};

export default BackgroundSelector;
