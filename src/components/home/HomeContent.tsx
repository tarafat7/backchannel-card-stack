
import CardStack from '../CardStack';
import ConnectionsGrid from './ConnectionsGrid';
import NoConnectionsFound from './NoConnectionsFound';
import { BusinessCard, useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type ViewMode = 'stack' | 'list';

type HomeContentProps = {
  viewMode: ViewMode;
  filteredConnections: BusinessCard[];
  searchQuery: string;
  onCardClick: (id: string) => void;
  onClearSearch: () => void;
};

const HomeContent = ({ 
  viewMode, 
  filteredConnections, 
  searchQuery, 
  onCardClick, 
  onClearSearch 
}: HomeContentProps) => {
  const { profile } = useAppContext();
  const navigate = useNavigate();
  
  // Check if onboarding is incomplete (no card or experiences)
  const isOnboardingIncomplete = !profile.card || profile.experiences.length === 0;
  
  if (isOnboardingIncomplete) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h3 className="text-xl font-semibold mb-3">Onboarding Incomplete</h3>
        <p className="text-muted-foreground mb-6">
          Please complete the onboarding process to set up your profile and business card.
        </p>
        <Button 
          onClick={() => navigate('/')} 
          className="bg-primary hover:bg-primary/90"
        >
          Complete Onboarding
        </Button>
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

  if (viewMode === 'stack') {
    return (
      <div className="h-full flex-grow overflow-hidden">
        <CardStack 
          cards={filteredConnections}
          onCardClick={onCardClick}
        />
      </div>
    );
  }

  return (
    <ConnectionsGrid 
      connections={filteredConnections} 
      viewMode="list"
      onCardClick={onCardClick}
    />
  );
};

export default HomeContent;
