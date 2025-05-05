
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { backgroundOptions, expertise, mockLinkedInData } from '../components/onboarding/constants';

// Onboarding step components
import LinkedInImport from '../components/onboarding/LinkedInImport';
import ExperienceSelection from '../components/onboarding/ExperienceSelection';
import ProfilePhoto from '../components/onboarding/ProfilePhoto';
import CardDesigner from '../components/onboarding/CardDesigner';

const Onboarding = () => {
  const navigate = useNavigate();
  const { onboardingStep, setOnboardingStep, updateProfile, profile, updateBusinessCard } = useAppContext();
  
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<string>(backgroundOptions[0]);
  const [textColor, setTextColor] = useState<string>('text-white');
  const [status, setStatus] = useState<string>('Open to work');
  const [links, setLinks] = useState([
    { type: 'Twitter', url: 'https://twitter.com' },
    { type: 'GitHub', url: 'https://github.com' },
    { type: 'Portfolio', url: 'https://example.com' }
  ]);

  useEffect(() => {
    // Create a preview card whenever these values change
    if (onboardingStep >= 2) {
      updateBusinessCard({
        id: '1',
        name: mockLinkedInData.name,
        title: mockLinkedInData.experiences[0].title,
        company: mockLinkedInData.experiences[0].company,
        avatar: mockLinkedInData.avatar,
        expertiseAreas: selectedExpertise,
        links,
        status,
        design: {
          backgroundStyle: selectedBackground,
          textColor: textColor
        },
        mutualConnections: [] // Add the required property
      });
    }
  }, [selectedExpertise, selectedBackground, textColor, status, links, onboardingStep, updateBusinessCard]);

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

  const handleImportComplete = (data: any) => {
    updateProfile(data);
    setOnboardingStep(1);
  };

  const handleComplete = () => {
    navigate('/home');
  };

  const renderStep = () => {
    switch (onboardingStep) {
      case 0:
        return (
          <LinkedInImport onImportComplete={handleImportComplete} />
        );
        
      case 1:
        return (
          <ExperienceSelection 
            experiences={profile.experiences}
            selectedExpertise={selectedExpertise}
            onExpertiseToggle={handleExpertiseToggle}
            onContinue={() => setOnboardingStep(2)}
            expertise={expertise}
          />
        );
        
      case 2:
        return (
          <ProfilePhoto 
            avatarUrl={mockLinkedInData.avatar}
            onContinue={() => setOnboardingStep(3)}
          />
        );
        
      case 3:
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
        <div className="mb-10 flex justify-center">
          <img src="/lovable-uploads/616f61db-76fc-4df2-b8ac-403e36a20ee4.png" alt="Backchannel Logo" className="h-32" />
        </div>
        
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;
