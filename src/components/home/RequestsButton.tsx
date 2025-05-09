
import { UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useHaptics } from "@/hooks/useHaptics";
import { useNavigate } from "react-router-dom";

type RequestsButtonProps = {
  pendingRequestsCount?: number;
};

const RequestsButton = ({ pendingRequestsCount = 0 }: RequestsButtonProps) => {
  const { lightHapticFeedback } = useHaptics();
  const navigate = useNavigate();

  const handleClick = () => {
    lightHapticFeedback();
    navigate("/requests");
  };

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 bg-secondary" 
        onClick={handleClick}
      >
        <UserPlus className="h-5 w-5 text-muted-foreground" />
      </Button>
      {pendingRequestsCount > 0 && (
        <Badge 
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-5 h-5 flex items-center justify-center p-0 px-1"
        >
          {pendingRequestsCount}
        </Badge>
      )}
    </div>
  );
};

export default RequestsButton;
