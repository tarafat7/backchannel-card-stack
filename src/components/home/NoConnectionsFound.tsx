
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

type NoConnectionsFoundProps = {
  hasSearchQuery: boolean;
  onClearSearch: () => void;
};

const NoConnectionsFound = ({ hasSearchQuery, onClearSearch }: NoConnectionsFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-center p-4">
      {hasSearchQuery ? (
        <>
          <p className="text-muted-foreground mb-2">No connections found</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onClearSearch}
          >
            Clear search
          </Button>
        </>
      ) : (
        <>
          <UserPlus className="h-10 w-10 text-primary/60 mb-3" />
          <p className="text-muted-foreground font-medium">Ready to grow your network</p>
          <p className="text-xs text-muted-foreground/70 mt-1 max-w-xs">
            Share your business card to start connecting with others
          </p>
        </>
      )}
    </div>
  );
};

export default NoConnectionsFound;
