
import React, { forwardRef } from 'react';
import { Link } from 'lucide-react';

type IntroButtonProps = {
  name: string;
  mutualConnection?: string;
  onRequestIntro: (e: React.MouseEvent, name: string, mutualConnection?: string) => void;
};

const IntroButton = forwardRef<HTMLButtonElement, IntroButtonProps>(({ 
  name, 
  mutualConnection, 
  onRequestIntro 
}, ref) => {
  return (
    <button
      ref={ref}
      className="bg-primary/90 hover:bg-primary px-2 py-1 rounded-md shadow-lg z-20 flex items-center gap-1 text-white text-xs ml-auto"
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        onRequestIntro(e, name, mutualConnection);
      }}
    >
      Ask {mutualConnection ? mutualConnection.split(' ')[0] : "for"} for intro
      <Link className="w-3.5 h-3.5 text-white" />
    </button>
  );
});

IntroButton.displayName = "IntroButton";

export default IntroButton;
