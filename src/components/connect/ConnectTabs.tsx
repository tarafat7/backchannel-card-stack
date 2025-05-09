
import { useState } from 'react';

type TabOption = 'share' | 'scan';

type ConnectTabsProps = {
  activeTab: TabOption;
  onTabChange: (tab: TabOption) => void;
};

const ConnectTabs = ({ activeTab, onTabChange }: ConnectTabsProps) => {
  return (
    <div className="flex border-b border-white/10">
      <button
        className={`flex-1 py-3 text-center ${
          activeTab === 'share'
            ? 'text-primary border-b-2 border-primary'
            : 'text-muted-foreground'
        }`}
        onClick={() => onTabChange('share')}
      >
        Share My Card
      </button>
      <button
        className={`flex-1 py-3 text-center ${
          activeTab === 'scan'
            ? 'text-primary border-b-2 border-primary'
            : 'text-muted-foreground'
        }`}
        onClick={() => onTabChange('scan')}
      >
        Scan a Card
      </button>
    </div>
  );
};

export default ConnectTabs;
