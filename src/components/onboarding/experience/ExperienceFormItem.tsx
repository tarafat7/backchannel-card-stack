
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BriefcaseIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';
import { Experience } from '@/types';

interface ExperienceFormItemProps {
  exp: Experience & { startYear?: string; endYear?: string };
  index: number;
  years: string[];
  onExperienceChange: (index: number, field: string, value: string) => void;
}

const ExperienceFormItem: React.FC<ExperienceFormItemProps> = ({ 
  exp, 
  index, 
  years,
  onExperienceChange
}) => {
  return (
    <motion.div 
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
          onChange={(e) => onExperienceChange(index, 'title', e.target.value)}
          placeholder="Product Manager"
          className="h-11"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`company-${index}`}>Company</Label>
        <Input 
          id={`company-${index}`}
          value={exp.company}
          onChange={(e) => onExperienceChange(index, 'company', e.target.value)}
          placeholder="Acme Inc."
          className="h-11"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor={`startYear-${index}`}>Started</Label>
          <Select 
            value={exp.startYear} 
            onValueChange={(value) => onExperienceChange(index, 'startYear', value)}
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
            onValueChange={(value) => onExperienceChange(index, 'endYear', value)}
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
          onChange={(e) => onExperienceChange(index, 'description', e.target.value.slice(0, 50))}
          placeholder="Brief description of your role (max 50 chars)"
          maxLength={50}
          className="resize-none h-20"
        />
        <div className="text-xs text-right text-muted-foreground">
          {exp.description.length}/50
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceFormItem;
