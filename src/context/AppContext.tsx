
import React, { ReactNode } from 'react';
import { ProfileProvider, useProfileContext } from './ProfileContext';
import { ConnectionsProvider, useConnectionsContext } from './ConnectionsContext';
import { RequestsProvider, useRequestsContext } from './RequestsContext';

// Re-export types from the types file
export * from '@/types';

// Create the combined provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ProfileProvider>
      <ConnectionsProvider>
        <RequestsProvider>
          {children}
        </RequestsProvider>
      </ConnectionsProvider>
    </ProfileProvider>
  );
};

// Create a combined hook that returns all context values
export const useAppContext = () => {
  const profileContext = useProfileContext();
  const connectionsContext = useConnectionsContext();
  const requestsContext = useRequestsContext();

  return {
    // Profile context
    profile: profileContext.profile,
    onboardingStep: profileContext.onboardingStep,
    setOnboardingStep: profileContext.setOnboardingStep,
    updateProfile: profileContext.updateProfile,
    updateBusinessCard: profileContext.updateBusinessCard,
    resetProfile: profileContext.resetProfile,

    // Connections context
    connections: connectionsContext.connections,
    addConnection: connectionsContext.addConnection,

    // Requests context
    connectionRequests: requestsContext.connectionRequests,
    sendConnectionRequest: requestsContext.sendConnectionRequest,
    acceptConnectionRequest: requestsContext.acceptConnectionRequest,
    declineConnectionRequest: requestsContext.declineConnectionRequest,
  };
};
