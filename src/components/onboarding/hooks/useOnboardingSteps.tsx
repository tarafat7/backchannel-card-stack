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
  const { user } = useAuth();

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

  const handleComplete = async () => {
    // Ensure final business card is updated before completion
    updateBusinessCardPreview();
    
    // Save final card data to the database if user is authenticated
    if (previewCard) {
      console.log("Attempting to save final card to database:", previewCard);
      
      if (user) {
        console.log("User is authenticated, saving card for user:", user.id);
        
        // Use async/await for better error handling
        try {
          // Make sure this is awaited to catch any errors
          await updateBusinessCard(previewCard);
          console.log("Business card saved successfully");
          toast({
            title: "Card saved",
            description: "Your business card has been saved successfully.",
          });
        } catch (err) {
          console.error("Failed to save business card:", err);
          toast({
            title: "Error saving card",
            description: "There was a problem saving your business card. Please try again.",
            variant: "destructive"
          });
        }
      } else {
        console.log("User is not authenticated, card will be saved locally only");
        toast({
          title: "Card created",
          description: "Sign in to save your business card permanently.",
        });
        // Still proceed with the animation even if we can't save to database yet
      }
    }
    
    // Show completion animation
    setShowCompletionAnimation(true);
  };
  
  const handleAnimationComplete = () => {
    setShowCompletionAnimation(false);
    // Don't reset onboarding step to 0, instead keep whatever step we're at
    // This prevents redirecting back to the start
    console.log("Animation complete, onboarding step remains unchanged");
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
