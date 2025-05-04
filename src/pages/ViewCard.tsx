
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import FullBusinessCard from '@/components/cards/FullBusinessCard';
import SharedConnections from '@/components/shared/SharedConnections';
import CardActions from '@/components/cards/CardActions';
import IntroRequestDialog from '@/components/dialogs/IntroRequestDialog';

const ViewCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { connections } = useAppContext();
  const [introDialogOpen, setIntroDialogOpen] = useState(false);
  
  // Get the card for this ID (combining sample data and real connections)
  const sampleConnections = [
    {
      id: '2',
      name: 'Sam Wilson',
      title: 'Frontend Engineer',
      company: 'Linear',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
      expertiseAreas: ['Frontend', 'React', 'TypeScript'],
      links: [
        { type: 'Twitter', url: 'https://twitter.com' },
        { type: 'GitHub', url: 'https://github.com' }
      ],
      status: 'Building new features',
      design: {
        backgroundStyle: 'bg-gradient-card-2',
        textColor: 'text-white'
      },
      connectionDate: '2023-10-15',
      connectionEvent: 'React Conference',
      sharedConnections: ['Jordan Lee', 'Alex Kim', 'Taylor Swift']
    },
    {
      id: '3',
      name: 'Riley Johnson',
      title: 'Product Manager',
      company: 'Stripe',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      expertiseAreas: ['Product Strategy', 'Fintech', 'Growth'],
      links: [
        { type: 'Twitter', url: 'https://twitter.com' }
      ],
      status: 'Hiring designers',
      design: {
        backgroundStyle: 'bg-gradient-card-3',
        textColor: 'text-white'
      },
      connectionDate: '2023-11-02',
      connectionEvent: 'Startup Mixer',
      sharedConnections: ['Jordan Lee', 'Pat Johnson', 'Sam Chen', 'Aisha Patel', 'Miguel Rodriguez']
    }
  ];
  
  const allConnections = [...connections, ...sampleConnections];
  const card = allConnections.find(c => c.id === id);
  
  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Card not found</p>
      </div>
    );
  }
  
  const isDirectConnection = card.connectionDate !== undefined;
  
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

        <FullBusinessCard card={card} />
        
        {/* Connection Info */}
        <div className="px-4 py-2 mb-4">
          {card.sharedConnections && card.sharedConnections.length > 0 && (
            <SharedConnections connections={card.sharedConnections} />
          )}
        </div>
          
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
      />
    </>
  );
};

export default ViewCard;
