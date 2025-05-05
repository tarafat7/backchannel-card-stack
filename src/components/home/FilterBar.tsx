
import { ReactNode } from "react";
import { BellDot } from "lucide-react";

type FilterBarProps = {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  updatesCount?: number;
  resetUpdatesCount?: () => void;
};

const FilterBar = ({ 
  filters, 
  activeFilter, 
  setActiveFilter, 
  updatesCount = 0,
  resetUpdatesCount
}: FilterBarProps) => {
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
          onClick={() => {
            setActiveFilter(filter);
            // Reset updates count when clicking on the Updates tab
            if (filter === 'Updates' && resetUpdatesCount) {
              resetUpdatesCount();
            }
          }}
        >
          {filter}
          {filter === 'Updates' && updatesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {updatesCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
