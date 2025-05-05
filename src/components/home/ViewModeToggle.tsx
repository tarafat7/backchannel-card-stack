
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

type ViewMode = 'stack' | 'list';

type ViewModeToggleProps = {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

const ViewModeToggle = ({ viewMode, onChange }: ViewModeToggleProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onChange('stack')}
        className={viewMode === 'stack' ? 'text-primary' : 'text-muted-foreground'}
      >
        <LayoutGrid className="w-5 h-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onChange('list')}
        className={viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'}
      >
        <List className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ViewModeToggle;
