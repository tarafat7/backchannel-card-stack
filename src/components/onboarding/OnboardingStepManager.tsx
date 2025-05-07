
import React, { lazy, Suspense } from 'react';
import { useOnboarding } from '../../context/OnboardingContext';
import { useAppContext } from '../../context/AppContext';

// Component loader with fallback
const LoadingFallback = () => <div className="flex justify-center items-center py-12">Loading...</div>;

// Lazy load onboarding step components
const SplashScreen = lazy(() => import('./SplashScreen'));
const UserBasicInfo = lazy(() => import('./UserBasicInfo'));
const ExperienceInput = lazy(() => import('./ExperienceInput'));
const ExperienceSelection = lazy(() => import('./ExperienceSelection'));
const ProfilePhoto = lazy(() => import('./ProfilePhoto'));
const CardDesigner = lazy(() => import('./CardDesigner'));
const ContactInfo = lazy(() => import('./ContactInfo'));
const OnboardingComplete = lazy(() => import('./OnboardingComplete'));

const OnboardingStepManager: React.FC = () => {
  const { 
    onboardingStep, 
    setOnboardingStep, 
    formData, 
    setFormData,
    selectedExpertise,
    selectedBackground,
    setSelectedBackground,
    textColor,
    setTextColor,
    status,
    setStatus,
    links,
    setLinks,
    handleLinkChange,
    showCompletionAnimation,
    setShowCompletionAnimation,
    handleExpertiseToggle
  } = useOnboarding();
  
  const { profile, updateProfile } = useAppContext();

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
    setShowCompletionAnimation(true);
  };
  
  const handleAnimationComplete = () => {
    setShowCompletionAnimation(false);
  };

  const renderStep = () => {
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
              card={profile.card}
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

  return (
    <>
      {renderStep()}
      
      {showCompletionAnimation && (
        <Suspense fallback={<LoadingFallback />}>
          <OnboardingComplete onAnimationComplete={handleAnimationComplete} />
        </Suspense>
      )}
    </>
  );
};

// Constants to keep the component clean
const expertise = [
  "UX Design", "Product Strategy", "Frontend Dev", "Backend Dev",
  "Marketing", "Sales", "Fundraising", "Recruiting",
  "Management", "Operations", "Finance", "Legal",
  "Data Science", "AI/ML", "Blockchain", "Mobile Dev"
];

const backgroundOptions = [
  "bg-gradient-to-br from-primary to-primary/60",
  "bg-gradient-to-r from-blue-600 to-violet-600",
  "bg-gradient-to-r from-rose-600 to-orange-600",
  "bg-gradient-to-r from-emerald-500 to-teal-400",
  "bg-gradient-to-r from-fuchsia-600 to-pink-600",
  "bg-gradient-to-b from-gray-900 to-gray-700",
  "bg-[#000000]",
  "bg-[#0F172A]",
  "bg-[#1E293B]",
  "bg-[#1e1e1e]",
  "bg-[#18181b]",
  "bg-[#27272a]",
  "bg-[pattern-topography-white/10]",
  "bg-[pattern-circuit-white/5]",
  "bg-[pattern-dots-white/10]"
];

export { expertise, backgroundOptions };

export default OnboardingStepManager;
