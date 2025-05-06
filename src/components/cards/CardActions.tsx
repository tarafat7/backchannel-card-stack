
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
      
      // Check if iOS (includes both iPhone and Mac)
      const isAppleDevice = /iPhone|iPad|iPod|Mac/i.test(navigator.userAgent);
      
      if (isAppleDevice) {
        // For iOS and macOS, use native URL schemes
        // Add "body" parameter which is supported on iOS
        messageUrl = `sms:${formattedPhone}&body=Hi ${personName}, I wanted to reach out`;
      } else {
        // For Android and other platforms
        messageUrl = `sms:${formattedPhone}?body=Hi ${personName}, I wanted to reach out`;
      }
      
      console.log(`Platform detection - isAppleDevice: ${isAppleDevice}`);
      console.log(`Generated message URL: ${messageUrl}`);
      
      try {
        // Try to open the URL directly in a new tab/window - this works better on mobile
        const newWindow = window.open(messageUrl, '_blank');
        
        // If opening the window failed or was blocked
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          // Create and click a link as fallback (works better in some browsers)
          const link = document.createElement('a');
          link.href = messageUrl;
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noreferrer noopener');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log("Using link click fallback method");
        }
        
        // Show success toast regardless - the user may need to grant permissions
        toast({
          title: "Opening messaging app",
          description: `Your messaging app should open shortly to contact ${personName}`,
        });
      } catch (error) {
        console.error("Error opening messaging app:", error);
        // Fallback for when both methods fail
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
