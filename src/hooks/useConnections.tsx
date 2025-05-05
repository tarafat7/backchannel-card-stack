
import { useState, useEffect } from 'react';
import { BusinessCard, useAppContext } from '@/context/AppContext';
import { sampleConnections, sampleSecondDegreeConnections } from '@/data/connectionData';

type UseConnectionsResult = {
  filteredConnections: BusinessCard[];
  totalConnections: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'stack' | 'grid' | 'list';
  setViewMode: (mode: 'stack' | 'grid' | 'list') => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  handleCardClick: (id: string) => void;
  handleClearSearch: () => void;
  unreadUpdates: number;
};

export const useConnections = (navigate: (path: string) => void): UseConnectionsResult => {
  const { connections, addConnection } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'stack' | 'grid' | 'list'>('stack');
  const [activeFilter, setActiveFilter] = useState('All');
  const [unreadUpdates, setUnreadUpdates] = useState<number>(3); // Initial value for demo
  const [checkedUpdates, setCheckedUpdates] = useState<boolean>(false);

  // Initialize with sample connections if none exist
  useEffect(() => {
    if (connections.length === 0) {
      sampleConnections.forEach(connection => {
        addConnection(connection);
      });
    }
  }, [connections.length, addConnection]);
  
  // Handle the read status of updates
  useEffect(() => {
    if (activeFilter === 'Updates' && unreadUpdates > 0) {
      setCheckedUpdates(true);
    }
  }, [activeFilter]);

  // Reset notification count when user checks updates tab
  useEffect(() => {
    if (checkedUpdates && activeFilter === 'Updates') {
      setUnreadUpdates(0);
    }
  }, [checkedUpdates, activeFilter]);

  const allFirstDegreeConnections = [...connections, ...sampleConnections];
  const allConnections = [...allFirstDegreeConnections, ...sampleSecondDegreeConnections];
  
  const handleCardClick = (id: string) => {
    navigate(`/card/${id}`);
  };

  const handleClearSearch = () => setSearchQuery('');

  // Set view mode to list for Updates tab
  useEffect(() => {
    if (activeFilter === 'Updates') {
      setViewMode('list');
    } else if (viewMode === 'list' && activeFilter !== 'Updates') {
      // Optionally return to stack view when leaving Updates tab
      setViewMode('stack');
    }
  }, [activeFilter]);

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
      // Show connections with status updates (for demo, we'll show those with status fields)
      return connection.status && connection.status.length > 0;
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
    handleClearSearch,
    unreadUpdates
  };
};
