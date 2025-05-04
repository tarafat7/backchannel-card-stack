
import { Home, User, QrCode, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-xl border-t border-white/5 py-2 px-4 z-50">
      <div className="flex items-center justify-around">
        <Link to="/home" className={`nav-button ${isActive('/home') ? 'text-primary' : 'text-muted-foreground'}`}>
          <Home className="w-5 h-5" />
        </Link>
        <Link to="/profile" className={`nav-button ${isActive('/profile') ? 'text-primary' : 'text-muted-foreground'}`}>
          <User className="w-5 h-5" />
        </Link>
        <Link to="/connect" className="nav-button bg-primary text-white">
          <QrCode className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
