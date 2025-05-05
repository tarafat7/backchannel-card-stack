
import { Home, QrCode } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const BottomNav = () => {
  const location = useLocation();
  const { profile } = useAppContext();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#333333]/95 backdrop-blur-xl border-t border-white/5 py-2 px-4 z-50">
      <div className="flex items-center justify-center gap-16 max-w-md mx-auto relative">
        {/* Home button */}
        <Link to="/home" className={`flex flex-col items-center`}>
          <Home className={`w-6 h-6 ${isActive('/home') ? 'text-white' : 'text-[#999]'}`} />
          <span className={`text-xs mt-1 ${isActive('/home') ? 'text-white' : 'text-[#999]'}`}>Home</span>
        </Link>
        
        {/* Center QR code button */}
        <Link 
          to="/connect" 
          className="bg-black rounded-full p-7 border-2 border-white relative -translate-y-6"
        >
          <QrCode className="w-7 h-7 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </Link>
        
        {/* Profile button with user avatar */}
        <Link to="/profile" className={`flex flex-col items-center`}>
          <div className={`${isActive('/profile') ? 'ring-1 ring-white' : ''} rounded-full`}>
            <Avatar className="w-6 h-6">
              {profile.card?.avatar ? (
                <AvatarImage src={profile.card.avatar} alt="Profile" />
              ) : (
                <AvatarFallback className={`${isActive('/profile') ? 'text-white bg-primary' : 'text-[#999] bg-[#444]'}`}>
                  {profile.card?.name ? profile.card.name.charAt(0) : 'U'}
                </AvatarFallback>
              )}
            </Avatar>
          </div>
          <span className={`text-xs mt-1 ${isActive('/profile') ? 'text-white' : 'text-[#999]'}`}>Profile</span>
        </Link>
      </div>
      
      {/* Bottom indicator line */}
      <div className="flex justify-center mt-2">
        <div className="h-1 bg-white/20 rounded-full w-36"></div>
      </div>
    </div>
  );
};

export default BottomNav;
