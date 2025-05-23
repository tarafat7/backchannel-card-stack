
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAppContext } from './AppContext';
import { BusinessCard, Experience } from '@/types';

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
  previewCard: BusinessCard | null;
  // Add navigation functions
  handleBackStep: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { updateProfile, updateBusinessCard, profile } = useAppContext();
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [previewCard, setPreviewCard] = useState<BusinessCard | null>(null);
  
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

  // Add navigation handler for back button
  const handleBackStep = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

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
    // Filter out experiences that don't have required fields
    const validExperiences = formData.experiences.filter(exp => 
      exp.title && exp.company && exp.years
    );

    console.log("Valid experiences for card:", validExperiences.length, validExperiences);

    // Create a preview card with current data
    const cardPreview: BusinessCard = {
      id: profile.card?.id || '1',
      name: formData.name || 'Your Name',
      title: formData.title || 'Your Title',
      company: formData.company || 'Your Company',
      avatar: formData.avatar,
      expertiseAreas: selectedExpertise,
      links: links.filter(link => link.type && link.url), // Only include links with both type and URL
      status: status,
      design: {
        backgroundStyle: selectedBackground,
        textColor: textColor
      },
      connectionDegree: 1,
      mutualConnections: [],
      phoneNumber: formData.phoneNumber || '',
      // Include valid experiences in the card for rendering work history
      experiences: validExperiences
    };
    
    setPreviewCard(cardPreview);
    
    // Only try to save interim data if we've reached step 3 or higher
    // This is handled in useOnboardingSteps for the final save
    if (onboardingStep >= 3) {
      console.log("Saving interim card data:", cardPreview);
      // We'll let useOnboardingSteps handle the final save with proper error handling
    }
  };

  // Update the card preview whenever relevant state changes
  useEffect(() => {
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
    updateBusinessCardPreview,
    previewCard,
    handleBackStep
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
