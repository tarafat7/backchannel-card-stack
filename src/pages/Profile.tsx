
import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import BottomNav from '../components/BottomNav';
import { useAppContext } from '../context/AppContext';
import { useToast } from '@/components/ui/use-toast';
import ProfileHeader from '../components/profile/ProfileHeader';
import BusinessCardSection from '../components/profile/BusinessCardSection';
import StatusUpdateSection from '../components/profile/StatusUpdateSection';
import ExperienceSection from '../components/profile/ExperienceSection';
import ExpertiseSection from '../components/profile/ExpertiseSection';
import ProfileActionLinks from '../components/profile/ProfileActionLinks';

const Profile = () => {
  const { profile, updateBusinessCard, updateProfile } = useAppContext();
  const [cardEditorOpen, setCardEditorOpen] = useState(false);
  const { toast } = useToast();

  const handleCardUpdate = (updatedCard) => {
    updateBusinessCard(updatedCard);
  };

  const handleExperienceSave = (experiences) => {
    updateProfile({ experiences });
    toast({
      title: "Experience updated",
      description: "Your professional experience has been updated successfully."
    });
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
    
    toast({
      title: "Expertise updated",
      description: "Your areas of expertise have been updated successfully."
    });
  };

  const handleStatusUpdate = (statusText) => {
    if (profile.card) {
      const updatedCard = {
        ...profile.card,
        status: statusText
      };
      updateBusinessCard(updatedCard);
      toast({
        title: "Status updated",
        description: "Your status has been updated successfully."
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <ProfileHeader />
      
      <main className="p-4">
        <BusinessCardSection 
          card={profile.card} 
          onCardUpdate={handleCardUpdate}
          cardEditorOpen={cardEditorOpen}
          setCardEditorOpen={setCardEditorOpen}
        />
        
        <StatusUpdateSection 
          initialStatus={profile.card?.status || ""} 
          onStatusUpdate={handleStatusUpdate} 
        />
        
        <ExperienceSection 
          experiences={profile.experiences || []} 
          onSave={handleExperienceSave} 
        />
        
        <ExpertiseSection 
          expertiseAreas={profile.expertiseAreas || []} 
          onSave={handleExpertiseSave} 
        />
        
        <ProfileActionLinks />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Profile;
