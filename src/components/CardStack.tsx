
import React, { useState } from 'react';
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import BusinessCard from './BusinessCard';
import { ChevronUp, ChevronDown } from 'lucide-react';

type CardStackProps = {
  cards: BusinessCardType[];
  onCardClick: (id: string) => void;
};

const CardStack: React.FC<CardStackProps> = ({ cards, onCardClick }) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  
  const handleCardClick = (index: number, id: string) => {
    if (expandedCardIndex === index) {
      onCardClick(id);
    } else {
      setExpandedCardIndex(index);
    }
  };

  const handleCollapseStack = () => {
    setExpandedCardIndex(null);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-4 pt-12 pb-12">
      {/* Main card stack */}
      {cards.map((card, index) => {
        // Create a unique key by combining the card id and index
        const uniqueKey = `card-${card.id}-${index}`;
        const isExpanded = expandedCardIndex === index;
        const zIndex = cards.length - index;
        const isActive = expandedCardIndex === null || isExpanded;
        const isPrevious = expandedCardIndex !== null && index < expandedCardIndex;
        const isNext = expandedCardIndex !== null && index > expandedCardIndex;
        
        // Calculate position based on state
        let translateY = index * 12; // Default stacked position
        
        if (expandedCardIndex !== null) {
          if (isExpanded) {
            translateY = 0; // Focused card at the top
          } else if (isPrevious) {
            translateY = -100; // Cards above the focused card
          } else if (isNext) {
            translateY = 100 + (index - expandedCardIndex - 1) * 30; // Cards below the focused card
          }
        }
        
        return (
          <div
            key={uniqueKey}
            className={`absolute w-full transition-all duration-300 ease-in-out cursor-pointer
              ${isExpanded ? 'scale-100' : 'scale-95'}
              ${isActive ? 'opacity-100' : 'opacity-80'}
              ${isPrevious ? 'pointer-events-none' : ''}
            `}
            style={{
              transform: `translateY(${translateY}px) ${isExpanded ? 'scale(1)' : ''}`,
              zIndex: zIndex,
            }}
            onClick={() => handleCardClick(index, card.id)}
          >
            <div className="relative">
              <div className="card-shadow">
                <BusinessCard card={card} isPreview={false} />
              </div>
              {isExpanded && (
                <button
                  className="absolute top-2 right-2 bg-black/40 p-1 rounded-full"
                  onClick={handleCollapseStack}
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
              )}
              {!isExpanded && expandedCardIndex === null && index === 0 && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-[-20px]">
                  <div className="bg-primary/20 backdrop-blur-sm p-1 rounded-full">
                    <ChevronUp className="w-4 h-4 text-primary" />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      
      {/* Empty state message */}
      {cards.length === 0 && (
        <div className="text-center p-8 bg-secondary/50 rounded-xl border border-white/5">
          <p className="text-muted-foreground">No business cards yet</p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Connect with others to start building your network
          </p>
        </div>
      )}
      
      {/* Extra spacing at the bottom to allow for expansion */}
      {expandedCardIndex !== null && <div className="h-[400px]"></div>}
    </div>
  );
};

export default CardStack;
