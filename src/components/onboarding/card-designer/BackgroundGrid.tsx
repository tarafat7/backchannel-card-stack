
import React from 'react';

interface BackgroundGridProps {
  options: string[];
  selectedBackground: string;
  selectPresetBackground: (bg: string) => void;
  isPatternGrid?: boolean; // Add this flag to identify if this is a pattern grid
}

const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  options,
  selectedBackground,
  selectPresetBackground,
  isPatternGrid = false
}) => {
  // Helper function to check if a pattern or color is currently selected
  const isSelected = (option: string) => {
    if (isPatternGrid) {
      // For patterns, check if the pattern URL is in the selectedBackground
      return option.includes('bg-[url') && selectedBackground.includes(option);
    } else {
      // For colors/gradients, check if this specific option is in the background setting
      // This needs to be more precise to handle gradients correctly
      const optionParts = option.split(' ');
      const backgroundParts = selectedBackground.split(' ');
      
      // For gradients or solid colors, we need to match the exact class
      if (optionParts.some(part => part.includes('gradient'))) {
        // For gradients, check if all gradient parts are in the background
        return optionParts.every(part => backgroundParts.includes(part));
      } else {
        // For solid colors, standard check
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
          onClick={() => selectPresetBackground(bg)}
          aria-label={isPatternGrid ? `Pattern ${index + 1}` : `Color or gradient ${index + 1}`}
          aria-pressed={isSelected(bg)}
        />
      ))}
    </div>
  );
};

export default BackgroundGrid;
