
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from 'framer-motion';

interface UserBasicInfoProps {
  onContinue: (data: {name: string, title: string, company: string}) => void;
}

const UserBasicInfo: React.FC<UserBasicInfoProps> = ({ onContinue }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !title.trim() || !company.trim()) {
      setError('All fields are required');
      return;
    }
    
    onContinue({ name, title, company });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto w-full"
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-medium">Tell us about yourself</h1>
        <p className="text-muted-foreground mt-2">Let's start with the basics</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name"
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Current Job Title</Label>
          <Input 
            id="title"
            type="text"
            placeholder="Product Designer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">Current Company</Label>
          <Input 
            id="company"
            type="text"
            placeholder="Acme Inc."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="h-12"
          />
        </div>
        
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

export default UserBasicInfo;
