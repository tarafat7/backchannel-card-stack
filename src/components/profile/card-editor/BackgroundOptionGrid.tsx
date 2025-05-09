
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
  // Helper function to check if a background option is currently selected
  const isSelected = (option: string) => {
    // For patterns, check if the pattern URL is in the selectedBackground
    if (option.includes('bg-[url')) {
      return selectedBackground.includes(option);
    } else {
      // For colors/gradients, we need more precise checking
      const optionParts = option.split(' ');
      const backgroundParts = selectedBackground.split(' ');
      
      // For gradients, check if all parts are present in the background
      if (optionParts.some(part => part.includes('gradient'))) {
        return optionParts.every(part => backgroundParts.includes(part));
      } else {
        // For solid colors, check if the specific class is present
        return backgroundParts.includes(option) || 
               (option.startsWith('bg-[#') && selectedBackground.includes(option));
      }
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {options.map((bg, index) => (
        <button
          key={index}
          className={`w-full aspect-square rounded-md ${bg} ${isSelected(bg) ? 'ring-2 ring-primary' : ''}`}
          onClick={() => onSelect(bg)}
        />
      ))}
    </div>
  );
};

export default BackgroundOptionGrid;
