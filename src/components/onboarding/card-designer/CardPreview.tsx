
import React from 'react';
import { Button } from "@/components/ui/button";
import BusinessCard from '../../BusinessCard';

interface CardPreviewProps {
  card: any;
  showWorkHistory: boolean;
  setShowWorkHistory: (show: boolean) => void;
}

const CardPreview: React.FC<CardPreviewProps> = ({ card, showWorkHistory, setShowWorkHistory }) => {
  return (
    <div className="mb-8">
      {card && (
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
          <BusinessCard card={card} isPreview={true} showHistory={showWorkHistory} />
        </>
      )}
    </div>
  );
};

export default CardPreview;
