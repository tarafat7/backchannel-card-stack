
import React, { useState, useRef, useEffect } from 'react';
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import { ChevronUp, X } from 'lucide-react';
import StackedCard from './stack/StackedCard';
import EmptyStackState from './stack/EmptyStackState';
import { ScrollArea } from '@/components/ui/scroll-area';

type CardStackProps = {
  cards: BusinessCardType[];
  onCardClick: (id: string) => void;
};

const CardStack: React.FC<CardStackProps> = ({ cards, onCardClick }) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const [cardOrder, setCardOrder] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  
  // Initialize or update card order when cards change
  useEffect(() => {
    setCardOrder(Array.from({ length: cards.length }, (_, i) => i));
  }, [cards.length]);
  
  // Update container height based on expanded state
  useEffect(() => {
    if (expandedCardIndex !== null) {
      setContainerHeight(window.innerHeight * 0.7); // Expand to 70% of viewport height when a card is selected
    } else {
      setContainerHeight(Math.min(cards.length * 80 + 100, 500)); // Stack height or max 500px
    }
  }, [expandedCardIndex, cards.length]);
  
  const handleCardClick = (index: number, id: string) => {
    if (expandedCardIndex === index) {
      onCardClick(id); // Navigate to detail view on second click
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
    <div 
      className="relative w-full max-w-md mx-auto mt-4"
      style={{ 
        height: `${containerHeight}px`,
        transition: 'height 0.3s ease-out'
      }}
      ref={containerRef}
    >
      {expandedCardIndex !== null && (
        <button
          onClick={handleCollapseStack}
          className="absolute top-4 right-4 z-50 bg-black/30 backdrop-blur-sm p-1 rounded-full"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      )}
      
      <ScrollArea className="h-full overflow-hidden">
        <div className="relative px-2 pb-6 pt-2 h-full" style={{ minHeight: `${containerHeight}px` }}>
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
        </div>
      </ScrollArea>
    </div>
  );
};

export default CardStack;
