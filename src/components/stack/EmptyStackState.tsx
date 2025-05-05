
import React from 'react';
import { WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyStackState: React.FC = () => {
  return (
    <div className="fixed inset-x-0 bottom-24 px-5 mb-4">
      <div className="flex flex-col items-center justify-center p-8 bg-card rounded-xl border border-white/5 shadow-lg h-[180px]">
        <WalletCards className="w-12 h-12 text-muted-foreground/30 mb-4" />
        <p className="text-white text-center mb-2">No cards in your wallet</p>
        <p className="text-xs text-muted-foreground text-center mb-5">
          Connect with others to start building your network
        </p>
        <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 border-none">
          Add New Card
        </Button>
        
        {/* Card Count Overlay */}
        <div className="absolute bottom-[-28px] w-full flex justify-center">
          <div className="text-white text-sm font-medium bg-black/40 backdrop-blur-sm py-1 px-3 rounded-full">
            0 Cards
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyStackState;
