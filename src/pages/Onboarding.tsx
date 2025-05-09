
import React from 'react';
import { OnboardingProvider } from '../context/OnboardingContext';
import OnboardingStepManager from '../components/onboarding/OnboardingStepManager';
import OnboardingLogo from '../components/onboarding/OnboardingLogo';
import { useOnboarding } from '../context/OnboardingContext';
import BackButton from '../components/onboarding/common/BackButton';

// Main Onboarding Layout component
const OnboardingLayout: React.FC = () => {
  const { onboardingStep } = useOnboarding();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col">
      <div className="px-6 py-8 flex-1">
        {onboardingStep > 0 && (
          <div className="mb-8 flex justify-center relative">
            {/* Position BackButton to the left of the logo */}
            {onboardingStep > 1 && (
              <BackButton className="absolute left-0 top-1/2 -translate-y-1/2" />
            )}
            <OnboardingLogo className="h-12" />
          </div>
        )}
        
        <OnboardingStepManager />
      </div>
    </div>
  );
};

// Onboarding page with provider wrapper
const Onboarding = () => {
  return (
    <OnboardingProvider>
      <OnboardingLayout />
    </OnboardingProvider>
  );
};

export default Onboarding;
