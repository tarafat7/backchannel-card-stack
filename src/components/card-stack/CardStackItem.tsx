
import React from 'react';
import { BusinessCard as BusinessCardType } from '../../context/AppContext';
import BusinessCard from '../BusinessCard';
import { ChevronDown } from 'lucide-react';
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

          {/* Action buttons container at the bottom */}
          {isExpanded && (
            <div className="bg-background/40 backdrop-blur-sm w-full">
              <ActionButtons 
                card={card} 
                isSecondDegree={isSecondDegree} 
                mutualConnectionName={mutualConnectionName} 
                hasConnectionEvent={hasConnectionEvent}
              />
            </div>
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
