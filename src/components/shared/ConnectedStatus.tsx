
import React from 'react';

type ConnectedStatusProps = {
  connectionDate?: string;
  connectionEvent?: string;
};

const ConnectedStatus = ({ connectionDate, connectionEvent }: ConnectedStatusProps) => {
  if (!connectionDate || !connectionEvent) return null;
  
  return (
    <div className="mt-6 py-2 border-t border-white/10">
      <p className="text-sm opacity-70">
        Connected at {connectionEvent} • {new Date(connectionDate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ConnectedStatus;
