
import React from 'react';
import { UserPlus } from 'lucide-react';

const EmptyStateMessage: React.FC = () => {
  return (
    <div className="text-center p-8 bg-secondary/50 rounded-xl border border-white/5 flex flex-col items-center">
      <UserPlus className="h-12 w-12 text-primary/60 mb-4" />
      <p className="text-muted-foreground font-medium">Start building your network</p>
      <p className="text-xs text-muted-foreground/70 mt-1">
        Connect with others by scanning or sharing your card
      </p>
    </div>
  );
};

export default EmptyStateMessage;
