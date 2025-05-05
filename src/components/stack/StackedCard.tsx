
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
    if (expandedCardIndex === null) {
      // Default stacked position at the bottom - Apple Wallet style
      const scale = 1 - (displayIndex * 0.015);
      // Stagger cards subtly
      return `translateY(${displayIndex * 8}px) scale(${scale})`;
    } else {
      if (isExpanded) {
        // Focused card - centered in screen
        return `translateY(-${displayIndex * 60 + 180}px) scale(1)`;
      } else if (cardOrder.indexOf(expandedCardIndex) > displayIndex) {
        // Cards above the focused card - move up
        return `translateY(-${displayIndex * 60 + 280}px) scale(${0.95 - displayIndex * 0.01})`;
      } else {
        // Cards below the focused card - stay at bottom with slight offset
        const offset = (displayIndex - cardOrder.indexOf(expandedCardIndex) - 1);
        return `translateY(${offset * 8}px) scale(${0.95 - offset * 0.01})`;
      }
    }
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
        cardElement.style.setProperty('--offset', `${displayIndex * 8}px`);
        cardElement.classList.add('card-expanding');
      } else if (prevExpandedState.current) {
        cardElement.style.setProperty('--offset', `${displayIndex * 8}px`);
        cardElement.classList.add('card-collapsing');
      }
      
      prevExpandedState.current = isExpanded;
    }
  }, [isExpanded, displayIndex]);

  return (
    <div
      ref={cardRef}
      className={`absolute w-full left-0 right-0 transition-all duration-300 ease-out 
        ${isExpanded ? 'scale-100' : ''}
        ${!isActive ? 'pointer-events-none' : 'cursor-pointer'}
      `}
      style={{
        transform: getTransform(),
        zIndex: zIndex,
        boxShadow: isExpanded 
          ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' 
          : '0 2px 10px rgba(0, 0, 0, 0.15)',
      }}
      onClick={(e) => {
        e.preventDefault();
        onCardClick();
      }}
    >
      <div className={`relative rounded-xl overflow-hidden ${isExpanded ? 'ring-2 ring-primary ring-opacity-50' : ''}`}>
        <BusinessCard card={card} isPreview={isExpanded} />
        
        {showExpandHint && (
          <div className="absolute top-[-12px] left-0 right-0 flex justify-center">
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
