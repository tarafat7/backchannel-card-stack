
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import HomeHeader from '../components/home/HomeHeader';
import HomeContent from '../components/home/HomeContent';
import ConnectionCounter from '../components/home/ConnectionCounter';
import { useConnections } from '../hooks/useConnections';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const navigate = useNavigate();
  const [updatesCount, setUpdatesCount] = useState(0);
  const { profile } = useAppContext();
  
  // Check if onboarding is incomplete and redirect
  useEffect(() => {
    if (!profile.card || profile.experiences.length === 0) {
      navigate('/', { replace: true });
    }
  }, [profile, navigate]);
  
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
      
      {/* Connection count display - make sure the arrow shows on the home page */}
      <ConnectionCounter 
        totalConnections={filteredConnections.length} 
        showArrow={true}
      />
      
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
