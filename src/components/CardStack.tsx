
import React, { useState } from 'react';
import { BusinessCard as BusinessCardType } from '../context/AppContext';
import BusinessCard from './BusinessCard';
import { ChevronUp, ChevronDown, MessageCircle, Link, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { ScrollArea } from './ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

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

  const handleSendMessage = (e: React.MouseEvent, name: string, phoneNumber?: string) => {
    e.stopPropagation(); // Prevent card collapse
    
    console.log("Sending message to:", name);
    console.log("Phone number:", phoneNumber);
    
    if (!phoneNumber) {
      console.error("No phone number available for", name);
      return;
    }
    
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    
    // Platform detection
    const isMac = /Mac/i.test(navigator.userAgent) && !/iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    let messageUrl;
    if (isMac) {
      messageUrl = `imessage://+${formattedPhone}`;
    } else if (isIOS) {
      messageUrl = `sms:${formattedPhone}`;
    } else {
      messageUrl = `sms:${formattedPhone}`;
    }
    
    console.log(`Opening message URL: ${messageUrl}`);
    window.location.href = messageUrl;
  };

  const handleRequestIntro = (e: React.MouseEvent, name: string, mutualConnection?: string) => {
    e.stopPropagation(); // Prevent card collapse
    console.log(`Introduction requested to ${mutualConnection || "a mutual connection"} for ${name}`);
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

            // Determine if this is a second-degree connection
            const isSecondDegree = card.connectionDegree === 2;
            
            // Get the first mutual connection name if available
            const mutualConnectionName = card.mutualConnections && card.mutualConnections.length > 0 
              ? card.mutualConnections[0] 
              : null;

            // Check if the card has connection event information
            const hasConnectionEvent = card.connectionDegree === 1 && card.connectionEvent;
            
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

                    {/* Action buttons container at the bottom */}
                    {isExpanded && (
                      <div className="flex justify-between items-center px-3 py-2">
                        {/* Info button with popover - only show for cards with connection event */}
                        {hasConnectionEvent && (
                          <TooltipProvider>
                            <Popover>
                              <TooltipTrigger asChild>
                                <PopoverTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="p-1 h-8 w-8 rounded-full"
                                    onClick={(e) => e.stopPropagation()} // Prevent card collapse
                                  >
                                    <Info className="h-4 w-4 text-primary" />
                                  </Button>
                                </PopoverTrigger>
                              </TooltipTrigger>
                              <TooltipContent side="top">Connection Info</TooltipContent>
                              
                              <PopoverContent side="top" className="w-72">
                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm">Where we met</h4>
                                  <p className="text-sm text-muted-foreground">{card.connectionEvent}</p>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </TooltipProvider>
                        )}
                        
                        {/* Action button - different for 1st and 2nd degree connections */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              {isSecondDegree && mutualConnectionName ? (
                                <button
                                  className="bg-primary/90 hover:bg-primary px-2 py-1 rounded-md shadow-lg z-20 flex items-center gap-1 text-white text-xs ml-auto"
                                  onClick={(e) => handleRequestIntro(e, card.name, mutualConnectionName)}
                                >
                                  Ask {mutualConnectionName.split(' ')[0]} for intro
                                  <Link className="w-3.5 h-3.5 text-white" />
                                </button>
                              ) : (
                                <button
                                  className="bg-primary/90 hover:bg-primary px-2 py-1 rounded-md shadow-lg z-20 flex items-center gap-1 text-white text-xs ml-auto"
                                  onClick={(e) => handleSendMessage(e, card.name, card.phoneNumber)}
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
                      </div>
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
      </ScrollArea>
    </div>
  );
};

export default CardStack;
