
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Palette } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  customHexColor: string;
  handleHexColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleColorPickerChange: (color: string) => void;
  applyCustomColor: () => void;
  showColorPicker: boolean;
  setShowColorPicker: (show: boolean) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  customHexColor,
  handleHexColorChange,
  handleColorPickerChange,
  applyCustomColor,
  showColorPicker,
  setShowColorPicker
}) => {
  return (
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
  );
};

export default ColorPicker;
