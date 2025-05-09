
import { BusinessCard, useAppContext } from '@/context/AppContext';
import BusinessCardComponent from '../BusinessCard';
import { useHaptics } from '@/hooks/useHaptics';

type ConnectionsGridProps = {
  connections: BusinessCard[];
  viewMode: 'list';
  onCardClick: (id: string) => void;
  showAddButton?: boolean;
};

const ConnectionsGrid = ({ connections, viewMode, onCardClick, showAddButton }: ConnectionsGridProps) => {
  const { mediumHapticFeedback } = useHaptics();
  const { profile, sendConnectionRequest } = useAppContext();
  
  const handleCardClick = (id: string) => {
    mediumHapticFeedback();
    onCardClick(id);
  };
  
  const handleAddConnection = (e: React.MouseEvent, connection: BusinessCard) => {
    e.stopPropagation(); // Prevent card click
    mediumHapticFeedback();
    
    if (profile.card) {
      // Send a connection request from the current user to this user
      sendConnectionRequest(connection.id, profile.card);
    }
  };
  
  return (
    <div className="grid grid-cols-1 gap-4">
      {connections.map((connection) => (
        <div key={connection.id} className="animate-fade-in">
          <BusinessCardComponent
            card={connection}
            onClick={() => handleCardClick(connection.id)}
          />
          {showAddButton && profile.card && (
            <div className="mt-2">
              <button 
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
                onClick={(e) => handleAddConnection(e, connection)}
              >
                Add {connection.name.split(' ')[0]} to connections
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConnectionsGrid;
