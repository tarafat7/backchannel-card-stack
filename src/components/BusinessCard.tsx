
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Twitter, Link as LinkIcon, User } from 'lucide-react';
import ProfessionalHistory from './ProfessionalHistory';

type BusinessCardProps = {
  card: BusinessCardType;
  isPreview?: boolean;
  onClick?: () => void;
  showHistory?: boolean;
};

const BusinessCard = ({ card, isPreview = false, onClick, showHistory = false }: BusinessCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

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

  // Get background style from card design
  const backgroundStyle = card.design.backgroundStyle;
  
  // Prepare inline style based on background style
  const cardStyle: React.CSSProperties = {};
  
  // Extract custom color if it exists
  const colorMatch = backgroundStyle.match(/bg-\[(#[0-9a-fA-F]+)\]/);
  if (colorMatch && colorMatch[1]) {
    cardStyle.backgroundColor = colorMatch[1];
  }
  
  // Extract pattern if it exists
  const patternMatch = backgroundStyle.match(/bg-\[url\('([^']+)'\)\]/);
  
  // Generate class names with hover effects
  let classNames = `business-card ${isPreview ? 'w-full h-56' : 'w-full'} ${showHistory ? 'h-auto' : 'h-56'} relative transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10`;
  
  // Add background classes based on what we have
  // If pattern exists, add it
  if (patternMatch) {
    classNames += ` bg-[url('${patternMatch[1]}')]`;
  }
  
  // If not a custom color but has gradient or solid background, add it
  if (!colorMatch && !backgroundStyle.includes('bg-[url')) {
    // This handles gradients and Tailwind color classes
    const nonPatternParts = backgroundStyle.split(' ').filter(part => !part.includes('bg-[url')).join(' ');
    if (nonPatternParts) {
      classNames += ` ${nonPatternParts}`;
    }
  } else if (!colorMatch) {
    // Check if there are any non-pattern backgrounds to add
    const nonPatternBgs = backgroundStyle
      .split(' ')
      .filter(part => !part.includes('bg-[url') && part.startsWith('bg-'))
      .join(' ');
    
    if (nonPatternBgs) {
      classNames += ` ${nonPatternBgs}`;
    }
  }

  // Determine if this is a 2nd-degree connection
  const isSecondDegree = card.connectionDegree === 2;

  return (
    <div
      className={classNames}
      style={{ color: card.design.textColor, ...cardStyle }}
      onClick={handleClick}
    >
      <div className="relative h-full p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-full bg-black/20 overflow-hidden border border-white/20">
            {card.avatar && (
              <img 
                src={card.avatar} 
                alt={card.name} 
                className="w-full h-full object-cover" 
              />
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center">
              <h3 className="font-semibold text-sm truncate">{card.name}</h3>
              {isSecondDegree && (
                <span className="ml-1 text-xs px-1.5 py-0.5 bg-black/30 rounded-full">
                  2º
                </span>
              )}
            </div>
            <p className="text-xs opacity-90 truncate">{card.title}</p>
            <p className="text-xs opacity-70 truncate">{card.company}</p>
          </div>
        </div>
        
        {card.status && (
          <div className="px-2 py-1 bg-black/10 rounded text-xs mt-2 backdrop-blur-sm w-fit">
            {card.status}
          </div>
        )}
        
        {showHistory && (
          <div className="mt-3 mb-2">
            <ProfessionalHistory id={card.id} />
          </div>
        )}
        
        <div className="mt-auto">
          {card.expertiseAreas && card.expertiseAreas.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {card.expertiseAreas.slice(0, isPreview ? 5 : 2).map((area, index) => (
                <span key={index} className="chip text-[10px]">
                  {area}
                </span>
              ))}
              {card.expertiseAreas.length > (isPreview ? 5 : 2) && (
                <span className="chip text-[10px]">+{card.expertiseAreas.length - (isPreview ? 5 : 2)}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
