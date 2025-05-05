
import React from 'react';
import { Users } from 'lucide-react';

const SecondDegreeConnectionBadge = () => {
  return (
    <div className="px-4 mb-2">
      <div className="inline-flex items-center gap-1 text-xs font-medium bg-secondary/70 text-secondary-foreground px-2 py-1 rounded-full">
        <Users className="w-3 h-3" />
        <span>2nd Degree Connection</span>
      </div>
    </div>
  );
};

export default SecondDegreeConnectionBadge;
