
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Design your card</h2>
      
      <div className="mb-8">
        {card && (
          <BusinessCard card={card} isPreview={true} />
        )}
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Background style</label>
          <div className="grid grid-cols-5 gap-2">
            {backgroundOptions.map((bg, index) => (
              <button
                key={index}
                className={`w-full aspect-square rounded-md ${bg} ${selectedBackground === bg ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedBackground(bg)}
              />
            ))}
          </div>
        </div>
        
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
