
import { QRCodeCanvas } from 'qrcode.react';
import { Button } from "@/components/ui/button";
import { QrCode } from 'lucide-react';

type ShareTabProps = {
  qrValue: string;
  onSwitchToScan: () => void;
};

const ShareTab = ({ qrValue, onSwitchToScan }: ShareTabProps) => {
  return (
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
        onClick={onSwitchToScan}
      >
        Scan someone else's card
        <QrCode className="w-4 h-4 ml-2" />
      </Button>
      
      <Button variant="outline" className="w-full">
        Share digital card link
      </Button>
    </div>
  );
};

export default ShareTab;
