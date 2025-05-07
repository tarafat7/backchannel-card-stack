
import React, { lazy, Suspense } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import StepRenderer from './StepRenderer';
import LoadingFallback from './common/LoadingFallback';
import { useOnboardingSteps } from './hooks/useOnboardingSteps';

// Lazy load completion animation component
const OnboardingComplete = lazy(() => import('./OnboardingComplete'));

const OnboardingStepManager: React.FC = () => {
  const { 
    showCompletionAnimation,
  } = useOnboarding();
  
  const { handleAnimationComplete } = useOnboardingSteps();

  return (
    <>
      <StepRenderer />
      
      {showCompletionAnimation && (
        <Suspense fallback={<LoadingFallback />}>
          <OnboardingComplete onAnimationComplete={handleAnimationComplete} />
        </Suspense>
      )}
    </>
  );
};

export default OnboardingStepManager;
