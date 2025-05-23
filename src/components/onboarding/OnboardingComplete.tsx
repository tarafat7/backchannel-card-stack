
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
  
  useEffect(() => {
    // First call the animation complete handler to save data
    onAnimationComplete();
    
    // Then show completion animation for 2 seconds before navigating
    const timer = setTimeout(() => {
      // Navigate to home and replace the history entry
      navigate('/home', { replace: true });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate, onAnimationComplete]);

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
