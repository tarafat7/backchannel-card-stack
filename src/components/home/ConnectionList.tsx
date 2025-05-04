
import React from 'react';
import { BusinessCard as BusinessCardType } from '../../context/AppContext';
import BusinessCard from '../BusinessCard';

type ConnectionListProps = {
  connections: BusinessCardType[];
  viewMode: 'grid' | 'list';
  onCardClick: (id: string) => void;
};

const ConnectionList: React.FC<ConnectionListProps> = ({ 
  connections, 
  viewMode, 
  onCardClick 
}) => {
  return (
    <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 gap-3' : 'grid-cols-1 gap-4'}`}>
      {connections.map((connection) => (
        <div key={connection.id} className="animate-fade-in">
          <BusinessCard
            card={connection}
            onClick={() => onCardClick(connection.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ConnectionList;
