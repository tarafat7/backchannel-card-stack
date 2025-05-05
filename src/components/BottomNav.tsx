
import { Home, User, QrCode } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

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
          className="bg-black rounded-full p-8 border-[3px] border-white relative -translate-y-8 shadow-lg"
        >
          {/* Custom QR code icon that looks like the one in the screenshot */}
          <div className="w-8 h-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="text-white"
            >
              <path 
                d="M12 4L19.5 15H4.5L12 4Z" 
                fill="currentColor" 
                transform="rotate(180, 12, 12)"
              />
            </svg>
          </div>
        </Link>
        
        {/* Profile button */}
        <Link to="/profile" className={`flex flex-col items-center`}>
          <User className={`w-6 h-6 ${isActive('/profile') ? 'text-white' : 'text-[#999]'}`} />
          <span className={`text-xs mt-1 ${isActive('/profile') ? 'text-white' : 'text-[#999]'}`}>Profile</span>
        </Link>
      </div>
      
      {/* Bottom indicator line - make it more similar to screenshot */}
      <div className="flex justify-center mt-2">
        <div className="h-1 bg-white rounded-full w-96 max-w-[80%]"></div>
      </div>
    </div>
  );
};

export default BottomNav;
