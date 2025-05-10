
import { useState } from 'react';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '@/hooks/useAuth';

export const useOnboardingSteps = () => {
  const { 
    setOnboardingStep, 
    formData, 
    setFormData,
    setShowCompletionAnimation,
    updateBusinessCardPreview,
    previewCard,
  } = useOnboarding();
  
  const { updateProfile, updateBusinessCard } = useAppContext();
  const { user, signUp } = useAuth();
  const [password, setPassword] = useState("");

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
  
  const handleContactInfoComplete = (phoneNumber: string, userPassword: string) => {
    setFormData(prev => ({ ...prev, phoneNumber }));
    setPassword(userPassword); // Store password for signup later
    setOnboardingStep(4);
  };

  const handleProfilePhotoComplete = (avatarUrl?: string) => {
    if (avatarUrl) {
      setFormData(prev => ({ ...prev, avatar: avatarUrl }));
    }
    setOnboardingStep(6);
  };

  const handleComplete = async () => {
    // Ensure final business card is updated before completion
    updateBusinessCardPreview();
    
    // Show completion animation 
    setShowCompletionAnimation(true);
  };
  
  const handleAnimationComplete = async () => {
    setShowCompletionAnimation(false);
    
    try {
      // If we have email (phone) and password, sign up the user
      if (formData.phoneNumber && password) {
        await signUp(formData.phoneNumber, password, formData.name);
        
        // Once signed up, the auth state will change and the card will be saved
        // in the App.tsx component when it detects a new user
        console.log("User signed up successfully, card will be saved automatically");
      }
    } catch (err) {
      console.error("Failed to sign up user:", err);
    }
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
