
import React from 'react';
import { Button } from "@/components/ui/button";

type EmptyStateProps = {
  searchQuery: string;
  onClearSearch: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({ searchQuery, onClearSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-center">
      <p className="text-muted-foreground mb-2">No connections found</p>
      {searchQuery && (
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

export default EmptyState;
