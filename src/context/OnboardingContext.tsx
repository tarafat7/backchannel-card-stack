
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useAppContext } from './AppContext';

interface Experience {
  title: string;
  company: string;
  years: string;
  description: string;
}

interface OnboardingFormData {
  name: string;
  title: string;
  company: string;
  experiences: Experience[];
  phoneNumber: string;
  avatar: string;
}

interface Link {
  type: string;
  url: string;
}

interface OnboardingContextType {
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  selectedExpertise: string[];
  setSelectedExpertise: React.Dispatch<React.SetStateAction<string[]>>;
  selectedBackground: string;
  setSelectedBackground: (bg: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  status: string;
  setStatus: (status: string) => void;
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  showCompletionAnimation: boolean;
  setShowCompletionAnimation: (show: boolean) => void;
  handleExpertiseToggle: (area: string) => void;
  handleLinkChange: (index: number, field: 'type' | 'url', value: string) => void;
  updateBusinessCardPreview: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { updateProfile, updateBusinessCard, profile } = useAppContext();
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  
  const [formData, setFormData] = useState<OnboardingFormData>({
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
  const [selectedBackground, setSelectedBackground] = useState<string>("bg-gradient-to-br from-primary to-primary/60");
  const [textColor, setTextColor] = useState<string>('text-white');
  const [status, setStatus] = useState<string>('Open to work');
  const [links, setLinks] = useState([
    { type: 'Twitter', url: 'https://twitter.com' },
    { type: 'GitHub', url: 'https://github.com' },
    { type: 'Portfolio', url: 'https://example.com' }
  ]);

  // Handle toggling expertise areas
  const handleExpertiseToggle = (area: string) => {
    if (selectedExpertise.includes(area)) {
      setSelectedExpertise(selectedExpertise.filter(e => e !== area));
    } else {
      if (selectedExpertise.length < 5) {
        setSelectedExpertise([...selectedExpertise, area]);
      }
    }
  };

  // Handle link field changes
  const handleLinkChange = (index: number, field: 'type' | 'url', value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  // Update business card preview
  const updateBusinessCardPreview = () => {
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
  };

  // Update the card preview whenever relevant state changes
  React.useEffect(() => {
    updateBusinessCardPreview();
  }, [formData, selectedExpertise, selectedBackground, textColor, status, links, onboardingStep]);

  const value = {
    onboardingStep,
    setOnboardingStep,
    formData,
    setFormData,
    selectedExpertise,
    setSelectedExpertise,
    selectedBackground,
    setSelectedBackground,
    textColor,
    setTextColor,
    status,
    setStatus,
    links,
    setLinks,
    showCompletionAnimation,
    setShowCompletionAnimation,
    handleExpertiseToggle,
    handleLinkChange,
    updateBusinessCardPreview
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (): OnboardingContextType => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

