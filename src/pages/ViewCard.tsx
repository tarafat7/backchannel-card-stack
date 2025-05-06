
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

const ViewCard = () => {
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
    
  // Debug log to check phone number and card details
  console.log("Card details in ViewCard:", { 
    id: card.id, 
    name: card.name, 
    phoneNumber: card.phoneNumber || "No phone number available",
    isDirectConnection
  });
  
  const handleSendMessage = (name: string, phoneNumber?: string) => {
    console.log(`Sending message to mutual connection: ${name}`);
    console.log(`Phone number: ${phoneNumber || "4155551234"}`);
    
    // Use a default phone number if none is provided
    const numberToUse = phoneNumber || "4155551234";
    
    // Format phone number (remove any non-digits)
    const formattedPhone = numberToUse.replace(/\D/g, '');
    console.log(`Formatted phone number: ${formattedPhone}`);
    
    // Check if running on macOS
    const isMac = /Mac/i.test(navigator.userAgent) && !/iPhone|iPad|iPod/i.test(navigator.userAgent);
    // Check if running on iOS
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    console.log(`Platform detection - isMac: ${isMac}, isIOS: ${isIOS}`);
    
    // Create direct messaging URL
    let messageUrl;
    
    if (isMac) {
      messageUrl = `imessage://+${formattedPhone}`;
    } else if (isIOS) {
      messageUrl = `sms:${formattedPhone}`;
    } else {
      messageUrl = `sms:${formattedPhone}`;
    }
    
    console.log(`Opening message URL: ${messageUrl}`);
    
    // Use window.location.href for direct navigation
    window.location.href = messageUrl;
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

        {/* Professional Experience section - always visible for all connections */}
        <div className="px-6 py-4">
          <ProfessionalHistory id={card.id} />
        </div>
        
        {/* Mutual Connections for 2nd degree */}
        {!isDirectConnection && card.mutualConnections && card.mutualConnections.length > 0 && (
          <MutualConnectionsList 
            connections={card.mutualConnections} 
            onRequestIntro={handleRequestIntro}
            handleSendMessage={handleSendMessage}
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
        phoneNumber={card.phoneNumber}
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
