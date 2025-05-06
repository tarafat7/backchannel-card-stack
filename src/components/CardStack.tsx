
import React, { useState } from 'react';
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import { ScrollArea } from './ui/scroll-area';
import CardStackItem from './card-stack/CardStackItem';
import EmptyStateMessage from './card-stack/EmptyStateMessage';
import ExpandIndicator from './card-stack/ExpandIndicator';

type CardStackProps = {
  cards: BusinessCardType[];
  onCardClick: (id: string) => void;
};

const CardStack: React.FC<CardStackProps> = ({ cards, onCardClick }) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const [showTimelineIndex, setShowTimelineIndex] = useState<number | null>(null);
  
  const handleCardClick = (index: number, id: string) => {
    if (expandedCardIndex === index) {
      // If the card is already expanded, collapse it back
      handleCollapseStack();
    } else {
      setExpandedCardIndex(index);
      setShowTimelineIndex(index); // Automatically show timeline when expanding a card
    }
  };

  const handleCollapseStack = () => {
    setExpandedCardIndex(null);
    setShowTimelineIndex(null);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <ScrollArea className="h-[80vh] rounded-md" style={{ scrollBehavior: 'smooth' }}>
        {/* Main card stack */}
        <div className="relative min-h-[500px] pt-4 pb-8">
          {cards.map((card, index) => {
            // Create a unique key by combining the card id and index
            const uniqueKey = `card-${card.id}-${index}`;
            const isExpanded = expandedCardIndex === index;
            const showTimeline = showTimelineIndex === index;
            const zIndex = expandedCardIndex === null 
              ? cards.length - index  // In collapsed state, first card has highest z-index
              : (index === expandedCardIndex ? 10 : (index < expandedCardIndex ? 1 : 5 - (index - expandedCardIndex)));
            
            // Invert the order for display so first card is on top
            const displayIndex = expandedCardIndex === null ? 
              (cards.length - 1) - index : index;
            
            // Calculate position based on state
            let translateY = 0;
            let opacity = 1;
            
            if (expandedCardIndex === null) {
              // When no card is expanded, create a stacked effect showing the top of each card
              // Invert the calculation so first card is on top, later cards peek from underneath
              translateY = displayIndex * 45; // Stack cards with visible top portions
            } else {
              if (index === expandedCardIndex) {
                // This is the expanded card, show it at the top
                translateY = 0;
              } else if (index < expandedCardIndex) {
                // Cards that should be above the expanded card (hidden off-screen)
                translateY = -500;
                opacity = 0;
              } else {
                // Cards that should be below the expanded card, showing their tops
                translateY = 250 + ((index - expandedCardIndex) * 45);
              }
            }

            return (
              <CardStackItem
                key={uniqueKey}
                card={card}
                index={index}
                isExpanded={isExpanded}
                showTimeline={showTimeline}
                expandedCardIndex={expandedCardIndex}
                zIndex={zIndex}
                translateY={translateY}
                opacity={opacity}
                onCardClick={() => handleCardClick(index, card.id)}
                onCollapseStack={handleCollapseStack}
              />
            );
          })}
          
          {expandedCardIndex === null && cards.length > 0 && <ExpandIndicator />}
        </div>
        
        {/* Empty state message */}
        {cards.length === 0 && <EmptyStateMessage />}
      </ScrollArea>
    </div>
  );
};

export default CardStack;
