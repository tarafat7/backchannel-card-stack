
import React from 'react';
import { BusinessCard } from '@/context/AppContext';
import ExpertiseAreas from '../shared/ExpertiseAreas';
import CardLinks from '../shared/CardLinks';
import ConnectedStatus from '../shared/ConnectedStatus';

type FullBusinessCardProps = {
  card: BusinessCard;
};

const FullBusinessCard = ({ card }: FullBusinessCardProps) => {
  // Define solid background color based on the card's background style
  let solidBgColor = "bg-[#0f0f10]"; // Default dark background
  
  if (card.design.backgroundStyle.includes("bg-gradient-card-2")) {
    solidBgColor = "bg-[#5B61F3]"; // Solid color for gradient-2
  } else if (card.design.backgroundStyle.includes("bg-gradient-card-3")) {
    solidBgColor = "bg-[#2166EE]"; // Solid color for gradient-3
  } else if (card.design.backgroundStyle.includes("bg-black")) {
    solidBgColor = "bg-[#222222]"; // Dark gray instead of pure black
  } else if (card.design.backgroundStyle.includes("bg-[#1A1A1A]")) {
    solidBgColor = "bg-[#1A1A1A]"; // Keep the original dark gray
  }
  
  return (
    <div className={`m-4 p-6 rounded-xl shadow-lg ${solidBgColor}`}>
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
