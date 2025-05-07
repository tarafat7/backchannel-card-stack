
import React from 'react';

// Using the Backchannel logo 
const OnboardingLogo: React.FC<{ className?: string }> = ({ className = "h-16" }) => (
  <img 
    src="/lovable-uploads/backchannel-logo.png" 
    alt="Backchannel Logo" 
    className={className}
  />
);

export default OnboardingLogo;
