
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type CardActionsProps = {
  isDirectConnection: boolean;
  onRequestIntro: () => void;
  personName: string;
  mutualConnectionName?: string;
  phoneNumber?: string;
};

const CardActions = ({ isDirectConnection, onRequestIntro, personName, mutualConnectionName, phoneNumber }: CardActionsProps) => {
  const handleSendMessage = () => {
    if (phoneNumber) {
      // Format phone number (remove any non-digits)
      const formattedPhone = phoneNumber.replace(/\D/g, '');
      
      // Use window.open instead of window.location.href for better compatibility
      window.open(`sms:${formattedPhone}`, '_blank');
      
      // Show a toast to inform the user the action was triggered
      toast({
        title: "Opening iMessage",
        description: `Opening iMessage to text ${personName}`,
      });
      
      console.log(`Attempting to open iMessage with phone: ${formattedPhone}`);
    } else {
      // Fallback if no phone number is available
      toast({
        title: "No Phone Number",
        description: `${personName} hasn't shared their phone number.`,
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="sticky bottom-0 px-4 py-3 bg-background/80 backdrop-blur-sm mt-4 z-10">
      {isDirectConnection ? (
        <Button 
          className="w-full mb-3"
          onClick={handleSendMessage}
        >
          Send message to {personName}
          <MessageCircle className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button 
          className="w-full mb-3"
          onClick={onRequestIntro}
        >
          {mutualConnectionName ? `Ask ${mutualConnectionName} for an intro` : "Request Intro"}
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
