
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BusinessCard } from '@/types';
import { toast } from '@/components/ui/use-toast';

type ConnectionsContextType = {
  connections: BusinessCard[];
  addConnection: (connection: BusinessCard) => void;
};

const ConnectionsContext = createContext<ConnectionsContextType | undefined>(undefined);

export const ConnectionsProvider = ({ children }: { children: ReactNode }) => {
  const [connections, setConnections] = useState<BusinessCard[]>([]);

  const addConnection = (connection: BusinessCard) => {
    console.log("Adding connection with data:", connection);

    // The critical fix: we need to make sure connectionDegree is strictly typed as 1 | 2
    // Create a properly typed connection with explicit type assertion
    const connectionWithDefaults: BusinessCard = {
      ...connection,
      // Explicitly cast the connectionDegree to the union type after checking
      connectionDegree: connection.connectionDegree === 2 ? 2 : 1 as 1 | 2,
      mutualConnections: connection.mutualConnections || [],
      phoneNumber: connection.phoneNumber || '4155551234'
    };
    
    console.log("Connection with defaults:", connectionWithDefaults);
    setConnections(prev => [...prev, connectionWithDefaults]);
    
    // TODO: Save connection to Supabase
  };

  return (
    <ConnectionsContext.Provider value={{
      connections,
      addConnection
    }}>
      {children}
    </ConnectionsContext.Provider>
  );
};

export const useConnectionsContext = () => {
  const context = useContext(ConnectionsContext);
  if (context === undefined) {
    throw new Error('useConnectionsContext must be used within a ConnectionsProvider');
  }
  return context;
};
