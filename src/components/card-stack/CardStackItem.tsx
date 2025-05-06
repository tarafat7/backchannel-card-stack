
import React from 'react';
import { BusinessCard as BusinessCardType } from '../../context/AppContext';
import BusinessCard from '../BusinessCard';
import { ChevronDown, ChevronUp, MessageCircle, Link } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type CardStackItemProps = {
  card: BusinessCardType;
  index: number;
  expandedCardIndex: number | null;
  showTimelineIndex: number | null;
  handleCardClick: (index: number, id: string) => void;
  handleCollapseStack: () => void;
  handleSendMessage: (e: React.MouseEvent, name: string, phoneNumber?: string) => void;
  handleRequestIntro: (e: React.MouseEvent, name: string, mutualConnection?: string) => void;
  isTopCard: boolean;
};

const CardStackItem: React.FC<CardStackItemProps> = ({
  card,
  index,
  expandedCardIndex,
  showTimelineIndex,
  handleCardClick,
  handleCollapseStack,
  handleSendMessage,
  handleRequestIntro,
  isTopCard
}) => {
  const isExpanded = expandedCardIndex === index;
  const showTimeline = showTimelineIndex === index;
  const zIndex = expandedCardIndex === null 
    ? 100 - index  // In collapsed state, first card has highest z-index
    : (index === expandedCardIndex ? 10 : (index < expandedCardIndex ? 1 : 5 - (index - expandedCardIndex)));
  
  // Calculate position based on state
  let translateY = 0;
  let opacity = 1;
  
  if (expandedCardIndex === null) {
    // When no card is expanded, create a stacked effect showing the top of each card
    // We want cards to stack from bottom to top, so reverse the stacking position
    translateY = -index * 45; // Negative values move cards upward
  } else {
    if (index === expandedCardIndex) {
      // This is the expanded card, show it at the top
      translateY = 0;
    } else if (index < expandedCardIndex) {
      // Cards that should be above the expanded card
      translateY = -250 - ((expandedCardIndex - index) * 45);
    } else {
      // Cards that should be below the expanded card, showing their tops
      translateY = 500;
      opacity = 0;
    }
  }

  // Determine if this is a second-degree connection
  const isSecondDegree = card.connectionDegree === 2;
  
  // Get the first mutual connection name if available
  const mutualConnectionName = card.mutualConnections && card.mutualConnections.length > 0 
    ? card.mutualConnections[0] 
    : null;

  return (
    <div
      className="absolute w-full transition-all duration-300 ease-in-out"
      style={{
        transform: `translateY(${translateY}px)`,
        zIndex: zIndex,
        opacity: opacity,
        width: "100%",
        bottom: expandedCardIndex === null ? `${index * 45}px` : "auto", // Position from bottom when stacked
        top: expandedCardIndex !== null ? "0" : "auto" // Position from top when expanded
      }}
    >
      <div className="relative">
        <div 
          className="wallet-card-shadow cursor-pointer"
          onClick={() => handleCardClick(index, card.id)}
        >
          <BusinessCard 
            card={card} 
            isPreview={false}
            showHistory={showTimeline} 
          />

          {/* Action button - different for 1st and 2nd degree connections */}
          {isExpanded && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {isSecondDegree && mutualConnectionName ? (
                    <button
                      className="absolute bottom-3 right-3 bg-primary/90 hover:bg-primary px-2 py-1 rounded-md shadow-lg z-20 flex items-center gap-1 text-white text-xs"
                      onClick={(e) => handleRequestIntro(e, card.name, mutualConnectionName)}
                      type="button"
                    >
                      Ask {mutualConnectionName.split(' ')[0]} for intro
                      <Link className="w-3.5 h-3.5 text-white" />
                    </button>
                  ) : (
                    <button
                      className="absolute bottom-3 right-3 bg-primary/90 hover:bg-primary px-2 py-1 rounded-md shadow-lg z-20 flex items-center gap-1 text-white text-xs"
                      onClick={(e) => handleSendMessage(e, card.name, card.phoneNumber)}
                      type="button"
                    >
                      Send message to {card.name.split(' ')[0]}
                      <MessageCircle className="w-3.5 h-3.5 text-white ml-1" />
                    </button>
                  )}
                </TooltipTrigger>
                <TooltipContent side="top">
                  {isSecondDegree ? "Request introduction" : `Message ${card.name.split(' ')[0]}`}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {isExpanded && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              className="bg-black/40 p-1 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                handleCollapseStack();
              }}
              type="button"
            >
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
        
        {expandedCardIndex === null && isTopCard && (
          <div className="absolute -top-4 left-0 right-0 flex justify-center">
            <div className="bg-primary/20 backdrop-blur-sm p-1 rounded-full">
              <ChevronDown className="w-4 h-4 text-primary" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardStackItem;
