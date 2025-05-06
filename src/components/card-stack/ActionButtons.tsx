
import React from 'react';
import { Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { BusinessCard as BusinessCardType } from '../../context/AppContext';
import MessageButton from './MessageButton';
import IntroButton from './IntroButton';

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
  };

  return (
    <div className="flex justify-between items-center px-3 py-2">
      {/* Left side - Info button with popover - only show for cards with connection event */}
      <div className="flex-shrink-0">
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
                      <Info className="h-4 w-4 text-primary" />
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
      </div>
      
      {/* Right side - Action button - different for 1st and 2nd degree connections */}
      <div className="flex-shrink-0 ml-auto">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {isSecondDegree && mutualConnectionName ? (
                <IntroButton 
                  name={card.name} 
                  mutualConnection={mutualConnectionName} 
                  onRequestIntro={handleRequestIntro} 
                />
              ) : (
                <MessageButton name={card.name} phoneNumber={card.phoneNumber} />
              )}
            </TooltipTrigger>
            <TooltipContent side="top">
              {isSecondDegree ? "Request introduction" : `Message ${card.name.split(' ')[0]}`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ActionButtons;
