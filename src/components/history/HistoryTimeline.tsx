
import React from 'react';
import { HistoryItem as HistoryItemType } from '@/data/professionalHistoryData';
import HistoryItem from './HistoryItem';

type HistoryTimelineProps = {
  history: HistoryItemType[];
};

const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ history }) => {
  return (
    <div className="relative border-l border-primary/30 ml-2 pl-4 space-y-4">
      {history.map((item, index) => (
        <HistoryItem key={index} item={item} />
      ))}
    </div>
  );
};

export default HistoryTimeline;
