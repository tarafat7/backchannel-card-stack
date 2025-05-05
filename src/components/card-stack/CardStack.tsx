
import React, { useState, useEffect } from 'react';
import { BusinessCard as BusinessCardType } from '../../context/AppContext';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '../ui/scroll-area';
import CardStackItem from './CardStackItem';
import CardStackHeader from './CardStackHeader';
import EmptyCardStack from './EmptyCardStack';
import { calculateCardPositions } from './CardStackPositionCalculator';

type CardStackProps = {
  cards: BusinessCardType[];
  onCardClick: (id: string) => void;
};

const CardStack: React.FC<CardStackProps> = ({ cards, onCardClick }) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const [showTimelineIndex, setShowTimelineIndex] = useState<number | null>(null);
  
  useEffect(() => {
    console.log('Cards in CardStack:', cards.length);
  }, [cards]);
  
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

  const handleSendMessage = (e: React.MouseEvent, name: string) => {
    e.stopPropagation(); // Prevent card collapse
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${name}`,
    });
  };

  const handleRequestIntro = (e: React.MouseEvent, name: string, mutualConnection?: string) => {
    e.stopPropagation(); // Prevent card collapse
    toast({
      title: "Introduction Requested",
      description: `Your introduction request to ${mutualConnection || "a mutual connection"} has been sent!`,
    });
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
            
            // Calculate position based on state
            const { translateY, opacity, zIndex } = calculateCardPositions(
              index, 
              expandedCardIndex, 
              cards.length
            );
            
            return (
              <React.Fragment key={uniqueKey}>
                <CardStackItem
                  card={card}
                  index={index}
                  expandedCardIndex={expandedCardIndex}
                  showTimelineIndex={showTimelineIndex}
                  isExpanded={isExpanded}
                  zIndex={zIndex}
                  translateY={translateY}
                  opacity={opacity}
                  onCardClick={handleCardClick}
                  onCollapseStack={handleCollapseStack}
                  onRequestIntro={handleRequestIntro}
                  onSendMessage={handleSendMessage}
                />
                
                <CardStackHeader 
                  expandedCardIndex={expandedCardIndex} 
                  isFirstCard={index === 0} 
                />
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Empty state message */}
        {cards.length === 0 && <EmptyCardStack />}
      </ScrollArea>
    </div>
  );
};

export default CardStack;
