
import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { BusinessCard as BusinessCardType } from '../../context/AppContext';
import MessageButton from './MessageButton';
import IntroButton from './IntroButton';
import { toast } from '@/hooks/use-toast';

type ActionButtonsProps = {
  card: BusinessCardType;
  isSecondDegree: boolean;
  mutualConnectionName: string | null;
  hasConnectionEvent: boolean;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  card, 
  isSecondDegree, 
  mutualConnectionName, 
  hasConnectionEvent 
}) => {
  const handleRequestIntro = (e: React.MouseEvent, name: string, mutualConnection?: string) => {
    e.stopPropagation(); // Prevent card collapse
    console.log(`Introduction requested to ${mutualConnection || "a mutual connection"} for ${name}`);
    
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
        description: `Asking ${mutualConnection || "someone"} to introduce you to ${name}`
      });
    } catch (error) {
      console.error("Failed to open messaging app:", error);
      toast({
        title: "Couldn't open messaging app",
        description: "Please check your device settings",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
      {/* Info button with popover - only show for cards with connection event */}
      {hasConnectionEvent && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 h-8 w-8 rounded-full"
                    onClick={(e) => e.stopPropagation()} // Prevent card collapse
                  >
                    <Info className="h-4 w-4 text-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="top" className="w-72">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Where we met</h4>
                    <p className="text-sm text-muted-foreground">{card.connectionEvent}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </TooltipTrigger>
            <TooltipContent side="top">Connection Info</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {/* Action button - different for 1st and 2nd degree connections */}
      {isSecondDegree && mutualConnectionName ? (
        <IntroButton 
          name={card.name} 
          mutualConnection={mutualConnectionName} 
          onRequestIntro={handleRequestIntro} 
        />
      ) : (
        <MessageButton name={card.name} phoneNumber={card.phoneNumber} />
      )}
    </div>
  );
};

export default ActionButtons;
