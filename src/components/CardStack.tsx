
import React, { useState } from 'react';
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import BusinessCard from './BusinessCard';
import { ChevronUp, ChevronDown } from 'lucide-react';
import StackedCard from './stack/StackedCard';
import EmptyStackState from './stack/EmptyStackState';

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

  if (cards.length === 0) {
    return <EmptyStackState />;
  }

  return (
    <div className="relative w-full max-w-md mx-auto mt-4 pt-12 pb-12">
      {cardOrder.map((originalIndex, displayIndex) => {
        const card = cards[originalIndex];
        const isExpanded = expandedCardIndex === originalIndex;
        const zIndex = cards.length - displayIndex;
        const isActive = expandedCardIndex === null || isExpanded;
        
        return (
          <StackedCard
            key={`card-${card.id}-${originalIndex}`}
            card={card}
            isExpanded={isExpanded}
            isActive={isActive}
            displayIndex={displayIndex}
            expandedCardIndex={expandedCardIndex}
            cardOrder={cardOrder}
            zIndex={zIndex}
            onCardClick={() => handleCardClick(originalIndex, card.id)}
            onCollapse={handleCollapseStack}
            showExpandHint={!isExpanded && expandedCardIndex === null && displayIndex === 0}
          />
        );
      })}
      
      {/* Extra spacing at the bottom to allow for expansion */}
      {expandedCardIndex !== null && <div className="h-[400px]"></div>}
    </div>
  );
};

export default CardStack;
