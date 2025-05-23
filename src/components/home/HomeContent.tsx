
import CardStack from '../CardStack';
import NoConnectionsFound from './NoConnectionsFound';
import { BusinessCard, useAppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type HomeContentProps = {
  filteredConnections: BusinessCard[];
  searchQuery: string;
  onCardClick: (id: string) => void;
  onClearSearch: () => void;
};

const HomeContent = ({ 
  filteredConnections, 
  searchQuery, 
  onCardClick, 
  onClearSearch 
}: HomeContentProps) => {
  const { profile } = useAppContext();
  const navigate = useNavigate();
  
  // Check if onboarding is incomplete (no card or experiences)
  const isOnboardingIncomplete = !profile.card || profile.experiences.length === 0;
  
  // Effect to redirect if onboarding is incomplete
  useEffect(() => {
    if (isOnboardingIncomplete) {
      navigate('/', { replace: true });
    }
  }, [isOnboardingIncomplete, navigate]);
  
  if (isOnboardingIncomplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h3 className="text-xl font-semibold mb-3">Redirecting to Onboarding...</h3>
        <p className="text-muted-foreground mb-6">
          Please complete the onboarding process to set up your profile and business card.
        </p>
      </div>
    );
  }

  if (filteredConnections.length === 0) {
    return (
      <NoConnectionsFound 
        hasSearchQuery={searchQuery.length > 0} 
        onClearSearch={onClearSearch} 
      />
    );
  }

  return (
    <div className="h-full flex-grow overflow-hidden">
      <CardStack 
        cards={filteredConnections}
        onCardClick={onCardClick}
      />
    </div>
  );
};

export default HomeContent;
