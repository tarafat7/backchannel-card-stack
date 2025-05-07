
import React from 'react';

// Using the Backchannel logo 
const OnboardingLogo: React.FC<{ className?: string }> = ({ className = "h-16" }) => (
  <img 
    src="/lovable-uploads/4e8d032e-bc09-406c-9efb-5c51d5f9484c.png" 
    alt="Backchannel Logo" 
    className={className}
  />
);

export default OnboardingLogo;
