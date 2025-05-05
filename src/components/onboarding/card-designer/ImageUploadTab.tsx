
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ImageUploadProps } from './types';

const ImageUploadTab: React.FC<ImageUploadProps> = ({ 
  handleImageUpload, 
  customImage 
}) => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="image-upload" className="text-sm font-medium block mb-2">Upload Image</label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-2"
          />
          
          {customImage && (
            <div className="relative w-full h-24 rounded-md overflow-hidden">
              <img 
                src={customImage} 
                alt="Custom background" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <p className="text-xs text-muted-foreground mt-2">
            Upload an image to use as a custom background for your card.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploadTab;
