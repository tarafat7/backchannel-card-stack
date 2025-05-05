
import { useState, useEffect } from 'react';
import { BusinessCard, useAppContext } from '@/context/AppContext';
import { sampleConnections, sampleSecondDegreeConnections } from '@/data/connectionData';

type UseConnectionsResult = {
  filteredConnections: BusinessCard[];
  totalConnections: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'stack' | 'list';
  setViewMode: (mode: 'stack' | 'list') => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  handleCardClick: (id: string) => void;
  handleClearSearch: () => void;
};

export const useConnections = (navigate: (path: string) => void): UseConnectionsResult => {
  const { connections, addConnection } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'stack' | 'list'>('stack');
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

  const handleClearSearch = () => setSearchQuery('');

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
      // Only show 1st degree connections in the 'All' filter
      return connection.connectionDegree === 1;
    }
    
    if (activeFilter === 'Updates') {
      // Show connections with status updates (for this demo, we'll use those with "new" or "just" in the status)
      return connection.status.toLowerCase().includes('new') || 
             connection.status.toLowerCase().includes('just');
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

  return {
    filteredConnections,
    totalConnections: allConnections.length,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    activeFilter,
    setActiveFilter,
    handleCardClick,
    handleClearSearch
  };
};
