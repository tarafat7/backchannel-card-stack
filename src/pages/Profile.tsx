
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useToast } from '@/components/ui/use-toast';
import BottomNav from '../components/BottomNav';
import ProfileHeader from '../components/profile/ProfileHeader';
import BusinessCardSection from '../components/profile/BusinessCardSection';
import StatusSection from '../components/profile/StatusSection';
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

  const handleStatusUpdate = (status: string) => {
    if (profile.card) {
      const updatedCard = {
        ...profile.card,
        status
      };
      updateBusinessCard(updatedCard);
    }
  };

  const handleExperienceSave = (experiences: Experience[]) => {
    updateProfile({ experiences });
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
        />
        
        <StatusSection 
          status={profile.card?.status || ""} 
          onStatusUpdate={handleStatusUpdate} 
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
