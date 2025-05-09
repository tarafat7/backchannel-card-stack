
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
import NotFound from "./pages/NotFound";
import { AppProvider, useAppContext } from "./context/AppContext";

const queryClient = new QueryClient();

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useAppContext();
  const isOnboardingComplete = profile.card && profile.experiences.length > 0;
  
  if (!isOnboardingComplete) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Main Routes component that has access to context
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/connect" 
        element={
          <ProtectedRoute>
            <Connect />
          </ProtectedRoute>
        } 
      />
      <Route path="/card/:id" element={<ViewCard />} />
      <Route 
        path="/requests" 
        element={
          <ProtectedRoute>
            <ConnectionRequests />
          </ProtectedRoute>
        } 
      />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);

export default App;
