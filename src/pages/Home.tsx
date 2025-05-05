
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import BottomNav from '../components/BottomNav';
import HomeHeader from '../components/home/HomeHeader';
import HomeContent from '../components/home/HomeContent';
import { BusinessCard } from '../context/AppContext';

// Sample connection data
const sampleConnections: BusinessCard[] = [
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
    connectionEvent: '2023-10-15',
    connectionDegree: 1 as 1,
    mutualConnections: []
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
    connectionEvent: 'Startup Mixer',
    connectionDegree: 1 as 1,
    mutualConnections: []
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
    connectionEvent: 'YC Demo Day',
    connectionDegree: 1 as 1,
    mutualConnections: []
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
    connectionEvent: 'Marketing Meetup',
    connectionDegree: 1 as 1,
    mutualConnections: []
  }
];

// Sample second degree connections
const sampleSecondDegreeConnections: BusinessCard[] = [
  {
    id: '6',
    name: 'Alicia Chen',
    title: 'Senior UX Designer',
    company: 'Shopify',
    avatar: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['UX Design', 'Research', 'UI Design'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Hiring junior designers',
    design: {
      backgroundStyle: 'bg-gradient-card-1',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Riley Johnson', 'Sam Wilson']
  },
  {
    id: '7',
    name: 'Marcus James',
    title: 'Tech Lead',
    company: 'Airbnb',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    expertiseAreas: ['Engineering Leadership', 'System Design', 'React Native'],
    links: [
      { type: 'GitHub', url: 'https://github.com' },
      { type: 'Portfolio', url: 'https://example.com' }
    ],
    status: 'Building mobile team',
    design: {
      backgroundStyle: 'bg-black',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Sam Wilson']
  },
  {
    id: '8',
    name: 'Priya Patel',
    title: 'Venture Capitalist',
    company: 'Sequoia Capital',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
    expertiseAreas: ['Investing', 'SaaS', 'Fintech'],
    links: [
      { type: 'Twitter', url: 'https://twitter.com' }
    ],
    status: 'Seeking early-stage startups',
    design: {
      backgroundStyle: 'bg-[#1A1A1A] bg-subtle-grid',
      textColor: 'text-white'
    },
    connectionDegree: 2 as 2,
    mutualConnections: ['Jordan Lee']
  }
];

type ViewMode = 'stack' | 'grid' | 'list';

const Home = () => {
  const navigate = useNavigate();
  const { connections, addConnection } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('stack');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Initialize with sample connections if none exist
  useEffect(() => {
    if (connections.length === 0) {
      sampleConnections.forEach(connection => {
        addConnection(connection);
      });
    }
  }, [connections.length, addConnection]);

  const allFirstDegreeConnections = [...connections, ...sampleConnections];
  const allConnections = [...allFirstDegreeConnections, ...sampleSecondDegreeConnections];
  
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
      // For 1st degree connections, check last 7 days
      if (connection.connectionDegree === 1 && connection.connectionDate) {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return new Date(connection.connectionDate) >= sevenDaysAgo;
      }
      return false;
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

  const handleClearSearch = () => setSearchQuery('');

  // Calculate the total connections count
  const totalConnections = allConnections.length;

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
      
      {/* Connection count display - stacked with number on top */}
      <div className="flex items-center justify-center py-3 bg-background">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-medium">{totalConnections}</span>
          <span className="text-xs uppercase text-muted-foreground tracking-wide">Connections</span>
        </div>
      </div>
      
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
