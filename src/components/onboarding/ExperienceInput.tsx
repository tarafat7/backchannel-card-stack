
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from 'framer-motion';
import { BriefcaseIcon } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  years: string;
  description: string;
}

interface ExperienceInputProps {
  onContinue: (experiences: Experience[]) => void;
}

const ExperienceInput: React.FC<ExperienceInputProps> = ({ onContinue }) => {
  const [experiences, setExperiences] = useState<Experience[]>([
    { title: '', company: '', years: '', description: '' },
    { title: '', company: '', years: '', description: '' },
    { title: '', company: '', years: '', description: '' }
  ]);
  const [error, setError] = useState('');

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    setExperiences(updatedExperiences);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if at least one experience is filled
    const hasOneExperience = experiences.some(exp => 
      exp.title.trim() && exp.company.trim() && exp.years.trim()
    );
    
    if (!hasOneExperience) {
      setError('Please add at least one work experience');
      return;
    }
    
    // Filter out empty experiences
    const filledExperiences = experiences.filter(exp => 
      exp.title.trim() && exp.company.trim() && exp.years.trim()
    );
    
    onContinue(filledExperiences);
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
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="glass-card p-6 rounded-xl space-y-4"
          >
            <div className="flex items-center gap-2 mb-2 text-primary">
              <BriefcaseIcon size={18} />
              <h3 className="font-medium">Experience {index + 1}</h3>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`title-${index}`}>Job Title</Label>
              <Input 
                id={`title-${index}`}
                value={exp.title}
                onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                placeholder="Product Manager"
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`company-${index}`}>Company</Label>
              <Input 
                id={`company-${index}`}
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                placeholder="Acme Inc."
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`years-${index}`}>Years</Label>
              <Input 
                id={`years-${index}`}
                value={exp.years}
                onChange={(e) => handleExperienceChange(index, 'years', e.target.value)}
                placeholder="2020 - Present"
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`description-${index}`}>Brief Description (optional)</Label>
              <Textarea 
                id={`description-${index}`}
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, 'description', e.target.value.slice(0, 50))}
                placeholder="Brief description of your role (max 50 chars)"
                maxLength={50}
                className="resize-none h-20"
              />
              <div className="text-xs text-right text-muted-foreground">
                {exp.description.length}/50
              </div>
            </div>
          </motion.div>
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
