
import React from 'react';
import { useAppContext } from '../context/AppContext';
import professionalHistoryData from '@/data/professionalHistoryData';
import EmptyHistory from './history/EmptyHistory';
import HistoryTimeline from './history/HistoryTimeline';

type ProfessionalHistoryProps = {
  id: string;
};

const ProfessionalHistory: React.FC<ProfessionalHistoryProps> = ({ id }) => {
  const { connections } = useAppContext();

  // Check if history exists for this ID
  const history = professionalHistoryData[id] || [];
  
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
