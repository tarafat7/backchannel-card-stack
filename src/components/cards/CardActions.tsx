
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
      
      // Create message-specific links for different platforms
      let messageUrl;
      
      // Check if running on macOS
      const isMac = /Mac/i.test(navigator.userAgent) && !/iPhone|iPad|iPod/i.test(navigator.userAgent);
      // Check if running on iOS
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      
      console.log(`Platform detection - isMac: ${isMac}, isIOS: ${isIOS}`);
      
      if (isMac) {
        // For macOS, try to use the imessage:// protocol
        messageUrl = `imessage://+${formattedPhone}`;
        console.log(`Using macOS specific URL: ${messageUrl}`);
      } else if (isIOS) {
        // For iOS, use sms: with no query parameters first as it's most reliable
        messageUrl = `sms:${formattedPhone}`;
        console.log(`Using iOS specific URL: ${messageUrl}`);
      } else {
        // For Android and other platforms
        messageUrl = `sms:${formattedPhone}?body=Hi ${personName}, I wanted to reach out`;
        console.log(`Using generic URL: ${messageUrl}`);
      }
      
      try {
        // Direct location change for iOS/macOS - more likely to succeed on these platforms
        if (isIOS || isMac) {
          console.log("Using direct location change for iOS/macOS");
          window.location.href = messageUrl;
        } else {
          // For other platforms, try window.open first
          const newWindow = window.open(messageUrl, '_blank');
          
          // If opening the window failed or was blocked
          if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            console.log("Window.open failed, trying location.href as fallback");
            window.location.href = messageUrl;
          }
        }
        
        // No success toast - we want the messaging app to open directly
      } catch (error) {
        console.error("Error opening messaging app:", error);
        // Only show toast on error
        toast({
          title: "Could not open messaging app",
          description: `Try manually messaging ${personName} at ${phoneNumber}`,
          variant: "destructive"
        });
      }
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
        <Share2 className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default CardActions;
