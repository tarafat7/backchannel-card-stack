
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Settings, ChevronRight, Edit2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import BusinessCard from '../components/BusinessCard';
import { useAppContext } from '../context/AppContext';

const Profile = () => {
  const { profile } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [statusText, setStatusText] = useState(profile.card?.status || "");

  const handleStatusUpdate = () => {
    // In a real app, you'd update the status in your context or API
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Your Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      {/* Content */}
      <main className="p-4">
        <section className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">Your Business Card</h2>
          {profile.card ? (
            <BusinessCard card={profile.card} isPreview={true} />
          ) : (
            <div className="h-56 rounded-xl bg-secondary flex items-center justify-center">
              <p className="text-muted-foreground">Complete onboarding to create your card</p>
            </div>
          )}
          
          <Button 
            variant="outline" 
            className="w-full mt-3"
            onClick={() => {}}
          >
            Edit Card Design
            <Edit2 className="w-4 h-4 ml-2" />
          </Button>
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
                onChange={(e) => setStatusText(e.target.value)}
                placeholder="What are you up to now?"
                className="bg-secondary border-none resize-none"
              />
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
          ) : (
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm">{profile.card?.status || "No status set"}</p>
            </div>
          )}
        </section>
        
        <section className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">Your Experience</h2>
          <div className="space-y-3">
            {profile.experiences && profile.experiences.map((exp, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary">
                <h3 className="font-medium">{exp.title}</h3>
                <p className="text-sm text-muted-foreground">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.years}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">Your Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {profile.expertiseAreas && profile.expertiseAreas.map((area, index) => (
              <span key={index} className="chip">
                {area}
              </span>
            ))}
          </div>
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
