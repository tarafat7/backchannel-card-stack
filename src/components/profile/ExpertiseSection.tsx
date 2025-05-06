
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import ExpertiseEditor from './ExpertiseEditor';

interface ExpertiseSectionProps {
  expertiseAreas: string[];
  onExpertiseSave: (expertiseAreas: string[]) => void;
  updateCard?: boolean;
}

const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ 
  expertiseAreas, 
  onExpertiseSave,
  updateCard = true
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleExpertiseSave = (updatedExpertise: string[]) => {
    onExpertiseSave(updatedExpertise);
    setIsEditing(false);
    console.log("Expertise updated successfully");
  };

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium text-muted-foreground">Your Expertise</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
      </div>
      
      {isEditing ? (
        <ExpertiseEditor 
          selectedExpertise={expertiseAreas || []}
          onSave={handleExpertiseSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {expertiseAreas && expertiseAreas.length > 0 ? (
            expertiseAreas.map((area, index) => (
              <span key={index} className="chip">
                {area}
              </span>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No expertise areas selected</p>
          )}
        </div>
      )}
    </section>
  );
};

export default ExpertiseSection;
