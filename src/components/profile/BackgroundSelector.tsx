
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Palette } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { backgroundOptions, patternBackgrounds, solidColorBackgrounds } from '../onboarding/constants';

interface BackgroundSelectorProps {
  selectedBackground: string;
  onBackgroundChange: (background: string) => void;
}

const BackgroundSelector = ({ selectedBackground, onBackgroundChange }: BackgroundSelectorProps) => {
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
    onBackgroundChange(`bg-[${customHexColor}]`);
    setShowColorPicker(false);
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
        
        <div className="pt-2 border-t border-border mt-3">
          <div className="flex gap-2 items-center mb-2">
            <Palette className="w-5 h-5 text-muted-foreground" />
            <Input 
              type="text"
              value={customHexColor}
              onChange={handleHexColorChange}
              placeholder="#000000"
              className="bg-secondary/50 backdrop-blur-sm border border-white/10"
            />
            <div 
              className="w-8 h-8 rounded-md cursor-pointer"
              style={{ backgroundColor: customHexColor }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />
            <Button 
              onClick={applyCustomColor}
              variant="secondary"
              size="sm"
            >
              Apply
            </Button>
          </div>
          {showColorPicker && (
            <div className="mt-2 p-2 bg-background border border-border rounded-md">
              <HexColorPicker color={customHexColor} onChange={handleColorPickerChange} />
              <div className="flex justify-end mt-2">
                <Button 
                  onClick={applyCustomColor} 
                  size="sm"
                >
                  Select
                </Button>
              </div>
            </div>
          )}
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
        
        <div className="pt-2 border-t border-border mt-3">
          <div className="flex gap-2 items-center mb-2">
            <Palette className="w-5 h-5 text-muted-foreground" />
            <Input 
              type="text"
              value={customHexColor}
              onChange={handleHexColorChange}
              placeholder="#000000"
              className="bg-secondary/50 backdrop-blur-sm border border-white/10"
            />
            <div 
              className="w-8 h-8 rounded-md cursor-pointer"
              style={{ backgroundColor: customHexColor }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />
            <Button 
              onClick={applyCustomColor}
              variant="secondary"
              size="sm"
            >
              Apply
            </Button>
          </div>
          {showColorPicker && (
            <div className="mt-2 p-2 bg-background border border-border rounded-md">
              <HexColorPicker color={customHexColor} onChange={handleColorPickerChange} />
              <div className="flex justify-end mt-2">
                <Button 
                  onClick={applyCustomColor} 
                  size="sm"
                >
                  Select
                </Button>
              </div>
            </div>
          )}
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
        
        <div className="pt-2 border-t border-border mt-3">
          <div className="flex gap-2 items-center mb-2">
            <Palette className="w-5 h-5 text-muted-foreground" />
            <Input 
              type="text"
              value={customHexColor}
              onChange={handleHexColorChange}
              placeholder="#000000"
              className="bg-secondary/50 backdrop-blur-sm border border-white/10"
            />
            <div 
              className="w-8 h-8 rounded-md cursor-pointer"
              style={{ backgroundColor: customHexColor }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />
            <Button 
              onClick={applyCustomColor}
              variant="secondary"
              size="sm"
            >
              Apply
            </Button>
          </div>
          {showColorPicker && (
            <div className="mt-2 p-2 bg-background border border-border rounded-md">
              <HexColorPicker color={customHexColor} onChange={handleColorPickerChange} />
              <div className="flex justify-end mt-2">
                <Button 
                  onClick={applyCustomColor} 
                  size="sm"
                >
                  Select
                </Button>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default BackgroundSelector;
