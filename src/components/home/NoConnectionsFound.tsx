
import { Button } from "@/components/ui/button";

type NoConnectionsFoundProps = {
  hasSearchQuery: boolean;
  onClearSearch: () => void;
};

const NoConnectionsFound = ({ hasSearchQuery, onClearSearch }: NoConnectionsFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-center">
      <p className="text-muted-foreground mb-2">No connections found</p>
      {hasSearchQuery && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={onClearSearch}
        >
          Clear search
        </Button>
      )}
    </div>
  );
};

export default NoConnectionsFound;
