
import React from 'react';

interface BackgroundOptionGridProps {
  options: string[];
  selectedBackground: string;
  onSelect: (bg: string) => void;
}

const BackgroundOptionGrid: React.FC<BackgroundOptionGridProps> = ({
  options,
  selectedBackground,
  onSelect
}) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {options.map((bg, index) => (
        <button
          key={index}
          className={`w-full aspect-square rounded-md ${bg} ${selectedBackground === bg ? 'ring-2 ring-primary' : ''}`}
          onClick={() => onSelect(bg)}
        />
      ))}
    </div>
  );
};

export default BackgroundOptionGrid;
