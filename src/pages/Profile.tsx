
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings, ChevronRight, Edit2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import BusinessCard from '../components/BusinessCard';
import { useAppContext } from '../context/AppContext';
import CardEditorDialog from '../components/profile/CardEditorDialog';
import ExperienceEditor from '../components/profile/ExperienceEditor';
import ExpertiseEditor from '../components/profile/ExpertiseEditor';
import { useToast } from '@/components/ui/use-toast';

const MAX_STATUS_LENGTH = 100;

const Profile = () => {
  const { profile, updateBusinessCard, updateProfile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [statusText, setStatusText] = useState(profile.card?.status || "");
  const [cardEditorOpen, setCardEditorOpen] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [isEditingExpertise, setIsEditingExpertise] = useState(false);
  const [showWorkHistory, setShowWorkHistory] = useState(true);
  const { toast } = useToast();

  const handleStatusUpdate = () => {
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
    setIsEditing(false);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_STATUS_LENGTH) {
      setStatusText(value);
    }
  };

  const handleCardUpdate = (updatedCard) => {
    updateBusinessCard(updatedCard);
  };

  const handleExperienceSave = (experiences) => {
    updateProfile({ experiences });
    setIsEditingExperience(false);
    toast({
      title: "Experience updated",
      description: "Your professional experience has been updated successfully."
    });
  };

  const handleExpertiseSave = (expertiseAreas) => {
    updateProfile({ expertiseAreas });
    setIsEditingExpertise(false);
    
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

  const toggleWorkHistory = () => {
    setShowWorkHistory(!showWorkHistory);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header - removed the padding-top (p-4) and replaced with px-4 py-2 */}
      <header className="px-4 py-2 flex justify-end items-center">
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      {/* Content */}
      <main className="p-4">
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-muted-foreground">Your Business Card</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleWorkHistory}
            >
              {showWorkHistory ? "Hide Work History" : "Show Work History"}
            </Button>
          </div>

          {profile.card ? (
            <BusinessCard card={profile.card} isPreview={true} showHistory={showWorkHistory} />
          ) : (
            <div className="h-56 rounded-xl bg-secondary flex items-center justify-center">
              <p className="text-muted-foreground">Complete onboarding to create your card</p>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full mt-3"
            onClick={() => setCardEditorOpen(true)}
          >
            Edit Card Design
            <Edit2 className="w-4 h-4 ml-2" />
          </Button>
          
          {/* Card Editor Dialog */}
          {profile.card && (
            <CardEditorDialog
              open={cardEditorOpen}
              onOpenChange={setCardEditorOpen}
              card={profile.card}
              onSave={handleCardUpdate}
            />
          )}
        </section>
        
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-muted-foreground">Status Update</h2>
            {!isEditing && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-3">
              <Textarea 
                value={statusText}
                onChange={handleStatusChange}
                placeholder="What are you up to now?"
                className="bg-secondary border-none resize-none"
                maxLength={MAX_STATUS_LENGTH}
              />
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  {statusText.length}/{MAX_STATUS_LENGTH} characters
                </div>
                <div className="flex gap-2 justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleStatusUpdate}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm">{profile.card?.status || "No status set"}</p>
            </div>
          )}
        </section>
        
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-muted-foreground">Your Experience</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditingExperience(true)}
            >
              Edit
            </Button>
          </div>
          
          {isEditingExperience ? (
            <ExperienceEditor 
              experiences={profile.experiences || []}
              onSave={handleExperienceSave}
              onCancel={() => setIsEditingExperience(false)}
            />
          ) : (
            <div className="space-y-3">
              {profile.experiences && profile.experiences.length > 0 ? (
                profile.experiences.map((exp, index) => (
                  <div key={index} className="p-4 rounded-lg bg-secondary">
                    <h3 className="font-medium">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <p className="text-xs text-muted-foreground">{exp.years}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 rounded-lg bg-secondary text-center">
                  <p className="text-sm text-muted-foreground">No experience added yet</p>
                </div>
              )}
            </div>
          )}
        </section>
        
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-muted-foreground">Your Expertise</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditingExpertise(true)}
            >
              Edit
            </Button>
          </div>
          
          {isEditingExpertise ? (
            <ExpertiseEditor 
              selectedExpertise={profile.expertiseAreas || []}
              onSave={handleExpertiseSave}
              onCancel={() => setIsEditingExpertise(false)}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.expertiseAreas && profile.expertiseAreas.length > 0 ? (
                profile.expertiseAreas.map((area, index) => (
                  <span key={index} className="chip">
                    {area}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No expertise areas selected</p>
              )}
            </div>
          )}
        </section>
        
        <section>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-between">
              Invite Friends
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              Account Settings
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              Privacy & Sharing
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Profile;
