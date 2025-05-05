
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import HomeHeader from '../components/home/HomeHeader';
import HomeContent from '../components/home/HomeContent';
import ConnectionCounter from '../components/home/ConnectionCounter';
import { useConnections } from '../hooks/useConnections';

const Home = () => {
  const navigate = useNavigate();
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
  
  const filters = ['All', 'Recent', 'Hiring', 'Investing', 'Building'];

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
      />
      
      {/* Connection count display */}
      <ConnectionCounter totalConnections={totalConnections} />
      
      <main className="p-4">
        <HomeContent 
          viewMode={viewMode}
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
