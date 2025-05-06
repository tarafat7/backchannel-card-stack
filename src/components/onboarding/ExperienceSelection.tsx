import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Experience } from '@/context/AppContext';

interface ExperienceSelectionProps {
  experiences: Experience[];
  selectedExpertise: string[];
  onExpertiseToggle: (area: string) => void;
  onContinue: () => void;
  expertise: string[];
}

const ExperienceSelection: React.FC<ExperienceSelectionProps> = ({ 
  experiences, 
  selectedExpertise, 
  onExpertiseToggle, 
  onContinue,
  expertise 
}) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Your experience</h2>
      
      <div className="space-y-4 mb-8">
        {experiences.map((exp, index) => (
          <div key={index} className="p-4 rounded-lg bg-secondary/50 backdrop-blur-sm border border-white/5 flex justify-between items-center">
            <div>
              <h3 className="font-medium">{exp.title}</h3>
              <p className="text-sm text-muted-foreground">{exp.company}</p>
              <p className="text-xs text-muted-foreground">{exp.years}</p>
            </div>
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
        ))}
      </div>
      
      <h3 className="text-lg font-medium mb-4">Select your expertise (max 5)</h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {expertise.map((area) => (
          <button
            key={area}
            onClick={() => onExpertiseToggle(area)}
            className={`chip ${selectedExpertise.includes(area) ? 'chip-selected' : ''}`}
          >
            {area}
          </button>
        ))}
      </div>
      
      <Button 
        onClick={onContinue} 
        className="w-full"
        disabled={selectedExpertise.length === 0}
      >
        Continue
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default ExperienceSelection;
