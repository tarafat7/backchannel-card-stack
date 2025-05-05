
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Twitter, Link as LinkIcon } from 'lucide-react';

type BusinessCardProps = {
  card: BusinessCardType;
  isPreview?: boolean;
  onClick?: () => void;
};

const BusinessCard = ({ card, isPreview = false, onClick }: BusinessCardProps) => {
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

  return (
    <div
      className={`business-card ${solidBgColor} ${isPreview ? 'w-full h-56' : 'w-full sm:w-60 h-36'}`}
      style={{ color: card.design.textColor }}
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
            <h3 className="font-semibold text-sm truncate">{card.name}</h3>
            <p className="text-xs opacity-90 truncate">{card.title}</p>
            <p className="text-xs opacity-70 truncate">{card.company}</p>
          </div>
        </div>
        
        {card.status && (
          <div className="px-2 py-1 bg-black/10 rounded text-xs mt-2 backdrop-blur-sm w-fit">
            {card.status}
          </div>
        )}
        
        <div className="mt-2">
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

          {card.links && card.links.length > 0 && (
            <div className="flex gap-1">
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
