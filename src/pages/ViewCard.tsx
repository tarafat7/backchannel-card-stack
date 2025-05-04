
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, ExternalLink, Link as LinkIcon, Twitter, Github } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

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
      sharedConnections: 3
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
      sharedConnections: 5
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
  
  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${card.name}`,
    });
  };
  
  const handleRequestIntro = () => {
    setIntroDialogOpen(true);
  };
  
  const handleSendIntroRequest = () => {
    toast({
      title: "Introduction Requested",
      description: "Your introduction request has been sent!",
    });
    
    setIntroDialogOpen(false);
  };
  
  const getSocialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'github':
        return <Github className="w-4 h-4" />;
      default:
        return <LinkIcon className="w-4 h-4" />;
    }
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

        {/* Full Card */}
        <div className={`m-4 p-6 rounded-xl ${card.design.backgroundStyle}`}>
          <div className={`h-full ${card.design.textColor}`}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-black/20 overflow-hidden border border-white/20">
                {card.avatar && (
                  <img 
                    src={card.avatar} 
                    alt={card.name} 
                    className="w-full h-full object-cover" 
                  />
                )}
              </div>
              <div>
                <h1 className="text-xl font-semibold">{card.name}</h1>
                <p className="text-lg opacity-90">{card.title}</p>
                <p className="text-sm opacity-80">{card.company}</p>
              </div>
            </div>
            
            {card.status && (
              <div className="px-3 py-1.5 bg-black/10 rounded-lg text-sm mt-4 backdrop-blur-sm w-fit">
                {card.status}
              </div>
            )}
            
            {card.expertiseAreas && card.expertiseAreas.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm opacity-80 mb-2">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {card.expertiseAreas.map((area, index) => (
                    <span key={index} className="chip">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {card.links && card.links.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm opacity-80 mb-2">Links</h3>
                <div className="flex gap-2">
                  {card.links.map((link, index) => (
                    <a 
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-button"
                    >
                      {getSocialIcon(link.type)}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {isDirectConnection && card.connectionEvent && (
              <div className="mt-6 py-2 border-t border-white/10">
                <p className="text-sm opacity-70">
                  Connected at {card.connectionEvent} • {new Date(card.connectionDate!).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Connection Info */}
        <div className="px-4 py-2 mb-4">
          {card.sharedConnections && card.sharedConnections > 0 && (
            <div className="mb-4">
              <h3 className="text-sm text-muted-foreground mb-2">Shared Connections</h3>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {Array(Math.min(card.sharedConnections, 3)).fill(0).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-8 h-8 rounded-full bg-secondary border-2 border-background overflow-hidden"
                    >
                      <div className="w-full h-full bg-primary/30" />
                    </div>
                  ))}
                </div>
                <span className="ml-3 text-sm text-muted-foreground">
                  {card.sharedConnections} shared connection{card.sharedConnections !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </div>
          
        {/* Actions */}
        <div className="px-4 mt-auto mb-8">
          {isDirectConnection ? (
            <Button 
              className="w-full mb-3"
              onClick={handleSendMessage}
            >
              Message
              <MessageCircle className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              className="w-full mb-3"
              onClick={handleRequestIntro}
            >
              Request Intro
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          )}
          
          <Button variant="outline" className="w-full">
            Share Card
          </Button>
        </div>
      </div>
      
      {/* Introduction Request Dialog */}
      <Dialog open={introDialogOpen} onOpenChange={setIntroDialogOpen}>
        <DialogContent className="bg-background border border-white/10 text-foreground">
          <DialogHeader>
            <DialogTitle>Request Introduction</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              This will send a request to a mutual connection to introduce you to {card.name}.
            </p>
            
            <div className="p-3 rounded-lg bg-secondary mb-4">
              <p className="text-sm font-medium">Via Jordan Lee</p>
              <p className="text-xs text-muted-foreground">You and {card.name} both know Jordan</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Reason for intro</label>
                <div className="p-3 rounded-lg bg-secondary">
                  <p className="text-sm">I'd love to connect about potential collaborations in the product design space. I'm currently working on similar challenges.</p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIntroDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendIntroRequest}
            >
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewCard;
