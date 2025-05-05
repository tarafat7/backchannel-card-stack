
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
  const card = allConnections.find(c => c.id === id);
  
  // Explicitly check the connection degree, default to 1st degree if not specified
  const isDirectConnection = card ? (card.connectionDegree === 2 ? false : true) : true;
  
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
