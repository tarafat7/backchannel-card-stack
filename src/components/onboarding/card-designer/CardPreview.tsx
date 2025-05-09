
import React from 'react';
import { Button } from "@/components/ui/button";
import BusinessCard from '../../BusinessCard';
import { BusinessCard as BusinessCardType } from '@/types';
import { useOnboarding } from '../../../context/OnboardingContext';

interface CardPreviewProps {
  card: BusinessCardType | null;
  showWorkHistory: boolean;
  setShowWorkHistory: (show: boolean) => void;
}

const CardPreview: React.FC<CardPreviewProps> = ({ card, showWorkHistory, setShowWorkHistory }) => {
  const { formData } = useOnboarding();
  
  return (
    <div className="mb-8">
      {card ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Card Preview</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowWorkHistory(!showWorkHistory)}
              className="text-xs"
            >
              {showWorkHistory ? "Hide Work History" : "Show Work History"}
            </Button>
          </div>
          <BusinessCard 
            card={card} 
            isPreview={true} 
            showHistory={showWorkHistory} 
          />
        </>
      ) : (
        <div className="rounded-lg bg-secondary/50 p-4 text-center text-muted-foreground mb-4">
          <p>Card preview not available</p>
        </div>
      )}
    </div>
  );
};

export default CardPreview;
