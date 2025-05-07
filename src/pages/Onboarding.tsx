
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { backgroundOptions, expertise } from '../components/onboarding/constants';

// Logo SVG component for faster loading
const LogoSvg = () => (
  <svg 
    width="64" 
    height="64" 
    viewBox="0 0 256 256" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="h-16"
  >
    <path d="M128 32C74.98 32 32 74.98 32 128C32 181.02 74.98 224 128 224C181.02 224 224 181.02 224 128C224 74.98 181.02 32 128 32ZM128 56C168.35 56 200 87.65 200 128C200 168.35 168.35 200 128 200C87.65 200 56 168.35 56 128C56 87.65 87.65 56 128 56Z" fill="currentColor"/>
    <path d="M128 80C102.65 80 82 100.65 82 126C82 151.35 102.65 172 128 172C153.35 172 174 151.35 174 126C174 100.65 153.35 80 128 80Z" fill="currentColor"/>
  </svg>
);

// Component loader with fallback
const LoadingFallback = () => <div className="flex justify-center items-center py-12">Loading...</div>;

// Lazy load onboarding step components
const SplashScreen = lazy(() => import('../components/onboarding/SplashScreen'));
const UserBasicInfo = lazy(() => import('../components/onboarding/UserBasicInfo'));
const ExperienceInput = lazy(() => import('../components/onboarding/ExperienceInput'));
const ExperienceSelection = lazy(() => import('../components/onboarding/ExperienceSelection'));
const ProfilePhoto = lazy(() => import('../components/onboarding/ProfilePhoto'));
const CardDesigner = lazy(() => import('../components/onboarding/CardDesigner'));
const ContactInfo = lazy(() => import('../components/onboarding/ContactInfo'));
const OnboardingComplete = lazy(() => import('../components/onboarding/OnboardingComplete'));

const Onboarding = () => {
  const navigate = useNavigate();
  const { onboardingStep, setOnboardingStep, updateProfile, profile, updateBusinessCard } = useAppContext();
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    experiences: [
      { title: '', company: '', years: '', description: '' },
      { title: '', company: '', years: '', description: '' },
      { title: '', company: '', years: '', description: '' }
    ],
    phoneNumber: '',
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  });
  
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<string>(backgroundOptions[0]);
  const [textColor, setTextColor] = useState<string>('text-white');
  const [status, setStatus] = useState<string>('Open to work');
  const [links, setLinks] = useState([
    { type: 'Twitter', url: 'https://twitter.com' },
    { type: 'GitHub', url: 'https://github.com' },
    { type: 'Portfolio', url: 'https://example.com' }
  ]);
  
  // Update business card preview
  useEffect(() => {
    if (onboardingStep >= 3) {
      updateBusinessCard({
        id: '1',
        name: formData.name,
        title: formData.title,
        company: formData.company,
        avatar: formData.avatar,
        expertiseAreas: selectedExpertise,
        links,
        status,
        design: {
          backgroundStyle: selectedBackground,
          textColor: textColor
        },
        connectionDegree: 1,
        mutualConnections: [],
        phoneNumber: formData.phoneNumber
      });
    }
  }, [formData, selectedExpertise, selectedBackground, textColor, status, links, onboardingStep]);

  const handleExpertiseToggle = (area: string) => {
    if (selectedExpertise.includes(area)) {
      setSelectedExpertise(selectedExpertise.filter(e => e !== area));
    } else {
      if (selectedExpertise.length < 5) {
        setSelectedExpertise([...selectedExpertise, area]);
      }
    }
  };

  const handleLinkChange = (index: number, field: 'type' | 'url', value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col">
      <div className="px-6 py-8 flex-1">
        {onboardingStep > 0 && (
          <div className="mb-10 flex justify-center">
            <LogoSvg />
          </div>
        )}
        
        {renderStep()}
      </div>
      
      {showCompletionAnimation && (
        <Suspense fallback={<LoadingFallback />}>
          <OnboardingComplete onAnimationComplete={handleAnimationComplete} />
        </Suspense>
      )}
    </div>
  );
};

export default Onboarding;
