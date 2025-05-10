
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import OnboardingLogo from './OnboardingLogo';

interface SplashScreenProps {
  onContinue: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Auto-continue animation without auto-continuing to next step
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <OnboardingLogo className="h-16 mb-8" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: animationComplete ? 1 : 0,
            y: animationComplete ? 0 : 20
          }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 space-y-4 w-full flex flex-col items-center"
        >
          <Button 
            onClick={onContinue}
            className="px-8 py-6 text-lg w-64 bg-primary text-white"
          >
            Create an Account
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
