
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import CardPreview from './card-designer/CardPreview';
import BackgroundSelector from './card-designer/BackgroundSelector';
import TextColorPicker from './card-designer/TextColorPicker';
import StatusInput from './card-designer/StatusInput';
import SocialLinksEditor from './card-designer/SocialLinksEditor';
import { toast } from "@/components/ui/use-toast";
import { BusinessCard } from '@/types';
import { useOnboarding } from '../../context/OnboardingContext';

interface CardDesignerProps {
  card: BusinessCard | null;
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
  const { formData, selectedExpertise } = useOnboarding();
  const [showWorkHistory, setShowWorkHistory] = useState<boolean>(false);
  const [hasLinkError, setHasLinkError] = useState<boolean>(false);
  const [previewCard, setPreviewCard] = useState<BusinessCard | null>(null);

  // Create a preview card with current settings
  useEffect(() => {
    // Create a preview card even if the passed card is null
    const updatedCard: BusinessCard = {
      id: card?.id || '1',
      name: formData.name || 'Your Name',
      title: formData.title || 'Your Title',
      company: formData.company || 'Your Company',
      avatar: formData.avatar || '',
      expertiseAreas: selectedExpertise || [],
      links: links,
      status: status,
      design: {
        backgroundStyle: selectedBackground,
        textColor: textColor
      },
      connectionDegree: 1,
      mutualConnections: [],
      phoneNumber: formData.phoneNumber || ''
    };
    
    setPreviewCard(updatedCard);
  }, [card, formData, selectedExpertise, selectedBackground, textColor, status, links]);

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

  // Function to handle background change
  const handleBackgroundChange = (bg: string) => {
    console.log("Setting background to:", bg);
    setSelectedBackground(bg);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Design your card</h2>
      
      <CardPreview 
        card={previewCard} 
        showWorkHistory={showWorkHistory} 
        setShowWorkHistory={setShowWorkHistory} 
      />
      
      <div className="space-y-6">
        <BackgroundSelector 
          selectedBackground={selectedBackground}
          setSelectedBackground={handleBackgroundChange}
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
