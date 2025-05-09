
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useAppContext } from '@/context/AppContext';
import { toast } from '@/components/ui/use-toast';
import { useHaptics } from '@/hooks/useHaptics';

const ProfileLinks: React.FC = () => {
  const navigate = useNavigate();
  const { mediumHapticFeedback } = useHaptics();
  const { resetProfile } = useAppContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const handleDeleteAccount = () => {
    mediumHapticFeedback();
    setDeleteDialogOpen(true);
  };
  
  const confirmDeleteAccount = () => {
    mediumHapticFeedback();
    
    // Reset the user's profile data
    resetProfile();
    
    // Show toast notification
    toast({
      title: "Account deleted",
      description: "Your account has been successfully deleted",
    });
    
    // Navigate to the onboarding screen
    navigate('/', { replace: true });
  };
  
  return (
    <section>
      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-between">
          Invite Friends
          <ChevronRight className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-between"
          onClick={() => navigate('/account/settings')}
        >
          Account Settings
          <ChevronRight className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-between"
          onClick={() => navigate('/privacy')}
        >
          Privacy & Sharing
          <ChevronRight className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-between text-destructive hover:text-destructive"
          onClick={handleDeleteAccount}
        >
          Delete Account
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

export default ProfileLinks;
