import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { backgroundOptions, expertise } from '../components/onboarding/constants';

// Onboarding step components
import SplashScreen from '../components/onboarding/SplashScreen';
import UserBasicInfo from '../components/onboarding/UserBasicInfo';
import ExperienceInput from '../components/onboarding/ExperienceInput';
import ExperienceSelection from '../components/onboarding/ExperienceSelection';
import ProfilePhoto from '../components/onboarding/ProfilePhoto';
import CardDesigner from '../components/onboarding/CardDesigner';
import ContactInfo from '../components/onboarding/ContactInfo';
import OnboardingComplete from '../components/onboarding/OnboardingComplete';

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
        return <SplashScreen onContinue={() => setOnboardingStep(1)} />;
        
      case 1:
        return <UserBasicInfo onContinue={handleBasicInfoComplete} />;
        
      case 2:
        return (
          <ExperienceInput 
            onContinue={handleExperienceComplete}
            currentTitle={formData.title} 
            currentCompany={formData.company}
          />
        );
        
      case 3:
        return <ContactInfo onContinue={handleContactInfoComplete} />;
        
      case 4:
        return (
          <ExperienceSelection 
            experiences={profile.experiences}
            selectedExpertise={selectedExpertise}
            onExpertiseToggle={handleExpertiseToggle}
            onContinue={() => setOnboardingStep(5)}
            expertise={expertise}
          />
        );
        
      case 5:
        return (
          <ProfilePhoto 
            avatarUrl={formData.avatar}
            onContinue={handleProfilePhotoComplete}
          />
        );
        
      case 6:
        return (
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
            <img src="/lovable-uploads/f2bd2289-bd05-40eb-a075-a0a8cd0a7331.png" alt="Backchannel Logo" className="h-16" />
          </div>
        )}
        
        {renderStep()}
      </div>
      
      {showCompletionAnimation && (
        <OnboardingComplete onAnimationComplete={handleAnimationComplete} />
      )}
    </div>
  );
};

export default Onboarding;
