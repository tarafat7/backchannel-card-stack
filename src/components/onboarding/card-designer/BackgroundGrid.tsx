
import React from 'react';

interface BackgroundGridProps {
  options: string[];
  selectedBackground: string;
  selectPresetBackground: (bg: string) => void;
}

const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  options,
  selectedBackground,
  selectPresetBackground
}) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {options.map((bg, index) => (
        <button
          key={index}
          className={`w-full aspect-square rounded-md ${bg} ${selectedBackground === bg ? 'ring-2 ring-primary' : ''}`}
          onClick={() => selectPresetBackground(bg)}
        />
      ))}
    </div>
  );
};

export default BackgroundGrid;
