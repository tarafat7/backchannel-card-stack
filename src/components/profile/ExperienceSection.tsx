
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import ExperienceEditor from './ExperienceEditor';

interface Experience {
  title: string;
  company: string;
  years: string;
  description?: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  onExperienceSave: (experiences: Experience[]) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences, onExperienceSave }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleExperienceSave = (updatedExperiences: Experience[]) => {
    // Sort experiences by most recent first (assuming years format has "Present" or higher years are more recent)
    const sortedExperiences = [...updatedExperiences].sort((a, b) => {
      const aHasPresent = a.years.toLowerCase().includes('present');
      const bHasPresent = b.years.toLowerCase().includes('present');
      
      if (aHasPresent && !bHasPresent) return -1;
      if (!aHasPresent && bHasPresent) return 1;
      
      // If neither or both have "Present", just preserve their order
      return 0;
    });
    
    // Take only the most recent 3 experiences if there are more than 3
    const limitedExperiences = sortedExperiences.length > 3 
      ? sortedExperiences.slice(0, 3) 
      : sortedExperiences;
    
    onExperienceSave(limitedExperiences);
    setIsEditing(false);
    
    console.log(sortedExperiences.length > 3 
      ? "Experience updated: Only showing 3 most recent positions." 
      : "Experience updated successfully.");
  };

  // Ensure we only display the 3 most recent experiences
  const displayExperiences = experiences && experiences.length > 3 
    ? experiences.slice(0, 3) 
    : experiences;

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
          {displayExperiences && displayExperiences.length > 0 ? (
            displayExperiences.map((exp, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary">
                <h3 className="font-medium">{exp.title}</h3>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.years}</p>
                {exp.description && (
                  <p className="text-sm mt-2 text-muted-foreground/90">{exp.description}</p>
                )}
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
