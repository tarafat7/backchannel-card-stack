
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";

type IntroRequestDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  personName: string;
  mutualConnection: string;
};

const IntroRequestDialog = ({ open, onOpenChange, personName, mutualConnection }: IntroRequestDialogProps) => {
  const handleSendIntroRequest = () => {
    console.log(`Introduction requested to ${mutualConnection} for ${personName}`);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border border-white/10 text-foreground">
        <DialogHeader>
          <DialogTitle>Request Introduction</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            This will send a request to {mutualConnection} to introduce you to {personName}.
          </p>
          
          <div className="p-3 rounded-lg bg-secondary mb-4">
            <p className="text-sm font-medium">Via {mutualConnection}</p>
            <p className="text-xs text-muted-foreground">You and {personName} both know {mutualConnection}</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">Reason for intro</label>
              <div className="p-3 rounded-lg bg-secondary">
                <p className="text-sm">I'd love to connect about potential collaborations in the product design space. I'm currently working on similar challenges.</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSendIntroRequest}
          >
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IntroRequestDialog;
