
import React from 'react';
import { MessageCircle } from 'lucide-react';

type MessageButtonProps = {
  name: string;
  phoneNumber?: string;
};

const MessageButton: React.FC<MessageButtonProps> = ({ name, phoneNumber }) => {
  const handleSendMessage = (e: React.MouseEvent) => {
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

  return (
    <button
      className="bg-primary/90 hover:bg-primary px-2 py-1 rounded-md shadow-lg z-20 flex items-center gap-1 text-white text-xs ml-auto"
      onClick={handleSendMessage}
    >
      Send message to {name.split(' ')[0]}
      <MessageCircle className="w-3.5 h-3.5 text-white ml-1" />
    </button>
  );
};

export default MessageButton;
