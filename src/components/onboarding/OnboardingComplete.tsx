
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface OnboardingCompleteProps {
  onAnimationComplete: () => void;
}

const OnboardingComplete: React.FC<OnboardingCompleteProps> = ({ onAnimationComplete }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // After animation completes, navigate to home
    const timer = setTimeout(() => {
      onAnimationComplete();
      // Pass state to indicate we're coming from onboarding
      navigate('/home', { state: { fromOnboarding: true } });
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [navigate, onAnimationComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <motion.div 
        className="flex flex-col items-center p-8 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 0.8
          }}
          className="mb-6"
        >
          <CheckCircle2 className="w-24 h-24 text-primary" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">All Set!</h2>
          <p className="text-xl text-muted-foreground">
            Your profile is ready to connect
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OnboardingComplete;
