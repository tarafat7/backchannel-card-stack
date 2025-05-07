
import React from 'react';

// Using the updated Backchannel logo 
const OnboardingLogo: React.FC<{ className?: string }> = ({ className = "h-14" }) => (
  <img 
    src="/lovable-uploads/b2b642ce-8191-4ca4-b680-140d710f2fe1.png" 
    alt="Backchannel Logo" 
    className={className}
  />
);

export default OnboardingLogo;
