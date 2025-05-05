
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ImageIcon, Upload } from 'lucide-react';

interface ProfilePhotoProps {
  avatarUrl: string;
  onContinue: () => void;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ avatarUrl, onContinue }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Profile photo</h2>
      
      <div className="mb-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-secondary/70 backdrop-blur-sm flex items-center justify-center mb-4 overflow-hidden border border-white/10 ring-2 ring-primary/20">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1 bg-secondary/50 backdrop-blur-sm border border-white/10">
            <Upload className="w-4 h-4" />
            Upload
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1 bg-secondary/50 backdrop-blur-sm border border-white/10">
            <ArrowRight className="w-4 h-4" />
            Use LinkedIn photo
          </Button>
        </div>
      </div>
      
      <Button 
        onClick={onContinue} 
        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
      >
        Continue
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default ProfilePhoto;
