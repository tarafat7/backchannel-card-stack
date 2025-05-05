
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import HomeHeader from '../components/home/HomeHeader';
import HomeContent from '../components/home/HomeContent';
import ConnectionCounter from '../components/home/ConnectionCounter';
import { useConnections } from '../hooks/useConnections';
import { useState, useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [updatesCount, setUpdatesCount] = useState(0);
  
  const {
    filteredConnections,
    totalConnections,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    activeFilter,
    setActiveFilter,
    handleCardClick,
    handleClearSearch
  } = useConnections(navigate);
  
  const filters = ['All', 'Updates', 'Hiring', 'Investing', 'Building'];

  // Simulate new status updates - in a real app this would come from notifications or real-time updates
  useEffect(() => {
    // Only increment the counter if we're not already on the Updates tab
    if (activeFilter !== 'Updates') {
      // This is just a mock implementation - in a real app, you would check for actual new updates
      const statusUpdateConnections = filteredConnections.filter(conn => 
        conn.status.includes('New') || conn.status.includes('Just')
      );
      
      setUpdatesCount(statusUpdateConnections.length);
    }
  }, [filteredConnections, activeFilter]);
  
  const resetUpdatesCount = () => {
    setUpdatesCount(0);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <HomeHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        updatesCount={updatesCount}
        resetUpdatesCount={resetUpdatesCount}
      />
      
      {/* Connection count display */}
      <ConnectionCounter totalConnections={totalConnections} />
      
      <main className="p-4">
        <HomeContent 
          viewMode={activeFilter === 'Updates' ? 'list' : viewMode}
          filteredConnections={filteredConnections}
          searchQuery={searchQuery}
          onCardClick={handleCardClick}
          onClearSearch={handleClearSearch}
        />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Home;
