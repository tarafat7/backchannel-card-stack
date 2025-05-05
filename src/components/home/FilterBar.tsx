
import { ReactNode } from "react";
import { BellDot } from "lucide-react";

type FilterBarProps = {
  filters: string[];
  activeFilter: string;
  onChange: (filter: string) => void;
  updatesFilter?: string;
  updatesCount?: number;
  renderBadge?: (filter: string, count: number) => ReactNode;
};

const FilterBar = ({ 
  filters, 
  activeFilter, 
  onChange,
  updatesFilter,
  updatesCount = 0,
  renderBadge
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
          onClick={() => onChange(filter)}
        >
          {filter}
          {renderBadge && filter === updatesFilter && renderBadge(filter, updatesCount)}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
