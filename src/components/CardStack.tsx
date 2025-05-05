
import React, { useState, useRef, useEffect } from 'react';
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import BusinessCard from './BusinessCard';
import { ChevronUp, ChevronDown, MessageCircle, Link } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Slider } from './ui/slider';
import { ScrollArea } from './ui/scroll-area';

type CardStackProps = {
  cards: BusinessCardType[];
  onCardClick: (id: string) => void;
};

const CardStack: React.FC<CardStackProps> = ({ cards, onCardClick }) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const [showTimelineIndex, setShowTimelineIndex] = useState<number | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle card interaction
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

  // Touch and mouse event handlers for rolodex effect
  const handleTouchStart = (e: React.TouchEvent) => {
    if (expandedCardIndex !== null) return; // Don't allow dragging when a card is expanded
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (expandedCardIndex !== null) return; // Don't allow dragging when a card is expanded
    setIsDragging(true);
    setStartY(e.clientY);
    e.preventDefault(); // Prevent text selection during drag
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || expandedCardIndex !== null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    handleScroll(diff);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || expandedCardIndex !== null) return;
    const currentY = e.clientY;
    const diff = currentY - startY;
    handleScroll(diff);
    e.preventDefault(); // Prevent text selection during drag
  };

  const handleScroll = (diff: number) => {
    // Determine the card height and spacing
    const cardHeight = 70; // Approximate height of visible part of each card
    
    // Calculate how many cards to scroll based on the drag distance
    const newOffset = scrollOffset + diff / 2; // Divide by 2 to slow down the scroll
    setScrollOffset(newOffset);
    
    // Calculate the new active card index
    let newIndex = Math.floor(newOffset / cardHeight) % cards.length;
    
    // Handle negative indexes
    if (newIndex < 0) newIndex = cards.length + newIndex;
    
    // Update active card index
    if (newIndex !== activeCardIndex) {
      setActiveCardIndex(newIndex);
      // Provide haptic feedback here if device supports it
    }
    
    // Update the start position for the next move event
    setStartY(curr => curr + diff);
  };

  const handleTouchEnd = () => {
    if (expandedCardIndex !== null) return;
    setIsDragging(false);
    snapToCard();
  };

  const handleMouseUp = () => {
    if (expandedCardIndex !== null) return;
    setIsDragging(false);
    snapToCard();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      snapToCard();
    }
  };

  const snapToCard = () => {
    // Snap to the nearest card position
    const cardHeight = 70; // Should match the card spacing in the CSS
    const targetOffset = activeCardIndex * cardHeight;
    setScrollOffset(targetOffset);
  };

  // Handle slider change for direct card selection
  const handleSliderChange = (value: number[]) => {
    const newIndex = Math.round(value[0]);
    setActiveCardIndex(newIndex);
    // Also update the scroll offset to match
    const cardHeight = 70;
    setScrollOffset(newIndex * cardHeight);
  };

  useEffect(() => {
    // Add window event listeners to handle mouse up outside the component
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        snapToCard();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="relative w-full max-w-md mx-auto mt-4 pb-8 select-none"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Rolodex card stack */}
      <div className="relative h-[500px] pt-4">
        {cards.map((card, index) => {
          // Create a unique key by combining the card id and index
          const uniqueKey = `card-${card.id}-${index}`;
          const isExpanded = expandedCardIndex === index;
          const showTimeline = showTimelineIndex === index;
          
          // Calculate z-index and position for rolodex effect
          let zIndex = cards.length - Math.abs(index - activeCardIndex);
          let rotateX = 0;
          let translateY = 0;
          let opacity = 1;
          
          if (expandedCardIndex === null) {
            // When in rolodex mode (no expanded card)
            const distanceFromActive = index - activeCardIndex;
            
            // Cards in front of the active card rotate one way
            if (distanceFromActive < 0) {
              rotateX = Math.min(distanceFromActive * 5, -5); // Max -40 degrees
              translateY = Math.abs(distanceFromActive) * 45;
              opacity = Math.max(1 - Math.abs(distanceFromActive) * 0.2, 0.3);
            } 
            // Cards behind the active card rotate the other way
            else if (distanceFromActive > 0) {
              rotateX = Math.max(distanceFromActive * -5, -40); // Max -40 degrees
              translateY = distanceFromActive * 45; 
              opacity = Math.max(1 - distanceFromActive * 0.2, 0.3);
            }
            // Active card is flat
            else {
              rotateX = 0;
              translateY = 0;
              opacity = 1;
              zIndex = cards.length + 1; // Make sure active card is on top
            }
          } else {
            // When a card is expanded
            if (index === expandedCardIndex) {
              rotateX = 0;
              translateY = 0;
              opacity = 1;
              zIndex = cards.length + 1;
            } else if (index < expandedCardIndex) {
              translateY = -500;
              opacity = 0;
            } else {
              translateY = 250 + ((index - expandedCardIndex) * 45);
              rotateX = -30;
              opacity = 0.5;
            }
          }

          // Determine if this is a second-degree connection
          const isSecondDegree = card.connectionDegree === 2;
          
          // Get the first mutual connection name if available
          const mutualConnectionName = card.mutualConnections && card.mutualConnections.length > 0 
            ? card.mutualConnections[0] 
            : null;
          
          return (
            <div
              key={uniqueKey}
              className="absolute w-full transition-all duration-300 ease-in-out"
              style={{
                transform: `translateY(${translateY}px) rotateX(${rotateX}deg)`,
                zIndex: zIndex,
                opacity: opacity,
                transformOrigin: "center top",
                perspective: "1000px",
                width: "100%"
              }}
            >
              <div className="relative">
                <div 
                  className={`wallet-card-shadow cursor-pointer ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                  onClick={() => handleCardClick(index, card.id)}
                >
                  <BusinessCard 
                    card={card} 
                    isPreview={false}
                    showHistory={showTimeline} 
                  />

                  {/* Action button - different for 1st and 2nd degree connections */}
                  {isExpanded && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {isSecondDegree && mutualConnectionName ? (
                            <button
                              className="absolute bottom-3 right-3 bg-primary/90 hover:bg-primary px-2 py-1 rounded-md shadow-lg z-20 flex items-center gap-1 text-white text-xs"
                              onClick={(e) => handleRequestIntro(e, card.name, mutualConnectionName)}
                            >
                              Ask {mutualConnectionName.split(' ')[0]} for intro
                              <Link className="w-3.5 h-3.5 text-white" />
                            </button>
                          ) : (
                            <button
                              className="absolute bottom-3 right-3 bg-primary/90 hover:bg-primary px-2 py-1 rounded-md shadow-lg z-20 flex items-center gap-1 text-white text-xs"
                              onClick={(e) => handleSendMessage(e, card.name)}
                            >
                              Send message to {card.name.split(' ')[0]}
                              <MessageCircle className="w-3.5 h-3.5 text-white ml-1" />
                            </button>
                          )}
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          {isSecondDegree ? "Request introduction" : `Message ${card.name.split(' ')[0]}`}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                
                {isExpanded && (
                  <div className="absolute top-2 right-2 flex gap-2">
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
                
                {expandedCardIndex === null && index === activeCardIndex && (
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
      
      {/* Slider for direct scrolling through the rolodex */}
      {cards.length > 0 && expandedCardIndex === null && (
        <div className="w-3/4 mx-auto mt-6">
          <Slider
            value={[activeCardIndex]}
            max={cards.length - 1}
            step={1}
            onValueChange={handleSliderChange}
          />
        </div>
      )}
      
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
