
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { expertise } from '../onboarding/constants';

interface ExpertiseEditorProps {
  selectedExpertise: string[];
  onSave: (expertise: string[]) => void;
  onCancel: () => void;
}

const ExpertiseEditor = ({ selectedExpertise, onSave, onCancel }: ExpertiseEditorProps) => {
  const [editedExpertise, setEditedExpertise] = useState<string[]>([...selectedExpertise]);
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
