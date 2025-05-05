
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BusinessCard, useAppContext } from '@/context/AppContext';

type ConnectionCounterProps = {
  totalConnections: number;
  firstDegreeConnections: BusinessCard[];
};

const ConnectionCounter = ({ totalConnections, firstDegreeConnections }: ConnectionCounterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCardClick = (id: string) => {
    navigate(`/card/${id}`);
  };

  return (
    <div className="flex flex-col items-center py-3 bg-background">
      <button 
        onClick={handleToggle}
        className="flex flex-col items-center hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center">
          <span className="text-2xl font-medium">{firstDegreeConnections.length}</span>
          {isExpanded ? 
            <ChevronUp className="w-4 h-4 ml-1" /> : 
            <ChevronDown className="w-4 h-4 ml-1" />
          }
        </div>
        <span className="text-xs uppercase text-muted-foreground tracking-wide">
          {firstDegreeConnections.length === 1 ? "1st Degree Connection" : "1st Degree Connections"} 
        </span>
      </button>
      
      {isExpanded && firstDegreeConnections.length > 0 && (
        <div className="mt-2 w-full px-4 max-h-60 overflow-y-auto">
          <div className="space-y-2 bg-secondary/30 p-3 rounded-md">
            {firstDegreeConnections.map((connection) => (
              <button
                key={connection.id}
                className="flex items-center w-full p-2 hover:bg-secondary/50 rounded-md transition-colors text-left"
                onClick={() => handleCardClick(connection.id)}
              >
                <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden flex-shrink-0 mr-2">
                  {connection.avatar ? (
                    <img src={connection.avatar} alt={connection.name} className="w-full h-full object-cover" />
                  ) : null}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium truncate">{connection.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{connection.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionCounter;
