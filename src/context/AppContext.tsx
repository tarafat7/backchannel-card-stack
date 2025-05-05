
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
  connectionCount?: number; // Number of connections this person has
}

export type UserProfile = {
  experiences: {
    title: string;
    company: string;
    years: string;
  }[];
  expertiseAreas: string[];
  card: BusinessCard | null;
}

type AppContextType = {
  profile: UserProfile;
  connections: BusinessCard[];
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateBusinessCard: (card: BusinessCard) => void;
  addConnection: (connection: BusinessCard) => void;
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
  const [onboardingStep, setOnboardingStep] = useState<number>(0);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateBusinessCard = (card: BusinessCard) => {
    setProfile(prev => ({ ...prev, card }));
  };

  const addConnection = (connection: BusinessCard) => {
    // Ensure the connection has the connectionDegree and mutualConnections properties
    const connectionWithDefaults = {
      ...connection,
      connectionDegree: connection.connectionDegree || 1,
      mutualConnections: connection.mutualConnections || [],
      connectionCount: connection.connectionCount || Math.floor(Math.random() * 20) + 1 // Random connection count if not provided
    };
    setConnections(prev => [...prev, connectionWithDefaults]);
  };

  return (
    <AppContext.Provider value={{
      profile,
      connections,
      onboardingStep,
      setOnboardingStep,
      updateProfile,
      updateBusinessCard,
      addConnection
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
