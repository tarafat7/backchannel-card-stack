
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
    <div className="relative w-full max-w-md mx-auto mt-4 pb-8">
      {/* Main card stack */}
      <div className="relative h-[500px] pt-4">
        {cards.map((card, index) => {
          // Create a unique key by combining the card id and index
          const uniqueKey = `card-${card.id}-${index}`;
          const isExpanded = expandedCardIndex === index;
          const zIndex = cards.length - index;
          
          // Calculate position based on state
          // Show all cards at the bottom with only a small portion visible by default
          let translateY = 0;
          let opacity = 1;
          let scale = 1;
          
          if (expandedCardIndex === null) {
            // When no card is expanded, stack all cards at the bottom
            // with just enough showing to see each one
            translateY = index * 60; // Each card shows about 60px
          } else {
            if (index === expandedCardIndex) {
              // This is the expanded card, show it at the top
              translateY = 0;
            } else if (index < expandedCardIndex) {
              // Cards that should be above the expanded card (hidden off-screen)
              translateY = -500;
              opacity = 0;
            } else {
              // Cards that should be below the expanded card
              translateY = 400 + (index - expandedCardIndex) * 60;
            }
          }
          
          return (
            <div
              key={uniqueKey}
              className="absolute w-full transition-all duration-300 ease-in-out cursor-pointer"
              style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                zIndex: zIndex,
                opacity: opacity,
                width: "100%"
              }}
              onClick={() => handleCardClick(index, card.id)}
            >
              <div className="relative">
                <div className="wallet-card-shadow">
                  <BusinessCard card={card} isPreview={false} />
                </div>
                {isExpanded && (
                  <button
                    className="absolute top-2 right-2 bg-black/40 p-1 rounded-full z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCollapseStack();
                    }}
                  >
                    <ChevronDown className="w-4 h-4 text-white" />
                  </button>
                )}
                {expandedCardIndex === null && index === 0 && (
                  <div className="absolute -bottom-4 left-0 right-0 flex justify-center">
                    <div className="bg-primary/20 backdrop-blur-sm p-1 rounded-full">
                      <ChevronUp className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Empty state message */}
      {cards.length === 0 && (
        <div className="text-center p-8 bg-secondary/50 rounded-xl border border-white/5">
          <p className="text-muted-foreground">No business cards yet</p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Connect with others to start building your network
          </p>
        </div>
      )}
    </div>
  );
};

export default CardStack;
