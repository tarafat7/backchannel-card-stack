
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import CardStack from '../components/CardStack';
import HomeHeader from '../components/home/HomeHeader';
import ConnectionList from '../components/home/ConnectionList';
import EmptyState from '../components/home/EmptyState';
import { useConnections } from '../hooks/useConnections';
import { User, MessageSquare } from 'lucide-react';

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
    <div className="min-h-screen bg-black flex flex-col">
      <div className="pt-12 px-6 flex justify-between items-center">
        <button className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center">
          <User className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center">
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 px-6 pt-8">
        <div className="text-center mb-2">
          <h1 className="text-5xl font-medium">{filteredConnections.length}</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">CARDS</p>
        </div>
      </div>
      
      <div className="px-4">
        <div className="blackbird-card">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">My Network</h2>
              <p className="text-muted-foreground text-sm">
                {filteredConnections.length} connections
              </p>
            </div>
            <button className="text-white/80 text-sm">View All →</button>
          </div>
        </div>
        
        <div className="flex space-x-2 mb-4">
          <button 
            className="flex-1 py-3 bg-white text-black rounded-full text-center font-medium"
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </button>
          <button 
            className="flex-1 py-3 bg-secondary rounded-full text-center font-medium"
            onClick={() => setViewMode('stack')}
          >
            Stack View
          </button>
        </div>
      </div>
      
      <main className="flex-grow relative pb-24">
        {filteredConnections.length > 0 ? (
          <>
            {viewMode === 'stack' && (
              <CardStack 
                cards={filteredConnections}
                onCardClick={handleCardClick}
              />
            )}
            {(viewMode === 'grid' || viewMode === 'list') && (
              <div className="p-4 pt-0 overflow-auto h-full pb-16">
                <ConnectionList 
                  connections={filteredConnections}
                  viewMode={viewMode}
                  onCardClick={handleCardClick}
                />
              </div>
            )}
          </>
        ) : (
          <div className="p-4 pt-0">
            <EmptyState 
              searchQuery={searchQuery} 
              onClearSearch={handleClearSearch} 
            />
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Home;
