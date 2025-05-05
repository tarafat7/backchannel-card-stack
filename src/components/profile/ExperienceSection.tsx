
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import ExperienceEditor from './ExperienceEditor';

interface Experience {
  title: string;
  company: string;
  years: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  onSave: (experiences: Experience[]) => void;
}

const ExperienceSection = ({ experiences, onSave }: ExperienceSectionProps) => {
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-medium text-muted-foreground">Your Experience</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsEditingExperience(true)}
        >
          Edit
        </Button>
      </div>
      
      {isEditingExperience ? (
        <ExperienceEditor 
          experiences={experiences}
          onSave={onSave}
          onCancel={() => setIsEditingExperience(false)}
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
