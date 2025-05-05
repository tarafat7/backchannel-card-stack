
import { ReactNode } from "react";

type FilterBarProps = {
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const FilterBar = ({ filters, activeFilter, setActiveFilter }: FilterBarProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm transition-colors ${
            activeFilter === filter
              ? 'bg-primary text-white'
              : 'bg-secondary text-muted-foreground'
          }`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
