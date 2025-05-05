
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CustomColorProps } from './types';

const CustomColorTab: React.FC<CustomColorProps> = ({ 
  customHexColor, 
  setCustomHexColor, 
  applyCustomColor, 
  opacity, 
  handleOpacityChange 
}) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-md" style={{ backgroundColor: customHexColor }}></div>
          <div className="flex-1">
            <Input 
              type="text"
              value={customHexColor}
              onChange={(e) => setCustomHexColor(e.target.value)}
              placeholder="#FFFFFF or rgb(255,255,255)"
              className="mb-2"
            />
            <Button onClick={applyCustomColor} size="sm">Apply Color</Button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Text Opacity</label>
          <Slider
            defaultValue={[100]}
            max={100}
            step={1}
            value={[opacity]}
            onValueChange={handleOpacityChange}
            className="my-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>{opacity}%</span>
            <span>100%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomColorTab;
