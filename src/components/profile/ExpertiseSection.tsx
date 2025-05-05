
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import ExpertiseEditor from './ExpertiseEditor';

interface ExpertiseSectionProps {
  expertiseAreas: string[];
  onSave: (areas: string[]) => void;
}

const ExpertiseSection = ({ expertiseAreas, onSave }: ExpertiseSectionProps) => {
  const [isEditingExpertise, setIsEditingExpertise] = useState(false);
  
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium text-muted-foreground">Your Expertise</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsEditingExpertise(true)}
        >
          Edit
        </Button>
      </div>
      
      {isEditingExpertise ? (
        <ExpertiseEditor 
          selectedExpertise={expertiseAreas}
          onSave={onSave}
          onCancel={() => setIsEditingExpertise(false)}
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
