
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Twitter, Link as LinkIcon, User, MessageCircle } from 'lucide-react';
import ProfessionalHistory from './ProfessionalHistory';
import { Badge } from './ui/badge';

type BusinessCardProps = {
  card: BusinessCardType;
  isPreview?: boolean;
  onClick?: () => void;
  showHistory?: boolean;
  inStack?: boolean; // New prop to determine if card is in stack view
};

const BusinessCard = ({ card, isPreview = false, onClick, showHistory = false, inStack = false }: BusinessCardProps) => {
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

  // Define solid background color based on the card's background style
  let solidBgColor = "bg-[#0f0f10]"; // Default dark background
  
  if (card.design.backgroundStyle.includes("bg-gradient-card-2")) {
    solidBgColor = "bg-[#5B61F3]"; // Solid color for gradient-2
  } else if (card.design.backgroundStyle.includes("bg-gradient-card-3")) {
    solidBgColor = "bg-[#2166EE]"; // Solid color for gradient-3
  } else if (card.design.backgroundStyle.includes("bg-black")) {
    solidBgColor = "bg-black"; // Solid black
  } else if (card.design.backgroundStyle.includes("bg-[#1A1A1A]")) {
    solidBgColor = "bg-[#1A1A1A]"; // Keep the original dark gray
  }

  // Determine if this is a 2nd-degree connection
  const isSecondDegree = card.connectionDegree === 2;

  return (
    <div
      className={`business-card ${solidBgColor} ${isPreview ? 'w-full h-56' : 'w-full'} ${showHistory ? 'h-auto' : 'h-56'} relative`}
      style={{ color: card.design.textColor }}
      onClick={handleClick}
    >
      {/* Badge for 2nd-degree connections */}
      {isSecondDegree && (
        <div className="absolute top-2 right-2 flex items-center bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
          <User className="w-3 h-3 mr-1" />
          <span>2° Connection</span>
        </div>
      )}
      
      <div className="relative h-full p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex items-start gap-3 justify-between">
          <div className="w-14 h-14 rounded-full bg-black/20 overflow-hidden border border-white/20 relative z-10">
            {card.avatar && (
              <img 
                src={card.avatar} 
                alt={card.name} 
                className="w-full h-full object-cover" 
              />
            )}
          </div>
          <div className={`flex-1 overflow-hidden ${inStack ? 'text-right' : ''}`}>
            <h3 className="font-semibold text-sm truncate">{card.name}</h3>
            <p className="text-xs opacity-90 truncate">{card.title}</p>
            <p className="text-xs opacity-70 truncate">{card.company}</p>
          </div>
        </div>
        
        {/* Speech bubble status for stacked view */}
        {inStack && card.status && (
          <div className="relative -mt-8 ml-16">
            <div className="speech-bubble px-3 py-1.5 bg-black/30 backdrop-blur-sm rounded-xl text-xs max-w-[200px] relative before:content-[''] before:absolute before:left-[-6px] before:top-[6px] before:border-t-[6px] before:border-r-[6px] before:border-b-[6px] before:border-t-transparent before:border-r-black/30 before:border-b-transparent">
              <MessageCircle className="w-3 h-3 inline-block mr-1 -translate-y-[1px]" />
              <span>{card.status}</span>
            </div>
          </div>
        )}
        
        {/* Regular status for expanded view */}
        {!inStack && card.status && (
          <div className="px-2 py-1 bg-black/10 rounded text-xs mt-2 backdrop-blur-sm w-fit">
            {card.status}
          </div>
        )}
        
        {showHistory && (
          <div className="mt-3 mb-2">
            <ProfessionalHistory id={card.id} />
          </div>
        )}
        
        <div className="mt-2">
          {card.expertiseAreas && card.expertiseAreas.length > 0 && (
            <div className={`flex flex-wrap gap-1 mb-2 ${inStack ? 'justify-end' : ''}`}>
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

          {card.links && card.links.length > 0 && (
            <div className={`flex gap-1 ${inStack ? 'justify-end' : ''}`}>
              {card.links.slice(0, 3).map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="social-icon-button"
                >
                  {getSocialIcon(link.type)}
                </a>
              ))}
              {card.links.length > 3 && (
                <div className="social-icon-button">
                  <span className="text-xs font-semibold">+{card.links.length - 3}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
