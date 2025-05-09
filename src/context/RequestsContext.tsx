
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ConnectionRequest, BusinessCard } from '@/types';
import { useConnectionsContext } from './ConnectionsContext';

type RequestsContextType = {
  connectionRequests: ConnectionRequest[];
  sendConnectionRequest: (toUserId: string, fromUser: BusinessCard) => void;
  acceptConnectionRequest: (requestId: string) => void;
  declineConnectionRequest: (requestId: string) => void;
};

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

export const RequestsProvider = ({ children }: { children: ReactNode }) => {
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
  const { addConnection } = useConnectionsContext();

  // Send a connection request to another user
  const sendConnectionRequest = (toUserId: string, fromUser: BusinessCard) => {
    console.log(`Sending connection request to user ${toUserId}`);
    // In a real app, this would make an API call
    // For now, we'll simulate it by adding to the receiver's requests
    // In this demo, we'll just add it to our own connectionRequests for UI testing
    const newRequest: ConnectionRequest = {
      id: `req-${Date.now()}`,
      fromUser,
      timestamp: new Date().toISOString()
    };
    
    // Add to the connectionRequests array
    setConnectionRequests(prev => [...prev, newRequest]);
    
    // TODO: Save connection request to Supabase
  };

  // Accept a connection request
  const acceptConnectionRequest = (requestId: string) => {
    const request = connectionRequests.find(req => req.id === requestId);
    if (request) {
      // Add the user who sent the request to connections
      addConnection(request.fromUser);
      
      // Remove the request
      setConnectionRequests(prev => prev.filter(req => req.id !== requestId));
      
      // TODO: Update connection status in Supabase
    }
  };

  // Decline a connection request
  const declineConnectionRequest = (requestId: string) => {
    // Simply remove the request
    setConnectionRequests(prev => prev.filter(req => req.id !== requestId));
    
    // TODO: Update connection status in Supabase
  };

  return (
    <RequestsContext.Provider value={{
      connectionRequests,
      sendConnectionRequest,
      acceptConnectionRequest,
      declineConnectionRequest
    }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequestsContext = () => {
  const context = useContext(RequestsContext);
  if (context === undefined) {
    throw new Error('useRequestsContext must be used within a RequestsProvider');
  }
  return context;
};
