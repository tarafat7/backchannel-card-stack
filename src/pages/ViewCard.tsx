
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Share2, User, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import FullBusinessCard from '@/components/cards/FullBusinessCard';
import SharedConnections from '@/components/shared/SharedConnections';
import CardActions from '@/components/cards/CardActions';
import IntroRequestDialog from '@/components/dialogs/IntroRequestDialog';
import ProfessionalHistory from '@/components/ProfessionalHistory';

const ViewCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { connections } = useAppContext();
  const [introDialogOpen, setIntroDialogOpen] = useState(false);
  const [selectedMutualConnection, setSelectedMutualConnection] = useState<string | null>(null);
  
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
      connectionDegree: 1,
      mutualConnections: []
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
      connectionDegree: 1,
      mutualConnections: []
    }
  ];
  
  // Sample second degree connections
  const sampleSecondDegreeConnections = [
    {
      id: '6',
      name: 'Alicia Chen',
      title: 'Senior UX Designer',
      company: 'Shopify',
      avatar: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      expertiseAreas: ['UX Design', 'Research', 'UI Design'],
      links: [
        { type: 'Twitter', url: 'https://twitter.com' }
      ],
      status: 'Hiring junior designers',
      design: {
        backgroundStyle: 'bg-gradient-card-1',
        textColor: 'text-white'
      },
      connectionDegree: 2,
      mutualConnections: ['Riley Johnson', 'Sam Wilson']
    },
    {
      id: '7',
      name: 'Marcus James',
      title: 'Tech Lead',
      company: 'Airbnb',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      expertiseAreas: ['Engineering Leadership', 'System Design', 'React Native'],
      links: [
        { type: 'GitHub', url: 'https://github.com' },
        { type: 'Portfolio', url: 'https://example.com' }
      ],
      status: 'Building mobile team',
      design: {
        backgroundStyle: 'bg-black',
        textColor: 'text-white'
      },
      connectionDegree: 2,
      mutualConnections: ['Sam Wilson']
    },
    {
      id: '8',
      name: 'Priya Patel',
      title: 'Venture Capitalist',
      company: 'Sequoia Capital',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80',
      expertiseAreas: ['Investing', 'SaaS', 'Fintech'],
      links: [
        { type: 'Twitter', url: 'https://twitter.com' }
      ],
      status: 'Seeking early-stage startups',
      design: {
        backgroundStyle: 'bg-[#1A1A1A] bg-subtle-grid',
        textColor: 'text-white'
      },
      connectionDegree: 2,
      mutualConnections: ['Jordan Lee']
    }
  ];
  
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
