
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import CardPreview from './CardPreview';
import BackgroundSelector from './BackgroundSelector';
import TextColorPicker from './TextColorPicker';
import StatusInput from './StatusInput';
import SocialLinksEditor from './SocialLinksEditor';
import { toast } from "@/components/ui/use-toast";

interface CardDesignerProps {
  card: any;
  selectedBackground: string;
  setSelectedBackground: (bg: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  status: string;
  setStatus: (status: string) => void;
  links: Array<{type: string, url: string}>;
  setLinks: (links: Array<{type: string, url: string}>) => void;
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
  setLinks,
  handleLinkChange,
  onComplete,
  backgroundOptions
}) => {
  const [showWorkHistory, setShowWorkHistory] = useState<boolean>(false);
  const [hasLinkError, setHasLinkError] = useState<boolean>(false);

  const addLink = () => {
    setLinks([...links, { type: 'Other', url: '' }]);
  };

  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const handleSubmit = () => {
    // Validate that at least one link has both type and URL filled
    const hasFilledLink = links.some(link => link.type && link.url);
    
    if (!hasFilledLink) {
      setHasLinkError(true);
      toast({
        title: "Link required",
        description: "Please add at least one social link with both type and URL",
        variant: "destructive"
      });
      return;
    }
    
    onComplete();
  };

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
          addLink={addLink}
          removeLink={removeLink}
          hasLinkError={hasLinkError}
        />
      </div>
      
      <Button 
        onClick={handleSubmit} 
        className="w-full mt-8 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
      >
        Finish
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default CardDesigner;
