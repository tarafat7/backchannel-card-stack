import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  getProfile,
  getExperiences,
  getExpertiseAreas,
  getBusinessCard,
  updateProfile as updateProfileService,
  updateExperiences as updateExperiencesService,
  updateExpertiseAreas as updateExpertiseAreasService,
  updateBusinessCard as updateBusinessCardService
} from '@/services/profileService';
import { toast } from '@/components/ui/use-toast';

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
  connectionDegree: 1 | 2;
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
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [connections, setConnections] = useState<BusinessCard[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user data from Supabase when auth state changes
  useEffect(() => {
    async function loadUserData() {
      if (user) {
        setLoading(true);
        try {
          // Fetch all user data in parallel
          const [experiences, expertiseAreas, card] = await Promise.all([
            getExperiences(),
            getExpertiseAreas(),
            getBusinessCard()
          ]);

          setProfile({
            experiences: experiences || [],
            expertiseAreas: expertiseAreas || [],
            card
          });

          // Determine onboarding step based on data
          if (card && experiences.length > 0) {
            // User has completed onboarding
            setOnboardingStep(0);
          } else {
            // User needs to complete onboarding
            setOnboardingStep(1);
          }
        } catch (error) {
          console.error("Error loading user data:", error);
          toast({
            title: "Error loading profile",
            description: "Could not load your profile data. Please try refreshing.",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      } else {
        // Reset state when user logs out
        setProfile(initialProfile);
        setConnections([]);
        setConnectionRequests([]);
        setOnboardingStep(0);
        setLoading(false);
      }
    }

    loadUserData();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      console.warn("Cannot update profile: No authenticated user");
      return;
    }

    setProfile(prev => {
      // Create new profile object with updates
      const updatedProfile = { ...prev };
      
      // Update experiences if provided
      if (updates.experiences) {
        updatedProfile.experiences = updates.experiences;
        // Save to Supabase in background
        updateExperiencesService(updates.experiences)
          .catch(err => console.error("Failed to save experiences:", err));
      }
      
      // Update expertise areas if provided
      if (updates.expertiseAreas) {
        updatedProfile.expertiseAreas = updates.expertiseAreas;
        // Save to Supabase in background
        updateExpertiseAreasService(updates.expertiseAreas)
          .catch(err => console.error("Failed to save expertise areas:", err));
      }
      
      // Update card if provided
      if (updates.card) {
        updatedProfile.card = { ...prev.card, ...updates.card };
        // Save to Supabase in background via updateBusinessCard
        if (updatedProfile.card) {
          updateBusinessCardService(updatedProfile.card)
            .catch(err => console.error("Failed to save card:", err));
        }
      }
      
      return updatedProfile;
    });
  };

  const updateBusinessCard = async (card: BusinessCard) => {
    if (!user) {
      console.warn("Cannot update business card: No authenticated user");
      return;
    }

    // Update local state
    setProfile(prev => ({
      ...prev,
      card
    }));
    
    // Save to Supabase
    try {
      await updateBusinessCardService(card);
    } catch (error) {
      console.error("Failed to save business card:", error);
    }
  };

  const addConnection = (connection: BusinessCard) => {
    console.log("Adding connection with data:", connection);

    // Create a properly typed connection with the correct connection degree type
    // First extract just the connectionDegree value
    const degree: number = connection.connectionDegree;
    
    // Now create a new connection object with the proper type explicitly assigned
    const connectionWithDefaults: BusinessCard = {
      ...connection,
      // Ensure the connectionDegree is strictly typed as 1 | 2
      connectionDegree: degree === 2 ? 2 : 1,
      mutualConnections: connection.mutualConnections || [],
      phoneNumber: connection.phoneNumber || '4155551234'
    };
    
    console.log("Connection with defaults:", connectionWithDefaults);
    setConnections(prev => [...prev, connectionWithDefaults]);
    
    // TODO: Save connection to Supabase
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

  // Reset the profile to initial state (for account deletion)
  const resetProfile = () => {
    setProfile(initialProfile);
    setConnections([]);
    setConnectionRequests([]);
    setOnboardingStep(0);
    
    // TODO: Handle account deletion in Supabase
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
