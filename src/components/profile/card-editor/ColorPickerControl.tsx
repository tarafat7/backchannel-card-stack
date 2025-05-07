
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Palette } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerControlProps {
  customColor: string;
  onColorChange: (color: string) => void;
  onApply: () => void;
}

const ColorPickerControl: React.FC<ColorPickerControlProps> = ({
  customColor,
  onColorChange,
  onApply
}) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  // Handle custom hex color input
  const handleHexColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onColorChange(value);
  };

  // Handle color picker change
  const handleColorPickerChange = (color: string) => {
    onColorChange(color);
  };

  return (
    <div className="pt-2 border-t border-border mt-3">
      <div className="flex gap-2 items-center mb-2">
        <Palette className="w-5 h-5 text-muted-foreground" />
        <Input 
          type="text"
          value={customColor}
          onChange={handleHexColorChange}
          placeholder="#000000"
          className="bg-secondary/50 backdrop-blur-sm border border-white/10"
        />
        <div 
          className="w-8 h-8 rounded-md cursor-pointer"
          style={{ backgroundColor: customColor }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        />
        <Button 
          onClick={onApply}
          variant="secondary"
          size="sm"
        >
          Apply
        </Button>
      </div>
      {showColorPicker && (
        <div className="mt-2 p-2 bg-background border border-border rounded-md">
          <HexColorPicker color={customColor} onChange={handleColorPickerChange} />
          <div className="flex justify-end mt-2">
            <Button 
              onClick={onApply} 
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

export default ColorPickerControl;
