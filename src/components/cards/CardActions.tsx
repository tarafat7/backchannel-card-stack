
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
      
      // Different formats for different platforms
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isMac = /Mac/i.test(navigator.userAgent);
      
      let smsUrl;
      if (isMobile) {
        // Mobile devices - iOS and Android
        smsUrl = `sms:${formattedPhone}`;
      } else if (isMac) {
        // macOS uses different URL scheme
        smsUrl = `imessage://+${formattedPhone}`;
      } else {
        // Default fallback
        smsUrl = `sms:${formattedPhone}`;
      }
      
      console.log(`Device detection - isMobile: ${isMobile}, isMac: ${isMac}`);
      console.log(`Attempting to open messaging app with URL: ${smsUrl}`);
      
      // Open the URL in a new window/tab
      window.open(smsUrl, '_blank');
      
      // Show a toast as feedback that the action was initiated
      toast({
        title: "Opening messaging app",
        description: `Attempting to send message to ${personName}`,
      });
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
