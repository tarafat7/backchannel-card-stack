
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
      
      // Create an anchor element and trigger a click to open SMS
      const link = document.createElement('a');
      link.href = `sms:${formattedPhone}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`Attempting to open iMessage with phone: ${formattedPhone} via link click`);
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
