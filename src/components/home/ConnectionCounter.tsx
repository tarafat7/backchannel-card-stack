
import { ChevronRight } from "lucide-react";

type ConnectionCounterProps = {
  totalConnections: number;
  label?: string;
  isClickable?: boolean;
  showArrow?: boolean; // New prop to control arrow visibility
};

const ConnectionCounter = ({ 
  totalConnections, 
  label, 
  isClickable = false, 
  showArrow = true // Default to showing the arrow
}: ConnectionCounterProps) => {
  return (
    <div className={`flex items-center justify-center py-3 bg-background ${isClickable ? 'cursor-pointer hover:bg-secondary/30 transition-colors' : ''}`}>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-medium">{totalConnections}</span>
        <span className="text-xs uppercase text-muted-foreground tracking-wide">
          {label || (totalConnections === 1 ? "Connection" : "Connections")}
        </span>
      </div>
      {isClickable && showArrow && <ChevronRight className="ml-2 w-4 h-4 text-muted-foreground" />}
    </div>
  );
};

export default ConnectionCounter;
