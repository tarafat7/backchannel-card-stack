
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Share2, User, Users } from 'lucide-react';
import { useAppContext, BusinessCard } from '../context/AppContext';
import { useState } from 'react';
import FullBusinessCard from '@/components/cards/FullBusinessCard';
import SharedConnections from '@/components/shared/SharedConnections';
import CardActions from '@/components/cards/CardActions';
import IntroRequestDialog from '@/components/dialogs/IntroRequestDialog';
import ProfessionalHistory from '@/components/ProfessionalHistory';
import { sampleConnections, sampleSecondDegreeConnections } from '@/data/connectionData';

const ViewCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { connections } = useAppContext();
  const [introDialogOpen, setIntroDialogOpen] = useState(false);
  const [selectedMutualConnection, setSelectedMutualConnection] = useState<string | null>(null);
  
  // Get the card for this ID (combining sample data and real connections)
  const allFirstDegreeConnections = [...connections, ...sampleConnections];
  const allConnections = [...allFirstDegreeConnections, ...sampleSecondDegreeConnections];
  const card = allConnections.find(c => c.id === id);
  
  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Card not found</p>
      </div>
    );
  }
  
  const isDirectConnection = card.connectionDegree === 1;
  
  const handleRequestIntro = (mutualConnectionName: string) => {
    setSelectedMutualConnection(mutualConnectionName);
    setIntroDialogOpen(true);
  };
  
  return (
    <>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="p-4 flex justify-start items-center sticky top-0 bg-background/80 backdrop-blur-xl z-10">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </header>

        {/* Connection degree badge */}
        {!isDirectConnection && (
          <div className="px-4 mb-2">
            <div className="inline-flex items-center gap-1 text-xs font-medium bg-secondary/70 text-secondary-foreground px-2 py-1 rounded-full">
              <Users className="w-3 h-3" />
              <span>2nd Degree Connection</span>
            </div>
          </div>
        )}

        <FullBusinessCard card={card} />

        {/* Professional Experience section - always visible */}
        <div className="px-6 py-4">
          <ProfessionalHistory id={card.id} />
        </div>
        
        {/* Mutual Connections for 2nd degree */}
        {!isDirectConnection && card.mutualConnections && card.mutualConnections.length > 0 && (
          <div className="px-4 py-2 mb-4">
            <h3 className="text-sm font-medium mb-2">Mutual Connections</h3>
            <div className="space-y-2">
              {card.mutualConnections.map((connection, index) => (
                <div key={index} className="p-3 rounded-lg bg-secondary/50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{connection}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleRequestIntro(connection)}
                  >
                    Ask for intro
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Connection Info for 1st degree */}
        {isDirectConnection && card.connectionEvent && (
          <div className="px-4 py-2 mb-4">
            <SharedConnections connections={card.mutualConnections} />
          </div>
        )}
          
        <CardActions 
          isDirectConnection={isDirectConnection}
          onRequestIntro={() => setIntroDialogOpen(true)}
          personName={card.name}
        />
      </div>
      
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
