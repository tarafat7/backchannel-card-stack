
import React from 'react';
import { Input } from "@/components/ui/input";

interface Link {
  type: string;
  url: string;
}

interface SocialLinksEditorProps {
  links: Link[];
  handleLinkChange: (index: number, field: 'type' | 'url', value: string) => void;
}

const SocialLinksEditor: React.FC<SocialLinksEditorProps> = ({ links, handleLinkChange }) => {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Social links</label>
      <div className="space-y-2">
        {links.map((link, index) => (
          <div key={index} className="flex gap-2">
            <Input 
              value={link.type} 
              onChange={(e) => handleLinkChange(index, 'type', e.target.value)} 
              placeholder="Type"
              className="bg-secondary/50 backdrop-blur-sm border border-white/10 w-1/3"
            />
            <Input 
              value={link.url} 
              onChange={(e) => handleLinkChange(index, 'url', e.target.value)} 
              placeholder="URL"
              className="bg-secondary/50 backdrop-blur-sm border border-white/10 flex-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksEditor;
