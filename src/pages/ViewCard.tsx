
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import FullBusinessCard from '@/components/cards/FullBusinessCard';
import SharedConnections from '@/components/shared/SharedConnections';
import CardActions from '@/components/cards/CardActions';
import IntroRequestDialog from '@/components/dialogs/IntroRequestDialog';
import ProfessionalHistory from '@/components/ProfessionalHistory';
import { useViewCard } from '@/hooks/useViewCard';
import MutualConnectionsList from '@/components/connections/MutualConnectionsList';
import SecondDegreeConnectionBadge from '@/components/connections/SecondDegreeConnectionBadge';
import ConnectionCounter from '@/components/home/ConnectionCounter';
import { useNavigate } from 'react-router-dom';

const ViewCard = () => {
  const navigate = useNavigate();
  const {
    card,
    isDirectConnection,
    introDialogOpen,
    setIntroDialogOpen,
    selectedMutualConnection,
    handleRequestIntro,
    goBack
  } = useViewCard();
  
  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Card not found</p>
      </div>
    );
  }
  
  // Get the first mutual connection name for the button text
  const firstMutualConnection = card.mutualConnections && card.mutualConnections.length > 0 
    ? card.mutualConnections[0] 
    : undefined;
  
  // Handle click on connection counter
  const handleConnectionCounterClick = () => {
    navigate(`/connections/${card.id}`);
  };
  
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col pb-20">
        {/* Header */}
        <header className="p-4 flex justify-start items-center sticky top-0 bg-background/80 backdrop-blur-xl z-10">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={goBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </header>

        {/* Connection degree badge */}
        {!isDirectConnection && <SecondDegreeConnectionBadge />}

        <FullBusinessCard card={card} />

        {/* Connection Counter (clickable) - now with showArrow={false} */}
        {card.connectionCount !== undefined && (
          <div className="mt-4 cursor-pointer" onClick={handleConnectionCounterClick}>
            <ConnectionCounter 
              totalConnections={card.connectionCount} 
              label={`${card.name.split(' ')[0]}'s Connections`}
              isClickable
              showArrow={false}
            />
          </div>
        )}

        {/* Professional Experience section - always visible for all connections */}
        <div className="px-6 py-4">
          <ProfessionalHistory id={card.id} />
        </div>
        
        {/* Mutual Connections for 2nd degree */}
        {!isDirectConnection && card.mutualConnections && card.mutualConnections.length > 0 && (
          <MutualConnectionsList 
            connections={card.mutualConnections} 
            onRequestIntro={handleRequestIntro} 
          />
        )}
        
        {/* Connection Info for 1st degree */}
        {isDirectConnection && card.connectionEvent && (
          <div className="px-4 py-2 mb-4">
            <SharedConnections connections={card.mutualConnections} />
          </div>
        )}
      </div>
      
      <CardActions 
        isDirectConnection={isDirectConnection}
        onRequestIntro={() => setIntroDialogOpen(true)}
        personName={card.name}
        mutualConnectionName={firstMutualConnection}
      />
      
      <IntroRequestDialog 
        open={introDialogOpen} 
        onOpenChange={setIntroDialogOpen}
        personName={card.name}
        mutualConnection={selectedMutualConnection || (card.mutualConnections ? card.mutualConnections[0] : "Jordan Lee")}
      />
    </>
  );
};

export default ViewCard;
