
import React from 'react';

interface TextColorSelectorProps {
  textColor: string;
  onTextColorChange: (color: string) => void;
}

const TextColorSelector = ({ textColor, onTextColorChange }: TextColorSelectorProps) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Text color</label>
      <div className="flex gap-2">
        <button
          className={`w-10 h-10 rounded-full bg-black ${textColor === 'text-white' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => onTextColorChange('text-white')}
        />
        <button
          className={`w-10 h-10 rounded-full bg-white ${textColor === 'text-black' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => onTextColorChange('text-black')}
        />
      </div>
    </div>
  );
};

export default TextColorSelector;
