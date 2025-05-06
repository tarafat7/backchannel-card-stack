import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from 'framer-motion';
import { BriefcaseIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

// Updated interface to match the expected structure in Onboarding.tsx
interface Experience {
  title: string;
  company: string;
  years: string;
  description: string;
  // Keep these for internal component use
  startYear?: string;
  endYear?: string;
}

interface ExperienceInputProps {
  onContinue: (experiences: Experience[]) => void;
  currentTitle?: string;
  currentCompany?: string;
}

const ExperienceInput: React.FC<ExperienceInputProps> = ({ onContinue, currentTitle = '', currentCompany = '' }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());
  
  const [experiences, setExperiences] = useState<Experience[]>([
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

  // Update years field whenever startYear or endYear changes
  const updateYearsField = (index: number, startYear: string, endYear: string) => {
    const updatedExperiences = [...experiences];
    const yearsValue = endYear === 'Present' 
      ? `${startYear} - Present` 
      : (startYear && endYear) ? `${startYear} - ${endYear}` : '';
    
    updatedExperiences[index] = { 
      ...updatedExperiences[index], 
      years: yearsValue
    };
    
    setExperiences(updatedExperiences);
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    
    // Update the years field if startYear or endYear was changed
    if (field === 'startYear' || field === 'endYear') {
      const exp = updatedExperiences[index];
      updateYearsField(
        index, 
        field === 'startYear' ? value : exp.startYear || '', 
        field === 'endYear' ? value : exp.endYear || ''
      );
    }
    
    setExperiences(updatedExperiences);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if at least one experience is filled
    const hasOneExperience = experiences.some(exp => 
      exp.title.trim() && exp.company.trim() && exp.startYear
    );
    
    if (!hasOneExperience) {
      setError('Please add at least one work experience');
      return;
    }
    
    // Filter out empty experiences
    const filledExperiences = experiences.filter(exp => 
      exp.title.trim() && exp.company.trim() && exp.startYear
    );
    
    // Make sure all experiences have the years field properly set
    const formattedExperiences = filledExperiences.map(exp => ({
      title: exp.title,
      company: exp.company,
      years: exp.years || (exp.endYear === 'Present' 
        ? `${exp.startYear} - Present` 
        : `${exp.startYear} - ${exp.endYear}`),
      description: exp.description
    }));
    
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
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor={`startYear-${index}`}>Started</Label>
                <Select 
                  value={exp.startYear} 
                  onValueChange={(value) => handleExperienceChange(index, 'startYear', value)}
                >
                  <SelectTrigger id={`startYear-${index}`} className="h-11">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-[200px]">
                      {years.map((year) => (
                        <SelectItem key={`start-${year}`} value={year}>{year}</SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`endYear-${index}`}>Ended</Label>
                <Select 
                  value={exp.endYear} 
                  onValueChange={(value) => handleExperienceChange(index, 'endYear', value)}
                >
                  <SelectTrigger id={`endYear-${index}`} className="h-11">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Present">Present</SelectItem>
                    <ScrollArea className="h-[200px]">
                      {years.map((year) => (
                        <SelectItem key={`end-${year}`} value={year}>{year}</SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
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
