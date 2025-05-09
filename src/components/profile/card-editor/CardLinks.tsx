
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from 'lucide-react';

interface Link {
  type: string;
  url: string;
}

interface CardLinksProps {
  links: Link[];
  onLinksChange: (links: Link[]) => void;
}

const CardLinks: React.FC<CardLinksProps> = ({ links, onLinksChange }) => {
  const handleLinkChange = (index: number, field: 'type' | 'url', value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    onLinksChange(newLinks);
  };

  const addLink = () => {
    onLinksChange([...links, { type: 'Twitter', url: '' }]);
  };

  const removeLink = (index: number) => {
    if (links.length > 1) {
      const newLinks = [...links];
      newLinks.splice(index, 1);
      onLinksChange(newLinks);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium mb-2 block">Social links</label>
      <div className="space-y-2">
        {links.map((link, index) => (
          <div key={index} className="flex gap-2 items-center">
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
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeLink(index)}
              disabled={links.length === 1}
              className="h-10 w-10"
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
        className="mt-2 flex items-center gap-1"
      >
        <Plus className="h-4 w-4" />
        Add Link
      </Button>
    </div>
  );
};

export default CardLinks;
