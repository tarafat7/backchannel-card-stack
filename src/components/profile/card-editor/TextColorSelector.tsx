
import React from 'react';
import TextColorPicker from '../../onboarding/card-designer/TextColorPicker';

interface TextColorSelectorProps {
  textColor: string;
  onTextColorChange: (color: string) => void;
}

const TextColorSelector: React.FC<TextColorSelectorProps> = ({ textColor, onTextColorChange }) => {
  return (
    <TextColorPicker 
      textColor={textColor}
      setTextColor={onTextColorChange}
    />
  );
};

export default TextColorSelector;
