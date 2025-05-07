
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onContinue: () => void;
}

// Simple logo SVG component for faster loading
const LogoSvg = () => (
  <svg 
    width="96" 
    height="96" 
    viewBox="0 0 256 256" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="mb-8"
  >
    <path d="M128 32C74.98 32 32 74.98 32 128C32 181.02 74.98 224 128 224C181.02 224 224 181.02 224 128C224 74.98 181.02 32 128 32ZM128 56C168.35 56 200 87.65 200 128C200 168.35 168.35 200 128 200C87.65 200 56 168.35 56 128C56 87.65 87.65 56 128 56Z" fill="currentColor"/>
    <path d="M128 80C102.65 80 82 100.65 82 126C82 151.35 102.65 172 128 172C153.35 172 174 151.35 174 126C174 100.65 153.35 80 128 80Z" fill="currentColor"/>
  </svg>
);

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
        <LogoSvg />
        
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
