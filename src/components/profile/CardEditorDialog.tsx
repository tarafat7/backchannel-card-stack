
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import BusinessCard from '../BusinessCard';
import { BusinessCard as BusinessCardType } from '@/context/AppContext';
import BackgroundSelector from './BackgroundSelector';
import TextColorSelector from './TextColorSelector';
import CardLinks from './CardLinks';

interface CardEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: BusinessCardType | null;
  onSave: (card: BusinessCardType) => void;
}

const CardEditorDialog = ({ open, onOpenChange, card, onSave }: CardEditorDialogProps) => {
  const { toast } = useToast();
  
  // Initialize state with card values or defaults
  const [selectedBackground, setSelectedBackground] = useState<string>(card?.design.backgroundStyle || 'bg-gradient-card-1');
  const [textColor, setTextColor] = useState<string>(card?.design.textColor || 'text-white');
  const [status, setStatus] = useState<string>(card?.status || '');
  const [links, setLinks] = useState(card?.links || [{ type: 'Twitter', url: 'https://twitter.com' }]);
  
  // Create a preview card with the current settings
  const previewCard = card ? {
    ...card,
    status,
    links,
    design: {
      backgroundStyle: selectedBackground,
      textColor
    }
  } : null;
  
  // Handle save
  const handleSave = () => {
    if (card) {
      const updatedCard = {
        ...card,
        status,
        links,
        design: {
          backgroundStyle: selectedBackground,
          textColor
        }
      };
      onSave(updatedCard);
      toast({
        title: "Card updated",
        description: "Your business card has been updated successfully.",
      });
      onOpenChange(false);
    }
  };

  if (!card) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Your Card</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div className="flex justify-center">
            {previewCard && (
              <BusinessCard card={previewCard} isPreview={true} />
            )}
          </div>
          
          <BackgroundSelector 
            selectedBackground={selectedBackground}
            onBackgroundChange={setSelectedBackground}
          />
          
          <TextColorSelector 
            textColor={textColor}
            onTextColorChange={setTextColor}
          />
          
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Input 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="What are you up to now?"
              className="bg-secondary/50 backdrop-blur-sm border border-white/10"
            />
          </div>
          
          <CardLinks 
            links={links}
            onLinksChange={setLinks}
          />
          
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardEditorDialog;
