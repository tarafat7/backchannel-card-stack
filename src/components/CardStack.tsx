
import React, { useState, useRef, useEffect } from 'react';
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import { ChevronUp } from 'lucide-react';
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
    <div className="fixed inset-x-0 bottom-16 flex items-end justify-center">
      <div 
        className={`relative w-full max-w-md mx-auto transition-all duration-300 px-4 pb-4 ${
          expandedCardIndex !== null ? 'h-[calc(100vh-148px)]' : 'h-auto'
        }`}
        ref={containerRef}
      >
        {expandedCardIndex !== null && (
          <button
            onClick={handleCollapseStack}
            className="absolute top-4 right-4 z-50 bg-black/50 backdrop-blur-sm p-1.5 rounded-full"
          >
            <ChevronUp className="w-4 h-4 text-white transform rotate-180" />
          </button>
        )}
        
        <div className={`relative ${expandedCardIndex !== null ? 'h-full' : 'h-auto'} overflow-visible`}>
          {/* Card Count Overlay */}
          {expandedCardIndex === null && (
            <div className="absolute bottom-[-40px] w-full flex justify-center z-10 pointer-events-none">
              <div className="text-white/90 text-sm font-medium bg-black/30 backdrop-blur-md py-1.5 px-4 rounded-full">
                {cards.length} {cards.length === 1 ? 'Card' : 'Cards'}
              </div>
            </div>
          )}
          
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
      </div>
    </div>
  );
};

export default CardStack;
