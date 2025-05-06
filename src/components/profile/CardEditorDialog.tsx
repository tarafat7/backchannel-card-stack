
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BusinessCard as BusinessCardType } from '@/context/AppContext';
import BackgroundSelector from './card-editor/BackgroundSelector';
import TextColorSelector from './card-editor/TextColorSelector';
import CardLinks from './card-editor/CardLinks';
import StatusInput from './card-editor/StatusInput';
import CardPreview from './card-editor/CardPreview';

interface CardEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: BusinessCardType | null;
  onSave: (card: BusinessCardType) => void;
}

const MAX_STATUS_LENGTH = 100;

const CardEditorDialog = ({ open, onOpenChange, card, onSave }: CardEditorDialogProps) => {
  const { toast } = useToast();
  
  // Initialize state with card values or defaults
  const [selectedBackground, setSelectedBackground] = useState<string>(card?.design.backgroundStyle || 'bg-gradient-card-1');
  const [textColor, setTextColor] = useState<string>(card?.design.textColor || 'text-white');
  const [status, setStatus] = useState<string>(card?.status || '');
  const [links, setLinks] = useState(card?.links || [{ type: 'Twitter', url: 'https://twitter.com' }]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  
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
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Preview</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? "Hide Work History" : "Show Work History"}
            </Button>
          </div>
          
          {previewCard && <CardPreview card={previewCard} showHistory={showHistory} />}
          
          <BackgroundSelector 
            selectedBackground={selectedBackground}
            onBackgroundChange={setSelectedBackground}
          />
          
          <TextColorSelector 
            textColor={textColor}
            onTextColorChange={setTextColor}
          />
          
          <StatusInput 
            status={status}
            onStatusChange={setStatus}
            maxLength={MAX_STATUS_LENGTH}
          />
          
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
