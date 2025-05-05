
import React from 'react';
import { BusinessCard } from '@/context/AppContext';
import ExpertiseAreas from '../shared/ExpertiseAreas';
import CardLinks from '../shared/CardLinks';
import ConnectedStatus from '../shared/ConnectedStatus';
import { UsersRound } from 'lucide-react';

type FullBusinessCardProps = {
  card: BusinessCard;
};

const FullBusinessCard = ({ card }: FullBusinessCardProps) => {
  // Get background style from card design
  const backgroundStyle = card.design.backgroundStyle;
  
  // Apply the background directly if it's a custom hex value
  const cardStyle = backgroundStyle.startsWith('bg-[') 
    ? { backgroundColor: backgroundStyle.slice(4, -1) }
    : {};
  
  return (
    <div className={`m-4 p-6 rounded-xl shadow-lg ${backgroundStyle}`} style={cardStyle}>
      <div className={`h-full ${card.design.textColor}`}>
        {/* Connection count badge - positioned in top right */}
        {card.connectionCount !== undefined && (
          <div className="absolute top-6 right-6 flex items-center bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full text-sm">
            <UsersRound className="w-4 h-4 mr-1" />
            <span>{card.connectionCount} connections</span>
          </div>
        )}

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
        
        <div className="flex flex-wrap gap-2 mt-4">
          {card.status && (
            <div className="px-3 py-1.5 bg-black/10 rounded-lg text-sm w-fit">
              {card.status}
            </div>
          )}
        </div>
        
        <ExpertiseAreas areas={card.expertiseAreas} />
        <CardLinks links={card.links} />
        <ConnectedStatus connectionDate={card.connectionDate} connectionEvent={card.connectionEvent} />
      </div>
    </div>
  );
};

export default FullBusinessCard;
