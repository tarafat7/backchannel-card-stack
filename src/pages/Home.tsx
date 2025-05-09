
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import HomeHeader from '../components/home/HomeHeader';
import HomeContent from '../components/home/HomeContent';
import ConnectionCounter from '../components/home/ConnectionCounter';
import { useConnections } from '../hooks/useConnections';
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [updatesCount, setUpdatesCount] = useState(0);
  const { profile } = useAppContext();
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Check if coming from onboarding or if filter needs to be reset
  useEffect(() => {
    const fromOnboarding = location.state?.fromOnboarding;
    const shouldResetFilter = location.state?.resetFilter;
    
    if (fromOnboarding) {
      setIsAnimating(true);
    }
    
    // Reset the location state after using it
    if (fromOnboarding || shouldResetFilter) {
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  
  const {
    filteredConnections,
    totalConnections,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    handleCardClick,
    handleClearSearch
  } = useConnections(navigate);
  
  // Reset filter to 'All' when coming from another page via home button
  useEffect(() => {
    if (location.state?.resetFilter) {
      setActiveFilter('All');
    }
  }, [location.state, setActiveFilter]);
  
  const filters = ['All', 'Updates', 'Hiring', 'Investing', 'Building'];

  // Check for new status updates when not on the Updates tab
  useEffect(() => {
    if (activeFilter !== 'Updates') {
      // Find connections with new status updates
      const statusUpdateConnections = filteredConnections.filter(conn => 
        conn.connectionDegree === 1 && (
          conn.status.includes('New') || 
          conn.status.includes('Just') ||
          conn.status.toLowerCase().includes('updated')
        )
      );
      
      setUpdatesCount(statusUpdateConnections.length);
    }
  }, [filteredConnections, activeFilter]);
  
  const resetUpdatesCount = () => {
    setUpdatesCount(0);
  };

  return (
    <motion.div 
      className="min-h-screen bg-background flex flex-col"
      initial={isAnimating ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HomeHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        updatesCount={updatesCount}
        resetUpdatesCount={resetUpdatesCount}
      />
      
      {/* Connection count display - now showing filtered connections count */}
      <ConnectionCounter totalConnections={filteredConnections.length} />
      
      <main className="flex-1 p-4 overflow-hidden">
        <HomeContent 
          filteredConnections={filteredConnections}
          searchQuery={searchQuery}
          onCardClick={handleCardClick}
          onClearSearch={handleClearSearch}
        />
      </main>
      
      <BottomNav />
    </motion.div>
  );
};

export default Home;
