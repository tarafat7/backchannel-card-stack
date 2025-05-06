
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Twitter, Github, Link as LinkIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Link {
  type: string;
  url: string;
}

interface SocialLinksEditorProps {
  links: Link[];
  handleLinkChange: (index: number, field: 'type' | 'url', value: string) => void;
  addLink: () => void;
  removeLink: (index: number) => void;
  hasLinkError: boolean;
}

const linkTypes = ["Twitter", "GitHub", "Portfolio", "Other"];

const SocialLinksEditor: React.FC<SocialLinksEditorProps> = ({ 
  links, 
  handleLinkChange, 
  addLink, 
  removeLink,
  hasLinkError 
}) => {
  const getLinkIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'github':
        return <Github className="w-4 h-4" />;
      default:
        return <LinkIcon className="w-4 h-4" />;
    }
  };

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Social links</label>
      {hasLinkError && (
        <p className="text-sm text-destructive mb-2">Please fill at least one link</p>
      )}
      <div className="space-y-2">
        {links.map((link, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Select
              value={link.type}
              onValueChange={(value) => handleLinkChange(index, 'type', value)}
            >
              <SelectTrigger className="bg-secondary/50 backdrop-blur-sm border border-white/10 w-1/3">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {linkTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    <div className="flex items-center gap-2">
                      {getLinkIcon(type)}
                      {type}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input 
              value={link.url} 
              onChange={(e) => handleLinkChange(index, 'url', e.target.value)} 
              placeholder="URL"
              className="bg-secondary/50 backdrop-blur-sm border border-white/10 flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeLink(index)}
              className="h-10 w-10"
              disabled={links.length === 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addLink}
        className="mt-2 flex items-center gap-1 bg-secondary/50 backdrop-blur-sm border border-white/10"
      >
        <Plus className="h-4 w-4" />
        Add Link
      </Button>
    </div>
  );
};

export default SocialLinksEditor;
