
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useToast } from '@/components/ui/use-toast';
import BottomNav from '../components/BottomNav';
import ProfileHeader from '../components/profile/ProfileHeader';
import BusinessCardSection from '../components/profile/BusinessCardSection';
import ExperienceSection from '../components/profile/ExperienceSection';
import ExpertiseSection from '../components/profile/ExpertiseSection';
import ProfileLinks from '../components/profile/ProfileLinks';

interface Experience {
  title: string;
  company: string;
  years: string;
  description?: string;
}

const Profile = () => {
  const { profile, updateBusinessCard, updateProfile } = useAppContext();

  const handleCardUpdate = (updatedCard) => {
    updateBusinessCard(updatedCard);
  };

  const handleExperienceSave = (experiences: Experience[]) => {
    updateProfile({ experiences });
    
    // If card exists, update the expertise areas there too
    if (profile.card) {
      const updatedCard = {
        ...profile.card
      };
      updateBusinessCard(updatedCard);
    }
  };

  const handleExpertiseSave = (expertiseAreas) => {
    updateProfile({ expertiseAreas });
    
    // If card exists, update the expertise areas there too
    if (profile.card) {
      const updatedCard = {
        ...profile.card,
        expertiseAreas
      };
      updateBusinessCard(updatedCard);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <ProfileHeader />
      
      <main className="p-4">
        <BusinessCardSection 
          card={profile.card} 
          onCardUpdate={handleCardUpdate} 
          experiences={profile.experiences}
          expertiseAreas={profile.expertiseAreas}
          onExperienceSave={handleExperienceSave}
          onExpertiseSave={handleExpertiseSave}
        />
        
        <ExperienceSection 
          experiences={profile.experiences || []} 
          onExperienceSave={handleExperienceSave} 
        />
        
        <ExpertiseSection 
          expertiseAreas={profile.expertiseAreas || []} 
          onExpertiseSave={handleExpertiseSave} 
        />
        
        <ProfileLinks />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Profile;
