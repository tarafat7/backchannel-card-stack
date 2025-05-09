
import { useAppContext } from '@/context/AppContext';
import { useHaptics } from '@/hooks/useHaptics';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import BusinessCardComponent from '@/components/BusinessCard';
import BottomNav from '@/components/BottomNav';

const ConnectionRequests = () => {
  const { connectionRequests, acceptConnectionRequest, declineConnectionRequest } = useAppContext();
  const { mediumHapticFeedback } = useHaptics();
  const navigate = useNavigate();

  const handleAccept = (requestId: string) => {
    mediumHapticFeedback();
    acceptConnectionRequest(requestId);
  };

  const handleDecline = (requestId: string) => {
    mediumHapticFeedback();
    declineConnectionRequest(requestId);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-background pt-4 px-4 pb-2 flex items-center">
        <Button variant="ghost" size="icon" onClick={goBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Connection Requests</h1>
      </header>

      <main className="flex-1 p-4">
        {connectionRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <p className="mt-2">No pending connection requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {connectionRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {formatDistance(new Date(request.timestamp), new Date(), { addSuffix: true })}
                  </span>
                </div>
                
                <div className="mb-3">
                  <BusinessCardComponent card={request.fromUser} onClick={() => {}} />
                </div>
                
                <div className="flex justify-between gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => handleDecline(request.id)}
                  >
                    Decline
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={() => handleAccept(request.id)}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default ConnectionRequests;
