
import { BusinessCard } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Edit2 } from 'lucide-react';
import BusinessCard from '../../components/BusinessCard';
import CardEditorDialog from './CardEditorDialog';

interface BusinessCardSectionProps {
  card: BusinessCard | null;
  onCardUpdate: (card: BusinessCard) => void;
  cardEditorOpen: boolean;
  setCardEditorOpen: (open: boolean) => void;
}

const BusinessCardSection = ({ 
  card, 
  onCardUpdate, 
  cardEditorOpen, 
  setCardEditorOpen 
}: BusinessCardSectionProps) => {
  return (
    <section className="mb-8">
      <h2 className="text-sm font-medium text-muted-foreground mb-4">Your Business Card</h2>
      {card ? (
        <BusinessCard card={card} isPreview={true} />
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
      
      {/* Card Editor Dialog */}
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
