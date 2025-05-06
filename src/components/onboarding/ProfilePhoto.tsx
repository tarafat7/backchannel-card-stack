
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ImageIcon, Upload, Camera } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface ProfilePhotoProps {
  avatarUrl: string;
  onContinue: (avatarUrl?: string) => void;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ avatarUrl, onContinue }) => {
  const [previewUrl, setPreviewUrl] = useState<string>(avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLinkedInClick = () => {
    // In a real app, this would initiate OAuth with LinkedIn
    toast({
      title: "LinkedIn integration",
      description: "This would connect to LinkedIn in a production environment"
    });
  };

  const handleContinue = () => {
    onContinue(previewUrl);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6">Profile photo</h2>
      
      <div className="mb-8 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-secondary/70 backdrop-blur-sm flex items-center justify-center mb-4 overflow-hidden border border-white/10 ring-2 ring-primary/20">
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        
        <div className="flex gap-2 flex-wrap justify-center">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleUploadClick}
            className="flex items-center gap-1 bg-secondary/50 backdrop-blur-sm border border-white/10"
          >
            <Upload className="w-4 h-4" />
            Upload
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLinkedInClick}
            className="flex items-center gap-1 bg-secondary/50 backdrop-blur-sm border border-white/10"
          >
            <Camera className="w-4 h-4" />
            Take Photo
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLinkedInClick}
            className="flex items-center gap-1 bg-secondary/50 backdrop-blur-sm border border-white/10"
          >
            <ArrowRight className="w-4 h-4" />
            Use LinkedIn photo
          </Button>
        </div>
      </div>
      
      <Button 
        onClick={handleContinue} 
        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
      >
        Continue
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default ProfilePhoto;
