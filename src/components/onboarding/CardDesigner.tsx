
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import CardPreview from './card-designer/CardPreview';
import BackgroundSelector from './card-designer/BackgroundSelector';
import TextColorPicker from './card-designer/TextColorPicker';
import StatusInput from './card-designer/StatusInput';
import SocialLinksEditor from './card-designer/SocialLinksEditor';

interface CardDesignerProps {
  card: any;
  selectedBackground: string;
  setSelectedBackground: (bg: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  status: string;
  setStatus: (status: string) => void;
  links: Array<{type: string, url: string}>;
  handleLinkChange: (index: number, field: 'type' | 'url', value: string) => void;
  onComplete: () => void;
  backgroundOptions: string[];
}

const MAX_STATUS_LENGTH = 100;

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
  const [showWorkHistory, setShowWorkHistory] = useState<boolean>(false);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Design your card</h2>
      
      <CardPreview 
        card={card} 
        showWorkHistory={showWorkHistory} 
        setShowWorkHistory={setShowWorkHistory} 
      />
      
      <div className="space-y-6">
        <BackgroundSelector 
          selectedBackground={selectedBackground}
          setSelectedBackground={setSelectedBackground}
          backgroundOptions={backgroundOptions}
        />
        
        <TextColorPicker 
          textColor={textColor}
          setTextColor={setTextColor}
        />
        
        <StatusInput 
          status={status}
          setStatus={setStatus}
          maxLength={MAX_STATUS_LENGTH}
        />
        
        <SocialLinksEditor 
          links={links}
          handleLinkChange={handleLinkChange}
        />
      </div>
      
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
