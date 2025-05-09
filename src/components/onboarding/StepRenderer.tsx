
import React, { lazy, Suspense } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { useAppContext } from '../../context/AppContext';
import LoadingFallback from './common/LoadingFallback';
import { useOnboardingSteps } from './hooks/useOnboardingSteps';
import { expertise, backgroundOptions } from './constants';

// Lazy load onboarding step components
const SplashScreen = lazy(() => import('./SplashScreen'));
const UserBasicInfo = lazy(() => import('./UserBasicInfo'));
const ExperienceInput = lazy(() => import('./ExperienceInput'));
const ExperienceSelection = lazy(() => import('./ExperienceSelection'));
const ProfilePhoto = lazy(() => import('./ProfilePhoto'));
const CardDesigner = lazy(() => import('./CardDesigner'));
const ContactInfo = lazy(() => import('./ContactInfo'));

const StepRenderer: React.FC = () => {
  const { 
    onboardingStep, 
    setOnboardingStep,
    formData,
    selectedExpertise,
    handleExpertiseToggle,
    selectedBackground,
    setSelectedBackground,
    textColor,
    setTextColor,
    status,
    setStatus,
    links,
    setLinks,
    handleLinkChange,
    previewCard
  } = useOnboarding();
  
  const { profile } = useAppContext();
  
  const {
    handleBasicInfoComplete,
    handleExperienceComplete,
    handleContactInfoComplete,
    handleProfilePhotoComplete,
    handleComplete
  } = useOnboardingSteps();

  switch (onboardingStep) {
    case 0:
      return (
        <Suspense fallback={<LoadingFallback />}>
          <SplashScreen onContinue={() => setOnboardingStep(1)} />
        </Suspense>
      );
      
    case 1:
      return (
        <Suspense fallback={<LoadingFallback />}>
          <UserBasicInfo onContinue={handleBasicInfoComplete} />
        </Suspense>
      );
      
    case 2:
      return (
        <Suspense fallback={<LoadingFallback />}>
          <ExperienceInput 
            onContinue={handleExperienceComplete}
            currentTitle={formData.title} 
            currentCompany={formData.company}
          />
        </Suspense>
      );
      
    case 3:
      return (
        <Suspense fallback={<LoadingFallback />}>
          <ContactInfo onContinue={handleContactInfoComplete} />
        </Suspense>
      );
      
    case 4:
      return (
        <Suspense fallback={<LoadingFallback />}>
          <ExperienceSelection 
            experiences={profile.experiences}
            selectedExpertise={selectedExpertise}
            onExpertiseToggle={handleExpertiseToggle}
            onContinue={() => setOnboardingStep(5)}
            expertise={expertise}
          />
        </Suspense>
      );
      
    case 5:
      return (
        <Suspense fallback={<LoadingFallback />}>
          <ProfilePhoto 
            avatarUrl={formData.avatar}
            onContinue={handleProfilePhotoComplete}
          />
        </Suspense>
      );
      
    case 6:
      return (
        <Suspense fallback={<LoadingFallback />}>
          <CardDesigner 
            card={previewCard || profile.card}
            selectedBackground={selectedBackground}
            setSelectedBackground={setSelectedBackground}
            textColor={textColor}
            setTextColor={setTextColor}
            status={status}
            setStatus={setStatus}
            links={links}
            setLinks={setLinks}
            handleLinkChange={handleLinkChange}
            onComplete={handleComplete}
            backgroundOptions={backgroundOptions}
          />
        </Suspense>
      );
      
    default:
      return null;
  }
};

export default StepRenderer;
