
import React from 'react';
import BusinessCard from '../../BusinessCard';
import { BusinessCard as BusinessCardType } from '@/context/AppContext';

interface CardPreviewProps {
  card: BusinessCardType;
  showHistory: boolean;
}

const CardPreview: React.FC<CardPreviewProps> = ({ card, showHistory }) => {
  return (
    <div className="mb-6">
      <BusinessCard 
        card={card} 
        isPreview={true} 
        showHistory={showHistory} 
      />
    </div>
  );
};

export default CardPreview;
