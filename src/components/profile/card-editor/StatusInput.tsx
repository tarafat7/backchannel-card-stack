
import React from 'react';
import { Input } from "@/components/ui/input";

interface StatusInputProps {
  status: string;
  onStatusChange: (status: string) => void;
  maxLength: number;
}

const StatusInput: React.FC<StatusInputProps> = ({ status, onStatusChange, maxLength }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      onStatusChange(value);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">What do you need right now?</label>
      <Input 
        value={status}
        onChange={handleStatusChange}
        placeholder="E.g., Looking for a product designer..."
        className="bg-secondary/50 backdrop-blur-sm border border-white/10"
        maxLength={maxLength}
      />
      <div className="text-xs text-muted-foreground mt-1">
        {status.length}/{maxLength} characters
      </div>
    </div>
  );
};

export default StatusInput;
