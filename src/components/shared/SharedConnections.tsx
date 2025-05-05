
import React from 'react';
import { User } from 'lucide-react';

type SharedConnectionsProps = {
  connections?: string[];
};

const SharedConnections = ({ connections }: SharedConnectionsProps) => {
  if (!connections || connections.length === 0) return null;
  
  const connectionsCount = connections.length;
  
  return (
    <div className="mb-4">
      <h3 className="text-sm text-muted-foreground mb-2">Shared Connections</h3>
      <div className="flex items-center">
        <div className="flex -space-x-2">
          {Array(Math.min(connectionsCount, 3)).fill(0).map((_, i) => (
            <div 
              key={i} 
              className="w-8 h-8 rounded-full bg-secondary border-2 border-background overflow-hidden flex items-center justify-center"
            >
              <User className="w-4 h-4 text-secondary-foreground" />
            </div>
          ))}
        </div>
        <span className="ml-3 text-sm text-muted-foreground">
          {connectionsCount} shared connection{connectionsCount !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
};

export default SharedConnections;
