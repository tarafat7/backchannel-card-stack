
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search connections..."
        className="pl-9 bg-secondary border-none h-9 text-xs"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
