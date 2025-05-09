
import { BusinessCard } from '@/context/AppContext';
import BusinessCardComponent from '../BusinessCard';
import { useHaptics } from '@/hooks/useHaptics';

type ConnectionsGridProps = {
  connections: BusinessCard[];
  viewMode: 'list';
  onCardClick: (id: string) => void;
};

const ConnectionsGrid = ({ connections, viewMode, onCardClick }: ConnectionsGridProps) => {
  const { mediumHapticFeedback } = useHaptics();
  
  const handleCardClick = (id: string) => {
    mediumHapticFeedback();
    onCardClick(id);
  };
  
  return (
    <div className="grid grid-cols-1 gap-4">
      {connections.map((connection) => (
        <div key={connection.id} className="animate-fade-in">
          <BusinessCardComponent
            card={connection}
            onClick={() => handleCardClick(connection.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ConnectionsGrid;
