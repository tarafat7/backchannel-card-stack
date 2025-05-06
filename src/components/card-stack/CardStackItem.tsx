
import React from 'react';
import { BusinessCard as BusinessCardType } from '../../context/AppContext';
import BusinessCard from '../BusinessCard';
import { ChevronDown, Twitter, Github, Link as LinkIcon } from 'lucide-react';
import { Button } from '../ui/button';
import ActionButtons from './ActionButtons';

type CardStackItemProps = {
  card: BusinessCardType;
  index: number;
  isExpanded: boolean;
  showTimeline: boolean;
  expandedCardIndex: number | null;
  zIndex: number;
  translateY: number;
  opacity: number;
  onCardClick: () => void;
  onCollapseStack: () => void;
};

const CardStackItem: React.FC<CardStackItemProps> = ({
  card,
  index,
  isExpanded,
  showTimeline,
  zIndex,
  translateY,
  opacity,
  onCardClick,
  onCollapseStack
}) => {
  // Determine if this is a second-degree connection
  const isSecondDegree = card.connectionDegree === 2;
  
  // Get the first mutual connection name if available
  const mutualConnectionName = card.mutualConnections && card.mutualConnections.length > 0 
    ? card.mutualConnections[0] 
    : null;

  // Check if the card has connection event information
  const hasConnectionEvent = card.connectionDegree === 1 && Boolean(card.connectionEvent);
  
  return (
    <div
      className="absolute w-full transition-all duration-300 ease-in-out"
      style={{
        transform: `translateY(${translateY}px)`,
        zIndex: zIndex,
        opacity: opacity,
        width: "100%"
      }}
    >
      <div className="relative">
        <div 
          className="wallet-card-shadow cursor-pointer"
          onClick={onCardClick}
        >
          <BusinessCard 
            card={card} 
            isPreview={false}
            showHistory={showTimeline} 
          />

          {/* Social links and action buttons at the bottom */}
          <div className="bg-background/40 backdrop-blur-sm w-full px-4 py-2">
            <div className="flex items-center justify-between">
              {/* Social links */}
              <div className="flex gap-1">
                {card.links && card.links.length > 0 && card.links.slice(0, 3).map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="social-icon-button"
                  >
                    {link.type === 'twitter' ? (
                      <Twitter className="w-4 h-4" />
                    ) : link.type === 'github' ? (
                      <Github className="w-4 h-4" />
                    ) : (
                      <LinkIcon className="w-4 h-4" />
                    )}
                  </a>
                ))}
                {card.links && card.links.length > 3 && (
                  <div className="social-icon-button">
                    <span className="text-xs font-semibold">+{card.links.length - 3}</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <ActionButtons 
                card={card} 
                isSecondDegree={isSecondDegree} 
                mutualConnectionName={mutualConnectionName} 
                hasConnectionEvent={hasConnectionEvent}
              />
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              className="bg-black/40 p-1 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                onCollapseStack();
              }}
            >
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardStackItem;
