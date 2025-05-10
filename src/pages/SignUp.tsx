
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { useAppContext } from '@/context/AppContext';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { updateBusinessCard, profile } = useAppContext();
  
  const fromOnboarding = location.state?.fromOnboarding;
  
  // If we have a card from onboarding, we'll save it after signing up
  const cardToSave = profile.card;
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Create the user account
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (signUpError) throw signUpError;
      
      // After successful signup, if we have card data, save it
      if (cardToSave) {
        try {
          await updateBusinessCard(cardToSave);
          console.log("Successfully saved business card after signup");
        } catch (saveError) {
          console.error("Error saving business card after signup:", saveError);
        }
      }
      
      // Navigate to home
      navigate('/home', { replace: true });
    } catch (err: any) {
      console.error("Error signing up:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">{fromOnboarding ? 'Save Your Profile' : 'Sign Up'}</h1>
          {fromOnboarding && (
            <p className="mt-2 text-muted-foreground">
              Create an account to save your profile and business card
            </p>
          )}
        </div>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button 
              variant="link" 
              className="p-0 font-normal text-primary" 
              onClick={() => navigate('/login', { state: { fromOnboarding: fromOnboarding }})}
            >
              Log in
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
