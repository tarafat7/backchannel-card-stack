
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
      const patternMatch = option.match(/bg-\[url\('([^']+)'\)\]/);
      const selectedPatternMatch = selectedBackground.match(/bg-\[url\('([^']+)'\)\]/);
      
      // Return true if both have patterns and they match
      if (patternMatch && selectedPatternMatch && patternMatch[1] === selectedPatternMatch[1]) {
        return true;
      }
      return false;
    }
    
    // For gradients, we need to check if all gradient parts exist in selectedBackground
    if (option.includes('gradient')) {
      const optionParts = option.split(' ');
      const bgParts = selectedBackground.split(' ');
      
      // Check if all gradient-related parts match
      const gradientParts = optionParts.filter(part => 
        part.includes('gradient') || part.includes('from-') || part.includes('to-') || part.includes('via-')
      );
      
      // For gradients, check if all parts are present
      return gradientParts.every(part => bgParts.includes(part));
    }
    
    // For solid Tailwind colors (not custom)
    if (option.startsWith('bg-') && !option.startsWith('bg-[')) {
      // Extract just the color class
      const bgColorClass = option.match(/bg-[a-z]+-\d+/)?.[0];
      if (bgColorClass) {
        return selectedBackground.includes(bgColorClass);
      }
    }
    
    // For custom colors
    if (option.startsWith('bg-[#')) {
      const customColor = option.match(/bg-\[(#[0-9a-fA-F]+)\]/)?.[0];
      if (customColor) {
        return selectedBackground.includes(customColor);
      }
    }
    
    // Default case - check if the option is present in selected background
    return selectedBackground.includes(option);
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
