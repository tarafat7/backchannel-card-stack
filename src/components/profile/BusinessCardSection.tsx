
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Edit2, CheckSquare, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BusinessCard from '../BusinessCard';
import CardEditorDialog from './CardEditorDialog';
import { BusinessCard as BusinessCardType } from '@/context/AppContext';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';

interface BusinessCardSectionProps {
  card: BusinessCardType | null;
  onCardUpdate: (card: BusinessCardType) => void;
  experiences?: Array<{title: string; company: string; years: string; description?: string}>;
  expertiseAreas?: string[];
  onExperienceSave?: (experiences: any[]) => void;
  onExpertiseSave?: (expertiseAreas: string[]) => void;
}

const BusinessCardSection: React.FC<BusinessCardSectionProps> = ({ 
  card, 
  onCardUpdate,
  experiences,
  expertiseAreas,
  onExperienceSave,
  onExpertiseSave
}) => {
  const [showWorkHistory, setShowWorkHistory] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  // Editable state
  const [name, setName] = useState(card?.name || '');
  const [title, setTitle] = useState(card?.title || '');
  const [company, setCompany] = useState(card?.company || '');
  const [status, setStatus] = useState(card?.status || '');

  const toggleWorkHistory = () => {
    setShowWorkHistory(!showWorkHistory);
  };
  
  const toggleEdit = () => {
    if (!isEditing) {
      // Initialize the editable state when entering edit mode
      setName(card?.name || '');
      setTitle(card?.title || '');
      setCompany(card?.company || '');
      setStatus(card?.status || '');
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };
  
  const saveChanges = () => {
    if (card) {
      const updatedCard = {
        ...card,
        name,
        title,
        company,
        status
      };
      onCardUpdate(updatedCard);
      setIsEditing(false);
      toast({
        title: "Card updated",
        description: "Your business card information has been updated successfully."
      });
    }
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium text-muted-foreground">Your Business Card</h2>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleEdit}
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
              <Button 
                size="sm"
                onClick={saveChanges}
              >
                <CheckSquare className="w-4 h-4 mr-1" /> Save
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleEdit}
              >
                <Edit2 className="w-4 h-4 mr-1" /> Edit Info
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleWorkHistory}
              >
                {showWorkHistory ? "Hide Work History" : "Show Work History"}
              </Button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4 p-4 bg-secondary/20 rounded-xl backdrop-blur-sm">
          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Company</label>
            <Input value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <Textarea 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              placeholder="What are you up to now?"
              className="resize-none"
              maxLength={100}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {status.length}/100 characters
            </div>
          </div>
        </div>
      ) : (
        card ? (
          <BusinessCard card={card} isPreview={true} showHistory={showWorkHistory} />
        ) : (
          <div className="h-56 rounded-xl bg-secondary flex items-center justify-center">
            <p className="text-muted-foreground">Complete onboarding to create your card</p>
          </div>
        )
      )}
      
      {card && (
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full mt-3"
            >
              Edit Card Design
              <Edit2 className="w-4 h-4 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <CardEditorDialog 
              card={card} 
              onSave={onCardUpdate} 
            />
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default BusinessCardSection;
