
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

type ViewMode = 'stack' | 'grid' | 'list';

type ViewModeToggleProps = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};

const ViewModeToggle = ({ viewMode, setViewMode }: ViewModeToggleProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setViewMode('stack')}
        className={viewMode === 'stack' ? 'text-primary' : 'text-muted-foreground'}
      >
        <LayoutGrid className="w-5 h-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setViewMode('grid')}
        className={viewMode === 'grid' ? 'text-primary' : 'text-muted-foreground'}
      >
        <LayoutGrid className="w-5 h-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setViewMode('list')}
        className={viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'}
      >
        <List className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ViewModeToggle;
