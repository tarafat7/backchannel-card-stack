
import React from 'react';
import { MessageCircle, Link } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

type CardActionsProps = {
  isDirectConnection: boolean;
  onRequestIntro: () => void;
  personName: string;
  mutualConnectionName?: string;
  phoneNumber?: string;
};

const CardActions = ({ 
  isDirectConnection, 
  onRequestIntro, 
  personName,
  mutualConnectionName,
  phoneNumber
}: CardActionsProps) => {
  const handleSendMessage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log(`Sending message to: ${personName}`);
    
    // Format phone number (remove any non-digits)
    const formattedPhone = (phoneNumber || "4155551234").replace(/\D/g, '');
    
    // Check if running on macOS
    const isMac = /Mac/i.test(navigator.userAgent) && !/iPhone|iPad|iPod/i.test(navigator.userAgent);
    // Check if running on iOS
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    // Create direct messaging URL
    let messageUrl;
    
    if (isMac) {
      messageUrl = `imessage://+${formattedPhone}`;
    } else if (isIOS) {
      messageUrl = `sms:${formattedPhone}`;
    } else {
      messageUrl = `sms:${formattedPhone}`;
    }
    
    try {
      // Open in new tab for better compatibility
      const newWindow = window.open(messageUrl, '_blank');
      
      // If we couldn't open a new window, fallback to direct location change
      if (!newWindow) {
        window.location.href = messageUrl;
      }
    } catch (error) {
      console.error("Failed to open messaging app:", error);
    }
  };

  // Get first name of mutual connection to display
  const mutualFirstName = mutualConnectionName 
    ? mutualConnectionName.split(' ')[0] 
    : "someone";

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "??";
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const mutualInitials = mutualConnectionName ? getInitials(mutualConnectionName) : "??";
  
  const handleIntroRequest = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // For mutual connections, we'll send a message directly
    if (!isDirectConnection && mutualConnectionName) {
      // Format phone number (remove any non-digits) - use a default
      const formattedPhone = "4155551234".replace(/\D/g, '');
      
      // Check platform
      const isMac = /Mac/i.test(navigator.userAgent) && !/iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      
      // Create direct messaging URL
      let messageUrl;
      
      if (isMac) {
        messageUrl = `imessage://+${formattedPhone}`;
      } else if (isIOS) {
        messageUrl = `sms:${formattedPhone}`;
      } else {
        messageUrl = `sms:${formattedPhone}`;
      }
      
      try {
        // Open in new tab for better compatibility
        const newWindow = window.open(messageUrl, '_blank');
        
        // If we couldn't open a new window, fallback to direct location change
        if (!newWindow) {
          window.location.href = messageUrl;
        }
      } catch (error) {
        console.error("Failed to open messaging app:", error);
      }
    }
    
    // Also open the intro dialog
    onRequestIntro();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3 flex items-center justify-between z-30">
      {isDirectConnection ? (
        <Button 
          onClick={handleSendMessage}
          className="w-full"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Message {personName.split(' ')[0]}
        </Button>
      ) : (
        <Button 
          onClick={handleIntroRequest}
          className="w-full flex items-center gap-2 pointer-events-auto"
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 border border-primary-foreground">
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {mutualInitials}
              </AvatarFallback>
            </Avatar>
            <span>Ask {mutualFirstName} for intro</span>
          </div>
          <Link className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default CardActions;
