
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import ViewModeToggle from "./ViewModeToggle";

type ViewMode = 'stack' | 'grid' | 'list';

type HomeHeaderProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  filters: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  updatesCount?: number;
  resetUpdatesCount?: () => void;
};

const HomeHeader = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  filters,
  activeFilter,
  setActiveFilter,
  updatesCount = 0,
  resetUpdatesCount
}: HomeHeaderProps) => {
  return (
    <header className="p-4 sticky top-0 bg-background/80 backdrop-blur-xl z-10">
      <div className="flex justify-end items-center mb-4">
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilterBar 
        filters={filters} 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter}
        updatesCount={updatesCount}
        resetUpdatesCount={resetUpdatesCount}
      />
    </header>
  );
};

export default HomeHeader;
