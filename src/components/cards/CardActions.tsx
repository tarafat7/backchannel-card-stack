
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink, Share2 } from 'lucide-react';
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
      
      console.log(`Opening message app for ${formattedPhone}`);
      
      // Check if running on macOS
      const isMac = /Mac/i.test(navigator.userAgent) && !/iPhone|iPad|iPod/i.test(navigator.userAgent);
      // Check if running on iOS
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      
      console.log(`Platform detection - isMac: ${isMac}, isIOS: ${isIOS}`);
      
      // Create direct messaging URL - no toast notifications at all
      let messageUrl;
      
      if (isMac) {
        // macOS: Use imessage:// protocol which is specifically for Mac
        messageUrl = `imessage://+${formattedPhone}`;
      } else if (isIOS) {
        // iOS: Use sms: with no query parameters
        messageUrl = `sms:${formattedPhone}`;
      } else {
        // For Android and other platforms
        messageUrl = `sms:${formattedPhone}?body=Hi ${personName}`;
      }
      
      console.log(`Redirecting to: ${messageUrl}`);
      
      // Direct redirection - no window.open() which can trigger popups
      window.location.href = messageUrl;
      
      // NO toast notifications at all - user asked to remove them
      
    } else {
      console.error("No phone number available");
      // Only show toast for actual error when no phone number exists
      toast({
        title: "No Phone Number Available",
        description: `No phone number available for ${personName}.`,
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
        <Share2 className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default CardActions;
