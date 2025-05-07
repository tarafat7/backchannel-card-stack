
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { expertise } from '../onboarding/constants';

interface ExpertiseEditorProps {
  selectedExpertise: string[];
  onSave: (expertise: string[]) => void;
  onCancel: () => void;
}

const ExpertiseEditor = ({ selectedExpertise, onSave, onCancel }: ExpertiseEditorProps) => {
  const [editedExpertise, setEditedExpertise] = useState<string[]>([...selectedExpertise]);
  const [customExpertise, setCustomExpertise] = useState<string>("");
  
  const handleExpertiseToggle = (area: string) => {
    if (editedExpertise.includes(area)) {
      setEditedExpertise(editedExpertise.filter(e => e !== area));
    } else {
      if (editedExpertise.length < 5) {
        setEditedExpertise([...editedExpertise, area]);
      } else {
        console.log("Maximum reached: You can select up to 5 areas of expertise.");
      }
    }
  };

  const handleAddCustomExpertise = () => {
    const trimmedExpertise = customExpertise.trim();
    
    if (!trimmedExpertise) {
      return;
    }
    
    if (trimmedExpertise.length > 25) {
      console.log("Text too long: Expertise name must be 25 characters or less.");
      return;
    }
    
    if (editedExpertise.includes(trimmedExpertise)) {
      console.log("Already added: This expertise area is already in your list.");
      return;
    }
    
    if (editedExpertise.length >= 5) {
      console.log("Maximum reached: You can select up to 5 areas of expertise.");
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
      console.log("Selection required: Please select at least one way you can be helpful.");
      return;
    }
    
    onSave(editedExpertise);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Select up to 5 ways you can be helpful:</p>
      
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
        <p className="text-sm text-muted-foreground">Or add your own (max 25 characters):</p>
        <div className="flex gap-2">
          <Input
            value={customExpertise}
            onChange={(e) => setCustomExpertise(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="E.g., Podcast booking, Public speaking"
            maxLength={25}
            className="flex-1 text-xs placeholder:text-xs"
          />
          <Button type="button" onClick={handleAddCustomExpertise} size="default">
            Add
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          {customExpertise.length}/25 characters
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Your selected offerings:</p>
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
            <p className="text-sm text-muted-foreground italic">No selections yet</p>
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
