
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/components/ui/use-toast';
import { useHaptics } from '@/hooks/useHaptics';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Moon, Sun, Save, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type FormValues = {
  name: string;
  phoneNumber: string;
  theme: 'light' | 'dark';
};

const AccountSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mediumHapticFeedback } = useHaptics();
  const { profile, updateBusinessCard, resetProfile } = useAppContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>('dark');

  const form = useForm<FormValues>({
    defaultValues: {
      name: profile.card?.name || '',
      phoneNumber: profile.card?.phoneNumber || '',
      theme: currentTheme,
    }
  });

  const onSubmit = (data: FormValues) => {
    mediumHapticFeedback();
    
    // Update the theme
    if (data.theme !== currentTheme) {
      handleThemeChange(data.theme);
    }
    
    // Update the profile if card exists
    if (profile.card) {
      const updatedCard = {
        ...profile.card,
        name: data.name,
        phoneNumber: data.phoneNumber,
      };
      
      updateBusinessCard(updatedCard);
      
      toast({
        title: "Settings updated",
        description: "Your settings have been saved successfully",
      });
    }
  };
  
  const handleThemeChange = (theme: 'light' | 'dark') => {
    setCurrentTheme(theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  };
  
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
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background sticky top-0 z-30 flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/profile')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold ml-2">Account Settings</h1>
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-4 max-w-md mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Profile Information</h2>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Appearance</h2>
              
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Dark Mode
                      </FormLabel>
                      <FormDescription>
                        Switch between light and dark theme
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value === 'dark'}
                        onCheckedChange={(checked) => field.onChange(checked ? 'dark' : 'light')}
                      />
                    </FormControl>
                    <div className="ml-2">
                      {field.value === 'dark' ? (
                        <Moon className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Sun className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />
            
            <div className="flex flex-col gap-4">
              <Button type="submit" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
              
              <Button 
                type="button" 
                variant="destructive" 
                className="w-full" 
                onClick={handleDeleteAccount}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </form>
        </Form>
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
