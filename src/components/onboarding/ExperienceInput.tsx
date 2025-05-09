
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import ExperienceFormItem from './experience/ExperienceFormItem';
import { calculateYearsField, hasOneCompleteExperience, prepareExperiencesForSubmission } from './experience/experienceUtils';
import { Experience } from '@/types';

interface ExperienceInputProps {
  onContinue: (experiences: Experience[]) => void;
  currentTitle?: string;
  currentCompany?: string;
}

const ExperienceInput: React.FC<ExperienceInputProps> = ({ onContinue, currentTitle = '', currentCompany = '' }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());
  
  const [experiences, setExperiences] = useState<(Experience & { startYear?: string; endYear?: string; })[]>([
    { 
      title: currentTitle, 
      company: currentCompany, 
      startYear: currentYear.toString(), 
      endYear: 'Present', 
      description: '',
      years: `${currentYear.toString()} - Present` 
    },
    { title: '', company: '', startYear: '', endYear: '', description: '', years: '' },
    { title: '', company: '', startYear: '', endYear: '', description: '', years: '' }
  ]);
  const [error, setError] = useState('');

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    
    // Update the years field if startYear or endYear was changed
    if (field === 'startYear' || field === 'endYear') {
      const exp = updatedExperiences[index];
      const startYear = field === 'startYear' ? value : (exp.startYear || '');
      const endYear = field === 'endYear' ? value : (exp.endYear || '');
      
      updatedExperiences[index].years = calculateYearsField(startYear, endYear);
    }
    
    setExperiences(updatedExperiences);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasOneCompleteExperience(experiences)) {
      setError('Please add at least one work experience');
      return;
    }
    
    const formattedExperiences = prepareExperiencesForSubmission(experiences);
    onContinue(formattedExperiences);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium">Your professional journey</h1>
        <p className="text-muted-foreground mt-2">Share your work history (most recent first)</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {experiences.map((exp, index) => (
          <ExperienceFormItem
            key={index}
            exp={exp}
            index={index}
            years={years}
            onExperienceChange={handleExperienceChange}
          />
        ))}
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        
        <Button type="submit" className="w-full h-12">
          Continue
        </Button>
      </form>
    </motion.div>
  );
};

export default ExperienceInput;
