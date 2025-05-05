
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Linkedin, Lock, ShieldCheck } from 'lucide-react';

// Mock LinkedIn data for demo
const mockLinkedInData = {
  name: "Alex Morgan",
  experiences: [
    { 
      title: "Product Designer", 
      company: "Vercel", 
      years: "2022 - Present" 
    },
    { 
      title: "UX Designer", 
      company: "Notion", 
      years: "2019 - 2022" 
    },
    { 
      title: "UI Designer", 
      company: "Figma", 
      years: "2016 - 2019" 
    }
  ],
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
};

interface LinkedInImportProps {
  onImportComplete: (data: any) => void;
}

const LinkedInImport: React.FC<LinkedInImportProps> = ({ onImportComplete }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isImporting) {
      interval = setInterval(() => {
        setImportProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // When progress reaches 100%, complete the import
            setTimeout(() => {
              onImportComplete({
                experiences: mockLinkedInData.experiences,
              });
              setIsImporting(false);
            }, 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isImporting, onImportComplete]);

  const handleLinkedInImport = () => {
    setIsImporting(true);
    setImportProgress(0);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-gradient-to-br from-primary/20 to-primary/10 p-6 rounded-full mb-6">
          <ShieldCheck className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Import your experience</h2>
        <p className="text-muted-foreground text-center max-w-xs">
          Join our exclusive community by securely importing your professional experience
        </p>
      </div>
      
      <div className="glass-card p-6 mb-8 rounded-xl border border-white/10">
        <div className="flex items-center mb-4">
          <Lock className="w-4 h-4 text-primary mr-2" />
          <span className="text-sm text-muted-foreground">Secure, encrypted connection</span>
        </div>
        
        <Button 
          onClick={handleLinkedInImport}
          disabled={isImporting}
          className="w-full flex items-center justify-center gap-2 bg-[#0077B5] hover:bg-[#0077B5]/90 transition-all"
        >
          <Linkedin className="w-5 h-5" />
          {isImporting ? 'Connecting...' : 'Connect with LinkedIn'}
        </Button>
        
        {isImporting && (
          <div className="mt-6 space-y-2">
            <div className="flex justify-between mb-1 text-xs">
              <span>{importProgress < 100 ? 'Importing profile...' : 'Import complete!'}</span>
              <span>{importProgress}%</span>
            </div>
            <Progress value={importProgress} className="h-1.5" />
            <p className="text-xs text-muted-foreground text-center animate-pulse mt-2">
              {importProgress < 30 && "Establishing secure connection..."}
              {importProgress >= 30 && importProgress < 60 && "Retrieving professional history..."}
              {importProgress >= 60 && importProgress < 90 && "Analyzing experience..."}
              {importProgress >= 90 && "Finalizing import..."}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
        <ShieldCheck className="w-3 h-3" />
        <span>Your data is private and securely encrypted</span>
      </div>
    </div>
  );
};

export default LinkedInImport;
