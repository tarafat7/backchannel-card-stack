
import React from 'react';
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import { ScrollArea } from './ui/scroll-area';
import CardStackItem from './card-stack/CardStackItem';
import EmptyCardStack from './card-stack/EmptyCardStack';
import { useCardStack } from '../hooks/useCardStack';

type CardStackProps = {
  cards: BusinessCardType[];
  onCardClick: (id: string) => void;
};

const CardStack: React.FC<CardStackProps> = ({ cards, onCardClick }) => {
  const {
    expandedCardIndex,
    showTimelineIndex,
    handleCardClick,
    handleCollapseStack,
    handleSendMessage,
    handleRequestIntro
  } = useCardStack();
  
  return (
    <div className="relative w-full max-w-md mx-auto mt-4">
      <ScrollArea className="h-[80vh] rounded-md" style={{ scrollBehavior: 'smooth' }}>
        {/* Main card stack */}
        {cards.length > 0 ? (
          <div className="relative min-h-[500px] pt-4 pb-8">
            {cards.map((card, index) => (
              <CardStackItem
                key={`card-${card.id}-${index}`}
                card={card}
                index={index}
                expandedCardIndex={expandedCardIndex}
                showTimelineIndex={showTimelineIndex}
                handleCardClick={handleCardClick}
                handleCollapseStack={handleCollapseStack}
                handleSendMessage={handleSendMessage}
                handleRequestIntro={handleRequestIntro}
                isTopCard={index === 0}
              />
            ))}
          </div>
        ) : (
          <EmptyCardStack />
        )}
      </ScrollArea>
    </div>
  );
};

export default CardStack;
