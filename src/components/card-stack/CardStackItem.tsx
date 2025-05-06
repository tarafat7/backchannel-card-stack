
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
  totalCards: number;
  currentPosition: number;
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
  isTopCard,
  totalCards,
  currentPosition
}) => {
  const isExpanded = expandedCardIndex === index;
  const showTimeline = showTimelineIndex === index;
  const zIndex = 100 - currentPosition; // Higher positions (near bottom visually) get higher z-index
  
  // Calculate position based on state
  let translateY = 0;
  let opacity = 1;
  
  if (expandedCardIndex === null) {
    // When no card is expanded, create the stacked effect from bottom to top
    // Each card is positioned from the bottom of the container
    // currentPosition is the distance from the bottom (higher number = closer to bottom)
    translateY = (currentPosition - 1) * 60; // Stack cards with visible headers (60px per card)
  } else {
    if (index === expandedCardIndex) {
      // This is the expanded card, show it at the top
      translateY = 0;
    } else if (index < expandedCardIndex) {
      // Cards that should be below the expanded card (closer to top of screen)
      // Hide these cards by moving them up off-screen
      translateY = -500;
      opacity = 0;
    } else {
      // Cards that should be above the expanded card (closer to bottom of screen)
      // These cards should be stacked below the expanded card
      translateY = 300 + ((index - expandedCardIndex) * 60);
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
        bottom: "0", // Position all cards from the bottom
        height: expandedCardIndex === null ? "80px" : (isExpanded ? "auto" : "80px"), // Only show header when collapsed
        overflow: "hidden",
        borderRadius: expandedCardIndex === null ? "0.75rem 0.75rem 0 0" : "0.75rem", // Round only top corners when stacked
      }}
    >
      <div className="relative h-full">
        <div 
          className="wallet-card-shadow cursor-pointer h-full"
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
              <ChevronUp className="w-4 h-4 text-primary" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardStackItem;
