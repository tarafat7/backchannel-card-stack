
import React from 'react';
import { BusinessCard } from '@/context/AppContext';
import ExpertiseAreas from '../shared/ExpertiseAreas';
import CardLinks from '../shared/CardLinks';
import ConnectedStatus from '../shared/ConnectedStatus';

type FullBusinessCardProps = {
  card: BusinessCard;
};

const FullBusinessCard = ({ card }: FullBusinessCardProps) => {
  // Get background style from card design
  const backgroundStyle = card.design.backgroundStyle;
  
  // Prepare inline style based on background style
  const cardStyle: React.CSSProperties = {};
  
  // If it has a custom color
  if (backgroundStyle.includes('bg-[')) {
    const colorMatch = backgroundStyle.match(/bg-\[(.*?)\]/);
    if (colorMatch && colorMatch[1]) {
      cardStyle.backgroundColor = colorMatch[1];
    }
  }
  
  // Generate class names - extract pattern if it exists
  let classNames = 'm-4 p-6 rounded-xl shadow-lg';
  
  // Add pattern class if it exists
  const patternClass = backgroundStyle.split(' ').find(cls => cls.includes('pattern'));
  if (patternClass) {
    classNames += ` ${patternClass}`;
  } 
  // If no pattern, add the full background style
  else if (!backgroundStyle.includes('bg-[')) {
    classNames += ` ${backgroundStyle}`;
  }
  
  return (
    <div className={classNames} style={cardStyle}>
      <div className={`h-full ${card.design.textColor}`}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-20 h-20 rounded-full bg-black/20 overflow-hidden border border-white/20">
            {card.avatar && (
              <img 
                src={card.avatar} 
                alt={card.name} 
                className="w-full h-full object-cover" 
              />
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold">{card.name}</h1>
            <p className="text-lg opacity-90">{card.title}</p>
            <p className="text-sm opacity-80">{card.company}</p>
          </div>
        </div>
        
        {/* Connection event - where we met */}
        {card.connectionEvent && (
          <div className="px-3 py-1.5 bg-primary/20 rounded-lg text-sm mt-4 mb-2">
            <span className="font-medium">Where we met:</span> {card.connectionEvent}
          </div>
        )}
        
        {card.status && (
          <div className="px-3 py-1.5 bg-black/10 rounded-lg text-sm mt-4 w-fit">
            {card.status}
          </div>
        )}
        
        <ExpertiseAreas areas={card.expertiseAreas} />
        <CardLinks links={card.links} />
        <ConnectedStatus connectionDate={card.connectionDate} connectionEvent={card.connectionEvent} />
      </div>
    </div>
  );
};

export default FullBusinessCard;
