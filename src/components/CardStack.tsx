
import React, { useState } from 'react';
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import BusinessCard from './BusinessCard';
import { ChevronUp, ChevronDown, History } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

type CardStackProps = {
  cards: BusinessCardType[];
  onCardClick: (id: string) => void;
};

const CardStack: React.FC<CardStackProps> = ({ cards, onCardClick }) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const [showTimelineIndex, setShowTimelineIndex] = useState<number | null>(null);
  
  const handleCardClick = (index: number, id: string) => {
    if (expandedCardIndex === index) {
      if (showTimelineIndex === index) {
        setShowTimelineIndex(null); // Hide timeline if already showing
      } else {
        setShowTimelineIndex(index); // Show timeline
      }
    } else {
      setExpandedCardIndex(index);
      setShowTimelineIndex(null); // Reset timeline when expanding a new card
    }
  };

  const handleCollapseStack = () => {
    setExpandedCardIndex(null);
    setShowTimelineIndex(null);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-4 pb-8">
      {/* Main card stack */}
      <div className="relative h-[500px] pt-4">
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
            <div
              key={uniqueKey}
              className="absolute w-full transition-all duration-300 ease-in-out"
              style={{
                transform: `translateY(${translateY}px)`,
                zIndex: zIndex,
                opacity: opacity,
                width: "100%"
              }}
            >
              <div className="relative">
                <div 
                  className="wallet-card-shadow cursor-pointer"
                  onClick={() => handleCardClick(index, card.id)}
                >
                  <BusinessCard 
                    card={card} 
                    isPreview={false}
                    showHistory={showTimeline} 
                  />
                </div>
                
                {isExpanded && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    {showTimeline && (
                      <button 
                        className="bg-black/40 p-1 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowTimelineIndex(null);
                        }}
                      >
                        <ChevronUp className="w-4 h-4 text-white" />
                      </button>
                    )}
                    <button
                      className="bg-black/40 p-1 rounded-full z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCollapseStack();
                      }}
                    >
                      <ChevronDown className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
                
                {expandedCardIndex === null && index === 0 && (
                  <div className="absolute -bottom-4 left-0 right-0 flex justify-center">
                    <div className="bg-primary/20 backdrop-blur-sm p-1 rounded-full">
                      <ChevronUp className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                )}
                
                {isExpanded && !showTimeline && (
                  <button 
                    className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-primary/20 backdrop-blur-sm p-1.5 rounded-full flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTimelineIndex(index);
                    }}
                  >
                    <History className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-primary">History</span>
                  </button>
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
