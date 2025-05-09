
import { useState } from 'react';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useAppContext } from '../../../context/AppContext';

export const useOnboardingSteps = () => {
  const { 
    setOnboardingStep, 
    formData, 
    setFormData,
    setShowCompletionAnimation,
    updateBusinessCardPreview,
  } = useOnboarding();
  
  const { updateProfile, updateBusinessCard } = useAppContext();

  const handleBasicInfoComplete = (data: {name: string, title: string, company: string}) => {
    setFormData(prev => ({ ...prev, ...data }));
    setOnboardingStep(2);
  };

  const handleExperienceComplete = (experiences: Array<{title: string, company: string, years: string, description: string}>) => {
    setFormData(prev => ({ ...prev, experiences }));
    updateProfile({
      experiences: experiences.map(exp => ({
        title: exp.title,
        company: exp.company,
        years: exp.years,
        description: exp.description
      }))
    });
    setOnboardingStep(3);
  };
  
  const handleContactInfoComplete = (phoneNumber: string) => {
    setFormData(prev => ({ ...prev, phoneNumber }));
    setOnboardingStep(4);
  };

  const handleProfilePhotoComplete = (avatarUrl?: string) => {
    if (avatarUrl) {
      setFormData(prev => ({ ...prev, avatar: avatarUrl }));
    }
    setOnboardingStep(6);
  };

  const handleComplete = () => {
    // Ensure final business card is updated before completion
    updateBusinessCardPreview();
    // Show completion animation
    setShowCompletionAnimation(true);
  };
  
  const handleAnimationComplete = () => {
    setShowCompletionAnimation(false);
    // Reset onboarding step to 0 to prevent going back to onboarding
    setOnboardingStep(0);
  };

  return {
    handleBasicInfoComplete,
    handleExperienceComplete,
    handleContactInfoComplete,
    handleProfilePhotoComplete,
    handleComplete,
    handleAnimationComplete
  };
};
