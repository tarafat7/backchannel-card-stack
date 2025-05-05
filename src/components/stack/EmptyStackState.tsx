
import React from 'react';
import { WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyStackState: React.FC = () => {
  return (
    <div className="fixed inset-x-0 bottom-24 px-4 mb-4">
      <div className="flex flex-col items-center justify-center p-8 bg-secondary/30 rounded-xl border border-white/5 shadow-lg h-[200px]">
        <WalletCards className="w-12 h-12 text-muted-foreground/30 mb-4" />
        <p className="text-muted-foreground text-center mb-2">No cards in your wallet</p>
        <p className="text-xs text-muted-foreground/70 mb-4 text-center">
          Connect with others to start building your network
        </p>
        <Button variant="outline" size="sm" className="mt-2">
          Add New Card
        </Button>
      </div>
    </div>
  );
};

export default EmptyStackState;
