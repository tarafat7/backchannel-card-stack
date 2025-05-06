
import React from 'react';
import { Twitter, Github, Link as LinkIcon } from 'lucide-react';

type LinkType = {
  type: string;
  url: string;
};

type CardLinksProps = {
  links?: LinkType[];
};

const CardLinks = ({ links }: CardLinksProps) => {
  if (!links || links.length === 0) return null;
  
  // Filter out links with empty URLs
  const validLinks = links.filter(link => link.url);
  if (validLinks.length === 0) return null;
  
  const getSocialIcon = (type: string) => {
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
    <div className="mt-6">
      <h3 className="text-sm opacity-80 mb-2">Links</h3>
      <div className="flex gap-2">
        {validLinks.map((link, index) => (
          <a 
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-button"
          >
            {getSocialIcon(link.type)}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CardLinks;
