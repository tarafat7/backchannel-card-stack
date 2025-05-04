
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
  const [cardOrder, setCardOrder] = useState<number[]>(Array.from({ length: cards.length }, (_, i) => i));
  
  const handleCardClick = (index: number, id: string) => {
    if (expandedCardIndex === index) {
      onCardClick(id);
    } else {
      setExpandedCardIndex(index);
      
      // When clicking a card, bring it to the front by updating the order
      const newOrder = [...cardOrder];
      const clickedCardPosition = newOrder.indexOf(index);
      
      // Remove the clicked card from its position
      newOrder.splice(clickedCardPosition, 1);
      // Add it to the beginning (top of the stack)
      newOrder.unshift(index);
      
      setCardOrder(newOrder);
    }
  };

  const handleCollapseStack = () => {
    setExpandedCardIndex(null);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-4 pt-12 pb-12">
      {/* Main card stack */}
      {cardOrder.map((originalIndex, displayIndex) => {
        const card = cards[originalIndex];
        const isExpanded = expandedCardIndex === originalIndex;
        const zIndex = cards.length - displayIndex;
        const isActive = expandedCardIndex === null || isExpanded;
        
        // Calculate position based on state
        let translateY = displayIndex * 12; // Default stacked position
        
        if (expandedCardIndex !== null) {
          if (isExpanded) {
            translateY = 0; // Focused card at the top
          } else if (cardOrder.indexOf(expandedCardIndex) > displayIndex) {
            translateY = -100; // Cards above the focused card
          } else {
            translateY = 100 + (displayIndex - cardOrder.indexOf(expandedCardIndex) - 1) * 30; // Cards below the focused card
          }
        }
        
        const uniqueKey = `card-${card.id}-${originalIndex}`;
        
        return (
          <div
            key={uniqueKey}
            className={`absolute w-full transition-all duration-300 ease-in-out cursor-pointer
              ${isExpanded ? 'scale-100' : 'scale-95'}
              ${!isActive ? 'pointer-events-none' : ''}
            `}
            style={{
              transform: `translateY(${translateY}px) ${isExpanded ? 'scale(1)' : ''}`,
              zIndex: zIndex,
              boxShadow: isExpanded ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => handleCardClick(originalIndex, card.id)}
          >
            <div className={`relative ${isExpanded ? 'ring-2 ring-primary ring-opacity-50' : ''}`}>
              <BusinessCard card={card} isPreview={false} />
              {isExpanded && (
                <button
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-1 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCollapseStack();
                  }}
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
              )}
              {!isExpanded && expandedCardIndex === null && displayIndex === 0 && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-[-20px]">
                  <div className="bg-primary/30 backdrop-blur-sm p-1 rounded-full">
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

