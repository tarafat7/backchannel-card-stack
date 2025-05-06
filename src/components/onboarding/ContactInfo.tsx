
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';
import { PhoneIcon } from 'lucide-react';

interface ContactInfoProps {
  onContinue: (phoneNumber: string) => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ onContinue }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    if (digitsOnly.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    
    onContinue(phoneNumber);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium">Your contact information</h1>
        <p className="text-muted-foreground mt-2">How can others reach you?</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <PhoneIcon size={18} className="text-primary" />
            <Label htmlFor="phone" className="text-lg font-medium">Phone Number</Label>
          </div>
          
          <Input 
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className="h-12 text-lg"
          />
          
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          
          <p className="text-xs text-muted-foreground mt-2">
            Your phone number is only shared with connections you approve
          </p>
        </div>
        
        <Button type="submit" className="w-full h-12">
          Continue
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          You can skip this step and add your phone number later
        </p>
        <div className="flex justify-center">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => onContinue('')}
            className="text-sm"
          >
            Skip for now
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactInfo;
