
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserProfile, BusinessCard } from '@/types';
import { toast } from '@/components/ui/use-toast';
import {
  getExperiences,
  getExpertiseAreas,
  getBusinessCard,
  updateProfile as updateProfileService,
  updateExperiences as updateExperiencesService,
  updateExpertiseAreas as updateExpertiseAreasService,
  updateBusinessCard as updateBusinessCardService
} from '@/services/profileService';

type ProfileContextType = {
  profile: UserProfile;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateBusinessCard: (card: BusinessCard) => void;
  resetProfile: () => void;
};

const initialProfile: UserProfile = {
  experiences: [],
  expertiseAreas: [],
  card: null
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user data from Supabase when auth state changes
  useEffect(() => {
    async function loadUserData() {
      if (user) {
        setLoading(true);
        try {
          // Fetch all user data in parallel
          const [experiences, expertiseAreas, card] = await Promise.all([
            getExperiences(),
            getExpertiseAreas(),
            getBusinessCard()
          ]);

          setProfile({
            experiences: experiences || [],
            expertiseAreas: expertiseAreas || [],
            card
          });

          // Determine onboarding step based on data
          if (card && experiences.length > 0) {
            // User has completed onboarding
            setOnboardingStep(0);
          } else {
            // User needs to complete onboarding
            setOnboardingStep(1);
          }
        } catch (error) {
          console.error("Error loading user data:", error);
          toast({
            title: "Error loading profile",
            description: "Could not load your profile data. Please try refreshing.",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      } else {
        // Reset state when user logs out
        setProfile(initialProfile);
        setOnboardingStep(0);
        setLoading(false);
      }
    }

    loadUserData();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      console.warn("Cannot update profile: No authenticated user");
      return;
    }

    setProfile(prev => {
      // Create new profile object with updates
      const updatedProfile = { ...prev };
      
      // Update experiences if provided
      if (updates.experiences) {
        updatedProfile.experiences = updates.experiences;
        // Save to Supabase in background
        updateExperiencesService(updates.experiences)
          .catch(err => console.error("Failed to save experiences:", err));
      }
      
      // Update expertise areas if provided
      if (updates.expertiseAreas) {
        updatedProfile.expertiseAreas = updates.expertiseAreas;
        // Save to Supabase in background
        updateExpertiseAreasService(updates.expertiseAreas)
          .catch(err => console.error("Failed to save expertise areas:", err));
      }
      
      // Update card if provided
      if (updates.card) {
        updatedProfile.card = { ...prev.card, ...updates.card };
        // Save to Supabase in background via updateBusinessCard
        if (updatedProfile.card) {
          updateBusinessCardService(updatedProfile.card)
            .catch(err => console.error("Failed to save card:", err));
        }
      }
      
      return updatedProfile;
    });
  };

  const updateBusinessCard = async (card: BusinessCard) => {
    if (!user) {
      console.warn("Cannot update business card: No authenticated user");
      return;
    }

    // Update local state
    setProfile(prev => ({
      ...prev,
      card
    }));
    
    // Save to Supabase
    try {
      await updateBusinessCardService(card);
    } catch (error) {
      console.error("Failed to save business card:", error);
    }
  };

  const resetProfile = () => {
    setProfile(initialProfile);
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      onboardingStep,
      setOnboardingStep,
      updateProfile,
      updateBusinessCard,
      resetProfile
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
};
