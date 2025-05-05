
import { BusinessCard } from '@/context/AppContext';
import BusinessCardComponent from '../BusinessCard';

type ConnectionsGridProps = {
  connections: BusinessCard[];
  viewMode: 'grid' | 'list';
  onCardClick: (id: string) => void;
};

const ConnectionsGrid = ({ connections, viewMode, onCardClick }: ConnectionsGridProps) => {
  return (
    <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 gap-3' : 'grid-cols-1 gap-4'}`}>
      {connections.map((connection) => (
        <div key={connection.id} className="animate-fade-in">
          <BusinessCardComponent
            card={connection}
            onClick={() => onCardClick(connection.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ConnectionsGrid;
