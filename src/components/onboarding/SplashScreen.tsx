
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onContinue: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Auto-continue after animation delay
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
        <img 
          src="/lovable-uploads/07d994b2-fb5b-4579-ad95-97303ba44ebc.png" 
          alt="Backchannel Logo" 
          className="h-48 mb-8"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: animationComplete ? 1 : 0,
            y: animationComplete ? 0 : 20
          }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8"
        >
          <Button 
            onClick={onContinue}
            className="px-8 py-6 text-lg"
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
