
import { useState } from 'react';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import ViewModeToggle from './ViewModeToggle';
import { Badge } from "@/components/ui/badge";

type HomeHeaderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: 'stack' | 'list';
  setViewMode: (mode: 'stack' | 'list') => void;
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  updatesCount: number;
  resetUpdatesCount: () => void;
};

const HomeHeader = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  filters,
  activeFilter,
  setActiveFilter,
  updatesCount,
  resetUpdatesCount
}: HomeHeaderProps) => {
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'Updates') {
      resetUpdatesCount(); // Reset the updates count when switching to Updates filter
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-background pt-4 px-4 pb-2 border-b">
      <div className="flex items-center gap-2">
        <div className="flex-grow">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
        <ViewModeToggle 
          viewMode={viewMode}
          onChange={setViewMode}
        />
      </div>
      
      <div className="mt-4">
        <FilterBar 
          filters={filters} 
          activeFilter={activeFilter} 
          onChange={handleFilterChange}
          updatesFilter="Updates"
          updatesCount={updatesCount}
          renderBadge={(filter, count) => (
            filter === 'Updates' && count !== undefined && (
              <Badge 
                className={`ml-1 ${count > 0 ? 'bg-red-500' : 'bg-gray-300 text-gray-600'} text-xs rounded-full px-1.5 min-w-5 h-5 inline-flex items-center justify-center`}
              >
                {count}
              </Badge>
            )
          )}
        />
      </div>
    </header>
  );
};

export default HomeHeader;
