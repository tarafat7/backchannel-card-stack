
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import ExperienceEditor from './ExperienceEditor';
import { useToast } from '@/components/ui/use-toast';

interface Experience {
  title: string;
  company: string;
  years: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  onExperienceSave: (experiences: Experience[]) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, onExperienceSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleExperienceSave = (updatedExperiences: Experience[]) => {
    onExperienceSave(updatedExperiences);
    setIsEditing(false);
    toast({
      title: "Experience updated",
      description: "Your professional experience has been updated successfully."
    });
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium text-muted-foreground">Your Experience</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
      </div>
      
      {isEditing ? (
        <ExperienceEditor 
          experiences={experiences || []}
          onSave={handleExperienceSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="space-y-3">
          {experiences && experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary">
                <h3 className="font-medium">{exp.title}</h3>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.years}</p>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-lg bg-secondary text-center">
              <p className="text-sm text-muted-foreground">No experience added yet</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ExperienceSection;
