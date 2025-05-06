
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Edit2 } from 'lucide-react';
import BusinessCard from '../BusinessCard';
import CardEditorDialog from './CardEditorDialog';
import { BusinessCard as BusinessCardType } from '@/context/AppContext';

interface BusinessCardSectionProps {
  card: BusinessCardType | null;
  onCardUpdate: (card: BusinessCardType) => void;
}

const BusinessCardSection: React.FC<BusinessCardSectionProps> = ({ card, onCardUpdate }) => {
  const [cardEditorOpen, setCardEditorOpen] = useState(false);
  const [showWorkHistory, setShowWorkHistory] = useState(true);

  const toggleWorkHistory = () => {
    setShowWorkHistory(!showWorkHistory);
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium text-muted-foreground">Your Business Card</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleWorkHistory}
        >
          {showWorkHistory ? "Hide Work History" : "Show Work History"}
        </Button>
      </div>

      {card ? (
        <BusinessCard card={card} isPreview={true} showHistory={showWorkHistory} />
      ) : (
        <div className="h-56 rounded-xl bg-secondary flex items-center justify-center">
          <p className="text-muted-foreground">Complete onboarding to create your card</p>
        </div>
      )}
      
      <Button 
        variant="outline" 
        className="w-full mt-3"
        onClick={() => setCardEditorOpen(true)}
      >
        Edit Card Design
        <Edit2 className="w-4 h-4 ml-2" />
      </Button>
      
      {card && (
        <CardEditorDialog
          open={cardEditorOpen}
          onOpenChange={setCardEditorOpen}
          card={card}
          onSave={onCardUpdate}
        />
      )}
    </section>
  );
};

export default BusinessCardSection;
