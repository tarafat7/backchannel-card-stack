
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
};

const HomeHeader = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  filters,
  activeFilter,
  setActiveFilter
}: HomeHeaderProps) => {
  return (
    <header className="p-4 sticky top-0 bg-background/80 backdrop-blur-xl z-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Your Network</h1>
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilterBar 
        filters={filters} 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />
    </header>
  );
};

export default HomeHeader;
