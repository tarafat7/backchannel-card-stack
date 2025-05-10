
import { useState } from 'react';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

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
  const { signUp } = useAuth();
  const [password, setPassword] = useState("");

  const handleBasicInfoComplete = (data: {name: string, title: string, company: string}) => {
    setFormData(prev => ({ ...prev, ...data }));
    setOnboardingStep(2);
  };

  const handleExperienceComplete = (experiences: Array<{title: string, company: string, years: string, description: string}>) => {
    setFormData(prev => ({ ...prev, experiences }));
    updateProfile({ experiences });
    setOnboardingStep(3);
  };
  
  const handleContactInfoComplete = (phoneNumber: string, userPassword: string) => {
    setFormData(prev => ({ ...prev, phoneNumber }));
    setPassword(userPassword);
    setOnboardingStep(4);
  };

  const handleProfilePhotoComplete = (avatarUrl?: string) => {
    if (avatarUrl) {
      setFormData(prev => ({ ...prev, avatar: avatarUrl }));
    }
    setOnboardingStep(6);
  };

  const handleComplete = () => {
    // Show the user we're processing their info
    toast({
      title: "Almost there!",
      description: "Creating your account and card...",
    });
    
    // Ensure final business card is updated before completion
    updateBusinessCardPreview();
    
    // Show completion animation 
    setShowCompletionAnimation(true);
  };
  
  const handleAnimationComplete = async () => {
    try {
      // Sign up the user with their provided credentials
      if (formData.phoneNumber && password) {
        console.log("Signing up user with phone:", formData.phoneNumber);
        await signUp(formData.phoneNumber, password, formData.name);
      }
      
      // Save the business card data
      if (previewCard) {
        console.log("Saving business card data:", previewCard);
        await updateBusinessCard(previewCard);
      }
    } catch (err) {
      console.error("Failed to save user data:", err);
      toast({
        title: "Couldn't save all your data",
        description: "You may need to complete some details after login",
        variant: "destructive"
      });
    } finally {
      // Always hide animation when complete
      setShowCompletionAnimation(false);
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
