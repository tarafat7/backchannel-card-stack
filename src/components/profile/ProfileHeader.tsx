
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ProfileHeader: React.FC = () => {
  return (
    <header className="px-4 py-2 flex justify-end items-center">
      <Button variant="ghost" size="icon">
        <Settings className="w-5 h-5" />
      </Button>
    </header>
  );
};

export default ProfileHeader;
