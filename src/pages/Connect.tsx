
import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, QrCode, ArrowLeft } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Connect = () => {
  const { profile } = useAppContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'share' | 'scan'>('share');
  const [scanSuccess, setScanSuccess] = useState(false);
  const [meetingNote, setMeetingNote] = useState('');
  
  // Generate a shareable QR code that contains the user's profile ID
  const qrValue = `https://backchannel.app/connect/${profile.card?.id || 'user1'}`;
  
  const handleScan = () => {
    // Simulate successful scan
    setScanSuccess(true);
    
    // In a real app, you would process the scanned QR code here
  };
  
  const handleConnect = () => {
    // Simulate connection success
    toast({
      title: "Connection successful!",
      description: "You've connected with Riley Johnson",
    });
    
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
      <div className="flex border-b border-white/10">
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 'share'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('share')}
        >
          Share My Card
        </button>
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 'scan'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('scan')}
        >
          Scan a Card
        </button>
      </div>

      {/* Content */}
      <main className="p-4">
        {activeTab === 'share' ? (
          <div className="flex flex-col items-center">
            <div className="mb-8 mt-4 p-6 bg-white rounded-2xl">
              <QRCodeCanvas 
                value={qrValue}
                size={230}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
                includeMargin={false}
              />
            </div>
            
            <h2 className="text-lg font-semibold mb-2">Show this to connect</h2>
            <p className="text-center text-muted-foreground mb-6">
              Have someone scan this QR code to add your business card to their network
            </p>
            
            <Button 
              className="w-full mb-3"
              onClick={() => setActiveTab('scan')}
            >
              Scan someone else's card
              <QrCode className="w-4 h-4 ml-2" />
            </Button>
            
            <Button variant="outline" className="w-full">
              Share digital card link
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {!scanSuccess ? (
              <>
                <div className="w-full aspect-square max-w-xs bg-secondary/70 rounded-2xl mb-8 mt-4 relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2/3 h-2/3 border-2 border-primary/70 rounded-lg relative z-10" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-background opacity-70" />
                  
                  {/* This would be the camera feed in a real app */}
                  <p className="text-muted-foreground absolute bottom-5">Camera view</p>
                </div>
                
                <h2 className="text-lg font-semibold mb-2">Scan their QR code</h2>
                <p className="text-center text-muted-foreground mb-6">
                  Aim your camera at their Backchannel QR code to connect
                </p>
                
                <Button 
                  className="w-full"
                  onClick={handleScan}
                >
                  Simulate Scan
                </Button>
              </>
            ) : (
              <div className="w-full mt-4">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                    <Check className="w-10 h-10 text-primary" />
                  </div>
                </div>
                
                <h2 className="text-lg font-semibold mb-2 text-center">Scanned Successfully!</h2>
                <p className="text-center text-muted-foreground mb-6">
                  You're about to connect with Riley from Stripe
                </p>
                
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
                  onClick={handleConnect}
                >
                  Connect
                </Button>
              </div>
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
