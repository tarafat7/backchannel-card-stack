
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Paintbrush, Droplets, Palette, Image } from 'lucide-react';
import BusinessCard from '../BusinessCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardDesignerProps } from './card-designer/types';
import { useCardDesignerState } from './card-designer/hooks';

// Import sub-components
import SolidColorTab from './card-designer/SolidColorTab';
import GradientTab from './card-designer/GradientTab';
import CustomColorTab from './card-designer/CustomColorTab';
import ImageUploadTab from './card-designer/ImageUploadTab';
import TextControls from './card-designer/TextControls';

const CardDesigner: React.FC<CardDesignerProps> = ({ 
  card,
  selectedBackground,
  setSelectedBackground,
  textColor,
  setTextColor,
  status,
  setStatus,
  links,
  handleLinkChange,
  onComplete,
  backgroundOptions
}) => {
  const {
    customHexColor,
    setCustomHexColor,
    selectedGradient,
    customImage,
    opacity,
    gradientOptions,
    colorOptions,
    applyCustomColor: applyCustomColorBase,
    applyGradient: applyGradientBase,
    handleImageUpload: handleImageUploadBase,
    handleOpacityChange
  } = useCardDesignerState(selectedBackground);

  // Create bound versions of the callbacks that include setSelectedBackground
  const applyCustomColor = () => applyCustomColorBase(setSelectedBackground);
  const applyGradient = (gradient: string) => applyGradientBase(gradient, setSelectedBackground);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => 
    handleImageUploadBase(e, setSelectedBackground);

  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Design your card</h2>
      
      <div className="mb-8">
        {card && (
          <BusinessCard card={card} isPreview={true} />
        )}
      </div>
      
      <Tabs defaultValue="solid" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="solid" className="flex items-center gap-1">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Solid</span>
          </TabsTrigger>
          <TabsTrigger value="gradient" className="flex items-center gap-1">
            <Droplets className="w-4 h-4" />
            <span className="hidden sm:inline">Gradient</span>
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-1">
            <Paintbrush className="w-4 h-4" />
            <span className="hidden sm:inline">Custom</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-1">
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">Image</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="solid">
          <SolidColorTab 
            colorOptions={colorOptions} 
            selectedBackground={selectedBackground} 
            setSelectedBackground={setSelectedBackground} 
          />
        </TabsContent>
        
        <TabsContent value="gradient">
          <GradientTab 
            gradientOptions={gradientOptions} 
            selectedGradient={selectedGradient} 
            applyGradient={applyGradient} 
          />
        </TabsContent>
        
        <TabsContent value="custom">
          <CustomColorTab 
            customHexColor={customHexColor}
            setCustomHexColor={setCustomHexColor}
            applyCustomColor={applyCustomColor}
            opacity={opacity}
            handleOpacityChange={handleOpacityChange}
          />
        </TabsContent>
        
        <TabsContent value="image">
          <ImageUploadTab 
            handleImageUpload={handleImageUpload}
            customImage={customImage}
          />
        </TabsContent>
      </Tabs>
      
      <TextControls
        textColor={textColor}
        setTextColor={setTextColor}
        status={status}
        setStatus={setStatus}
        links={links}
        handleLinkChange={handleLinkChange}
      />
      
      <Button 
        onClick={onComplete} 
        className="w-full mt-8 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
      >
        Finish
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default CardDesigner;
