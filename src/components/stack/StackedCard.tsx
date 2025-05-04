
import React from 'react';
import { BusinessCard as BusinessCardType } from '../../context/AppContext';
import BusinessCard from '../BusinessCard';
import { ChevronUp, ChevronDown } from 'lucide-react';

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
  // Calculate position based on state
  let translateY = displayIndex * 12; // Default stacked position
  
  if (expandedCardIndex !== null) {
    if (isExpanded) {
      translateY = 0; // Focused card at the top
    } else if (cardOrder.indexOf(expandedCardIndex) > displayIndex) {
      translateY = -100; // Cards above the focused card
    } else {
      translateY = 100 + (displayIndex - cardOrder.indexOf(expandedCardIndex) - 1) * 30; // Cards below the focused card
    }
  }

  return (
    <div
      className={`absolute w-full transition-all duration-300 ease-in-out cursor-pointer
        ${isExpanded ? 'scale-100' : 'scale-95'}
        ${!isActive ? 'pointer-events-none' : ''}
      `}
      style={{
        transform: `translateY(${translateY}px) ${isExpanded ? 'scale(1)' : ''}`,
        zIndex: zIndex,
        boxShadow: isExpanded 
          ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
      onClick={onCardClick}
    >
      <div className={`relative ${isExpanded ? 'ring-2 ring-primary ring-opacity-50' : ''}`}>
        <div className="overflow-hidden rounded-xl">
          <BusinessCard card={card} isPreview={false} />
        </div>
        
        {isExpanded && (
          <button
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-1 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onCollapse();
            }}
          >
            <ChevronDown className="w-4 h-4 text-white" />
          </button>
        )}
        
        {showExpandHint && (
          <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-[-20px]">
            <div className="bg-primary/30 backdrop-blur-sm p-1 rounded-full">
              <ChevronUp className="w-4 h-4 text-primary" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StackedCard;
