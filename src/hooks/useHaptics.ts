
/**
 * A custom hook that provides haptic feedback functions
 * using the browser's Vibration API when available
 */

export const useHaptics = () => {
  /**
   * Check if the device supports haptic feedback via Vibration API
   */
  const hasVibrationSupport = (): boolean => {
    return 'vibrate' in navigator;
  };

  /**
   * Trigger a light haptic feedback (short vibration)
   * Used for subtle interactions like scrolling past items
   */
  const lightHapticFeedback = (): void => {
    if (hasVibrationSupport()) {
      navigator.vibrate(10); // Short 10ms vibration
    }
  };

  /**
   * Trigger a medium haptic feedback
   * Used for selections and confirmations
   */
  const mediumHapticFeedback = (): void => {
    if (hasVibrationSupport()) {
      navigator.vibrate(30); // Medium 30ms vibration
    }
  };

  /**
   * Trigger a strong haptic feedback
   * Used for important actions
   */
  const strongHapticFeedback = (): void => {
    if (hasVibrationSupport()) {
      navigator.vibrate([50, 30, 50]); // Pattern of vibrations
    }
  };

  return {
    hasVibrationSupport,
    lightHapticFeedback,
    mediumHapticFeedback,
    strongHapticFeedback
  };
};
