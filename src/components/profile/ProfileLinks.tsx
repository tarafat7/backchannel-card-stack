
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';

const ProfileLinks: React.FC = () => {
  return (
    <section>
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-between">
          Invite Friends
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="w-full justify-between">
          Account Settings
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button variant="outline" className="w-full justify-between">
          Privacy & Sharing
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
};

export default ProfileLinks;
