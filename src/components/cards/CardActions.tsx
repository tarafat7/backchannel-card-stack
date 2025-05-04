
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type CardActionsProps = {
  isDirectConnection: boolean;
  onRequestIntro: () => void;
  personName: string;
};

const CardActions = ({ isDirectConnection, onRequestIntro, personName }: CardActionsProps) => {
  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${personName}`,
    });
  };
  
  return (
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
          onClick={onRequestIntro}
        >
          Request Intro
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      )}
      
      <Button variant="outline" className="w-full">
        Share Card
      </Button>
    </div>
  );
};

export default CardActions;
