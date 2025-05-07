
import React from 'react';
import BackgroundOptionGrid from './BackgroundOptionGrid';
import ColorPickerControl from './ColorPickerControl';

interface BackgroundTabContentProps {
  options: string[];
  selectedBackground: string;
  onSelect: (bg: string) => void;
  customHexColor: string;
  setCustomHexColor: (color: string) => void;
  applyCustomColor: () => void;
}

const BackgroundTabContent: React.FC<BackgroundTabContentProps> = ({
  options,
  selectedBackground,
  onSelect,
  customHexColor,
  setCustomHexColor,
  applyCustomColor
}) => {
  return (
    <div className="space-y-4">
      <BackgroundOptionGrid 
        options={options}
        selectedBackground={selectedBackground}
        onSelect={onSelect}
      />
      
      <ColorPickerControl 
        customColor={customHexColor}
        onColorChange={setCustomHexColor}
        onApply={applyCustomColor}
      />
    </div>
  );
};

export default BackgroundTabContent;
