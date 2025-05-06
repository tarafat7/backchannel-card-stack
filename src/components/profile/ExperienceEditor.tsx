
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Experience {
  title: string;
  company: string;
  years: string;
  description?: string;
}

interface ExperienceEditorProps {
  experiences: Experience[];
  onSave: (experiences: Experience[]) => void;
  onCancel: () => void;
}

const MAX_DESCRIPTION_LENGTH = 100;

const ExperienceEditor = ({ experiences, onSave, onCancel }: ExperienceEditorProps) => {
  const [editedExperiences, setEditedExperiences] = useState<Experience[]>(
    experiences.length > 0 
      ? [...experiences] 
      : [{ title: '', company: '', years: '' }]
  );
  const { toast } = useToast();

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const newExperiences = [...editedExperiences];
    newExperiences[index][field] = value;
    setEditedExperiences(newExperiences);
  };

  const addExperience = () => {
    setEditedExperiences([
      ...editedExperiences,
      { title: '', company: '', years: '' }
    ]);
  };

  const removeExperience = (index: number) => {
    if (editedExperiences.length > 1) {
      const newExperiences = [...editedExperiences];
      newExperiences.splice(index, 1);
      setEditedExperiences(newExperiences);
    } else {
      toast({
        title: "Cannot remove",
        description: "You must have at least one experience entry.",
        variant: "destructive"
      });
    }
  };

  const handleSave = () => {
    // Validate all experiences have required fields
    const isValid = editedExperiences.every(
      exp => exp.title.trim() && exp.company.trim() && exp.years.trim()
    );

    if (!isValid) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all fields for each experience.",
        variant: "destructive"
      });
      return;
    }

    onSave(editedExperiences);
  };

  return (
    <div className="space-y-4">
      {editedExperiences.map((exp, index) => (
        <div key={index} className="p-4 rounded-lg bg-secondary space-y-3 relative">
          <Input
            value={exp.title}
            onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
            placeholder="Job Title"
            className="bg-background"
          />
          <Input
            value={exp.company}
            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
            placeholder="Company"
            className="bg-background"
          />
          <Input
            value={exp.years}
            onChange={(e) => handleExperienceChange(index, 'years', e.target.value)}
            placeholder="Time Period (e.g. 2020 - Present)"
            className="bg-background"
          />
          <div className="space-y-1">
            <Textarea
              value={exp.description || ''}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= MAX_DESCRIPTION_LENGTH) {
                  handleExperienceChange(index, 'description', value);
                }
              }}
              placeholder="Brief description (optional)"
              className="bg-background resize-none"
              maxLength={MAX_DESCRIPTION_LENGTH}
            />
            <div className="text-xs text-right text-muted-foreground">
              {(exp.description?.length || 0)}/{MAX_DESCRIPTION_LENGTH}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeExperience(index)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
            type="button"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addExperience}
        className="flex items-center gap-1"
      >
        <Plus className="h-4 w-4" />
        Add Experience
      </Button>
      
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

export default ExperienceEditor;
