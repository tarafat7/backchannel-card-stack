
import CardStack from '../CardStack';
import ConnectionsGrid from './ConnectionsGrid';
import NoConnectionsFound from './NoConnectionsFound';
import { BusinessCard } from '@/context/AppContext';

type ViewMode = 'stack' | 'list';

type HomeContentProps = {
  viewMode: ViewMode;
  filteredConnections: BusinessCard[];
  searchQuery: string;
  onCardClick: (id: string) => void;
  onClearSearch: () => void;
};

const HomeContent = ({ 
  viewMode, 
  filteredConnections, 
  searchQuery, 
  onCardClick, 
  onClearSearch 
}: HomeContentProps) => {
  if (filteredConnections.length === 0) {
    return (
      <NoConnectionsFound 
        hasSearchQuery={searchQuery.length > 0} 
        onClearSearch={onClearSearch} 
      />
    );
  }

  if (viewMode === 'stack') {
    return (
      <div className="h-full flex-grow overflow-hidden">
        <CardStack 
          cards={filteredConnections}
          onCardClick={onCardClick}
        />
      </div>
    );
  }

  return (
    <ConnectionsGrid 
      connections={filteredConnections} 
      viewMode="list"
      onCardClick={onCardClick}
    />
  );
};

export default HomeContent;
