
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useOnboarding } from '../../../context/OnboardingContext';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = "" }) => {
  const { handleBackStep } = useOnboarding();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`absolute left-4 top-4 ${className}`}
      onClick={onClick || handleBackStep}
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
