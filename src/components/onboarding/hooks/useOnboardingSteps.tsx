
import { useState } from 'react';
import { useOnboarding } from '../../../context/OnboardingContext';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '@/hooks/useAuth';
import { toast } from "@/components/ui/use-toast";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleComplete = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Ensure final business card is updated
      updateBusinessCardPreview();
      
      // Show completion animation 
      setShowCompletionAnimation(true);
      
      console.log("Onboarding complete, card preview:", previewCard);
    } catch (err) {
      console.error("Error processing completion:", err);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  
  const handleAnimationComplete = async () => {
    try {
      console.log("Animation complete, saving user data now");
      
      // Sign up the user with their provided credentials
      if (formData.phoneNumber && password) {
        console.log("Signing up user with phone:", formData.phoneNumber);
        await signUp(formData.phoneNumber, password, formData.name);
      } else {
        console.warn("Missing phone or password for signup");
      }
      
      // Save the business card data
      if (previewCard) {
        console.log("Saving business card data:", previewCard);
        await updateBusinessCard(previewCard);
      } else {
        console.warn("No business card data to save");
      }
      
      setShowCompletionAnimation(false);
      setIsSubmitting(false);
      
      toast({
        title: "Success!",
        description: "Your profile has been created successfully.",
      });
      
    } catch (err) {
      console.error("Failed to save user data:", err);
      toast({
        title: "Error",
        description: "Failed to save your data. Please try again.",
        variant: "destructive"
      });
      setShowCompletionAnimation(false);
      setIsSubmitting(false);
    }
  };

  return {
    handleBasicInfoComplete,
    handleExperienceComplete,
    handleContactInfoComplete,
    handleProfilePhotoComplete,
    handleComplete,
    handleAnimationComplete,
    isSubmitting
  };
};
