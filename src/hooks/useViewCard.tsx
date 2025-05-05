
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BusinessCard, useAppContext } from '../context/AppContext';
import { sampleConnections, sampleSecondDegreeConnections } from '@/data/connectionData';

export const useViewCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { connections } = useAppContext();
  const [introDialogOpen, setIntroDialogOpen] = useState(false);
  const [selectedMutualConnection, setSelectedMutualConnection] = useState<string | null>(null);
  
  // Get the card for this ID (combining sample data and real connections)
  const allFirstDegreeConnections = [...connections, ...sampleConnections];
  const allConnections = [...allFirstDegreeConnections, ...sampleSecondDegreeConnections];
  
  // Update the connections to include random connection counts if they don't have them
  const connectionsWithCounts = allConnections.map(conn => {
    if (conn.connectionCount === undefined) {
      return {
        ...conn,
        connectionCount: Math.floor(Math.random() * 20) + 1 // Random number between 1-20
      };
    }
    return conn;
  });

  const card = connectionsWithCounts.find(c => c.id === id);
  
  const isDirectConnection = card?.connectionDegree === 1;
  
  const handleRequestIntro = (mutualConnectionName: string) => {
    setSelectedMutualConnection(mutualConnectionName);
    setIntroDialogOpen(true);
  };

  const goBack = () => navigate(-1);
  
  return {
    card,
    isDirectConnection,
    introDialogOpen,
    setIntroDialogOpen,
    selectedMutualConnection,
    handleRequestIntro,
    goBack
  };
};
