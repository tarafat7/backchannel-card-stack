
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useHaptics } from '@/hooks/useHaptics';
import ConnectTabs from '@/components/connect/ConnectTabs';
import ShareTab from '@/components/connect/ShareTab';
import ScannerView from '@/components/connect/ScannerView';
import ScanResultView from '@/components/connect/ScanResultView';

const Connect = () => {
  const { profile, sendConnectionRequest } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'share' | 'scan'>('share');
  const [scanSuccess, setScanSuccess] = useState(false);
  const { mediumHapticFeedback } = useHaptics();
  
  // Generate a shareable QR code that contains the user's profile ID
  const qrValue = `https://backchannel.app/connect/${profile.card?.id || 'user1'}`;
  
  // Sample scanned user data with explicitly typed connectionDegree
  const scannedUser = {
    id: 'scanned-user-1',
    name: 'Riley Johnson',
    title: 'Product Manager',
    company: 'Stripe',
    avatar: '/lovable-uploads/616f61db-76fc-4df2-b8ac-403e36a20ee4.png',
    expertiseAreas: ['Product Strategy', 'SaaS', 'Payments'],
    links: [
      { type: 'linkedin', url: 'https://linkedin.com/in/riley-johnson' },
      { type: 'twitter', url: 'https://twitter.com/riley_j' }
    ],
    status: 'Hiring for product roles!',
    design: {
      backgroundStyle: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      textColor: 'text-white',
    },
    connectionDegree: 2 as 1 | 2, // Explicitly type as 1 | 2 to match the BusinessCard interface
    mutualConnections: ['Jordan Lee', 'Taylor Smith'],
    phoneNumber: '4155551234' // Adding phoneNumber to match the BusinessCard interface
  };
  
  const handleConnect = (meetingNote: string) => {
    // Send connection request if we have a profile card
    if (profile.card) {
      mediumHapticFeedback();
      sendConnectionRequest(scannedUser.id, profile.card);
      
      // Show toast notification
      toast({
        title: "Connection request sent!",
        description: `You've sent a request to connect with ${scannedUser.name}`,
      });
    } else {
      toast({
        title: "Unable to send request",
        description: "Please complete your profile first",
        variant: "destructive"
      });
    }
    
    // Navigate back to home
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="p-4 flex justify-start items-center">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold ml-2">Connect</h1>
      </header>

      {/* Tab Selection */}
      <ConnectTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {/* Content */}
      <main className="p-4">
        {activeTab === 'share' ? (
          <ShareTab 
            qrValue={qrValue}
            onSwitchToScan={() => setActiveTab('scan')}
          />
        ) : (
          <div className="flex flex-col items-center">
            {!scanSuccess ? (
              <ScannerView onScanSuccess={() => setScanSuccess(true)} />
            ) : (
              <ScanResultView 
                scannedUser={scannedUser}
                onConnect={handleConnect}
              />
            )}
          </div>
        )}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Connect;
