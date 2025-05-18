
import React from 'react';
import { MessageCircle } from "lucide-react";
import AIChat from '@/components/features/AIChat';

interface AIChatWidgetProps {
  showChat: boolean;
  setShowChat: (show: boolean) => void;
}

const AIChatWidget: React.FC<AIChatWidgetProps> = ({ showChat, setShowChat }) => {
  return (
    <>
      {/* AI Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowChat(!showChat)}
          className="bg-nyc-primary hover:bg-nyc-primary/90 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label="Open AI Chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
      
      {/* AI Chat Window */}
      {showChat && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700 animate-scale-in">
          <AIChat onClose={() => setShowChat(false)} />
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
