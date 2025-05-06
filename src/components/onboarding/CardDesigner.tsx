
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from 'lucide-react';
import BusinessCard from '../BusinessCard';

interface CardDesignerProps {
  card: any;
  selectedBackground: string;
  setSelectedBackground: (bg: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  status: string;
  setStatus: (status: string) => void;
  links: Array<{type: string, url: string}>;
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
  handleLinkChange,
  onComplete,
  backgroundOptions
}) => {
  const [customHexColor, setCustomHexColor] = useState<string>('#333333');
  const [isUsingCustomColor, setIsUsingCustomColor] = useState<boolean>(false);
  const [showWorkHistory, setShowWorkHistory] = useState<boolean>(false);

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

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_STATUS_LENGTH) {
      setStatus(value);
    }
  };

  // Group background options
  const gradients = backgroundOptions.filter(bg => bg.includes('gradient'));
  const solidColors = backgroundOptions.filter(bg => bg.includes('bg-[') && !bg.includes('pattern'));
  const patterns = backgroundOptions.filter(bg => bg.includes('pattern'));

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Design your card</h2>
      
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
      
      <div className="space-y-6">
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
            onChange={handleStatusChange} 
            placeholder="What are you up to now?"
            className="bg-secondary/50 backdrop-blur-sm border border-white/10"
            maxLength={MAX_STATUS_LENGTH}
          />
          <div className="text-xs text-muted-foreground mt-1">
            {status.length}/{MAX_STATUS_LENGTH} characters
          </div>
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
      </div>
      
      <Button 
        onClick={onComplete} 
        className="w-full mt-8 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
      >
        Finish
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default CardDesigner;
