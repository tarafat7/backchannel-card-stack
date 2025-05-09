
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BusinessCardComponent from '@/components/BusinessCard';
import { BusinessCard } from '@/context/AppContext';

type ScanResultViewProps = {
  scannedUser: BusinessCard;
  onConnect: (note: string) => void;
};

const ScanResultView = ({ scannedUser, onConnect }: ScanResultViewProps) => {
  const [meetingNote, setMeetingNote] = useState('');
  
  return (
    <div className="w-full mt-2">
      <div className="mb-3">
        <BusinessCardComponent card={scannedUser} onClick={() => {}} />
      </div>
      
      <div className="mb-6">
        <label className="text-sm font-medium mb-2 block">Add a note about how you met</label>
        <Input 
          value={meetingNote}
          onChange={(e) => setMeetingNote(e.target.value)}
          placeholder="e.g., Met at Design Week NYC"
          className="bg-secondary border-none"
        />
      </div>
      
      <Button 
        className="w-full"
        onClick={() => onConnect(meetingNote)}
      >
        Add {scannedUser.name.split(' ')[0]} to connections
      </Button>
    </div>
  );
};

export default ScanResultView;
