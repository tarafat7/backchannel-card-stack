
import React from 'react';

const EmptyStackState: React.FC = () => {
  return (
    <div className="text-center p-8 bg-secondary/50 rounded-xl border border-white/5 shadow-lg">
      <p className="text-muted-foreground">No business cards yet</p>
      <p className="text-xs text-muted-foreground/70 mt-1">
        Connect with others to start building your network
      </p>
    </div>
  );
};

export default EmptyStackState;
