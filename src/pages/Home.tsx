
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Search, Plus, LayoutGrid, List } from "lucide-react";
import BottomNav from '../components/BottomNav';
import BusinessCard from '../components/BusinessCard';
import { useAppContext } from '../context/AppContext';

// Sample connection data
const sampleConnections = [
  {
    id: '2',
    name: 'Sam Wilson',
    title: 'Frontend Engineer',
    company: 'Linear',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    expertiseAreas: ['Frontend', 'React', 'TypeScript'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' },
      { type: 'GitHub', url: 'https://github.com' }
    ],
    status: 'Building new features',
    design: {
      backgroundStyle: 'bg-gradient-card-2',
      textColor: 'text-white'
    },
    connectionDate: '2023-10-15',
    connectionEvent: 'React Conference'
  },
  {
    id: '3',
    name: 'Riley Johnson',
    title: 'Product Manager',
    company: 'Stripe',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Product Strategy', 'Fintech', 'Growth'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Hiring designers',
    design: {
      backgroundStyle: 'bg-gradient-card-3',
      textColor: 'text-white'
    },
    connectionDate: '2023-11-02',
    connectionEvent: 'Startup Mixer'
  },
  {
    id: '4',
    name: 'Jordan Lee',
    title: 'Startup Founder',
    company: 'Acme Inc',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Founder', 'Angel Investing', 'AI/ML'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' },
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Raising seed round',
    design: {
      backgroundStyle: 'bg-black',
      textColor: 'text-white'
    },
    connectionDate: '2023-09-20',
    connectionEvent: 'YC Demo Day'
  },
  {
    id: '5',
    name: 'Taylor Swift',
    title: 'Marketing Director',
    company: 'Netflix',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80',
    expertiseAreas: ['Marketing', 'Content Strategy', 'Growth'],
    links: [],
    status: 'Working on new campaign',
    design: {
      backgroundStyle: 'bg-[#1A1A1A] bg-subtle-grid',
      textColor: 'text-white'
    },
    connectionDate: '2023-08-05',
    connectionEvent: 'Marketing Meetup'
  }
];

const Home = () => {
  const navigate = useNavigate();
  const { connections, addConnection } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Initialize with sample connections if none exist
  useState(() => {
    if (connections.length === 0) {
      sampleConnections.forEach(connection => {
        addConnection(connection);
      });
    }
  });

  const allConnections = [...connections, ...sampleConnections];
  
  const handleCardClick = (id: string) => {
    navigate(`/card/${id}`);
  };

  const filters = ['All', 'Recent', 'Hiring', 'Investing', 'Building'];

  const filteredConnections = allConnections.filter((connection) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        connection.name.toLowerCase().includes(query) ||
        connection.title.toLowerCase().includes(query) ||
        connection.company.toLowerCase().includes(query) ||
        connection.expertiseAreas.some(area => area.toLowerCase().includes(query)) ||
        connection.status.toLowerCase().includes(query)
      );
    }
    
    if (activeFilter === 'All') {
      return true;
    }
    
    if (activeFilter === 'Recent') {
      // Last 7 days
      if (!connection.connectionDate) return false;
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return new Date(connection.connectionDate) >= sevenDaysAgo;
    }
    
    if (activeFilter === 'Hiring') {
      return connection.status.toLowerCase().includes('hiring');
    }
    
    if (activeFilter === 'Investing') {
      return (
        connection.status.toLowerCase().includes('investing') ||
        connection.expertiseAreas.some(area => area.toLowerCase().includes('investing'))
      );
    }
    
    if (activeFilter === 'Building') {
      return (
        connection.status.toLowerCase().includes('building') ||
        connection.status.toLowerCase().includes('founder') ||
        connection.expertiseAreas.some(area => area.toLowerCase().includes('founder'))
      );
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="p-4 sticky top-0 bg-background/80 backdrop-blur-xl z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">Your Network</h1>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsGridView(true)}
              className={isGridView ? 'text-primary' : 'text-muted-foreground'}
            >
              <LayoutGrid className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsGridView(false)}
              className={!isGridView ? 'text-primary' : 'text-muted-foreground'}
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search connections..."
            className="pl-9 bg-secondary border-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm transition-colors ${
                activeFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-muted-foreground'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>
      
      {/* Content */}
      <main className="p-4">
        {filteredConnections.length > 0 ? (
          <div className={`grid ${isGridView ? 'grid-cols-2 gap-3' : 'grid-cols-1 gap-4'}`}>
            {filteredConnections.map((connection) => (
              <div key={connection.id} className="animate-fade-in">
                <BusinessCard
                  card={connection}
                  onClick={() => handleCardClick(connection.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <p className="text-muted-foreground mb-2">No connections found</p>
            {searchQuery && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Home;
