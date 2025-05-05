
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

  // Determine the background style based on the card's design
  const backgroundStyle = {
    ...(card.design.backgroundStyle.includes('url(') 
      ? { background: card.design.backgroundStyle }
      : card.design.backgroundStyle.includes('linear-gradient')
        ? { background: card.design.backgroundStyle }
        : { backgroundColor: card.design.backgroundStyle }
    )
  };

  // Determine if this is a 2nd-degree connection
  const isSecondDegree = card.connectionDegree === 2;

  return (
    <div
      className={`business-card ${isPreview ? 'w-full h-56' : 'w-full'} ${showHistory ? 'h-auto' : 'h-56'} relative card-shadow`}
      style={{ 
        ...backgroundStyle,
        color: card.design.textColor === 'text-white' ? 'white' : 'black'
      }}
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
        
        {showHistory && (
          <div className="mt-3 mb-2">
            <ProfessionalHistory id={card.id} />
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
