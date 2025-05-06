
import { useState } from 'react';

export const useCardStack = () => {
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const [showTimelineIndex, setShowTimelineIndex] = useState<number | null>(null);
  
  const handleCardClick = (index: number, id: string) => {
    if (expandedCardIndex === index) {
      // If the card is already expanded, collapse it back
      handleCollapseStack();
    } else {
      setExpandedCardIndex(index);
      setShowTimelineIndex(index); // Automatically show timeline when expanding a card
    }
  };

  const handleCollapseStack = () => {
    setExpandedCardIndex(null);
    setShowTimelineIndex(null);
  };

  const handleSendMessage = (e: React.MouseEvent, name: string, phoneNumber?: string) => {
    e.stopPropagation(); // Prevent card collapse
    
    console.log("Sending message to:", name);
    console.log("Phone number:", phoneNumber);
    
    if (!phoneNumber) {
      console.error("No phone number available for", name);
      return;
    }
    
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    
    // Platform detection
    const isMac = /Mac/i.test(navigator.userAgent) && !/iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    let messageUrl;
    if (isMac) {
      messageUrl = `imessage://+${formattedPhone}`;
    } else if (isIOS) {
      messageUrl = `sms:${formattedPhone}`;
    } else {
      messageUrl = `sms:${formattedPhone}`;
    }
    
    console.log(`Opening message URL: ${messageUrl}`);
    window.location.href = messageUrl;
  };

  const handleRequestIntro = (e: React.MouseEvent, name: string, mutualConnection?: string) => {
    e.stopPropagation(); // Prevent card collapse
    console.log(`Introduction requested to ${mutualConnection || "a mutual connection"} for ${name}`);
  };
  
  return {
    expandedCardIndex,
    showTimelineIndex,
    handleCardClick,
    handleCollapseStack,
    handleSendMessage,
    handleRequestIntro
  };
};
