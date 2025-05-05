
import React from 'react';
import { BusinessCard as BusinessCardType } from '../../context/AppContext';
import BusinessCard from '../BusinessCard';
import { ChevronDown, MessageCircle, Link } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type CardStackItemProps = {
  card: BusinessCardType;
  index: number;
  expandedCardIndex: number | null;
  showTimelineIndex: number | null;
  isExpanded: boolean;
  zIndex: number;
  translateY: number;
  opacity: number;
  onCardClick: (index: number, id: string) => void;
  onCollapseStack: () => void;
  onRequestIntro: (e: React.MouseEvent, name: string, mutualConnection?: string) => void;
  onSendMessage: (e: React.MouseEvent, name: string) => void;
};

const CardStackItem = ({ 
  card, 
  index, 
  expandedCardIndex, 
  showTimelineIndex,
  isExpanded,
  zIndex,
  translateY,
  opacity,
  onCardClick,
  onCollapseStack,
  onRequestIntro,
  onSendMessage
}: CardStackItemProps) => {
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
        width: "100%"
      }}
    >
      <div className="relative">
        <div 
          className="wallet-card-shadow cursor-pointer"
          onClick={() => onCardClick(index, card.id)}
        >
          <BusinessCard 
            card={card} 
            isPreview={false}
            showHistory={showTimelineIndex === index} 
          />

          {/* Action button - different for 1st and 2nd degree connections */}
          {isExpanded && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {isSecondDegree && mutualConnectionName ? (
                    <button
                      className="absolute bottom-3 right-3 bg-primary/90 hover:bg-primary px-2 py-1 rounded-md shadow-lg z-20 flex items-center gap-1 text-white text-xs"
                      onClick={(e) => onRequestIntro(e, card.name, mutualConnectionName)}
                    >
                      Ask {mutualConnectionName.split(' ')[0]} for intro
                      <Link className="w-3.5 h-3.5 text-white" />
                    </button>
                  ) : (
                    <button
                      className="absolute bottom-3 right-3 bg-primary/90 hover:bg-primary px-2 py-1 rounded-md shadow-lg z-20 flex items-center gap-1 text-white text-xs"
                      onClick={(e) => onSendMessage(e, card.name)}
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
