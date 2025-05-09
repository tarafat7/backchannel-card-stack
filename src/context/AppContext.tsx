
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CardDesign = {
  backgroundStyle: string;
  textColor: string;
}

export type BusinessCard = {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  expertiseAreas: string[];
  links: {
    type: string;
    url: string;
  }[];
  status: string;
  design: CardDesign;
  connectionDate?: string;
  connectionEvent?: string;
  connectionDegree?: 1 | 2;
  mutualConnections: string[]; // Names of mutual connections
  phoneNumber?: string; // Phone number for sending messages
}

// Updated Experience type definition to be consistent across the app
export type Experience = {
  title: string;
  company: string;
  years: string;
  description?: string;
}

export type UserProfile = {
  experiences: Experience[];
  expertiseAreas: string[];
  card: BusinessCard | null;
}

export type ConnectionRequest = {
  id: string;
  fromUser: BusinessCard;
  timestamp: string;
}

type AppContextType = {
  profile: UserProfile;
  connections: BusinessCard[];
  connectionRequests: ConnectionRequest[];
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateBusinessCard: (card: BusinessCard) => void;
  addConnection: (connection: BusinessCard) => void;
  sendConnectionRequest: (toUserId: string, fromUser: BusinessCard) => void;
  acceptConnectionRequest: (requestId: string) => void;
  declineConnectionRequest: (requestId: string) => void;
  resetProfile: () => void; // New function to reset the profile
};

const initialProfile: UserProfile = {
  experiences: [],
  expertiseAreas: [],
  card: null
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [connections, setConnections] = useState<BusinessCard[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
  const [onboardingStep, setOnboardingStep] = useState<number>(0);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateBusinessCard = (card: BusinessCard) => {
    setProfile(prev => ({ ...prev, card }));
  };

  const addConnection = (connection: BusinessCard) => {
    console.log("Adding connection with data:", connection);
    
    // Ensure the connection has the connectionDegree and mutualConnections properties
    // Also make sure phoneNumber is included with a real phone number format
    const connectionWithDefaults = {
      ...connection,
      connectionDegree: connection.connectionDegree || 1,
      mutualConnections: connection.mutualConnections || [],
      // Use a real format phone number that works with iMessage - no dashes or parentheses
      phoneNumber: connection.phoneNumber || '4155551234' 
    };
    
    console.log("Connection with defaults:", connectionWithDefaults);
    setConnections(prev => [...prev, connectionWithDefaults]);
  };

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
  };

  // Accept a connection request
  const acceptConnectionRequest = (requestId: string) => {
    const request = connectionRequests.find(req => req.id === requestId);
    if (request) {
      // Add the user who sent the request to connections
      addConnection(request.fromUser);
      
      // Remove the request
      setConnectionRequests(prev => prev.filter(req => req.id !== requestId));
    }
  };

  // Decline a connection request
  const declineConnectionRequest = (requestId: string) => {
    // Simply remove the request
    setConnectionRequests(prev => prev.filter(req => req.id !== requestId));
  };

  // Reset the profile to initial state (for account deletion)
  const resetProfile = () => {
    setProfile(initialProfile);
    setConnections([]);
    setConnectionRequests([]);
    setOnboardingStep(0);
  };

  return (
    <AppContext.Provider value={{
      profile,
      connections,
      connectionRequests,
      onboardingStep,
      setOnboardingStep,
      updateProfile,
      updateBusinessCard,
      addConnection,
      sendConnectionRequest,
      acceptConnectionRequest,
      declineConnectionRequest,
      resetProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
