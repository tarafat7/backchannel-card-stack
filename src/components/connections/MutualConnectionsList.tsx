
import React from 'react';
import { Button } from "@/components/ui/button";
import { User, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type MutualConnectionsListProps = {
  connections: string[];
  onRequestIntro: (connectionName: string) => void;
  handleSendMessage?: (name: string, phoneNumber?: string) => void;
};

const MutualConnectionsList = ({ connections, onRequestIntro, handleSendMessage }: MutualConnectionsListProps) => {
  if (!connections || connections.length === 0) return null;

  const handleIntroClick = (connection: string, event: React.MouseEvent) => {
    // Prevent event propagation
    event.preventDefault();
    event.stopPropagation();
    
    console.log("Button clicked for connection:", connection);
    
    if (handleSendMessage) {
      // If we have a message handler, use it to send a message directly
      handleSendMessage(connection, "4155551234"); // Use default phone number for mutual connections
      console.log(`Opening message to mutual connection: ${connection}`);
    } else {
      // Format phone number (remove any non-digits) - use a default for mutual connections
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
        
        toast({
          title: "Opening messaging app",
          description: `Messaging ${connection}`
        });
      } catch (error) {
        console.error("Failed to open messaging app:", error);
        toast({
          title: "Couldn't open messaging app",
          description: "Please check your device settings",
          variant: "destructive"
        });
      }
      
      // Fall back to the dialog approach if needed
      onRequestIntro(connection);
    }
  };

  return (
    <div className="px-4 py-2 mb-4">
      <h3 className="text-sm font-medium mb-2">Mutual Connections</h3>
      <div className="space-y-2">
        {connections.map((connection, index) => (
          <div key={index} className="p-3 rounded-lg bg-secondary/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm">{connection}</span>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={(e) => handleIntroClick(connection, e)}
              type="button"
              className="flex items-center gap-1 pointer-events-auto"
            >
              Ask for intro
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MutualConnectionsList;
