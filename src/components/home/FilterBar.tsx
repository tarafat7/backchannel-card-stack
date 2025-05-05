
import { ReactNode } from "react";

type FilterBarProps = {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  unreadUpdates: number;
};

const FilterBar = ({ filters, activeFilter, setActiveFilter, unreadUpdates }: FilterBarProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm transition-colors relative ${
            activeFilter === filter
              ? 'bg-primary text-white'
              : 'bg-secondary text-muted-foreground'
          }`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
          
          {/* Notification badge */}
          {filter === 'Updates' && unreadUpdates > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#ea384c] rounded-full text-xs flex items-center justify-center text-white font-medium">
              {unreadUpdates}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
