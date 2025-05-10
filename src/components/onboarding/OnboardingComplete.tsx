
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface OnboardingCompleteProps {
  onAnimationComplete: () => void;
}

const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ onAnimationComplete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    console.log("OnboardingComplete rendering, checking auth status:", !!user);
    
    // After animation completes, handle navigation properly
    const timer = setTimeout(() => {
      // First call the animation complete handler
      onAnimationComplete();
      
      // Make sure we're not redirecting before auth state has time to update
      setTimeout(() => {
        console.log("Timer complete, navigating to home");
        
        // Force navigate to home regardless of auth state at this point
        // The ProtectedRoute component will handle redirection if needed
        navigate('/home', { replace: true });
      }, 500);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate, onAnimationComplete, user]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          duration: 0.8
        }}
      >
        <CheckCircle2 className="w-28 h-28 text-primary" />
      </motion.div>
    </div>
  );
};

export default OnboardingComplete;
