
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import ViewModeToggle from "./ViewModeToggle";
import { useAppContext } from "@/context/AppContext";

type ViewMode = 'stack' | 'list';

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
  const { profile } = useAppContext();
  
  return (
    <header className="p-4 sticky top-0 bg-background/80 backdrop-blur-xl z-10">
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src={profile.card?.avatar} alt={profile.card?.name || "Profile"} />
          <AvatarFallback>{profile.card?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      
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
