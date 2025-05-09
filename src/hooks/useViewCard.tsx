
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BusinessCard, useAppContext } from '../context/AppContext';
import { sampleConnections, sampleSecondDegreeConnections } from '@/data/connectionData';
import { useHaptics } from './useHaptics';

export const useViewCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { connections } = useAppContext();
  const [introDialogOpen, setIntroDialogOpen] = useState(false);
  const [selectedMutualConnection, setSelectedMutualConnection] = useState<string | null>(null);
  const { mediumHapticFeedback } = useHaptics();
  
  // Get the card for this ID (combining sample data and real connections)
  const allFirstDegreeConnections = [...connections, ...sampleConnections];
  const allConnections = [...allFirstDegreeConnections, ...sampleSecondDegreeConnections];
  const card = allConnections.find(c => c.id === id);
  
  const isDirectConnection = card?.connectionDegree === 1;
  
  // Provide haptic feedback when the card is viewed
  useEffect(() => {
    if (card) {
      mediumHapticFeedback();
    }
  }, [card, mediumHapticFeedback]);
  
  const handleRequestIntro = (mutualConnectionName: string) => {
    mediumHapticFeedback();
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
