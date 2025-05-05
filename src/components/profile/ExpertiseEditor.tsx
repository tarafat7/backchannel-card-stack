
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { expertise } from '../onboarding/constants';

interface ExpertiseEditorProps {
  selectedExpertise: string[];
  onSave: (expertise: string[]) => void;
  onCancel: () => void;
}

const ExpertiseEditor = ({ selectedExpertise, onSave, onCancel }: ExpertiseEditorProps) => {
  const [editedExpertise, setEditedExpertise] = useState<string[]>([...selectedExpertise]);
  const [customExpertise, setCustomExpertise] = useState<string>("");
  const { toast } = useToast();
  
  const handleExpertiseToggle = (area: string) => {
    if (editedExpertise.includes(area)) {
      setEditedExpertise(editedExpertise.filter(e => e !== area));
    } else {
      if (editedExpertise.length < 5) {
        setEditedExpertise([...editedExpertise, area]);
      } else {
        toast({
          title: "Maximum reached",
          description: "You can select up to 5 areas of expertise.",
        });
      }
    }
  };

  const handleAddCustomExpertise = () => {
    const trimmedExpertise = customExpertise.trim();
    
    if (!trimmedExpertise) {
      return;
    }
    
    if (trimmedExpertise.length > 20) {
      toast({
        title: "Text too long",
        description: "Expertise name must be 20 characters or less.",
        variant: "destructive"
      });
      return;
    }
    
    if (editedExpertise.includes(trimmedExpertise)) {
      toast({
        title: "Already added",
        description: "This expertise area is already in your list.",
        variant: "destructive"
      });
      return;
    }
    
    if (editedExpertise.length >= 5) {
      toast({
        title: "Maximum reached",
        description: "You can select up to 5 areas of expertise.",
      });
      return;
    }
    
    setEditedExpertise([...editedExpertise, trimmedExpertise]);
    setCustomExpertise("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomExpertise();
    }
  };

  const handleSave = () => {
    if (editedExpertise.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select at least one area of expertise.",
        variant: "destructive"
      });
      return;
    }
    
    onSave(editedExpertise);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Select up to 5 areas of expertise:</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {expertise.map((area) => (
          <button
            key={area}
            onClick={() => handleExpertiseToggle(area)}
            type="button"
            className={`chip ${editedExpertise.includes(area) ? 'chip-selected' : ''}`}
          >
            {area}
          </button>
        ))}
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Or add your own expertise (max 20 characters):</p>
        <div className="flex gap-2">
          <Input
            value={customExpertise}
            onChange={(e) => setCustomExpertise(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Custom expertise"
            maxLength={20}
            className="flex-1"
          />
          <Button type="button" onClick={handleAddCustomExpertise}>
            Add
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          {customExpertise.length}/20 characters
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Your selected expertise:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {editedExpertise.map((area, index) => (
            <div key={index} className="chip chip-selected flex items-center gap-1">
              <span>{area}</span>
              <button 
                onClick={() => setEditedExpertise(editedExpertise.filter(e => e !== area))}
                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary-foreground"
              >
                ×
              </button>
            </div>
          ))}
          {editedExpertise.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No expertise selected</p>
          )}
        </div>
      </div>
      
      <div className="flex gap-2 justify-end pt-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ExpertiseEditor;
