
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface StatusInputProps {
  status: string;
  onStatusChange: (status: string) => void;
  maxLength: number;
}

const StatusInput: React.FC<StatusInputProps> = ({ status, onStatusChange, maxLength }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      onStatusChange(value);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">What do you need right now?</label>
      <Textarea 
        value={status} 
        onChange={handleChange} 
        placeholder="E.g., Looking for a product designer..."
        className="bg-secondary/50 backdrop-blur-sm border border-white/10 resize-none"
        maxLength={maxLength}
      />
      <div className="text-xs text-muted-foreground mt-1">
        {status.length}/{maxLength} characters
      </div>
    </div>
  );
};

export default StatusInput;
