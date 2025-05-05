
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

export const useCardDesignerState = (initialBackground: string) => {
  const [customHexColor, setCustomHexColor] = useState('#1A1A1A');
  const [selectedGradient, setSelectedGradient] = useState('');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customImageFile, setCustomImageFile] = useState<File | null>(null);
  const [opacity, setOpacity] = useState(100);

  // Predefined gradient options with new green options
  const gradientOptions = [
    'linear-gradient(90deg, #1FF48E 0%, #0EA5E9 100%)',
    'linear-gradient(135deg, #1FF48E 0%, #000000 100%)',
    'linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)',
    'linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)',
    'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)',
    'linear-gradient(90deg, #1FF48E 0%, hsla(176, 73%, 88%, 1) 100%)',
    'linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, #1FF48E 100%)',
    'linear-gradient(to right, #243949 0%, #517fa4 100%)',
    'linear-gradient(225deg, #FFE29F 0%, #1FF48E 48%, #FF719A 100%)'
  ];

  // Color palette options including the new green
  const colorOptions = [
    '#222222', '#403E43', '#1A1A1A', '#0f0f10', '#5B61F3', '#2166EE',
    '#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#27272a', 
    '#1FF48E', '#7E69AB', '#1EAEDB', '#33C3F0'
  ];

  // Apply custom hex color
  const applyCustomColor = (setSelectedBackground: (bg: string) => void) => {
    setSelectedBackground(customHexColor);
    setSelectedGradient('');
    toast({
      title: "Color applied",
      description: "Your custom color has been set",
    });
  };

  // Apply selected gradient
  const applyGradient = (gradient: string, setSelectedBackground: (bg: string) => void) => {
    setSelectedBackground(gradient);
    setSelectedGradient(gradient);
    toast({
      title: "Gradient applied",
      description: "Your gradient background has been set",
    });
  };

  // Handle image upload
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setSelectedBackground: (bg: string) => void
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          setCustomImageFile(file);
          
          // Set background to custom image
          const imageStyle = `url(${event.target.result}) center/cover no-repeat`;
          setSelectedBackground(imageStyle);
          
          // Reset other selections
          setSelectedGradient('');
          
          toast({
            title: "Image uploaded",
            description: "Your custom background has been applied",
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  // Handle opacity change
  const handleOpacityChange = (value: number[]) => {
    const newOpacity = value[0];
    setOpacity(newOpacity);
  };

  return {
    customHexColor,
    setCustomHexColor,
    selectedGradient,
    setSelectedGradient,
    customImage,
    setCustomImage,
    customImageFile,
    setCustomImageFile,
    opacity,
    setOpacity,
    gradientOptions,
    colorOptions,
    applyCustomColor,
    applyGradient,
    handleImageUpload,
    handleOpacityChange
  };
};
