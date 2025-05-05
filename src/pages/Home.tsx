
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

  // Log the current state for debugging
  useEffect(() => {
    console.log('Total connections in Home:', totalConnections);
    console.log('Filtered connections in Home:', filteredConnections.length);
    console.log('Active filter:', activeFilter);
  }, [totalConnections, filteredConnections, activeFilter]);

  // Check for new status updates when not on the Updates tab
  useEffect(() => {
    if (activeFilter !== 'Updates') {
      // Find connections with new status updates
      const statusUpdateConnections = filteredConnections.filter(conn => 
        conn.status.includes('New') || 
        conn.status.includes('Just') ||
        conn.status.toLowerCase().includes('updated')
      );
      
      setUpdatesCount(statusUpdateConnections.length);
    }
  }, [filteredConnections, activeFilter]);
  
  const resetUpdatesCount = () => {
    setUpdatesCount(0);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
      
      {/* Connection count display - now showing total first-degree connections count */}
      <ConnectionCounter totalConnections={totalConnections} />
      
      <main className="flex-1 p-4 overflow-hidden">
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
