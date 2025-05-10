
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { useAppContext } from '@/context/AppContext';
import OnboardingLogo from '../components/onboarding/OnboardingLogo';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { updateBusinessCard, profile } = useAppContext();
  
  const fromOnboarding = location.state?.fromOnboarding;
  
  // If we have a card from onboarding, we'll save it after logging in
  const cardToSave = profile.card;
  
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Log in the user using phone number as email
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: phoneNumber,
        password,
      });
      
      if (loginError) throw loginError;
      
      // After successful login, if we have card data, save it
      if (cardToSave) {
        try {
          await updateBusinessCard(cardToSave);
          console.log("Successfully saved business card after login");
        } catch (saveError) {
          console.error("Error saving business card after login:", saveError);
        }
      }
      
      // Navigate to home
      navigate('/home', { replace: true });
    } catch (err: any) {
      console.error("Error logging in:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <OnboardingLogo className="h-12 mb-4" />
          <h1 className="text-3xl font-bold">{fromOnboarding ? 'Save Your Profile' : 'Log In'}</h1>
          {fromOnboarding && (
            <p className="mt-2 text-muted-foreground">
              Log in to save your profile and business card
            </p>
          )}
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input 
              id="phoneNumber" 
              type="tel" 
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="(555) 123-4567"
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
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Button 
              variant="link" 
              className="p-0 font-normal text-primary" 
              onClick={() => navigate('/signup', { state: { fromOnboarding: fromOnboarding }})}
            >
              Sign up
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
