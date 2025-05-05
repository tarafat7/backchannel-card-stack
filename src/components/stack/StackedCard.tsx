
import React, { useEffect, useRef } from 'react';
import { BusinessCard as BusinessCardType } from '../../context/AppContext';
import BusinessCard from '../BusinessCard';
import { ChevronUp } from 'lucide-react';

type StackedCardProps = {
  card: BusinessCardType;
  isExpanded: boolean;
  isActive: boolean;
  displayIndex: number;
  expandedCardIndex: number | null;
  cardOrder: number[];
  zIndex: number;
  onCardClick: () => void;
  onCollapse: () => void;
  showExpandHint: boolean;
};

const StackedCard: React.FC<StackedCardProps> = ({
  card,
  isExpanded,
  isActive,
  displayIndex,
  expandedCardIndex,
  cardOrder,
  zIndex,
  onCardClick,
  onCollapse,
  showExpandHint
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prevExpandedState = useRef<boolean>(isExpanded);
  
  // Calculate position based on state
  const getTransform = () => {
    // Default stacked position - Apple Wallet style staggering
    let translateY = displayIndex * 12; 
    let scale = 1 - (displayIndex * 0.015);
    
    if (expandedCardIndex !== null) {
      if (isExpanded) {
        translateY = 0; // Focused card at the top
        scale = 1;
      } else if (cardOrder.indexOf(expandedCardIndex) > displayIndex) {
        // Cards above the focused card - move up and out of view
        translateY = -100 - (displayIndex * 10);
        scale = 0.95;
      } else {
        // Cards below the focused card - stack at bottom
        translateY = 300 + ((displayIndex - cardOrder.indexOf(expandedCardIndex) - 1) * 15);
        scale = 0.9 - ((displayIndex - cardOrder.indexOf(expandedCardIndex) - 1) * 0.01);
      }
    }

    return `translateY(${translateY}px) scale(${scale})`;
  };
  
  // Apply Apple Wallet-like expand/collapse animations
  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;
    
    // Only add animation if expanded state changed
    if (prevExpandedState.current !== isExpanded) {
      // Remove any existing animation classes
      cardElement.classList.remove('card-expanding', 'card-collapsing');
      
      // Add appropriate animation class
      if (isExpanded) {
        cardElement.style.setProperty('--offset', `${displayIndex * 12}px`);
        cardElement.classList.add('card-expanding');
      } else if (prevExpandedState.current) {
        cardElement.style.setProperty('--offset', `${displayIndex * 12}px`);
        cardElement.classList.add('card-collapsing');
      }
      
      prevExpandedState.current = isExpanded;
    }
  }, [isExpanded, displayIndex]);

  return (
    <div
      ref={cardRef}
      className={`absolute w-full transition-all duration-300 ease-out 
        ${isExpanded ? 'scale-100' : ''}
        ${!isActive ? 'pointer-events-none' : 'cursor-pointer'}
      `}
      style={{
        transform: getTransform(),
        zIndex: zIndex,
        boxShadow: isExpanded 
          ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' 
          : '0 2px 4px rgba(0, 0, 0, 0.15)',
      }}
      onClick={(e) => {
        e.preventDefault();
        onCardClick();
      }}
    >
      <div className={`relative ${isExpanded ? 'ring-2 ring-primary ring-opacity-50' : ''}`}>
        <BusinessCard card={card} isPreview={isExpanded} />
        
        {showExpandHint && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-[-12px]">
            <div className="bg-black/40 backdrop-blur-sm p-1 rounded-full">
              <ChevronUp className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StackedCard;
