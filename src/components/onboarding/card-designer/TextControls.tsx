
import React from 'react';
import { Input } from "@/components/ui/input";

interface TextControlsProps {
  textColor: string;
  setTextColor: (color: string) => void;
  status: string;
  setStatus: (status: string) => void;
  links: Array<{type: string, url: string}>;
  handleLinkChange: (index: number, field: 'type' | 'url', value: string) => void;
}

const TextControls: React.FC<TextControlsProps> = ({
  textColor,
  setTextColor,
  status,
  setStatus,
  links,
  handleLinkChange
}) => {
  return (
    <>
      <div className="mt-4">
        <label className="text-sm font-medium mb-2 block">Text color</label>
        <div className="flex gap-2">
          <button
            className={`w-10 h-10 rounded-full bg-black ${textColor === 'text-white' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setTextColor('text-white')}
          />
          <button
            className={`w-10 h-10 rounded-full bg-white ${textColor === 'text-black' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setTextColor('text-black')}
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-2 block">Status</label>
        <Input 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          placeholder="What are you up to now?"
          className="bg-secondary/50 backdrop-blur-sm border border-white/10"
        />
      </div>
      
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
    </>
  );
};

export default TextControls;
