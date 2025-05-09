import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Connect from "./pages/Connect";
import ViewCard from "./pages/ViewCard";
import ConnectionRequests from "./pages/ConnectionRequests";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AccountSettings from "./pages/AccountSettings";
import NotFound from "./pages/NotFound";
import { AppProvider, useAppContext } from "./context/AppContext";
import { AuthProvider, useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

// Updated ProtectedRoute wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useAppContext();
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If no user is authenticated, allow temporary access but prompt for sign-up
  if (!user) {
    // Instead of redirecting, we'll show the page but with a sign-up prompt
    // This will be handled in the component
    return <>{children}</>;
  }
  
  // Even if the onboarding isn't complete, we'll show the page
  // This helps maintain state when users navigate around during onboarding
  return <>{children}</>;
};

// Main Routes component that has access to context
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/connect" element={<ProtectedRoute><Connect /></ProtectedRoute>} />
      <Route path="/card/:id" element={<ViewCard />} />
      <Route path="/requests" element={<ProtectedRoute><ConnectionRequests /></ProtectedRoute>} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/account/settings" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppProvider>
        <TooltipProvider>
          {/* Keep toast providers for other parts of the app but don't use them in our refactored components */}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
