
import React from 'react';
import BackgroundGrid from './BackgroundGrid';
import ColorPicker from './ColorPicker';

interface BackgroundTabPanelProps {
  options: string[];
  selectedBackground: string;
  selectPresetBackground: (bg: string) => void;
  customHexColor: string;
  handleHexColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleColorPickerChange: (color: string) => void;
  applyCustomColor: () => void;
  showColorPicker: boolean;
  setShowColorPicker: (show: boolean) => void;
}

const BackgroundTabPanel: React.FC<BackgroundTabPanelProps> = ({
  options,
  selectedBackground,
  selectPresetBackground,
  customHexColor,
  handleHexColorChange,
  handleColorPickerChange,
  applyCustomColor,
  showColorPicker,
  setShowColorPicker
}) => {
  return (
    <div className="space-y-4">
      <BackgroundGrid 
        options={options}
        selectedBackground={selectedBackground}
        selectPresetBackground={selectPresetBackground}
      />
      
      <ColorPicker 
        customHexColor={customHexColor}
        handleHexColorChange={handleHexColorChange}
        handleColorPickerChange={handleColorPickerChange}
        applyCustomColor={applyCustomColor}
        showColorPicker={showColorPicker}
        setShowColorPicker={setShowColorPicker}
      />
    </div>
  );
};

export default BackgroundTabPanel;
