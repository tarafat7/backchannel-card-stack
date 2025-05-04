
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import CardStack from '../components/CardStack';
import HomeHeader from '../components/home/HomeHeader';
import ConnectionList from '../components/home/ConnectionList';
import EmptyState from '../components/home/EmptyState';
import { useConnections } from '../hooks/useConnections';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'stack' | 'grid' | 'list'>('stack');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filteredConnections = useConnections(searchQuery, activeFilter);
  
  const handleCardClick = (id: string) => {
    navigate(`/card/${id}`);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <HomeHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      
      <main className="p-4">
        {filteredConnections.length > 0 ? (
          <>
            {viewMode === 'stack' && (
              <CardStack 
                cards={filteredConnections}
                onCardClick={handleCardClick}
              />
            )}
            {(viewMode === 'grid' || viewMode === 'list') && (
              <ConnectionList 
                connections={filteredConnections}
                viewMode={viewMode}
                onCardClick={handleCardClick}
              />
            )}
          </>
        ) : (
          <EmptyState 
            searchQuery={searchQuery} 
            onClearSearch={handleClearSearch} 
          />
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Home;
