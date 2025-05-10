
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
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If no user is authenticated, redirect to onboarding
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Main Routes component that has access to context
const AppRoutes = () => {
  const { user } = useAuth();
  const { profile } = useAppContext();
  
  console.log("Current auth state:", { isAuthenticated: !!user, hasProfile: !!profile?.card });
  
  return (
    <Routes>
      {/* If user is already authenticated, redirect to home */}
      <Route path="/" element={user ? <Navigate to="/home" replace /> : <Onboarding />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
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
