
import { useCallback } from 'react';

interface HapticsResult {
  lightHapticFeedback: () => void;
  mediumHapticFeedback: () => void;
  heavyHapticFeedback: () => void;
}

export const useHaptics = (): HapticsResult => {
  // Check if the navigator has the vibrate API
  const hasVibration = 'navigator' in window && 'vibrate' in navigator;
  
  const lightHapticFeedback = useCallback(() => {
    if (hasVibration) {
      navigator.vibrate(10);
    }
  }, [hasVibration]);
  
  const mediumHapticFeedback = useCallback(() => {
    if (hasVibration) {
      navigator.vibrate(20);
    }
  }, [hasVibration]);
  
  const heavyHapticFeedback = useCallback(() => {
    if (hasVibration) {
      navigator.vibrate([30, 10, 30]);
    }
  }, [hasVibration]);
  
  return {
    lightHapticFeedback,
    mediumHapticFeedback,
    heavyHapticFeedback
  };
};
