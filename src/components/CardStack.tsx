
import React, { useState, useRef, useEffect } from 'react';
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import { ChevronUp, X } from 'lucide-react';
import StackedCard from './stack/StackedCard';
import EmptyStackState from './stack/EmptyStackState';
import { useIsMobile } from '@/hooks/use-mobile';

type CardStackProps = {
  cards: BusinessCardType[];
  onCardClick: (id: string) => void;
};

const CardStack: React.FC<CardStackProps> = ({ cards, onCardClick }) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const [cardOrder, setCardOrder] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Initialize or update card order when cards change
  useEffect(() => {
    setCardOrder(Array.from({ length: cards.length }, (_, i) => i));
  }, [cards.length]);
  
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
    <div className="fixed inset-x-0 bottom-16 flex items-end justify-center h-[calc(100vh-148px)]">
      <div 
        className={`relative w-full max-w-md mx-auto transition-all duration-300 ${
          expandedCardIndex !== null ? 'h-full pb-4' : 'h-auto'
        }`}
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
        
        <div className={`relative ${expandedCardIndex !== null ? 'h-full' : 'h-auto'} overflow-visible px-2`}>
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
          
          {expandedCardIndex === null && (
            <div className="absolute bottom-[-12px] left-0 right-0 flex justify-center">
              <div className="bg-black/40 backdrop-blur-sm p-1 rounded-full">
                <ChevronUp className="w-4 h-4 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardStack;
