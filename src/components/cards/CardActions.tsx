
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink, Share2 } from 'lucide-react';

type CardActionsProps = {
  isDirectConnection: boolean;
  onRequestIntro: () => void;
  personName: string;
  mutualConnectionName?: string;
  phoneNumber?: string;
};

const CardActions = ({ isDirectConnection, onRequestIntro, personName, mutualConnectionName, phoneNumber }: CardActionsProps) => {
  const handleSendMessage = () => {
    console.log("SendMessage button clicked");
    console.log("Phone number received:", phoneNumber);
    
    if (!phoneNumber) {
      console.error("No phone number available");
      return;
    }
    
    // Format phone number (remove any non-digits)
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    console.log(`Formatted phone number: ${formattedPhone}`);
    
    // Check if running on macOS
    const isMac = /Mac/i.test(navigator.userAgent) && !/iPhone|iPad|iPod/i.test(navigator.userAgent);
    // Check if running on iOS
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    console.log(`Platform detection - isMac: ${isMac}, isIOS: ${isIOS}`);
    
    // Create direct messaging URL
    let messageUrl;
    
    if (isMac) {
      messageUrl = `imessage://+${formattedPhone}`;
    } else if (isIOS) {
      messageUrl = `sms:${formattedPhone}`;
    } else {
      messageUrl = `sms:${formattedPhone}`;
    }
    
    console.log(`Opening message URL: ${messageUrl}`);
    
    // Use window.location.href for direct navigation
    window.location.href = messageUrl;
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
