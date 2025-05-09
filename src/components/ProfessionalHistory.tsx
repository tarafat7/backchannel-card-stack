
import React from 'react';
import { useAppContext } from '../context/AppContext';
import professionalHistoryData from '@/data/professionalHistoryData';
import EmptyHistory from './history/EmptyHistory';
import HistoryTimeline from './history/HistoryTimeline';
import { HistoryItem } from '@/data/professionalHistoryData';
import { Experience } from '@/types';

type ProfessionalHistoryProps = {
  id: string;
  cardExperiences?: Experience[];
};

const ProfessionalHistory: React.FC<ProfessionalHistoryProps> = ({ id, cardExperiences }) => {
  const { profile } = useAppContext();
  
  // Check if this is the current user's profile (via card id)
  const isCurrentUser = profile.card && profile.card.id === id;
  
  let history: HistoryItem[] = [];
  
  if (cardExperiences && cardExperiences.length > 0) {
    // Use experiences passed directly through the card
    history = cardExperiences.map(exp => ({
      position: exp.title,
      company: exp.company,
      duration: exp.years,
      description: exp.description || ''
    }));
  } else if (isCurrentUser && profile.experiences && profile.experiences.length > 0) {
    // Map profile experiences to history items format
    history = profile.experiences.map(exp => ({
      position: exp.title,
      company: exp.company,
      duration: exp.years,
      description: exp.description || ''
    }));
  } else {
    // Use the sample professional history data for other users
    history = professionalHistoryData[id] || [];
  }
  
  // If no history found, show empty state
  if (history.length === 0) {
    return <EmptyHistory />;
  }

  return (
    <div className="space-y-3 max-h-[250px] overflow-auto no-scrollbar">
      <h4 className="text-sm font-medium text-white/90">Professional Experience</h4>
      <HistoryTimeline history={history} />
    </div>
  );
};

export default ProfessionalHistory;
