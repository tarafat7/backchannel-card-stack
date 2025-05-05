
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from 'lucide-react';

type CardActionsProps = {
  isDirectConnection: boolean;
  onRequestIntro: () => void;
  personName: string;
  mutualConnectionName?: string;
};

const CardActions = ({ isDirectConnection, onRequestIntro, personName, mutualConnectionName }: CardActionsProps) => {
  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${personName}`,
    });
  };
  
  return (
    <div className="px-4 mt-auto mb-8">
      {isDirectConnection ? (
        // For 1st degree connections - can send a direct message
        <Button 
          className="w-full mb-3"
          onClick={handleSendMessage}
        >
          Message
          <MessageCircle className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        // For 2nd degree connections - can only request an intro
        <Button 
          className="w-full mb-3 gap-2"
          onClick={onRequestIntro}
        >
          {mutualConnectionName ? (
            <>
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-primary/20">
                  <User className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
              <span>Ask {mutualConnectionName} for an intro</span>
            </>
          ) : (
            <>
              Request Intro
              <ExternalLink className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      )}
      
      <Button variant="outline" className="w-full">
        Share Card
      </Button>
    </div>
  );
};

export default CardActions;
