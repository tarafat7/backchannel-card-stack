
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ArrowLeft, User, Phone, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from '@/context/AppContext';

const AccountSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, updateBusinessCard, resetProfile } = useAppContext();
  
  const [name, setName] = useState(profile.card?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(profile.card?.phoneNumber || '');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const handleSaveChanges = () => {
    if (!profile.card) return;
    
    const updatedCard = {
      ...profile.card,
      name,
      phoneNumber
    };
    
    updateBusinessCard(updatedCard);
    
    toast({
      title: "Settings updated",
      description: "Your account information has been updated successfully",
    });
  };
  
  const handleDeleteAccount = () => {
    setDeleteDialogOpen(true);
  };
  
  const confirmDeleteAccount = () => {
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
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Account Settings</h1>
      </div>
      
      {/* Main Content */}
      <div className="p-4 max-w-md mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium block mb-1">Name</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="text-sm font-medium block mb-1">Phone Number</label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Your phone number"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </CardFooter>
        </Card>
        
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
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
    </div>
  );
};

export default AccountSettings;
