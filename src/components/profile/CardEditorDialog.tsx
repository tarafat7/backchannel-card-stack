
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { backgroundOptions } from '../onboarding/constants';
import BusinessCard from '../BusinessCard';
import { BusinessCard as BusinessCardType } from '@/context/AppContext';

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
  const [customHexColor, setCustomHexColor] = useState<string>('#333333');
  const [isUsingCustomColor, setIsUsingCustomColor] = useState<boolean>(false);
  
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

  // Handle custom hex color input
  const handleHexColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomHexColor(value);
    
    // Only update background if using custom color
    if (isUsingCustomColor) {
      setSelectedBackground(`bg-[${value}]`);
    }
  };

  // Handle applying the custom color
  const applyCustomColor = () => {
    setIsUsingCustomColor(true);
    setSelectedBackground(`bg-[${customHexColor}]`);
  };

  // Handle selecting a preset background
  const selectPresetBackground = (bg: string) => {
    setIsUsingCustomColor(false);
    setSelectedBackground(bg);
  };

  // Handle link changes
  const handleLinkChange = (index: number, field: 'type' | 'url', value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };
  
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

  // Group background options
  const gradients = backgroundOptions.filter(bg => bg.includes('gradient'));
  const solidColors = backgroundOptions.filter(bg => bg.includes('bg-[') && !bg.includes('pattern'));
  const patterns = backgroundOptions.filter(bg => bg.includes('pattern'));

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
          
          <Tabs defaultValue="gradients" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="gradients">Gradients</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="patterns">Patterns</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gradients" className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {gradients.map((bg, index) => (
                  <button
                    key={index}
                    className={`w-full aspect-square rounded-md ${bg} ${selectedBackground === bg ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => selectPresetBackground(bg)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="colors" className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {solidColors.map((bg, index) => (
                  <button
                    key={index}
                    className={`w-full aspect-square rounded-md ${bg} ${selectedBackground === bg ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => selectPresetBackground(bg)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="patterns" className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {patterns.map((bg, index) => (
                  <button
                    key={index}
                    className={`w-full aspect-square rounded-md ${bg} ${selectedBackground === bg ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => selectPresetBackground(bg)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="custom" className="space-y-4">
              <div className="flex gap-2 items-center">
                <Input 
                  type="text"
                  value={customHexColor}
                  onChange={handleHexColorChange}
                  placeholder="#000000"
                  className="bg-secondary/50 backdrop-blur-sm border border-white/10"
                />
                <div 
                  className="w-10 h-10 rounded-md" 
                  style={{ backgroundColor: customHexColor }}
                />
                <Button 
                  onClick={applyCustomColor}
                  variant="secondary"
                  size="sm"
                >
                  Apply
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Enter a hex color code (e.g., #FF5733)</p>
            </TabsContent>
          </Tabs>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Text color</label>
            <div className="flex gap-2">
              <button
                className={`w-10 h-10 rounded-full bg-black ${textColor === 'text-white' ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setTextColor('text-white')}
              />
              <button
                className={`w-10 h-10 rounded-full bg-white ${textColor === 'text-black' ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setTextColor('text-black')}
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Input 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="What are you up to now?"
              className="bg-secondary/50 backdrop-blur-sm border border-white/10"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Social links</label>
            <div className="space-y-2">
              {links.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    value={link.type}
                    onChange={(e) => handleLinkChange(index, 'type', e.target.value)}
                    placeholder="Type"
                    className="bg-secondary/50 backdrop-blur-sm border border-white/10 w-1/3"
                  />
                  <Input 
                    value={link.url}
                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                    placeholder="URL"
                    className="bg-secondary/50 backdrop-blur-sm border border-white/10 flex-1"
                  />
                </div>
              ))}
            </div>
          </div>
          
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
