
import React from 'react';

interface TextColorPickerProps {
  textColor: string;
  setTextColor: (color: string) => void;
}

const TextColorPicker: React.FC<TextColorPickerProps> = ({ textColor, setTextColor }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Text color</label>
      <div className="flex gap-2">
        <button
          className={`w-10 h-10 rounded-full bg-black ${textColor === 'text-white' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setTextColor('text-white')}
        />
        <button
          className={`w-10 h-10 rounded-full bg-white ${textColor === 'text-black' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setTextColor('text-black')}
        />
      </div>
    </div>
  );
};

export default TextColorPicker;
