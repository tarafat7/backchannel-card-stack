
import { Button } from "@/components/ui/button";
import { useHaptics } from '@/hooks/useHaptics';

type ScannerViewProps = {
  onScanSuccess: () => void;
};

const ScannerView = ({ onScanSuccess }: ScannerViewProps) => {
  const { mediumHapticFeedback } = useHaptics();
  
  const handleScan = () => {
    // Simulate successful scan with haptic feedback
    mediumHapticFeedback();
    onScanSuccess();
  };
  
  return (
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
  );
};

export default ScannerView;
