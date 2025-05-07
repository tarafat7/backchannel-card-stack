
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Experience } from '@/context/AppContext';
import { Input } from "@/components/ui/input";

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
  const [customExpertise, setCustomExpertise] = React.useState('');

  const handleAddCustomExpertise = () => {
    if (customExpertise.trim() && !selectedExpertise.includes(customExpertise.trim())) {
      if (selectedExpertise.length < 5) {
        onExpertiseToggle(customExpertise.trim());
        setCustomExpertise('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomExpertise();
    }
  };

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
      
      <h3 className="text-lg font-medium mb-4">How can you be helpful? (max 5)</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
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
      
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-2">Add your own:</p>
        <div className="flex gap-2">
          <Input 
            value={customExpertise} 
            onChange={(e) => setCustomExpertise(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="E.g., Podcast booking, Public speaking"
            className="flex-1"
          />
          <Button onClick={handleAddCustomExpertise} type="button">
            Add
          </Button>
        </div>
      </div>
      
      {selectedExpertise.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Selected:</p>
          <div className="flex flex-wrap gap-2">
            {selectedExpertise.map((area, index) => (
              <div key={index} className="chip chip-selected flex items-center gap-1">
                <span>{area}</span>
                <button 
                  onClick={() => onExpertiseToggle(area)} 
                  className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary-foreground"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
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
