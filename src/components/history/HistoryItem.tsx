
import React from 'react';
import { HistoryItem as HistoryItemType } from '@/data/professionalHistoryData';

type HistoryItemProps = {
  item: HistoryItemType;
};

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  return (
    <div className="relative">
      <div className="absolute -left-[21px] top-1 w-3 h-3 bg-primary rounded-full" />
      <div>
        <h5 className="font-medium text-sm">{item.position}</h5>
        <div className="flex justify-between text-xs text-white/70">
          <span>{item.company}</span>
          <span>{item.duration}</span>
        </div>
        {item.description && (
          <p className="text-xs text-white/60 mt-1">{item.description}</p>
        )}
      </div>
    </div>
  );
};

export default HistoryItem;
