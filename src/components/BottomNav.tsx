
import { Home, User, QrCode, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/5 py-4 px-6 z-50">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <Link to="/home" className={`flex flex-col items-center ${isActive('/home') ? 'text-white' : 'text-muted-foreground'}`}>
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <div className="relative -top-5">
          <Link to="/connect" className="flex items-center justify-center w-14 h-14 rounded-full bg-white text-black">
            <Plus className="w-7 h-7" />
          </Link>
        </div>
        
        <Link to="/profile" className={`flex flex-col items-center ${isActive('/profile') ? 'text-white' : 'text-muted-foreground'}`}>
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
