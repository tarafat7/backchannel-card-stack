
import React from 'react';
import { Button } from "@/components/ui/button";
import { User } from 'lucide-react';

type MutualConnectionsListProps = {
  connections: string[];
  onRequestIntro: (connectionName: string) => void;
};

const MutualConnectionsList = ({ connections, onRequestIntro }: MutualConnectionsListProps) => {
  if (!connections || connections.length === 0) return null;

  return (
    <div className="px-4 py-2 mb-4">
      <h3 className="text-sm font-medium mb-2">Mutual Connections</h3>
      <div className="space-y-2">
        {connections.map((connection, index) => (
          <div key={index} className="p-3 rounded-lg bg-secondary/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm">{connection}</span>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onRequestIntro(connection)}
            >
              Ask for intro
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MutualConnectionsList;
